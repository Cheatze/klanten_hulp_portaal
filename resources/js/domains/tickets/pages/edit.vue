<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
    fetchById,
    getTicketById,
    updateTicket,
    Ticket,
} from "../store";
import TicketForm from "../components/TicketForm.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const ticketId = computed(() => Number(route.params.id));

//fetchById(ticketId);
const ticket = computed(() => getTicketById(ticketId.value).value);

watch(
    ticketId,
    (id) => {
        if (id) fetchById(id);
    },
    { immediate: true }
);

const handleSubmit = async (
    data: Omit<
        Ticket,
        "id" | "made_by" | "created_at" | "updated_at" | "assigned_to"
    >,
) => {
    //data.id = ticketId;
    await updateTicket(ticketId.value, data);
    router.push({ name: "tickets.overview" });
};
</script>
<template>
        <main class="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl">
            <div class="mb-8">
                <p
                    class="text-sm font-semibold uppercase tracking-wide text-blue-600"
                >
                    Revise
                </p>

                <h1
                    class="mt-2 text-3xl font-bold tracking-tight text-gray-900"
                >
                    Edit a ticket
                </h1>

                <p class="mt-2 text-sm text-gray-600">
                    Fill in the details below to edit this ticket.
                </p>
            </div>

            <TicketForm :ticket="ticket" @submit="handleSubmit" />
        </div>
    </main>
</template>