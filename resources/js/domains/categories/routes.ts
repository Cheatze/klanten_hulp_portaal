import Overview from "./pages/overview.vue";
import Edit from "./pages/edit.vue";
import Create from "./pages/create.vue";

export const categoryRoutes = [
    {
        path: "/categories",
        component: Overview,
        name: "categories.overview",
        meta: { requiresAdmin: true },
    },
    {
        path: "/categories/:id/edit",
        component: Edit,
        name: "categories.edit",
        meta: { requiresAdmin: true },
    },
    {
        path: "/categories/create",
        component: Create,
        name: "categories.create",
        meta: { requiresAdmin: true },
    },
];
