import RouteMapping from "./RouteMapping";

const routes: RouteMapping[] = [
    {
        method: 'GET',
        route: '/flashcard-set-groups',
    },
    {
        method: 'GET',
        route: '/flashcard-set-groups/{id}',
    },
];

export default routes;
