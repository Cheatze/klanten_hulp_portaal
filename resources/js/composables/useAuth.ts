import { ref, computed } from "vue";
import { http } from "../services/http";

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    is_admin: boolean;
};

type ResetPasswordPayload = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type MessageResponse = { message: string };

type RegisterCredentials = {
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    password: string;
    password_confirmation: string;
};

const user = ref<User | null>(null);
const isFetched = ref(false);

export function useAuth() {
    const readQueryString = (value: unknown): string => {
        if (typeof value === "string") return value;
        if (Array.isArray(value) && typeof value[0] === "string")
            return value[0];
        return "";
    };

    const fetchUser = async () => {
        try {
            const response = await http.get<User>("/user");
            user.value = response.data;
        } catch {
            user.value = null;
        } finally {
            isFetched.value = true;
        }
    };

    const requestPasswordReset = async (email: string): Promise<string> => {
        await http.get("/sanctum/csrf-cookie");
        const response = await http.post<MessageResponse>("/forgot-password", {
            email,
        });
        return response.data.message;
    };

    const resetPassword = async (
        payload: ResetPasswordPayload,
    ): Promise<string> => {
        await http.get("/sanctum/csrf-cookie");
        const response = await http.post<MessageResponse>(
            "/reset-password",
            payload,
        );
        return response.data.message;
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

    const register = async (
        credentials: RegisterCredentials,
    ): Promise<void> => {
        await http.get("/sanctum/csrf-cookie");
        await http.post("/register", credentials);
        await fetchUser(); // Immediately sync user state
    };

    const isAuthenticated = computed<boolean>(() => user.value !== null);

    const isAdmin = computed<boolean>(() => user.value?.is_admin ?? false);

    return {
        readQueryString,
        user,
        requestPasswordReset,
        resetPassword,
        isFetched,
        fetchUser,
        login,
        logout,
        register,
        isAuthenticated,
        isAdmin,
    };
}
