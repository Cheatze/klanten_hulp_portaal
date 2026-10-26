<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { http } from "../../../services/http";
import FormError from "../../components/FormError.vue";
import { useAuth } from "../../../composables/useAuth";

const router = useRouter();

interface RegisterForm {
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    password: string;
    password_confirmation: string;
}

const form = ref<RegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    telephone: "",
    password: "",
    password_confirmation: "",
});

const loading = ref(false);

const { register } = useAuth();

const handleRegister = async () => {
    loading.value = true;

    try {
        // await http.get("/sanctum/csrf-cookie");
        // await http.post("/register", form.value);
        await register(form.value); // Use the register function from useAuth

        // Redirect to overview after successful registration
        router.push({ name: "tickets.overview" });
    } catch (err) {
        // Handled globally by your error service/components
    } finally {
        loading.value = false;
    }
};
</script>
<template>
    <h1 class="text-2xl font-bold mb-4">User Registration</h1>
    <div
        class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12"
    >
        <div
            class="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md"
        >
            <h2 class="text-center text-3xl font-extrabold text-gray-900">
                Create an account
            </h2>

            <form class="mt-8 space-y-4" @submit.prevent="handleRegister">
                <div>
                    <label class="block text-sm font-medium text-gray-700"
                        >First Name</label
                    >
                    <input
                        v-model="form.first_name"
                        type="text"
                        required
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    <FormError
                        name="first_name"
                        class="mt-1 text-xs text-red-600"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700"
                        >Last Name</label
                    >
                    <input
                        v-model="form.last_name"
                        type="text"
                        required
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    <FormError
                        name="last_name"
                        class="mt-1 text-xs text-red-600"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700"
                        >Email Address</label
                    >
                    <input
                        v-model="form.email"
                        type="email"
                        required
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    <FormError name="email" class="mt-1 text-xs text-red-600" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700"
                        >Telephone</label
                    >
                    <input
                        v-model="form.telephone"
                        type="tel"
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                    />
                    <FormError
                        name="telephone"
                        class="mt-1 text-xs text-red-600"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700"
                        >Password</label
                    >
                    <input
                        v-model="form.password"
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
                        v-model="form.password_confirmation"
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
                    {{ loading ? "Registering..." : "Register" }}
                </button>
            </form>
        </div>
    </div>
</template>
