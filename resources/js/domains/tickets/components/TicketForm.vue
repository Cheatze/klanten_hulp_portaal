<script setup lang="ts"></script>

<template>
    <form>
        <div>
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="ticket.title" />
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea id="description" v-model="ticket.description"></textarea>
        </div>
        <div>
            <label for="status">Status:</label>
            <select id="status" v-model="ticket.status">
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
            </select>
        </div>
    </form>
</template>
