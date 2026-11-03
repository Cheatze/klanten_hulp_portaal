<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
    fetchCategories,
    Category,
    getCategoryById,
    patchCategory,
} from "../store";
import CategoryForm from "../components/CategoryForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const categoryId = computed(() => Number(route.params.id));

fetchCategories();
const category = computed(() => getCategoryById(categoryId.value).value);

const handleSubmit = async (data: Omit<Category, "id">) => {
    //data.id = categoryId;
    await patchCategory(categoryId.value, data);
    router.push({ name: "categories.overview" });
};
</script>
<template>
    <h1 class="text-2xl font-bold mb-4">Edit Category</h1>
    <CategoryForm v-if="category" :category="category" @submit="handleSubmit" />
</template>
