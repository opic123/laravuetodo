<template>
    <transition name="fade">
        <v-btn v-if="showClearCompleted" color="red" x-small text @click="clearCompleted">Clear Completed</v-btn>
    </transition>
</template>

<script>
export default {
    name: 'todo-clear-completed',
    props: {
        showClearCompleted: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        clearCompleted() {
            // eventBus = global window instance init @app.js
            eventBus.$emit('clearCompletedTodosHandler');
        }
    }
}
</script>