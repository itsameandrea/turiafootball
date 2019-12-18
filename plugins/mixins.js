import Vue from 'vue'
import toasts from '@/mixins/toastMixin'
import mobileDetector from '@/mixins/mobileDetectorMixin'

Vue.mixin(toasts)
Vue.mixin(mobileDetector)