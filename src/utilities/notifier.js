import Notify from "simple-notify"
import 'simple-notify/dist/simple-notify.min.css'

export const notify = {
  success: function(title, text, persist) {
      this.showNotification({status:'success',title:title, text:text, autoclose:!persist, showCloseButton:!!persist})
  },
  warning: function(title, text, persist) {
      this.showNotification({status:'warning',title:title, text:text, autoclose:!persist, showCloseButton:!!persist})
  },
  error: function(title, text, persist) {
      this.showNotification({status:'error',title:title, text:text, autoclose:!persist, showCloseButton:!!persist})
  },
  showNotification: (props) => {
      return new Notify({
          status: 'success',
          effect: 'fade',
          speed: 1000,
          showCloseButton: false,
          autoclose: true,
          autotimeout: 2000,
          type: 1,
          ...props
      })
  }
}