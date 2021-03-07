<template>
    <div class="warning">
        <h1>{{message}}</h1>
        <div class="btns">
            <button @click="confirm()">YES</button>
            <button @click="deny()">NO</button>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    props: {
        message: String,
        confirmEditFunction: Function,
     
    },
    methods: {
        confirm() {
            this.confirmEditFunction();
            this.$emit('confirm');
        },
        deny() {
            this.$emit('deny')
        }
    },
    computed: {
        ...mapState(["baseUrl"])
    }
}
</script>
<style scoped>

</style>