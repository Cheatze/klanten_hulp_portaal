import Overview from "./pages/overview.vue";

export const categoryRoutes = [
    {
        path: "/categories",
        component: Overview,
        name: "categories.overview",
        meta: { requiresAuth: true },
    },
];
