import Overview from "./pages/overview.vue";
import Create from "./pages/create.vue";
import Details from "./pages/details.vue";
import Edit from "./pages/edit.vue";

export const ticketRoutes = [
    {
        path: "/tickets",
        component: Overview,
        name: "tickets.overview",
        meta: { requiresAuth: true },
    },
    {
        path: "/tickets/create",
        component: Create,
        name: "tickets.create",
        meta: { requiresAuth: true },
    },
    {
        path: "/tickets/:id",
        component: Details,
        name: "tickets.details",
        meta: { requiresAuth: true },
    },
    {
        path: "/tickets/:id/edit", // Updated path to match the API route for editing tickets
        component: Edit,
        name: "tickets.edit",
        meta: { requiresAuth: true },
    },
];
