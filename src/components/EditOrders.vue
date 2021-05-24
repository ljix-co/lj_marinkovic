<template>
    <div class="order-list">
    <div class="top-line">
    <h1>LIST ORDERS</h1>
    <i class="fas fa-times"></i>
    </div>
    <div class="orders">
    <div class="order" v-for="(order, index) in orders" :key="'o' + index">
    
    </div>
    </div>
    </div>
</template>
<script>
export default {
   props: {
       order_list: Array
   } 
}
</script>
<style scoped>

</style>