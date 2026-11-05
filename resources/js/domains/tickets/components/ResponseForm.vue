<script setup lang="ts">
import { ref } from "vue";
import { Response } from "../store";
import FormError from "../../components/FormError.vue";

//const responseText = ref("");

const props = defineProps<{
    response?: Response;
}>();

const emit = defineEmits(["submit"]);

const form = ref({ ...props.response });

const handleSubmit = () => {
    emit("submit", form.value);
};
</script>
<template>
    <form
        @submit.prevent="handleSubmit"
        class="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
        <div class="mb-4">
            <label
                for="response"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Response</label
            >
            <textarea
                id="response"
                v-model="form.content"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
            <FormError name="content" />
        </div>

        <button
            @click=""
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Submit Response
        </button>
    </form>
</template>
