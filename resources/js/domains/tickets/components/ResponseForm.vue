<script setup lang="ts">
import { ref, watch } from "vue";
import { Response } from "../store";
import FormError from "../../components/FormError.vue";

//const responseText = ref("");

// const props = defineProps<{
//     response?: Response;
// }>();

const props = defineProps<{
    response?: Omit<Response, "id" | "created_at" | "updated_at">;
    editingId?: number | null;
}>();

const emit = defineEmits(["submit", "cancel"]);

const form = ref({ ...props.response });

// Keep form in sync when parent swaps response content (e.g. start/stop editing)
watch(
    () => props.response,
    (next) => {
        form.value = { ...next };
    },
    { deep: true },
);

const handleSubmit = () => {
    emit("submit", form.value);
    if (!props.editingId) {
        form.value.content = ""; // Clear the response form after submission
    }
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
            >
                {{ editingId ? "Edit response" : "Response" }}
            </label>
            <textarea
                id="response"
                v-model="form.content"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
            <FormError name="content" />
        </div>

        <div class="flex gap-2">
            <button
                type="submit"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {{ editingId ? "Save changes" : "Submit" }}
            </button>

            <button
                v-if="editingId"
                type="button"
                @click="emit('cancel')"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Cancel edit
            </button>
        </div>
    </form>
</template>
