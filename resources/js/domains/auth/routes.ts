import Register from "./pages/register.vue";
import Login from "./pages/login.vue";
import ResetRequest from "./pages/ResetRequest.vue";
import ResetPassword from "./pages/ResetPassword.vue";

export const authRoutes = [
    {
        path: "/users/register",
        component: Register,
        name: "users.register",
        meta: { guestOnly: true },
    },
    {
        path: "/forgot-password",
        component: ResetRequest,
        name: "password.request",
        meta: { guestOnly: true },
    },
    {
        path: "/password-reset",
        component: ResetPassword,
        name: "password.reset",
        meta: { guestOnly: true },
    },
    {
        path: "/users/login",
        component: Login,
        name: "users.login",
        meta: { guestOnly: true },
    },
];
