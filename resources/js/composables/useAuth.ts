import { ref, computed } from "vue";
import { http } from "../services/http";

const user = ref<any>(null);
const isFetched = ref(false);

export function useAuth() {
    const fetchUser = async () => {
        try {
            const response = await http.get("/user");
            user.value = response.data;
        } catch {
            user.value = null;
        } finally {
            isFetched.value = true;
        }
    };

    const login = async (credentials: { email: string; password: string }) => {
        // 1. Request CSRF cookie first
        await http.get("/sanctum/csrf-cookie");

        // 2. Post login credentials
        await http.post("user/login", credentials);

        // 3. Immediately fetch user data so Vue's state updates instantly
        await fetchUser();
    };

    const logout = async () => {
        try {
            await http.post("/logout");
            user.value = null;
            window.location.href = "users/login"; // Redirect cleanly after session destruction
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const register = async (credentials: any) => {
        await http.get("/sanctum/csrf-cookie");
        await http.post("/register", credentials);
        await fetchUser(); // Immediately sync user state
    };

    const isAuthenticated = computed(() => !!user.value);

    return {
        user,
        isFetched,
        fetchUser,
        login,
        logout,
        register,
        isAuthenticated,
    };
}
