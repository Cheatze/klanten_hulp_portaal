<script setup lang="ts"></script>
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
                    Create a category
                </h1>

                <p class="mt-2 text-sm text-gray-600">
                    Fill in the details below to create a new category.
                </p>
            </div>

            <form
                @submit.prevent="$emit('submit')"
                class="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
                <div>
                    <label
                        for="name"
                        class="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>

                    <input
                        id="name"
                        v-model="$emit('update:name', $event.target.value)"
                        type="text"
                        required
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Enter a category name"
                    />
                </div>

                <button
                    type="submit"
                    class="w-full rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                    Create Category
                </button>
            </form>
        </div>
    </main>
</template>
