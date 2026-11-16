<script setup lang="ts">
import { useRouter } from "vue-router";
import CategoryForm from "../components/CategoryForm.vue";
import { ref } from "vue";
import { createCategory, Category } from "../store";

const category = ref<Omit<Category, "id" | "created_at" | "updated_at">>({
    name: "",
});

const router = useRouter();

const handleSubmit = async (
    data: Omit<Category, "id" | "created_at" | "updated_at">,
) => {
    await createCategory(data);
    router.push({ name: "categories.overview" });
};
</script>
<template>
    <h1>Create Category</h1>
    <CategoryForm :category="category" @submit="handleSubmit" />
</template>
