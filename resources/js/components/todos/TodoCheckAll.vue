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
            this.$store.dispatch('checkAllTodos', this.checkAll);
        }
    }
}
</script>