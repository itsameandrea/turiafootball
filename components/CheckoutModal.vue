<template lang="pug">
  b-modal(
    :visible="visible"
  )
    b-container(ref="checkout_form")
    template(slot="modal-footer")
      .d-flex.justify-content.flex-end
        b-button.mr-2(
          @click="$emit('close')"
        ) Cancel
        async-button(
          variant="primary"
          :is-loading="isLoading"
          @click.prevent="onProcessPurchase"
        ) Pay
</template>
<script>
import AsyncButton from '@/components/AsyncButton'

export default {
  name: 'CheckoutModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AsyncButton
  },
  data() {
    return {
      stripe: null,
      card: null,
      isLoading: false
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
      this.isLoading = true

      const result = await this.stripe.createToken(this.card)

      if (result.error) {
        this.toastError('Something went wrong with the payment...')
      }
      // trigger firebase callable function passing the charge
      this.$emit('paid', result.token.id)
      this.isLoading = false
    }
  }
}
</script>