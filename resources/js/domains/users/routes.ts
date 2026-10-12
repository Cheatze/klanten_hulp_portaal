import Overview from "./pages/overview.vue";
import Register from "./pages/register.vue";
import Details from "./pages/details.vue";
import Login from "./pages/login.vue";

export const userRoutes = [
    { path: "/users", component: Overview, name: "users-overview" },
    { path: "/users/register", component: Register, name: "users-register" },
    { path: "/users/:id", component: Details, name: "users-details" },
    { path: "/users/login", component: Login, name: "users-login" },
];
