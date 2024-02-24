<template>
<div>

    <div v-if="isLoading">
        <LoadingScreen/>
    </div>
    <div v-else>
        <h1>Add new product</h1>
        <form action="" id="add_product_form">
            <AuthInput
                labelPurpose="product-name-id"
                labelText="Product name"
                inputName="product-name"
                inputType="text"
                inputClass="product-name-class"
                inputID="product-name-id"
            />

            <AuthInput
                labelPurpose="product-location-id"
                labelText="Product Store location"
                inputType="text"
                inputClass="product-location-class"
                inputID="product-location-id"
            />
            <div>
                <label for="product-quantity-id">Product Quantity</label>
                <input type="text" id="product-quantity-id" pattern="[0-9]*" title="ENTER NUMBERS ONLY!" inputmode="numeric" required>
            </div>

            <div>
                <label for="product-sprice-id">Selling Price</label>
                <input type="text" id="product-sprice-id" pattern="[0-9]*" title="ENTER NUMBERS ONLY!" inputmode="numeric" required>
            </div>

            <div>
                <label for="product-bprice-id">Buying Price</label>
                <input type="text" id="product-bprice-id" pattern="[0-9]*" title="ENTER NUMBERS ONLY!" inputmode="numeric" required>
            </div>


            <label for="">Status</label>
            <select name="product_status" id="product_select_status">
                <option value="inStock">In Stock</option>
                <option value="sold">Sold</option>
            </select>
            <div>
                <button>Add product</button>
            </div>
            

        </form>
    </div>

</div>
</template>

<script setup lang="ts">

import AuthInput from '../../components/AuthInput.vue'

import { onMounted, ref } from 'vue';
import axiosInstance from '@/lib/axios.js'
import LoadingScreen from '@/components/LoadingScreen.vue';


/**variable to hold state to know whento show loading screen */
let isLoading = ref(false)


onMounted(()=>{
    /**call product to handle adding products */
    addProductToDb()
})

/**func to handle adding item to db */
function addProductToDb() {
    /**select dom elements */
    const addProductForm = document.getElementById("add_product_form") as HTMLFormElement
    const productName = document.getElementById("product-name-id") as HTMLInputElement
    const productQuantity = document.getElementById("product-quantity-id") as HTMLInputElement
    const productStoreLocation = document.getElementById("product-location-id") as HTMLInputElement
    const productSellingPrice = document.getElementById("product-sprice-id") as HTMLInputElement
    const productBuyingPrice = document.getElementById("product-bprice-id") as HTMLInputElement
    const productStatus = document.getElementById("product_select_status") as HTMLInputElement
    
    /**add new product when form submitted */
    if (addProductForm) {
        addProductForm.addEventListener("submit", async (e)=>{
            e.preventDefault()
    
            /**body of product to be adeed */
            const newProduct = {
                name: productName.value.trim(),
                store_location: productStoreLocation.value.trim(),
                selling_price: Number(productSellingPrice.value),
                buying_price: Number(productBuyingPrice.value),
                status: productStatus.value.trim(),
                quantity: Number(productQuantity.value)
            }
    
            await axiosInstance.get("/sanctum/csrf-cookie")
            try {
                isLoading.value = true
                const {data} = await axiosInstance.post("http://127.0.0.1:8000/products", newProduct)
    
                alert("Product added successfully")
                isLoading.value = false
                // window.location.href = "/"
                // addProductForm.reset()
            } catch (error) {
                alert("Failed to add product. Please try again")
                isLoading.value = false
            }
            
        })
    }

}


</script>

<style scoped lang="scss">


</style>
