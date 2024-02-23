import { defineStore } from 'pinia'

export const useAppStore = defineStore("appStore", {
    state: ()=> ({
        errorToastMessage: ""   /**will hold any errors to be showed to user */
    }),

    actions: {
        /**func to handle showing errors on UI */
        handleRequestErrors(error) {
            if (error instanceof Error) {
                if (error.response) {
                    if (error.response.data.message) {
                        this.errorToastMessage = error.response.data.message
                    }
                    else {
                        this.errorToastMessage = "Server error"
                    }
                } else if (error.request) {
                        this.errorToastMessage  = error.message
                } else {
                    this.errorToastMessage = "Something happened on our end. Please try again or reach out to our support team"
                }
                
            } else {
                this.errorToastMessage = error
            }
            const toastMessagePopup = document.querySelector(".toast-msg-popup")
            if (toastMessagePopup) {
                if (toastMessagePopup?.classList.contains("hideToastMessage")) {
                    toastMessagePopup?.classList.remove("hideToastMessage")
                }
                toastMessagePopup?.classList.add("showToastMessage")
            }
        }
    }
})