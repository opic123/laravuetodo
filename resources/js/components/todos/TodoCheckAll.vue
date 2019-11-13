<template>
    <v-btn value="checkAll">
        <v-checkbox v-model="checkAll" @change="checkAllTodos"
        label="Check All"
        ></v-checkbox>
    </v-btn>
</template>

<script>
export default {
    name: 'todo-check-all',
    props: {
        isCheckAll: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            // must declare a local model to prevent vuejs from complaning about direct mutation of property values
            checkAll: this.isCheckAll
        }
    },
    watch: {
        isCheckAll() {
            this.checkAll = this.isCheckAll;
        }
    },
    methods: {
        checkAllTodos() {
            // eventBus = global window instance init @app.js
            eventBus.$emit('checkAllTodosHandler', this.checkAll);
        }
    }
}
</script>