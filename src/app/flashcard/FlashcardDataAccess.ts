import { sqlite3 } from "sqlite3";
import Flashcard from "./Flashcard.js";

export default class FlashcardDataAccess {
    sqlite3: sqlite3;
    
    constructor(sqlite3: sqlite3) {
        this.sqlite3 = sqlite3;
    }
    
    create(flashcard: Flashcard) {
        
    }
}
