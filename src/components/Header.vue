<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaw, faUsers, faHouse } from '@fortawesome/free-solid-svg-icons'
const isOpen = ref(true)

function openNav() {
  return console.log(isOpen.value = !isOpen.value)
}

const handleScroll = () => {
  const header = document.getElementById('main-header')
  if (!header) return

  if (window.scrollY > 20) {
    header.classList.add('header-scrolled')
  } else {
    header.classList.remove('header-scrolled')
  }
}

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
  identities:[{
    identity_data:{}
    
  }]
}
const logout = () => {
  localStorage.removeItem("user")
  user.value = null
  isUserMenuOpen.value = false
}
const handleClickOutside = (event: MouseEvent) => {
  const menu = document.querySelector("#user-menu")
  if (menu && !menu.contains(event.target as Node)) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})

const user = ref<User | null>(null)

onMounted(() => {
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    user.value = JSON.parse(storedUser).user
  }
  console.log(user.value?.identities.map(item=> item.identity_data.first_name))
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
const isUserMenuOpen = ref(false)

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}
</script>

<template>
  <header id="main-header" class="sticky top-0 z-50 w-full bg-surface-light dark:bg-surface-dark
         border-b border-slate-200 dark:border-slate-800
         transition-all duration-300 ease-in-out">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">

        <!-- LOGO -->
        <div class="flex items-center gap-8">
          <router-link to="/" class="flex items-center gap-3 group">
            <img src="../assets/fotoperfil.png" class="w-12" alt="logo" />
            <div class="leading-[.5] text-justify">
              <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-[#0a19bc]"> PetCare
              </h2>
              <span class="text-[12px] text-gray-500">Veterinaria &amp; Adopción</span>
            </div>
          </router-link>
        </div>

        <!-- NAV DESKTOP -->
        <nav class="hidden lg:flex items-center gap-8">
          <router-link to="/" class="nav-link hover:text-[#0a19bc]  font-bold">Home</router-link>
          <router-link to="/services" class="nav-link hover:text-[#0a19bc]  font-bold">Services</router-link>

          <router-link to="/adoption" class="nav-link hover:text-[#0a19bc]  font-bold">Adoption</router-link>
          <router-link to="/contacts" class="nav-link font-bold hover:text-[#0a19bc]">Contacts</router-link>
        </nav>

        <!-- ACTIONS -->
        <div class="hidden lg:flex items-center gap-4">

          <!-- PROFILE -->
          <button v-if="user" @click="toggleUserMenu"
            class="relative rounded-full bg-[#0a19bc] ring-2 ring-white dark:ring-slate-800">
            <div class="size-10 rounded-full bg-cover bg-center" :style="{ backgroundImage: `url(https://i.pravatar.cc/150?img=3)` }">
            </div>
          </button>

          <!-- Si NO está logueado -->
          <router-link v-else to="/auth" class="px-4 py-2 rounded-lg bg-primary text-white font-bold text-sm">
            Login
          </router-link>

          <!-- Dropdown menu -->
          <transition name="fade">
            <div v-if="user && isUserMenuOpen" class="absolute 
    right-[15rem] top-16 z-50 bg-white dark:bg-slate-900
           border border-slate-200 dark:border-slate-800
           rounded-lg shadow-md w-max">
              <ul class="p-2 text-sm font-medium">

                <li class="px-3 py-2 text-xs text-slate-500 flex flex-col" v-for="items in user.identities">
                  <span class="w-full">{{ items.identity_data.first_name }}</span>
                  <span class="w-full">{{ items.identity_data.email }}</span>
                </li>

                <li>
                  <router-link to="/profile" @click="closeUserMenu"
                    class="block px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                    Profile
                  </router-link>
                </li>

                <li>
                  <router-link to="/settings" @click="closeUserMenu"
                    class="block px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                    Settings
                  </router-link>
                </li>

                <li>
                  <button @click="logout" class="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded">
                    Sign out
                  </button>
                </li>

              </ul>
            </div>
          </transition>

        </div>
        <!-- MOBILE BUTTON -->
        <button class="lg:hidden p-2 text-slate-600 hover:text-primary transition-transform duration-300"
          @click="openNav" :class="{ 'rotate-90': isOpen }">
          <template v-if="!isOpen">
            <!-- HAMBURGER -->
            <svg viewBox="0 0 24 24" width="24">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="#0a19bc" stroke-width="2" stroke-linecap="round" />
            </svg>
          </template>

          <template v-else>
            <!-- CLOSE -->
            <svg viewBox="0 0 24 24" width="24px" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                  fill="#0a19bc"></path>
              </g>
            </svg>
          </template>
        </button>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <transition name="fade">
      <div v-if="isOpen"
        class="text-left divide-y-2 divide-gray-500/10 block lg:hidden mt-3 bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 p-4">
        <div class="block items-center gap-4">

          <!-- PROFILE -->
          <button v-if="user" @click="toggleUserMenu"
            class="relative rounded-full bg-[#0a19bc] ring-2 ring-white dark:ring-slate-800">
            <div class="size-10 rounded-full bg-cover bg-center" :style="{ backgroundImage: `url(${user.avatar})` }">
            </div>
          </button>

          <!-- Si NO está logueado -->
          <router-link v-else to="/auth" class="px-4 py-2 rounded-lg bg-primary text-white font-bold text-sm">
            Login
          </router-link>

          <!-- Dropdown menu -->
          <transition name="fade">
            <div v-if="user && isUserMenuOpen" class=" z-50 bg-white dark:bg-slate-900
           border border-slate-200 dark:border-slate-800
           rounded-lg shadow-md w-44">
              <ul class="p-2 text-sm font-medium">

                <li class="px-3 py-2 text-xs text-slate-500">
                  {{ user.name }}
                </li>

                <li>
                  <router-link to="/profile" @click="closeUserMenu"
                    class="block px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                    Profile
                  </router-link>
                </li>

                <li>
                  <router-link to="/settings" @click="closeUserMenu"
                    class="block px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                    Settings
                  </router-link>
                </li>

                <li>
                  <button @click="logout" class="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded">
                    Sign out
                  </button>
                </li>

              </ul>
            </div>
          </transition>

        </div>
        <router-link class="mobile-item block" to="/">Home</router-link>
        <router-link to="/services" class="nav-link hover:text-[#0a19bc]">Services</router-link>
        <router-link class="mobile-item block " to="/adoption">Adoption</router-link>
        <router-link class="mobile-item block" to="/contacts">Contacts</router-link>
      </div>
    </transition>
  </header>
</template>


<style>
/* active route */
a.router-link-active.router-link-exact-active,
.router-link-active {
  border-radius: 0.375rem;
  color: #0F6CBD !important;
}

/* Estado normal */
#main-header {
  backdrop-filter: none;
}

/* Estado al hacer scroll */
.header-scrolled {
  backdrop-filter: blur(10px);
  background-color: rgb(255, 255, 255);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

/* Dark mode */
.dark .header-scrolled {
  background-color: rgba(15, 23, 42, 0.75);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.header-scrolled {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
</style>
