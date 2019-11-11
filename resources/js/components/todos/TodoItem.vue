<template>
    <div>
        <v-list-item :key="index" style="cursor:pointer;">

            <v-list-item-action>
                <v-checkbox v-model="completed" label="" @change="doneEdit"></v-checkbox>
            </v-list-item-action>
            
            <v-list-item-content>
                <v-list-item-title v-if="!editing" @dblclick="editTodo" :class="{ completed: completed }">{{title}}</v-list-item-title>
                <v-text-field v-model="title" v-focus label="" required v-else="" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit"></v-text-field>
            </v-list-item-content>
            
            <v-list-item-action @click="removeTodo">
                <v-btn icon small color="red"> x </v-btn>
            </v-list-item-action>
        </v-list-item>
    </div>
   
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        checkAll: {
            type: Boolean,
            required: true
        }
    },
    directives: {
      focus: {
        // directive definition
        inserted: function (el) {
          el.focus()
        }
      }
    },
    watch: {
        checkAll() {
            this.completed = this.checkAll ? true : this.todo.completed;
        }
    },
    data() {
        return {
            'id': this.todo.id,
            'title': this.todo.title,
            'completed': this.todo.completed,
            'editing': this.todo.editing,
            'beforeEditCache': ''
        }
    },
    methods: {
        removeTodo() {
            this.$emit('removedTodoHandler', this.index);
        },
        editTodo(todo) {
            this.beforeEditCache = this.title;
            this.editing = true;
        },
        cancelEdit(todo) {
            this.title = this.beforeEditCache;
            this.editing = false;
        },
        doneEdit(todo) {
            if (this.title.trim().length == 0) {
                return;
            }
            this.editing = false;
            this.$emit('finishedEditHandler', {
                'index': this.index,
                'todo': {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing
                }
            });
        },
    }
}
</script>