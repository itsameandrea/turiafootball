export default {
  computed: {
    isMobile() {
      if (process.server) {
        return false
      }

      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  }
}