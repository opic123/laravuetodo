<template>
    <div>
        <v-content>
            <v-container fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">

                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>TODO - Laravel + Vuejs + Vuetify</v-toolbar-title>
                                <v-spacer />
                            </v-toolbar>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" md="12">
                                        
                                        <todo-add-item></todo-add-item>

                                        <transition-group name="fade">

                                            <!--<todo-item v-for="(todo, index) in todosFiltered" 
                                                :key="todo.id" :index="index" :todo="todo" :checkAll="checkAll"
                                                @finishedEditHandler="finishedEdit" @removedTodoHandler="removeTodo"
                                                style="cursor:pointer;"> 
                                            </todo-item>-->

                                            <todo-item v-for="(todo) in todosFiltered" 
                                                :key="todo.id" :todo="todo" :isCheckAll="isCheckAll"
                                                style="cursor:pointer;"> 
                                            </todo-item>

                                        </transition-group>

                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-bottom-navigation>

                                    <todo-check-all :isCheckAll="isCheckAll"></todo-check-all>

                                    <v-spacer />

                                    <todo-items-left :remainingTodos="remainingTodos"></todo-items-left>

                                </v-bottom-navigation>
                            </v-card-actions>

                            <v-card-actions>

                                <todo-filters></todo-filters>

                                <v-spacer />
                                
                                <todo-clear-completed :showClearCompleted="showClearCompleted"></todo-clear-completed>
                                
                            </v-card-actions>

                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

<script>

import TodoItem from './TodoItem';
import TodoItemsLeft from './TodoItemsLeft';
import TodoCheckAll from './TodoCheckAll';
import TodoClearCompleted from './TodoClearCompleted';
import TodoFilters from './TodoFilters';
import TodoAddItem from './TodoAddItem';

export default {
    name: 'todo-list',
    props: {
      source: String,
    },
    components: {
        'todo-add-item': TodoAddItem,
        'todo-item': TodoItem,
        'todo-items-left': TodoItemsLeft,
        'todo-check-all': TodoCheckAll,
        'todo-clear-completed': TodoClearCompleted,
        'todo-filters': TodoFilters
    },
    data() {
        return {
            idForTodo: 3,
            beforeEditCache: '',
            filter: 'All',
            todos: [
                {
                    'id' : 1,
                    'title' : 'Finish Vue Screencast',
                    'completed' : false,
                    'editing' : false
                },
                {
                    'id' : 2,
                    'title' : 'Take Over the world!',
                    'completed' : false,
                    'editing' : false
                },
            ]
        }
    },
    computed: {
        todosFiltered() {
            if ( this.filter == 'All' ) {
                return this.todos;
            } else if ( this.filter == 'Active' ) {
                return this.todos.filter( todo => !todo.completed );
            } else if ( this.filter == 'Completed' ) {
                return this.todos.filter( todo => todo.completed );
            }
            return this.todos;
        },
        remainingTodos() {
            let count = this.todos.filter( todo => !todo.completed ).length;
            return count;
        },
        showClearCompleted() {
            return this.todos.filter( todo => todo.completed ).length > 0;
        },
        isCheckAll() {
           let count = this.todos.filter( todo => !todo.completed ).length;
           return count == 0 ? true : false;
        }
    },
    methods: {
        addTodo(newTodo) {
            if ( newTodo.trim().length == 0 ) {
                return;
            }
            this.todos.push({
                'id' : this.idForTodo++,
                'title' : newTodo,
                'completed' : false,
                'editing' : false
            });
            this.newTodo = '';
        },
        removeTodo(todo) {
            this.todos = this.todos.filter((t) => t.id != todo.id);
        },
        checkAllTodos(checked) {
            this.todos.map( todo => todo.completed = checked);
        },
        clearCompleted() {
            this.todos = this.todos.filter( todo => !todo.completed );
        },
        finishedEdit(todo) {
            let index = this.todos.findIndex((t) => t.id == todo.id);
            this.todos.splice(index, 1, todo);
            // this will not work for computed properties
            // this.todos[index] = todo;
        }
    },
    created() {
        // eventBus = global window instance init @app.js
        eventBus.$on('addNewTodoHandler', (newTodo) => this.addTodo(newTodo) );
        eventBus.$on('removedTodoHandler', (todo) => this.removeTodo(todo) );
        eventBus.$on('finishedEditHandler', (todo) => this.finishedEdit(todo) );
        eventBus.$on('checkAllTodosHandler', (checked) => this.checkAllTodos(checked) );
        eventBus.$on('clearCompletedTodosHandler', () => this.clearCompleted() );
        eventBus.$on('applyFilterTodosHandler', (f) => this.filter = f );
    },
    mounted() {

    },
    beforeDestroy() {
        // eventBus = global window instance init @app.js
        eventBus.$off('addNewTodoHandler', (newTodo) => this.addTodo(newTodo) );
        eventBus.$off('removedTodoHandler', (todo) => this.removeTodo(todo) );
        eventBus.$off('finishedEditHandler', (todo) => this.finishedEdit(todo) );
        eventBus.$off('checkAllTodosHandler', (checked) => this.checkAllTodos(checked) );
        eventBus.$off('clearCompletedTodosHandler', () => this.clearCompleted() );
        eventBus.$off('applyFilterTodosHandler', (f) => this.filter = f );
    }
}
</script>