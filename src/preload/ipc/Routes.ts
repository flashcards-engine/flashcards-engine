import RouteMapping from "./RouteMapping";

const routes: RouteMapping[] = [
    {
        method: 'GET',
        route: '/flashcard-set-groups',
    },
    {
        method: 'POST',
        route: '/flashcard-set-groups',
    },
    {
        method: 'GET',
        route: '/flashcard-set-groups/{id}',
    },
    {
        method: 'PUT',
        route: '/flashcard-set-groups/{id}',
    },
    {
        method: 'POST',
        route: '/flashcard-set-groups/{groupId}/flashcard-sets',
    },
    {
        method: 'PUT',
        route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}',
    },
    {
        method: 'POST',
        route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/session',
    },
    {
        method: 'POST',
        route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/flashcards',
    },
    {
        method: 'PUT',
        route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/flashcards/{flashcardId}',
    },
    {
        method: 'DELETE',
        route: '/flashcard-set-groups/{groupId}/flashcard-sets/{setId}/flashcards/{flashcardId}',
    },
];

export default routes;
