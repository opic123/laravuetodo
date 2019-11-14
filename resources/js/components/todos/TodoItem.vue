<template>
    <div>
        <v-list-item>
            <v-list-item-action>
                <v-checkbox v-model="completed" label="" @change="doneEdit"></v-checkbox>
            </v-list-item-action>
            
            <v-list-item-content>
                <v-list-item-title v-if="!editing" @dblclick="editTodo" :class="{ completed: completed }">{{title}}</v-list-item-title>
                <v-text-field v-model="title" label=""  required v-else="" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit"></v-text-field>
            </v-list-item-content>
            
            <v-list-item-action @click="removeTodo">
                <v-btn icon small color="red"> X </v-btn>
            </v-list-item-action>
        </v-list-item>
    </div>
    
</template>

<style>
    .completed{
        text-decoration: line-through;
        color: grey;
    }
</style>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true
        },
        isCheckAll: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            id: this.todo.id,
            title: this.todo.title,
            completed: this.todo.completed,
            editing: this.todo.editing,
            beforeEditCache: this.todo.title,
        }
    },
    watch: {
        isCheckAll() {
            this.completed = this.isCheckAll ? true : this.todo.completed;
        }
    },
    computed: {
        updatedTodo() {
            return {
                id: this.id,
                title: this.title,
                completed: this.completed,
                editing: this.editing,
            };
        }
    },
    methods: {
        cancelEdit(todo) {
            this.title = this.beforeEditCache;
            this.editing = false;
        },
        editTodo() {
            this.editing = true;
        },
        doneEdit() {
            this.editing = false;
            this.$store.dispatch('finishedEdit', this.updatedTodo);
        },
        removeTodo() {
            this.$store.dispatch('removeTodo', this.todo);
        }
    }
}
</script>