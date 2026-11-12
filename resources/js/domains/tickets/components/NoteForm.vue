<script setup lang="ts">
import { ref, watch } from "vue";
import { Note } from "../store";

const props = defineProps<{
    response?: Omit<
        Note,
        "id" | "created_at" | "updated_at" | "ticket_id" | "user_id"
    >;
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
                for="note"
                class="block text-sm font-medium text-gray-700 mb-1"
            >
                {{ editingId ? "Edit note" : "Note" }}
            </label>
            <textarea
                id="note"
                v-model="form.content"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
        </div>

        <div class="flex gap-2">
            <button
                type="submit"
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {{ editingId ? "Update" : "Create" }}
            </button>
            <button
                type="button"
                @click="$emit('cancel')"
                class="inline-flex items-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Cancel
            </button>
        </div>
    </form>
</template>
