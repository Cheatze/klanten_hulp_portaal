import Overview from "./pages/overview.vue";
import Details from "./pages/details.vue";

export const userRoutes = [
    {
        path: "/users",
        component: Overview,
        name: "users.overview",
        meta: { requiresAuth: true },
    },
    {
        path: "/users/:id",
        component: Details,
        name: "users.details",
        meta: { requiresAuth: true },
    },
];
