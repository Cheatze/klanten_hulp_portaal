<script setup lang="ts">
import { ref } from "vue";
import { http } from "../../../services/http/index.ts";
import FormError from "../../components/FormError.vue";

const email = ref("");
const statusMessage = ref("");
const loading = ref(false);

const submitResetRequest = async () => {
    loading.value = true;
    statusMessage.value = "";

    try {
        await http.get("/sanctum/csrf-cookie");
        const response = await http.post("/forgot-password", {
            email: email.value,
        });
        statusMessage.value = response.data.message;
    } catch (err: any) {
        // Errors handled by your error service / FormError
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
                Reset Password
            </h2>

            <div
                v-if="statusMessage"
                class="rounded bg-green-50 p-3 text-sm text-green-700"
            >
                {{ statusMessage }}
            </div>

            <form @submit.prevent="submitResetRequest" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700"
                        >Email address</label
                    >
                    <input
                        v-model="email"
                        type="email"
                        required
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    <FormError name="email" class="mt-1 text-xs text-red-600" />
                </div>

                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    {{ loading ? "Sending..." : "Send Password Reset Link" }}
                </button>
            </form>
        </div>
    </div>
</template>
