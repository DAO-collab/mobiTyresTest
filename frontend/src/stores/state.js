import { defineStore } from 'pinia'
import axiosInstance from '@/lib/axios'
export const useAppStore = defineStore("appStore", {
    state: ()=> ({
        authUser: null,   /**will tell if user is auth or not */
        errorToastMessage: ""   /**will hold any errors to be showed to user */
    }),

    getters: {
        user: (state) => state.authUser
    },

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
        },

        /**function to hande getting csrf token */
        async getToken() { 
            await axiosInstance.get("/sanctum/csrf-cookie")
        },
        async getUser() {
            // await this.getToken()
            try {
                const data = await axiosInstance.get("/api/user")
                this.authUser = data.data
                
            } catch (error) {
            }
        },

        /**handle user login */
        async loginUser (loginDetails) {
            // await this.getToken()
        
            try {
                const {data} = await axiosInstance.post('/login', {
                    email: loginDetails.email,
                    password: loginDetails.password,
                });
        

                window.alert('Login successful');
                window.location.href = "/"
        
            } catch (error) {
                alert('Login failed. check your credentials and try again');
            }
        },

        /**handle user registration */
        async registerUser(registerDetails) {
            // await this.getToken()
            try {
                const {data} = await axiosInstance.post('/register',{
                    email: registerDetails.email,
                    name: registerDetails.name,
                    password: registerDetails.password
                });

                // Handle successful login (you might want to redirect or perform other actions)
                alert('sign up successful');
                window.location.href = "/"

            } catch (error) {
                // Handle login failure (display an error message, etc.)
                alert('sign up failed.');
            }
        },

        async handleLogout() {
            try {
                await axiosInstance.post("/logout")
                this.authUser = null
            } catch (error) {
                alert("Failed to logout. Try again")
            }
        }
        
    }
})