import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axiosInstance from '@/lib/axios'

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
      component: ()=> import ('../views/Products/Update/productId.vue'),


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
      component: ()=> import ('../views/Products/AddProduct.vue'),

    }
  ]
})

/**will tell if user is Auth, if so, they can access
 * certain routes
 */
let isAuthenticated = false

/**function to check if user is authenticated */
async function getUser() {
  // await this.getToken()
  try {
      const data = await axiosInstance.get("/api/user")
      if (data.status === 200) {
        isAuthenticated = true
      }
      
  } catch (error) {
  }
}


/**to be called before each route */
router.beforeEach(async (to, from) => {
  await getUser()
  if (!isAuthenticated && to.name !== 'login' && to.name !=='register') {
    // redirect the user to the login page
    return { name: 'login' }
  } 
})

export default router
