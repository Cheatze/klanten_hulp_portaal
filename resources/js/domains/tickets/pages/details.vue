<script setup lang="ts">
import {
    fetchById,
    getTicketById,
    fetchCategories,
    getCategoryById,
} from "../store";
import { fetchUsers, getUserById } from "../../users/store";
import { useRoute } from "vue-router";
const route = useRoute();
const ticketId = Number(route.params.id);
fetchById(ticketId);
fetchUsers();
fetchCategories();
const ticket = getTicketById(ticketId);
</script>
<!-- <template>
    <h2 class="text-2xl font-bold mb-4">Ticket Details</h2>
    <div v-if="ticket">
        <h1><strong>Title:</strong> {{ ticket.title }}</h1>
        <p><strong>Description:</strong> {{ ticket.description }}</p>
        <p><strong>Status:</strong> {{ ticket.status }}</p>
        <p>
            <strong>Created by:</strong>
            {{ getUserById(ticket.made_by).value?.first_name }}
            {{ getUserById(ticket.made_by).value?.last_name }}
        </p>
        <p v-if="ticket.assigned_to">
            <strong>Assigned to:</strong>
            {{ getUserById(ticket.assigned_to).value?.first_name }}
            {{ getUserById(ticket.assigned_to).value?.last_name }}
        </p>
        <p>
            <strong>Category:</strong>
            {{ getCategoryById(ticket.category_id).value?.name }}
        </p>
    </div>
</template>
<style scoped>
div {
    margin-bottom: 1rem;
    margin-left: 1rem;
}
p {
    margin: 0.5rem 0;
}
</style> -->
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
                    </div>
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
                                        getUserById(ticket.assigned_to)?.value
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
                                    {{ ticket.created_at }}
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
