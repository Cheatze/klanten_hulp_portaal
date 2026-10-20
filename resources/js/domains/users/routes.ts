import Overview from "./pages/overview.vue";
import Register from "./pages/register.vue";
import Details from "./pages/details.vue";
import Login from "./pages/login.vue";
import Reset from "./pages/reset.vue";

export const userRoutes = [
    {
        path: "/users",
        component: Overview,
        name: "users.overview",
        meta: { requiresAuth: true },
    },
    {
        path: "/users/register",
        component: Register,
        name: "users.register",
        meta: { guestOnly: true },
    },
    {
        path: "/users/:id",
        component: Details,
        name: "users.details",
        meta: { requiresAuth: true },
    },
    {
        path: "/users/reset",
        component: Reset,
        name: "users.reset",
        meta: { guestOnly: true },
    },
    {
        path: "/users/login",
        component: Login,
        name: "users.login",
        meta: { guestOnly: true },
    },
];
