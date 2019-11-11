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
                                        
                                        <v-text-field v-model="newTodo" label="What needs to be done?" required @keyup.enter="addTodo"></v-text-field>

                                        <transition-group name="fade">

                                            <todo-item v-for="(todo, index) in todosFiltered" 
                                                :key="todo.id" :index="index" :todo="todo" :checkAll="checkAll"
                                                @finishedEditHandler="finishedEdit" @removedTodoHandler="removeTodo"
                                                style="cursor:pointer;"> 
                                            </todo-item>

                                        </transition-group>

                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-bottom-navigation>
                                    <v-btn value="checkAll">
                                        <v-checkbox v-model="checkAll" @change="checkAllTodos"
                                        label="Check All"
                                        ></v-checkbox>
                                    </v-btn>

                                    <v-spacer />

                                    <v-btn value="remaining">
                                        <v-chip pill>
                                        <v-avatar
                                            left
                                            color="green"
                                        >
                                            {{ remainingTodos }}
                                        </v-avatar>
                                        Items Left
                                        </v-chip>
                                    </v-btn>

                                </v-bottom-navigation>
                            </v-card-actions>

                            <v-card-actions>
                                <v-btn color="default" x-small :class="{ success: filter == 'All' }" @click="filter = 'All'">All</v-btn>
                                <v-btn color="default" x-small :class="{ success: filter == 'Active' }"  @click="filter = 'Active'">Active</v-btn>
                                <v-btn color="default" x-small :class="{ success: filter == 'Completed' }"  @click="filter = 'Completed'">Compeleted</v-btn>
                                <v-spacer />
                                <transition name="fade">
                                <v-btn v-if="showClearCompleted" color="red" x-small text @click="clearCompleted">Clear Completed</v-btn>
                                </transition>
                                
                            </v-card-actions>

                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<style scoped>
  .completed{
    text-decoration: line-through;
    color: grey;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

<script>
import TodoItem from './TodoItem';
export default {
    props: {
      source: String,
    },
    components: {
        'todo-item': TodoItem
    },
    data() {
        return {
            idForTodo: 3,
            beforeEditCache: '',
            checkAll: false,
            filter: 'All',
            newTodo: '',
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
            this.checkAll = count == 0;
            return count;
        },
        showClearCompleted() {
            return this.todos.filter( todo => todo.completed ).length > 0;
        }
    },
    methods: {
        addTodo() {
            if ( this.newTodo.trim().length == 0 ) {
                return;
            }
            this.todos.push({
                'id' : this.idForTodo++,
                'title' : this.newTodo,
                'completed' : false,
                'editing' : false
            });
            this.newTodo = '';
        },
        removeTodo(index) {
            this.todos.splice(index, 1);
        },
        checkAllTodos() {
            this.todos.map( todo => todo.completed = this.checkAll);
        },
        clearCompleted() {
            this.todos = this.todos.filter( todo => !todo.completed );
        },
        finishedEdit(data) {
            this.todos.splice(data.index, 1, data.todo);
        }
    }
}
</script>