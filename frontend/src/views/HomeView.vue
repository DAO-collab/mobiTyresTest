<template>
    <div>
        <div v-if="isLoading">
            <LoadingScreen/>
        </div>
        
        <div class="index-ord" v-else>
            <!-- {{ authStore.user }} -->
            <div>
                <div v-if="products.length > 0" class="av-products">
                    <h1>Products List</h1>
                    <h3>Click <RouterLink to="/add_product">here</RouterLink> to add a product</h3>
                    

                    <div>
                        <section class="country-info-section">
                            <div class="c-div">
                                <div class="content-div">
                                    <div class="country-div">
                                        <h1 ref="countryName" class="country-name"></h1>
                                        <div class="img-popln">
                                            <!-- <img class="population-img" src="../assets/people.png" alt="population image"> -->
                                            <!-- <span ref="countryPopulation" class="total-population"></span> -->
                                        </div>
                                    </div>

                                    <div class="addn">
                                        <span ref="country" class="country-name"></span>
                                        <span>,</span>
                                        <span ref="continent" class="continent-name"></span>
                                    </div>

                                </div>
                                
                            </div>
                        </section>


                        <section class="table-section">

                            <div class="table-container">
                                <div class="table-container-content">
                                    <div class="flex-wrapper">
                        
                                        <div class="table-info">
                                            <h1 class="table-h">All products</h1>
                                            <table class="tests-table">
                                        <tr>
                                            <th class="table-header">Product Name</th>
                                            <th class="table-header">Store Location</th>
                                            <th class="table-header">Quantity</th>
                                            <th class="table-header">Selling Price</th>
                                            <th class="table-header">Buying Price</th>
                                            <th class="table-header">Status</th>
                                        </tr>
                                        <tr v-for="product in products" :key="product.id"
                                        draggable="true"
                                        :class="{ 'dragged-row': product.isDragOver }"
                                        @dragstart="handleDragStart(product, $event)"
                                        @dragover="handleDragOver($event)"
                                        @drop="handleDrop(product, $event)"
                                        @dragenter="handleDragEnter(product, $event)"
                                        @dragleave="handleDragLeave(product)">
                                            <td class="table-data">{{ product.name }}</td>
                                            <td class="table-data">{{ product.store_location }}</td>
                                            <td class="table-data">{{ product.quantity }}</td>
                                            <td class="table-data">sh. {{ formatNumber(product.selling_price) }}</td>
                                            <td class="table-data">sh. {{ formatNumber(product.buying_price) }}</td>
                                            <td class="table-data">{{ product.status }}</td>
                                            <!-- <td class="table-data"><svg style="cursor: pointer;" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-three-dots-vertical"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path> </g></svg></td> -->
                                            <td>
                                                <div class="product-actions">
                                                        <a :href="'/update_product/'+ product.id">Update</a>
                                                        <p @click="deleteProduct(product.id)" style="cursor: pointer;color: red;">Delete</p>
                                                </div>


                                            </td>
                                        </tr>
                        
                                    </table>
                                        </div>
                        
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div v-else>
                    <h1>No products available now. <router-link to="/">click here to add</router-link></h1>
                </div>

            </div>

        </div>

    </div>


</template>


<script setup lang="ts">

import { RouterLink } from 'vue-router'
import LoadingScreen from '@/components/LoadingScreen.vue';
import { onMounted, ref} from 'vue';
import axiosInstance from '@/lib/axios'
import {useAppStore} from '@/stores/state'


/**instance of our app store */
const authStore = useAppStore()

// /**variable to be used during dragging of table rows */
// let isDragOver = ref(false)

/**funcs to run once file mounted */
onMounted(async() => {
    await authStore.getUser()  /**check if user auth first */
    getProducts()

})


/**interface for each product returned from backend */
interface Product {
  id: number;
  name: string;
  store_location: string;
  status: string;
  quantity: number;
  selling_price: number;
  buying_price: number;
  isDragOver?: boolean
}

/**array to hold products returned from backend */
let products = ref<Product[]>([])

