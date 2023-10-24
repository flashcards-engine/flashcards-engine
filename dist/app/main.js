import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import sqlite3NotVerbose from 'sqlite3';
import handlerConfiguration from "./ipc/HandlerConfiguration.js";
import handlerConfigurer from "./ipc/HandlerConfigurer.js";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const sqlite3 = sqlite3NotVerbose.verbose();
const db = new sqlite3.Database('flashcards.db');
db.serialize(() => {
});
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, '../html', 'preload.bundle.js'),
        },
    });
    // Uncomment to run with dev tools at the start
    // win.webContents.openDevTools();
    win.loadFile('dist/html/index.html');
};
app.whenReady().then(() => {
    handlerConfigurer.configure(ipcMain, handlerConfiguration);
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
