import { http } from "../../services/http";

export const readQueryString = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (Array.isArray(value) && typeof value[0] === "string") return value[0];
    return "";
};

// Reset password requests
export const requestPasswordReset = async (email: string): Promise<string> => {
    await http.get("/sanctum/csrf-cookie");
    const response = await http.post("/forgot-password", { email });
    return response.data.message;
};

export type ResetPasswordPayload = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type MessageResponse = { message: string };

export const resetPassword = async (
    payload: ResetPasswordPayload,
): Promise<string> => {
    await http.get("/sanctum/csrf-cookie");
    const response = await http.post<MessageResponse>(
        "/reset-password",
        payload,
    );
    return response.data.message;
};
