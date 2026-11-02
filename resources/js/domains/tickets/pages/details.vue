<script setup lang="ts">
import { ref, computed } from "vue";
import { fetchCategories, getCategoryById } from "../../categories/store";
import { fetchById, getTicketById, patchTicket, formatDate } from "../store";
import { fetchUsers, getUserById, getAllUsers } from "../../users/store";
import { useRoute } from "vue-router";
import { useAuth } from "../../../composables/useAuth";

const route = useRoute();
const ticketId = Number(route.params.id);
const { user } = useAuth();

fetchById(ticketId);
fetchUsers();
fetchCategories();

const ticket = getTicketById(ticketId);

// Assign form state
const showAssignForm = ref(false);
const selectedAdminId = ref<number | null>(null);
const isSubmitting = ref(false);

const admins = computed(() => getAllUsers.value.filter((u) => u.is_admin));

const assignTicket = async () => {
    if (!selectedAdminId.value) return;

    isSubmitting.value = true;
    try {
        await patchTicket(ticketId, { assigned_to: selectedAdminId.value });
        showAssignForm.value = false;
        selectedAdminId.value = null;
    } finally {
        isSubmitting.value = false;
    }
};
</script>
<template>
    <main class="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl">
            <header class="mb-8">
                <p
                    class="text-sm font-semibold uppercase tracking-wide text-blue-600"
                >
                    Support
                </p>

                <h1
                    class="mt-2 text-3xl font-bold tracking-tight text-gray-900"
                >
                    Ticket details
                </h1>

                <p class="mt-2 text-sm text-gray-500">
                    View the ticket information and assignment.
                </p>
            </header>
            <div
                v-if="ticket"
                class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
                <div class="border-b border-gray-200 px-6 py-5 sm:px-8">
                    <div
                        class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
                    >
                        <div>
                            <p class="text-sm text-gray-500">
                                Ticket #{{ ticket.id }}
                            </p>

                            <h2
                                class="mt-1 text-xl font-semibold text-gray-900"
                            >
                                {{ ticket.title }}
                            </h2>
                        </div>

                        <span
                            class="inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium capitalize"
                            :class="{
                                'bg-green-100 text-green-800':
                                    ticket.status === 'open',
                                'bg-yellow-100 text-yellow-800':
                                    ticket.status === 'pending',
                                'bg-gray-100 text-gray-700':
                                    ticket.status === 'closed',
                            }"
                        >
                            {{ ticket.status }}
                        </span>
                        <template v-if="user?.is_admin">
                            <button
                                v-if="!showAssignForm"
                                @click="showAssignForm = true"
                                class="ml-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Assign Ticket
                            </button>
                        </template>
                    </div>
                </div>

                <div
                    v-if="showAssignForm && user?.is_admin"
                    class="border-b border-gray-200 bg-gray-50 px-6 py-4 sm:px-8"
                >
                    <form
                        @submit.prevent="assignTicket"
                        class="flex flex-col gap-3 sm:flex-row sm:items-end"
                    >
                        <div class="flex-1">
                            <label
                                for="assign_to"
                                class="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Assign to admin
                            </label>
                            <select
                                id="assign_to"
                                v-model="selectedAdminId"
                                required
                                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            >
                                <option :value="null" disabled>
                                    Select an admin
                                </option>
                                <option
                                    v-for="admin in admins"
                                    :key="admin.id"
                                    :value="admin.id"
                                >
                                    {{ admin.first_name }} {{ admin.last_name }}
                                </option>
                            </select>
                        </div>

                        <div class="flex gap-2">
                            <button
                                type="submit"
                                :disabled="isSubmitting || !selectedAdminId"
                                class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {{ isSubmitting ? "Saving…" : "Save" }}
                            </button>
                            <button
                                type="button"
                                @click="showAssignForm = false"
                                class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                <div class="space-y-8 px-6 py-6 sm:px-8">
                    <section>
                        <h3
                            class="text-sm font-semibold uppercase tracking-wide text-gray-500"
                        >
                            Description
                        </h3>

                        <p
                            class="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-gray-700"
                        >
                            {{ ticket.description }}
                        </p>
                    </section>

                    <section>
                        <h3
                            class="text-sm font-semibold uppercase tracking-wide text-gray-500"
                        >
                            Ticket information
                        </h3>

                        <dl
                            class="mt-4 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2"
                        >
                            <div>
                                <dt class="text-sm text-gray-500">
                                    Created by
                                </dt>
                                <dd class="mt-1 font-medium text-gray-900">
                                    {{
                                        getUserById(ticket.made_by)?.value
                                            .first_name
                                    }}
                                    {{
                                        getUserById(ticket.made_by)?.value
                                            .last_name
                                    }}
                                </dd>
                            </div>

                            <div v-if="ticket.assigned_to">
                                <dt class="text-sm text-gray-500">
                                    Assigned to
                                </dt>
                                <dd class="mt-1 font-medium text-gray-900">
                                    {{
                                        getUserById(ticket.assigned_to).value
                                            .first_name
                                    }}
                                    {{
                                        getUserById(ticket.assigned_to)?.value
                                            .last_name
                                    }}
                                </dd>
                            </div>

                            <div>
                                <dt class="text-sm text-gray-500">Category</dt>
                                <dd class="mt-1 font-medium text-gray-900">
                                    {{
                                        getCategoryById(ticket.category_id)
                                            ?.value.name
                                    }}
                                </dd>
                            </div>

                            <div>
                                <dt class="text-sm text-gray-500">
                                    Created at
                                </dt>
                                <dd class="mt-1 font-medium text-gray-900">
                                    {{ formatDate(ticket.created_at) }}
                                </dd>
                            </div>
                        </dl>
                    </section>
                </div>
            </div>

            <div
                v-else
                class="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm"
            >
                <h2 class="text-lg font-semibold text-gray-900">
                    Ticket not found
                </h2>
                <p class="mt-2 text-sm text-gray-500">
                    This ticket may no longer exist or may be unavailable.
                </p>
            </div>
        </div>
    </main>
</template>
