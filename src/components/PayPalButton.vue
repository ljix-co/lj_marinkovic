<template>
  <div class="paypal-btn">
    <paypal-buttons
      [props]="{
          createOrder: createOrder,
          onApprove: onApprove
      }"
    ></paypal-buttons>
  </div>
</template>
<script>
const PayPalButton = this.paypal.Buttons.driver("vue", window.Vue);
export default {
    props: {
        totalPrice: Number
    },
  components: {
    "paypal-buttons": PayPalButton,
  },
  computed: {
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: this.totalPrice,
            },
          },
        ],
      });
    },
    onAuthorize: function (data, actions) {
      return actions.order.capture();
    },
  },
};
</script>