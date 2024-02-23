import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/update_product/:productId',
      component: ()=> import ('../views/Products/Update/productId.vue')

    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import ('../views/Auth/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: ()=> import ('../views/Auth/register.vue')
    },
    {
      path: '/add_product',
      name: 'addproduct',
      component: ()=> import ('../views/Products/AddProduct.vue')
    }
  ]
})

export default router


// SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'selling_price' cannot be null (Connection: mysql, SQL: insert into `products` (`name`, `store_location`, `selling_price`, `buying_price`, `quantity`, `status`, `updated_at`, `created_at`)
// values (Monitor, location, ?, ?, ?, inStock, 2024-02-23 13:14:34, 2024-02-23 13:14:34))