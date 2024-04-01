<template>
    <v-snackbar v-model="snackbarVisible" right top flat :color="color" >
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbarVisible = false">
                X
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: "success"
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            snackbarVisible: this.value
        }
    },
    computed: {
        color() {
            return this.type === 'error' ? 'red accent-2' : 'success'
        }
    },
    watch: {
        value(val) {
            this.snackbarVisible = val;
            this.$emit('input', val)
        },

        snackbarVisible(val) {
            if (!val) this.$emit('input', val)
        }
    }
}
</script>