<template>
    <span>
        <v-btn color="default" x-small :class="{ success: filter == 'All' }" @click="filterTodos('All')">All</v-btn>
        <v-btn color="default" x-small :class="{ success: filter == 'Active' }"  @click="filterTodos('Active')">Active</v-btn>
        <v-btn color="default" x-small :class="{ success: filter == 'Completed' }"  @click="filterTodos('Completed')">Compeleted</v-btn>
    </span>
</template>


<style>

</style>

<script>
export default {
    name: 'todo-filters',
    data() {
        return {
            filter: 'All'
        }
    },
    methods: {
        filterTodos(f) {
            this.filter = f;
            // eventBus = global window instance init @app.js
            eventBus.$emit('applyFilterTodosHandler', this.filter);
        }
    }
}
</script>