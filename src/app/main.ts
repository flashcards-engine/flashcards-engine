import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import sqlite3 from 'sqlite3';
import handlerConfigurer from "./ipc/HandlerConfigurer.js";
import appConfigurer from './configuration/AppConfigurer.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const configureBackend = async () => {
    const database = new (sqlite3.verbose()).Database('flashcards.db');
    const objects = appConfigurer.configure(database).getObjects();
    handlerConfigurer.configure(ipcMain, objects);
    await objects.initializer.initialize();
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname,'../html', 'preload.bundle.js'),
        },
    });

    // Uncomment to run with dev tools at the start
    // win.webContents.openDevTools();
    win.loadFile('dist/html/index.html');
}

app.whenReady().then(async () => {
    await configureBackend();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    console.info('Flashcards application started');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