/**variable to check if we're done fetching for data
 * Only show ui after products are fetched
 */
let isLoading = ref(true)

/**
 * func to fetch products from backend
 */
async function getProducts() {
  const {data} = await axiosInstance.get("/products")
  products.value = data.products
  isLoading.value = false
}

/**sends request to delete product from db */
async function deleteProduct(productId: any) {
    try {
        isLoading.value = true

        const deleteItemUrl = `/product/${productId}`
        await axiosInstance.delete(deleteItemUrl)

        getProducts()

        alert(`item with id of ${productId} deleted`)
    } catch (error) {
        alert("Failed to delete product")
    }
}

/**func to format big numbers, i.e add commas to prices */
function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * The functions below will handle the drag operations on our table rows
 * @param product 
 * @param event 
 */
const handleDragStart = (product: any, event: any) => {
  event.dataTransfer.setData('text/plain', product.id.toString());
};

const handleDragOver = (event: any) => {
  event.preventDefault();
};

const handleDrop = (droppedProduct: any, event: any) => {
  event.preventDefault();

  const draggedProductId = event.dataTransfer.getData('text/plain');
  const draggedProductIndex = products.value.findIndex(product => product.id.toString() === draggedProductId);
  const droppedProductIndex = products.value.indexOf(droppedProduct);

  if (draggedProductId && draggedProductIndex !== -1) {
    const draggedProduct = products.value[draggedProductIndex];
    products.value.splice(draggedProductIndex, 1); // Remove from original position
    products.value.splice(droppedProductIndex, 0, draggedProduct); // Insert at new position

    const isDraggingUp = draggedProductIndex > droppedProductIndex;
    draggedProduct.status = isDraggingUp ? 'Sold' : 'In Stock';
    updateBackend(draggedProduct);
  }
  droppedProduct.isDragOver = false;

};


const handleDragEnter = (product:any, event: any) => {
  event.preventDefault();
  product.isDragOver = true;

};

const handleDragLeave = (product: any) => {
    product.isDragOver = false;
};

const updateBackend = (product: any) => {
  // Make an API call to update the product status in the backend
  // For example: axios.post('/updateProductStatus', { productId: product.id, status: product.status });
};





</script>

<style scoped lang="scss">


$borderColors: rgba(23, 82, 191, 0.379);
$web-color:rgb(23, 82, 191);


/**class to be set to the table row being dragged */
.dragged-row {
  background-color: whitesmoke; /* Light blue, adjust the color as needed */
}

/**container with the product actions (update/delete) */
.product-actions {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.table-section{
    .table-container{
        .table-container-content{
            max-width: 1000px;
            display: grid;
            place-items: center;
            margin: 0 auto;
            .flex-wrapper{
                
                .table-info{
                    display: grid;
                    place-items: center;
                    margin: 1rem 0;
                    
                    .table-h{
                        padding: 1.1rem;
                        padding-top: 2rem;
                        font-size: 1.8rem;
                        opacity: .9;
                        text-align: center;
                        font-weight: 500;
                        text-transform: capitalize;
                        
                    }
                    .tests-table{
                        border: 1px solid $borderColors ;
                        padding: 1rem;
                        border-spacing: 0;
                        .table-header{
                            font-size: 1.2rem;
                            font-weight: 500;
                            opacity: .8;
                            border: 1px solid $borderColors ;
                            border-top: unset;
                            padding-bottom: 0.3rem;
                            padding-right: 1rem;
                            padding: 1rem;
                            margin-right: -2rem;
                            text-transform: capitalize;
                            text-align: center;
                        }
                        .table-data{
                            text-align: center;
                            font-weight: 500;
                            border-right: 1px solid $borderColors ;
                            border-left: 1px solid $borderColors ;
                            opacity: .9;
                            padding-top: 0.3rem;
                            padding: .3rem;
                            padding-bottom: 1rem;
                            border: 1px solid gainsboro;
                            font-size: 1.2rem;

                        }
                    }
                }

            }
        }
    }
}

</style>