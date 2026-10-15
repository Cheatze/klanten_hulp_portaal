<script setup lang="ts">
// import { R } from "vue-router/dist/index-D7ja2BKs.js";
</script>
<template>
    <h1 class="text-2xl font-bold mb-4">Customer Support Portal</h1>
    <nav>
        <router-link :to="{ name: 'tickets.overview' }"
            ><p>Tickets Overzicht</p></router-link
        >
        |
        <router-link :to="{ name: 'tickets.create' }"
            ><p>Nieuw Ticket</p></router-link
        >
        <router-link :to="{ name: 'users.login' }"><p>Login</p></router-link>
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
