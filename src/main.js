import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import AppDashBoard from './AppDashBoard.vue'
import About from './AboutView.vue';
import Home from './page/Home.vue';
import Mascotas from './page/Mascotas.vue';
import Details from './page/Details.vue'
import Contacts from './page/contacts.vue'
import Alert from './page/terminos.vue'
import Registrar from './page/Registrar.vue'
import Profile from './page/profile.vue'
import DashBoard from './page/dashboard.vue'
import Setting from './Setting.vue'
import PathNotFound from './PathNotFound.vue';
import { createRouter, createWebHistory } from 'vue-router';
import VueSplide from '@splidejs/vue-splide';
import Auth from './page/auth.vue';
import DetailsMascotas from './page/DetailsMascotas.vue';
import Services from './page/services.vue';
import Doctor from './page/doctor.vue';
import Homedashboard from './page/dashboard/Homedashboard.vue';
import UserDashboard from './page/dashboard/UserDashboard.vue';
import PublicLayout from './layouts/PublicLayout.vue';
import DashboardLayout from './layouts/DashboardLayout.vue';
 import { createPinia } from 'pinia'
import { supabase } from './config/supabase';

const routes = [
  { path: '/', 
    name: 'Home', 
    meta: {
      title: 'PetCare'
    }, component: PublicLayout, 
  children:[
    { path: '',
        name: 'Home',
        component: () => import('./page/Home.vue'),
        meta: { title: 'PetCare' }
      
    },
{ path: '/services', component: Services },
  ]
  },
  
  { path: '/user/:username', component: Setting },
 
  { path: '/diseases/:id',
  name: 'Diseases',
    component: () => import('./page/Diseases.vue'),
  props: true },
  { path: '/registrar', component: Registrar },
   
  {
  path: '/dashboard',
  component: DashboardLayout,
  meta: { requiresAuth: true }, // 🔒 obliga login
  children: [
   
    {
      path: '/dashboard/home',
      component: Homedashboard,
      meta: { roles: ['admin'] }
    },
    {
      path: 'users',
      component: UserDashboard,
      meta: { roles: ['admin'] }
    },
    {
      path: 'doctor',
      component: () => import('./page/dashboard/doctor.vue'),
      meta: { roles: ['admin', 'doctor'] }
    },
    {
      path: 'profile',
      component: Profile,
      meta: { roles: ['admin', 'doctor'] }
    }
  ]
},

   { path: '/services/:name', component: Doctor },
  { path: '/auth', component: Auth },
  { path: '/contacts', component: Contacts },
  { path: '/terminos', component: Alert },
  { path: '/profile',
  name: 'profile',  component: Profile  },
  {
  path: '/adoption',
  component: Mascotas,
  children: [
    {
      path: ':id',
      name: 'MascotasDetails',
      component: () => import('./page/DetailsMascotas.vue'),
      props: true
    }
  ]
}
,
  { path: '/:pathMatch(.*)*', component: PathNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Back / forward
    if (savedPosition) {
      return savedPosition
    }

    // Siempre subir al top al cambiar de ruta
    return { top: 0 }
  }
  
});
router.beforeEach(async (to, from, next) => {

  const { data: { user } } = await supabase.auth.getUser()

  // 🔒 Si requiere login
  if (to.meta.requiresAuth && !user) {
    return next('/auth')
  }

  if (user && to.meta.role) {

    const userRole = user.user_metadata?.role

    // Si meta.role es array
    if (Array.isArray(to.meta.role)) {
      if (!to.meta.role.includes(userRole)) {
        return next('/')
      }
    } else {
      if (userRole !== to.meta.role) {
        return next('/')
      }
    }
  }

  next()
})
router.afterEach((to) => {
  const defaultTitle = 'PetCare'
  document.title = to.meta.title || defaultTitle
})
const pinia = createPinia()
const app = createApp(App);
app.use(VueSplide);
app.use(pinia)
app.use(router);

app.mount('#app');
