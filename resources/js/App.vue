<script setup lang="ts">
// import { R } from "vue-router/dist/index-D7ja2BKs.js";
import { onMounted } from "vue";
import { useAuth } from "./composables/useAuth";
const { isAuthenticated, user, logout, fetchUser } = useAuth();

onMounted(async () => {
    await fetchUser();
});
</script>
<template>
    <h1 class="text-2xl font-bold mb-4">Customer Support Portal</h1>
    <!-- <nav>
        <router-link :to="{ name: 'tickets.overview' }"
            ><p>Tickets Overzicht</p></router-link
        >
        |
        <router-link :to="{ name: 'tickets.create' }"
            ><p>Nieuw Ticket</p></router-link
        >
        <router-link :to="{ name: 'users.login' }"><p>Login</p></router-link>
    </nav> -->
    <nav class="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <div class="flex space-x-4">
            <!-- <router-link to="/" class="text-gray-700 hover:text-indigo-600"
                >Home</router-link
            > -->
            <!-- Protected link visible only when logged in -->
            <!-- <router-link v-if="isAuthenticated" to="/dashboard" class="text-gray-700 hover:text-indigo-600">Dashboard</router-link> -->
            <template v-if="isAuthenticated">
                <router-link
                    :to="{ name: 'tickets.overview' }"
                    class="text-gray-700 hover:text-indigo-600"
                    >Tickets overview</router-link
                >
                <router-link
                    :to="{ name: 'tickets.create' }"
                    class="text-gray-700 hover:text-indigo-600"
                    >Create Ticket</router-link
                >
            </template>
        </div>

        <div class="flex items-center space-x-4">
            <template v-if="!isAuthenticated">
                <router-link
                    :to="{ name: 'users.login' }"
                    class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >Login</router-link
                >
            </template>
            <template v-else>
                <span class="text-sm text-gray-600"
                    >Hello, {{ user?.first_name }}</span
                >
                <button
                    @click="logout"
                    class="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                    Logout
                </button>
            </template>
        </div>
    </nav>
    <router-view />
</template>
<style scoped>
p {
    display: inline-block;
    margin: 0 10px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
}
</style>
