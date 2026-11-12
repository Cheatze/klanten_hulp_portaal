<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { fetchUsers, getUserById, updateUser, User } from "../store";
import UserForm from "../components/UserForm.vue";

fetchUsers();
const router = useRouter();
const route = useRoute();
const userId = computed(() => Number(route.params.id));
let user = computed(() => getUserById(userId.value).value);

watch(
    userId,
    (id) => {
        if (id) fetchUsers();
    },
    { immediate: true },
);

const handleSubmit = async (
    data: Omit<User, "id" | "created_at" | "updated_at">,
) => {
    // if (data.is_admin === true) {
    //     alert("User will be set as admin.");
    // }
    await updateUser(userId.value, data);
    router.push({ name: "users.overview" });
    //fetchUsers(); // Refresh the user list after updating
};
</script>
<template>
    <h1 class="text-2xl max-w-2xl mx-auto font-bold mb-4">Edit User Details</h1>
    <div v-if="user">
        <UserForm :user="user" @submit="handleSubmit" />
    </div>
    <div v-else>
        <p>User not found.</p>
    </div>
</template>
