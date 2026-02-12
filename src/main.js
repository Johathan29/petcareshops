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

const routes = [
  { path: '/', 
    name: 'Home', 
    meta: {
      title: 'PetCare'
    }, component: Home },
  { path: '/users', component: About },
  { path: '/user/:username', component: Setting },
 
  { path: '/diseases/:id',
  name: 'Diseases',
    component: () => import('./page/Diseases.vue'),
  props: true },
  { path: '/registrar', component: Registrar },
   { path: '/services', component: Services },
   { path: '/dashboard', component: DashBoard },
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
router.afterEach((to) => {
  const defaultTitle = 'PetCare'
  document.title = to.meta.title || defaultTitle
})
const app = createApp(App);
app.use(VueSplide);
app.use(router);

app.mount('#app');
