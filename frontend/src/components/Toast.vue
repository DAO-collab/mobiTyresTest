<template>
    <div>
        <div class="toast-msg-ord-wrapper toast-msg-popup" @click="handleCloseToast">
            <div class="tmo-wrp">
                <div class="t-details-container">
                    <div class="toast-message-wrp">
                        <!-- the below close-toast-wrp div will emit an event when clicked
                        that will be used to close the popup -->
                        <div class="close-toast-wrp">
                            <!-- <svg width="16" height="16" viewBox="0 0 24 24" focusable="false" class="fr-ec-icon fr-ec-icon--default fr-ec-button-icon__icon"><title>Close</title><g fill-rule="evenodd"><polygon points="21 4.6 19.4 3 12 10.4 4.6 3 3 4.6 10.4 12 3 19.4 4.6 21 12 13.6 19.4 21 21 19.4 13.6 12"></polygon></g></svg> -->
                            <svg width="28px" height="28px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#000000" stroke-width="0.504"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#000000" stroke-width="0.504" stroke-linecap="round"></path> </g></svg>
                            <p>Error</p>
                        </div>
                        <p id="toast-txt"> {{ toastText }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps(["toastText"])


/** close the toast msg when close btn is clicked */
function handleCloseToast() {
    const toastMessagePopup = document.querySelector(".toast-msg-popup")
    if (toastMessagePopup?.classList.contains("showToastMessage")) {
        toastMessagePopup?.classList.remove("showToastMessage")
    }
    toastMessagePopup?.classList.add("hideToastMessage")
}

</script>

<style lang="scss" scoped>

.toast-msg-ord-wrapper{
    position: absolute;
    top: 3rem;
    right: 3rem;
    font-size: 1.5rem;
    opacity: 0;
    visibility: hidden;
    .tmo-wrp{
        .t-details-container{
            background-color: pink;
            max-width: 29rem;
            border-radius: .4rem;
            padding: 1.4rem;
            .toast-message-wrp{
                .close-toast-wrp{
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    margin: 1rem 0;

                    p{
                        padding: 0 .7rem;
                        font-size: 1.7rem;
                    }
                }
            }
        }
    }
}


.hideToastMessage{
    opacity: 0;
    visibility: hidden;
}

.showToastMessage{
    opacity: 1;
    visibility: visible;
}

</style>