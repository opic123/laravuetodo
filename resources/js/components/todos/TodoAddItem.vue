<template>
    <span>
        <v-text-field v-model="newTodo" label="What needs to be done?" required @keyup.enter="addTodo"></v-text-field>
    </span>
    
</template>

<script>
export default {
    name: 'todo-add-item',
    data() {
        return {
            newTodo: ''
        }
    },
    methods: {
        addTodo() {
            // eventBus = global window instance init @app.js
            eventBus.$emit('addNewTodoHandler', this.newTodo );
            this.newTodo = '';
        }
    }
}
</script>