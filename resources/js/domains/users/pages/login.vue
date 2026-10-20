<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { http } from "../../../services/http";
import { useAuth } from "../../../composables/useAuth";
import ErrorMessage from "../../components/ErrorMessage.vue";
import FormError from "../../components/FormError.vue";

const router = useRouter();
const { login } = useAuth();

const email = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
    loading.value = true;

    try {
        await http.get("/sanctum/csrf-cookie");

        await login({
            email: email.value,
            password: password.value,
        });

        //window.location.reload();
        router.push({ name: "tickets.overview" });
    } catch (err) {
        // Handle login error
    } finally {
        loading.value = false;
    }
};
</script>
<template>
    <div
        class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12"
    >
        <div
            class="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md"
        >
            <div>
                <h2 class="text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <!-- Global Error Banner Component[cite: 2] -->
            <ErrorMessage
                class="rounded-md bg-red-50 p-4 text-sm text-red-700"
            />

            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                <div class="space-y-4 rounded-md shadow-sm">
                    <div>
                        <label
                            for="email-address"
                            class="block text-sm font-medium text-gray-700"
                            >Email address</label
                        >
                        <input
                            id="email-address"
                            v-model="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                        <!-- Field-Specific Error Component[cite: 3] -->
                        <FormError
                            name="email"
                            class="mt-1 text-xs text-red-600"
                        />
                    </div>

                    <div>
                        <label
                            for="password"
                            class="block text-sm font-medium text-gray-700"
                            >Password</label
                        >
                        <input
                            id="password"
                            v-model="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                        <!-- Field-Specific Error Component[cite: 3] -->
                        <FormError
                            name="password"
                            class="mt-1 text-xs text-red-600"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        :disabled="loading"
                        class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        <span v-if="loading">Signing in...</span>
                        <span v-else>Sign in</span>
                    </button>
                </div>
                <div class="text-sm text-center">
                    <router-link
                        :to="{ name: 'password.request' }"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                        >Forgot your password?</router-link
                    >
                </div>
            </form>
        </div>
    </div>
</template>
