import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({

    // state can be access using this.$store.state.todos
    state: {
        idForTodo: 3,
        newTodo: '',
        filter: 'All',
        todos: []
    },

    // updates the state of the store
    // mutations will receive the state as first arguments
    // access mutations using this.$store.commit('addTodo')
    mutations: {
        loadTodos(state) {
            // axios is declared as global window object @bootstrap.js
            axios.get('/todos')
            .then((response) => {
                state.todos = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        addTodo(state, newTodo) {
            if ( newTodo.trim().length == 0 ) {
                return;
            }
            // axios is declared as global window object @bootstrap.js
            axios.post('/todos', {
                'title': newTodo
            })
            .then((response) => {
                state.todos.push(response.data);
                state.newTodo = '';
            })
            .catch((error) => {
                console.log(error);
            });
           
        },
        removeTodo(state, todo) {
            // axios is declared as global window object @bootstrap.js
            axios.delete('/todos/' + todo.id)
            .then((response) => {
                state.todos = state.todos.filter((t) => t.id != todo.id);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        checkAllTodos(state, checked) {
            // axios is declared as global window object @bootstrap.js
            axios.put('/todosCheckAll', {
                completed: checked
            })
            .then((response) => {
                state.todos.map( todo => todo.completed = checked);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        clearCompleted(state) {
            // filter completed todos and then map each todos to return only the id
            const ids = (state.todos.filter( todo => todo.completed ))
                        .map( todo => todo.id);

            // axios is declared as global window object @bootstrap.js
            // delete with params should have data attribute
            axios.delete('/todosDeleteAll', {
                data: {
                    ids: ids
                }
            })
            .then((response) => {
                state.todos = state.todos.filter( todo => !todo.completed );
            })
            .catch((error) => {
                console.log(error);
            });
            
        },
        finishedEdit(state, todo) {
            // axios is declared as global window object @bootstrap.js
            axios.put('/todos/' + todo.id, todo)
            .then((response) => {
                let index = state.todos.findIndex((t) => t.id == todo.id);
                state.todos.splice(index, 1, todo);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        setFilter(state, filter) {
            state.filter = filter;
        },
        setNewTodo(state, newTodo) {
            state.newTodo = newTodo;
        }
    },

    // Actions are similar to mutations, the differences being that:
    // Instead of mutating the state, actions commit mutations.
    // Actions can contain arbitrary asynchronous operations.
    // actions will receive the context as first arguments
    // access actions using this.$store.dispatch('addTodo')
    actions: {
        loadTodos(context) {
            context.commit('loadTodos');
        },
        addTodo(context, newTodo) {
            context.commit('addTodo', newTodo);
        },
        removeTodo(context, todo) {
            context.commit('removeTodo', todo);
        },
        checkAllTodos(context, checked) {
            context.commit('checkAllTodos', checked);
        },
        clearCompleted(context) {
            context.commit('clearCompleted');
        },
        finishedEdit(context, todo) {
            context.commit('finishedEdit', todo);
        },
        setFilter(context, filter) {
            context.commit('setFilter', filter);
        }
    },

    // getters will receive the state as first arguments
    // getters will also receive other getters as the 2nd argument:
    // access getters using this.$store.getters('addTodo')
    getters: {
        todosFiltered(state) {
            if ( state.filter == 'All' ) {
                return state.todos;
            } else if ( state.filter == 'Active' ) {
                return state.todos.filter( todo => !todo.completed );
            } else if ( state.filter == 'Completed' ) {
                return state.todos.filter( todo => todo.completed );
            }
            return state.todos;
        },
        remainingTodos(state) {
            return state.todos.filter( todo => !todo.completed ).length;
        },
        showClearCompleted(state) {
            return state.todos.filter( todo => todo.completed ).length > 0;
        },
        isCheckAll(state) {
            let count = state.todos.filter( todo => !todo.completed ).length;
            return count == 0 ? true : false;
        }
    }
});

export default store;
