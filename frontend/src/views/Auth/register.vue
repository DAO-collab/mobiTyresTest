<template>
    <div>

        <main class="main">
            <div class="signup-form-container">
                <h3 class="sign-up-title">Create an account</h3>
                <div class="signup-form">
                    <form @submit.prevent="authStore.registerUser(registerDetails)" id="signup-form">
                        
                        <div class="username-div">
                            <label for="user-name">Username</label>
                            <input v-model="registerDetails.name" name="username" required id="user-name" placeholder="" type="text">
                        </div>

                        <div class="email-div">
                            <label for="signup-email">Email</label>
                            <input v-model="registerDetails.email" name="email" required id="user-email" type="email" placeholder="">
                        </div>

                        <div class="password-div">
                            <label for="user-password">Password</label>
                            <div class="password-input">
                                <input v-model="registerDetails.password" name="password" required id="user-password" type="password" placeholder="">
                            </div>
                            
                        </div>

                        <div class="btn-container">
                            <button class="register-btn" type="submit">Sign Up</button>
                        </div>
                    </form>
                    <p>Have an account? <RouterLink to="/login">Login</RouterLink> </p>
                </div>
            </div>
        </main>

    </div>
</template>

<script setup lang="ts">

import LoadingScreen from '@/components/LoadingScreen.vue';
import { ref } from 'vue';
import {useAppStore} from '@/stores/state'

const authStore = useAppStore()
console.log("auth store a", authStore.loginUser);
console.log("auth store d", authStore.registerUser);
const registerDetails = ref({
    email: "",
    name: "",
    password: ""
})


</script>

<style scoped lang="scss">


.main{
    
    max-width: 500px;
    padding: 3rem;
    margin: 8rem auto;
    // border: 2px solid;
    display: grid;
    height: calc(100vh - 8rem);
    .signup-form-container{
        // border: 2px solid;
        h3{
            font-size: 1.5rem;
            font-weight: 500;
            text-align: center;
            margin-bottom: 3rem;
        }
        .signup-form{

            #signup-form{

                div{
                    margin: 2rem 0;
                    label{
                        font-size: 1.2rem;
                        opacity: .8;
                    }
                    input{
                        background-color:var(--bgColor);
                        border-bottom: 1px solid black;
                        width: 100%;
                        font-size: 1.3rem;
                        border-radius: .2rem;
                        padding: 1rem;
                        border: 1px solid black;
                        color: black;
                    }

                    .password-input{
                        position: relative;
                        margin: unset;
                     
                        .password-closed-img{
                            display: none;
                        }
                    }

                    button{
                        all: unset;
                        text-align: center;
                        padding: 1rem .2rem;
                        font-size: 1.2rem;
                        font-weight: 500;
                        text-transform: capitalize;
                        background-color: black;
                        cursor: pointer;
                        color: white;
                        width: 100%;
                        margin-top: 2rem;

                        &:hover{
                            opacity: .8;
                        }
                    }
                    
                }
            }
        }
        
        p{
            font-size: 1.2rem;
            font-weight: 500;
            margin-top: 2rem;
        }
        a{
            color: black;
            text-decoration: underline;
            font-size: 1.2rem;
        }
    }
}

</style>
