<template>
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
</template>

<script>
export default {
    name: 'todo-items-left',
    props: {
        remainingTodos: {
            type: Number,
            required: true
        }
    }
}
</script>