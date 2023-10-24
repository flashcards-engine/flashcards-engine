import RouteMapping from "./RouteMapping";
import flashcardRoutes from "../routes/FlashcardRoutes";
import flashcardSetRoutes from "../routes/FlashcardSetRoutes";
import flashcardSetGroupRoutes from "../routes/FlashcardSetGroupRoutes";

const routes: RouteMapping[] = [
    flashcardRoutes,
    flashcardSetRoutes,
    flashcardSetGroupRoutes
].reduce((accumulator, currentValue) => accumulator.concat(currentValue));

export default routes;
