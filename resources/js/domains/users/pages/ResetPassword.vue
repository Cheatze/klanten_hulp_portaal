<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { http } from "../../../services/http/index.ts";
import FormError from "../../components/FormError.vue";

const route = useRoute();
const router = useRouter();

const email = ref(route.query.email || "");
const token = ref(route.query.token || "");
const password = ref("");
const passwordConfirmation = ref("");
const successMessage = ref("");
const loading = ref(false);

const handlePasswordReset = async () => {
    loading.value = true;
    successMessage.value = "";

    try {
        await http.get("/sanctum/csrf-cookie");
        const response = await http.post("/reset-password", {
            token: token.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirmation.value,
        });

        successMessage.value = response.data.message;
        setTimeout(() => router.push({ name: "users.login" }), 2000);
    } catch (err) {
        // Handled by error service
    } finally {
        loading.value = false;
    }
};
</script>
<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div
            class="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md"
        >
            <h2 class="text-center text-2xl font-bold text-gray-900">
                Create New Password
            </h2>

            <div
                v-if="successMessage"
                class="rounded bg-green-50 p-3 text-sm text-green-700"
            >
                {{ successMessage }} Redirecting to login...
            </div>

            <form @submit.prevent="handlePasswordReset" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700"
                        >New Password</label
                    >
                    <input
                        v-model="password"
                        type="password"
                        required
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    <FormError
                        name="password"
                        class="mt-1 text-xs text-red-600"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700"
                        >Confirm Password</label
                    >
                    <input
                        v-model="passwordConfirmation"
                        type="password"
                        required
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                    />
                </div>

                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    {{ loading ? "Resetting..." : "Reset Password" }}
                </button>
            </form>
        </div>
    </div>
</template>
