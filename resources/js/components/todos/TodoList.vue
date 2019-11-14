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

                                            <todo-item v-for="todo in todosFiltered" 
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

// The mapGetters helper simply maps store getters to local computed properties:
import { mapGetters } from 'vuex'

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
            
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        // If you want to map a getter to a different name, use an object: todos: 'todosFiltered'
        ...mapGetters([
            'todosFiltered',
            'remainingTodos',
            'showClearCompleted',
            'isCheckAll'
        ])
        // access getters manually
        /*
        remainingTodos() {
            return this.$store.getters.remainingTodos;
        }*/
    },
    methods: {
        addTodo(newTodo) {
            this.$store.dispatch('addTodo', newTodo);
        },
        removeTodo(todo) {
            this.$store.dispatch('removeTodo', todo);
        },
        checkAllTodos(checked) {
            this.$store.dispatch('checkAllTodos', checked);
        },
        clearCompleted() {
            this.$store.dispatch('clearCompleted');
        },
        finishedEdit(todo) {
            this.$store.dispatch('finishedEdit', todo);
        }
        // commit mutation manullay
        /*addTodo(newTodo) {
            this.$store.commit('addTodo', newTodo);
        },*/
    },
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    }
}
</script>