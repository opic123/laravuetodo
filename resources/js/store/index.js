import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

    // state can be access using this.$store.state.todos
    state: {
        idForTodo: 3,
        newTodo: '',
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
    },

    // updates the state of the store
    // mutations will receive the state as first arguments
    // access mutations using this.$store.commit('addTodo')
    mutations: {
        addTodo(state, newTodo) {
            if ( newTodo.trim().length == 0 ) {
                return;
            }
            state.todos.push({
                'id' : state.idForTodo++,
                'title' : newTodo,
                'completed' : false,
                'editing' : false
            });
            state.newTodo = '';
        },
        removeTodo(state, todo) {
            state.todos = state.todos.filter((t) => t.id != todo.id);
        },
        checkAllTodos(state, checked) {
            state.todos.map( todo => todo.completed = checked);
        },
        clearCompleted(state) {
            state.todos = state.todos.filter( todo => !todo.completed );
        },
        finishedEdit(state, todo) {
            let index = state.todos.findIndex((t) => t.id == todo.id);
            state.todos.splice(index, 1, todo);
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
