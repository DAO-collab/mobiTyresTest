<template>
  <div>
    <header>

      <div class="wrapper">

        <nav>
          <RouterLink class="a-link" to="/">Home</RouterLink>
          <RouterLink class="a-link" to="/login">Login</RouterLink>
          <RouterLink class="a-link" to="/register">Register</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />

  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap');


:root{
    --web-primary-color:#0048ff;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html{
    scroll-behavior: smooth;
    font-size: 10px;
}
body{
    padding: 2rem;
    font-family: 'Roboto', sans-serif;
    background-color: white;
    font-size: 1.2rem;
    color: black;
}


.a-link{
  color: black;
}

.a-link.router-link-exact-active {
  border-bottom: 1px solid black;
}

/**styling the 'select' input element */
#product_select_status{
      background-color: white;
      color: black;
      font-weight: 500;
      font-size: 1.5rem;
      padding: .4rem .5rem;
  }

div{
    margin: 1rem 0;
    button{
        all: unset;
        font-weight: 400;
        cursor: pointer;
        font-size: 1.3rem;
        text-transform: capitalize;
        padding: 1.2rem 2rem;
        background-color: black;
        color: white;
    }
}

label{
    font-size: 1.2rem;
}


input{
    background-color: transparent;
    padding: 1rem .4rem;
    border: 1px solid rgba(49, 43, 43, 0.375);
    font-weight: 400;
    font-size: 1.4rem;
    width: 100%;
    color: black;
    margin-bottom: 2rem;
    
    &:focus{
        outline: none;
        border: 1px solid rgb(0, 0, 0);
    }
}


</style>
