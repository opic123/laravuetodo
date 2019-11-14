<template>
    <span>
        <v-text-field v-model="newTodo" label="What needs to be done?" required @keyup.enter="addTodo"></v-text-field>
    </span>
    
</template>

<script>
export default {
    name: 'todo-add-item',
    computed: {
        newTodo: {
            get() {
                return this.$store.state.newTodo;
            },
            set(newTodo){
                this.$store.commit('setNewTodo', newTodo);
            }
        }
    },
    methods: {
        addTodo() {
            this.$store.dispatch('addTodo', this.newTodo)
        }
    }
}
</script>