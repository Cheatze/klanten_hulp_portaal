import { createRouter, createWebHistory } from "vue-router";
import { ticketRoutes } from "../domains/tickets/routes";
import { userRoutes } from "../domains/users/routes";
import { useAuth } from "../composables/useAuth";

export const router = createRouter({
    history: createWebHistory(),
    routes: [...ticketRoutes, ...userRoutes],
});

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
    const { isFetched, fetchUser, isAuthenticated } = useAuth();

    // 1. If the app just loaded or was refreshed, verify auth state from Laravel session
    if (!isFetched.value) {
        await fetchUser();
    }

    // 2. Check if route requires authentication
    if (to.meta.requiresAuth && !isAuthenticated.value) {
        // Redirect to login if trying to access a protected page while logged out
        return { name: "users.login" };
    }
    // 3. Check if route is guest-only (like the login page)
    else if (to.meta.guestOnly && isAuthenticated.value) {
        // Redirect to overview if trying to access login while already logged in
        return { name: "tickets.overview" };
    }
    // // 4. Otherwise, allow navigation
    else {
        next();
    }
});

export default router;
