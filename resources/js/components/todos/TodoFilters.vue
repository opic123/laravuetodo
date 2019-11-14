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
            
        }
    },
    computed: {
        filter() {
           return this.$store.state.filter;
        }
    },
    methods: {
        filterTodos(filter) {
            this.$store.dispatch('setFilter', filter);
        }
    }
}
</script>