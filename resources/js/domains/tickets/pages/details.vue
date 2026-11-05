<script setup lang="ts">
import { ref, computed } from "vue";
import { fetchCategories, getCategoryById } from "../../categories/store";
import {
    fetchById,
    getTicketById,
    patchTicket,
    formatDate,
    fetchResponses,
    getAllResponses,
    createResponse,
} from "../store";
import { fetchUsers, getUserById, getAllUsers } from "../../users/store";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "../../../composables/useAuth";
import ResponseForm from "../components/ResponseForm.vue";

const route = useRoute();
const router = useRouter();
const ticketId = Number(route.params.id);
const { user } = useAuth();

fetchById(ticketId);
fetchResponses();
fetchUsers();
fetchCategories();

const responses = computed(() =>
    getAllResponses.value.filter((r) => r.ticket_id === ticketId),
);

let ticket = getTicketById(ticketId);

// Assign form state
const showAssignForm = ref(false);
const selectedAdminId = ref<number | null>(null);
const isSubmitting = ref(false);

//Change status form state
const showChangeStatusForm = ref(false);
const selectedStatus = ref<"open" | "closed" | "pending" | null>(null);
const isStatusSubmitting = ref(false);

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
    await fetchById(ticketId);
    ticket = getTicketById(ticketId);
};

const handleChangeStatus = async () => {
    if (!selectedStatus.value) return;

    isStatusSubmitting.value = true;
    try {
        await patchTicket(ticketId, { status: selectedStatus.value });
        showChangeStatusForm.value = false;
        selectedStatus.value = null;
    } finally {
        isStatusSubmitting.value = false;
    }
    await fetchById(ticketId);
    ticket = getTicketById(ticketId);
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
                            <button
                                @click="showChangeStatusForm = true"
                                class="ml-4 rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                                Change Status
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
                <div
                    v-if="showChangeStatusForm && user?.is_admin"
                    class="border-b border-gray-200 bg-gray-50 px-6 py-4 sm:px-8"
                >
                    <form
                        @submit.prevent="handleChangeStatus"
                        class="flex flex-col gap-3 sm:flex-row sm:items-end"
                    >
                        <div class="flex-1">
                            <label
                                for="ChangeStatus"
                                class="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Change Status
                            </label>
                            <select
                                id="ChangeStatus"
                                v-model="selectedStatus"
                                required
                                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="null" disabled>
                                    Select a status
                                </option>
                                <option value="open">Open</option>
                                <option value="pending">Pending</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        <div class="flex gap-2">
                            <button
                                type="submit"
                                :disabled="
                                    isStatusSubmitting || !selectedStatus
                                "
                                class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {{ isStatusSubmitting ? "Saving…" : "Save" }}
                            </button>
                            <button
                                type="button"
                                @click="showChangeStatusForm = false"
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
            <div class="mt-8">
                <h2 class="text-lg font-semibold text-gray-900">Responses</h2>
                <div v-if="responses.length > 0" class="mt-4 space-y-4">
                    <div
                        v-for="response in responses"
                        :key="response.id"
                        class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                        <p class="text-sm text-gray-500">
                            {{ formatDate(response.created_at) }} by
                            {{
                                getUserById(response.user_id)?.value.first_name
                            }}
                            {{ getUserById(response.user_id)?.value.last_name }}
                        </p>
                        <p class="mt-2 text-sm leading-7 text-gray-700">
                            {{ response.content }}
                        </p>
                    </div>
                </div>
                <p v-else class="mt-4 text-sm text-gray-500">
                    No responses yet.
                </p>
            </div>
        </div>
    </main>
</template>
