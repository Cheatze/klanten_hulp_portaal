<script setup lang="ts">
import { ref } from "vue";
import TicketForm from "../components/TicketForm.vue";
import { createTicket, Ticket } from "../store";
import { useRouter } from "vue-router";

const router = useRouter();

const ticket = ref<
    Omit<Ticket, "id" | "created_at" | "updated_at" | "made_by" | "assigned_to">
>({
    title: "",
    description: "",
    status: "open",
    category_id: 0,
});

const handleSubmit = async (
    data: Omit<
        Ticket,
        "id" | "made_by" | "created_at" | "updated_at" | "assigned_to"
    >,
) => {
    await createTicket(data);
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
                    Support
                </p>

                <h1
                    class="mt-2 text-3xl font-bold tracking-tight text-gray-900"
                >
                    Create a ticket
                </h1>

                <p class="mt-2 text-sm text-gray-600">
                    Fill in the details below to create a new ticket.
                </p>
            </div>

            <TicketForm :ticket="ticket" @submit="handleSubmit" />
        </div>
    </main>
</template>
