<template lang="pug">
  b-modal(
    :visible="visible"
    @ok.prevent="onProcessPurchase"
  )
    b-container(ref="checkout_form")
</template>
<script>
export default {
  name: 'CheckoutModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stripe: null,
      card: null
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.mountStripeCheckout()
      }
    }
  },
  methods: {
    mountStripeCheckout() {
      try {
        setTimeout(() => {
          this.stripe = this.$stripe.import()

          const elements = this.stripe.elements()
          this.card = elements.create('card')
          // Add an instance of the card Element into the `card-element` <div>
          this.card.mount(this.$refs.checkout_form)
        }, 500)
      } catch (error) {
        console.log(error)
      }
    },
    async onProcessPurchase() {
      const result = await this.stripe.createToken(this.card)

      console.log('Processing the payment...')

      if (result.error) {
        this.toastError('Something went wrong with the payment...')
      }
      
      // trigger firebase callable function passing the charge
      this.$emit('paid', result.token.id)
    }
  }
}
</script>