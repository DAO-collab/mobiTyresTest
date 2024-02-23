<template>
    <div v-if="!isLoading">
        <h1>Product Detail Page</h1>
        <!-- {{ product_to_update }} -->
        <!-- <h1>Update Product: {{ $route.params.productId  }}</h1> -->
        <!-- <p>Product ID: {{ $route.params.productId }}</p> -->
        <!-- <p>{{product_to_update.product}}</p> -->
        <form id="update_product_form" @submit.prevent="updateProduct">

            <AuthInput
                labelPurpose="product-name-id"
                labelText="Product name"
                inputName="product-name"
                inputType="text"
                inputClass="product-name-class"
                inputID="product-name-id"
                :inputValue=product_to_update.name
                />
                <AuthInput
                labelPurpose="product-quantity-id"
                labelText="Product Quantity"
                inputquantity="product-quantity"
                inputType="text"
                inputClass="product-quantity-class"
                inputID="product-quantity-id"
                :inputValue=product_to_update.quantity
                />
                <AuthInput
                labelPurpose="product-location-id"
                labelText="Product location"
                inputlocation="product-location"
                inputType="text"
                inputClass="product-location-class"
                inputID="product-location-id"
                :inputValue=product_to_update.store_location
                />
                <AuthInput
                labelPurpose="product-sprice-id"
                labelText="Selling Price"
                inputsprice="product-sprice"
                inputType="text"
                inputClass="product-sprice-class"
                inputID="product-sprice-id"
                :inputValue=product_to_update.selling_price
                />
                <AuthInput
                labelPurpose="product-bprice-id"
                labelText="Buying Price"
                inputbprice="product-bprice"
                inputType="text"
                inputClass="product-bprice-class"
                inputID="product-bprice-id"
                :inputValue=product_to_update.buying_price
            />
  
            <label for="">Status</label>
            <select name="product_status" id="product_select_status">
                <option value="sold">Sold</option>
                <option value="available">In Stock</option>
            </select>
            <div>
                <button type="submit">Update product</button>
            </div>
          
  
        </form>
  
    </div>
  </template>
  
<script setup lang="ts">

import axiosInstance from '@/lib/axios.js'

import {ref, onMounted} from 'vue'
import {routerKey, useRoute, useRouter} from 'vue-router'

import AuthInput from '../../../components/AuthInput.vue';



onMounted(async ()=>{
    // await axiosInstance.get("http://localhost:8000/sanctum/csrf-cookie")

    getProductDetails()
    // updateProduct()
})

/**variable to check if we're done fetching for data
 * Only show ui after products are fetched
 */
 let isLoading = ref(true)

/**inteface of the product to be updated */
interface Product {
  id: number;
  name: string;
  store_location: string;
  status: string;
  quantity: number;
  selling_price: number;
  buying_price: number;
}

/**variable will be used to determine what product the user wants to update
 * fetch the product dets based on ID and populate the input fields
*/
let product_to_update = ref<Product[]>([]);

/**getting the product ID from the url */
const route = useRoute()
let productID = route.params.productId;

/**fetch details of this item. get product id from param */
async function getProductDetails() {

    try {
        const {data} = await axiosInstance.get(`http://localhost:8000/product/${productID}`)
        product_to_update.value = data.product
        isLoading.value = false
    } catch (error) {
        // isLoading.value = false
        alert("Failed to get product")

    }
}

async function updateProduct() {
    /**select dom elements */
    const updateProductForm = document.getElementById("update_product_form")
    const productName = document.getElementById("product-name-id") as HTMLInputElement
    const productQuantity = document.getElementById("product-quantity-id") as HTMLInputElement
    const productStoreLocation = document.getElementById("product-location-id") as HTMLInputElement
    const productSellingPrice = document.getElementById("product-sprice-id") as HTMLInputElement
    const productBuyingPrice = document.getElementById("product-bprice-id") as HTMLInputElement
    const productStatus = document.getElementById("product_select_status") as HTMLInputElement

    /** product to be updated */
    const newProduct = {
        name: productName.value.trim(),
        store_location: productStoreLocation.value.trim(),
        selling_price: Number(productSellingPrice.value),
        buying_price: Number(productBuyingPrice.value),
        status: productStatus.value.trim(),
        quantity: Number(productQuantity.value)
    }

    await axiosInstance.get("http://localhost:8000/sanctum/csrf-cookie")

    try {
        const {data} = await axiosInstance.put(`http://127.0.0.1:8000/product/${productID}`, newProduct)
        
        alert("Product updated successfully")
        /**forward user to another page */
        // useRouter().push("/")
        
    } catch (error) {
        alert("Failed to update product. Please try again")
    }
   
}

</script>

<style lang="scss" scoped>
//

</style>