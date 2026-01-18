<script>
export default {
  name: "Auth",
  data() {
    return {
      authMode: "login",

      // form
      email: "",
      password: "",

      // auth mock
      mockUser: {
          id: 1,
          name: "Admin User",
          email: "admin@petcare.com",
          avatar: "https://i.pravatar.cc/150?img=3",
          role: "admin",
          password: "123456"
      },

      // ui state
      showErrorModal: false,
      showSuccessModal: false,
      errorMessage: "",
      welcomeMessage: ""
    }
  },
  methods: {
    login() {
  if (!this.email || !this.password) {
    this.errorMessage = "Todos los campos son obligatorios"
    this.showErrorModal = true
    return
  }

  if (
    this.email !== this.mockUser.email ||
    this.password !== this.mockUser.password
  ) {
    this.errorMessage = "Credenciales incorrectas ❌"
    this.showErrorModal = true
    return
  }

  // ✅ GUARDAR USUARIO
  localStorage.setItem("user", JSON.stringify(this.mockUser))

  this.welcomeMessage = `¡Bienvenido ${this.mockUser.name}! 🐾`
  this.showSuccessModal = true

  setTimeout(() => {
    this.showSuccessModal = false
    this.$router.push("/")
  }, 1500)
}

  }
}
</script>

<template>
    <div class="flex h-screen w-full relative">
<div class="hidden lg:flex lg:w-1/2 relative bg-slate-200 dark:bg-slate-800 overflow-hidden">
<div class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105" data-alt="A happy golden retriever dog sitting next to a white cat on a grassy field" style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuDrgzZoR76YLCsEIhDU0ItoYVtYVdE6nUtcPyMQifA0QjuPwrQNUZu2CEE7rQcYaUTTSK3iMSZC1839A2CQibFWbpxLg3ojQP4BNb2G080kllOv8t39jZL9iXPmEiSQrgWJ_3cUb-jayKKnQB0pSrptKBs8QtB0TcLAsb-iqRm6OVSYRAHuKIADGMzLncqVum2qn_--TpcZ2zgfCeh6icK8b2xgX_ExWo0FX9KWz0i5Mm1dthcpNUTCzxiYbAKYKKi_rYoJYP81gB9L&quot;);">
</div>
<div class="absolute inset-0 bg-gradient-to-t from-[#111c21]/80 via-[#111c21]/20 to-transparent flex flex-col justify-end p-16 text-white">
<div class="max-w-lg text-left">
<div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-md border border-white/10">
<span class="material-symbols-outlined text-white text-2xl">pets</span>
</div>
<h2 class="text-[3.25rem] font-bold leading-tight mb-4 drop-shadow-sm">Everything your pet needs, right at your fingertips.</h2>
<p class="text-lg text-slate-200 font-medium leading-relaxed drop-shadow-sm">Track vaccinations, schedule vet appointments, and manage your furry friend's diet all in one place.</p>
</div>
</div>
</div>
<div class="w-full lg:w-1/2 flex flex-col h-full bg-white dark:bg-background-dark relative shadow-2xl lg:shadow-none overflow-y-auto">
<header class="flex items-center justify-between px-6 py-5 lg:px-12 border-b border-slate-100 dark:border-slate-800 lg:border-none">
<div class="flex items-center gap-3 text-[#0e171b] dark:text-white">
<div class="size-8 text-primary flex items-center justify-center">
<span class="material-symbols-outlined text-3xl">pets</span>
</div>
<h2 class="text-xl font-bold tracking-tight">PetCare App</h2>
</div>
<router-link  to="/" class="group hidden sm:flex h-9 items-center transition duration-700 ease-in-out   justify-center rounded-lg px-4 bg-[#19a1e6]/30 hover:bg-[#19a1e6]/50 hover:text-white hover:scale-[1.1] text-slate-500 text-sm font-bold transition-colors">
    <svg viewBox="0 0 24 24" width="24px " class="group-hover:-translate-x-4 duration-300 transition group-hover:fill-white" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M4 12L8 8M4 12L8 16" stroke="#485364" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> Home page
</router-link >
</header>
<div class="flex-1 flex flex-col justify-center items-center px-6 py-8 lg:px-16 xl:px-24 overflow-y-hidden">
<div class="w-full max-w-[420px] space-y-8">
<div class="bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-xl flex relative">
  <!-- LOGIN -->
  <button
    type="button"
    @click="authMode = 'login'"
    class="flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200"
    :class="authMode === 'login'
      ? 'bg-[#19a1e6] text-white shadow-md shadow-[#19a1e6]'
      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'"
  >
    Login
  </button>

  <!-- REGISTER -->
  <button
    type="button"
    @click="authMode = 'register'"
    class="flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200"
    :class="authMode === 'register'
      ? 'bg-[#19a1e6] text-white shadow-md shadow-[#19a1e6]'
      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'"
  >
    Register
  </button>
</div>

<div class="space-y-2 text-center">
  <h1 class="text-3xl font-bold text-[#0e171b] dark:text-white tracking-tight">
    {{ authMode === 'login' ? 'Welcome Back' : 'Create Account' }}
  </h1>
  <p class="text-slate-500 dark:text-slate-400">
    {{ authMode === 'login'
      ? 'Enter your credentials to access your account.'
      : 'Fill the form to create your account.' }}
  </p>
</div>
<div
  class="relative overflow-y-hidden transition-[min-height] h-max min-h-[420px] duration-300 ease-in-out"
  
>
  <transition name="auth-fade-slide" mode="out-in">

    <!-- LOGIN -->
    <form
       v-if="authMode === 'login'"
  key="login"
  @submit.prevent="login"
      class="absolute inset-0 space-y-5  px-4"
    >
<div class="space-y-1.5">
<label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block text-left" for="email">Email Address</label>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" class="absolute"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <rect x="3" y="5" width="18" height="14" rx="2" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"></rect> </g></svg></span>
</div>
<input class="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 id="email" placeholder="name@example.com" required="" type="email"  v-model="email">
</div>
</div>
<div class="space-y-1.5">
<div class="flex justify-between items-center">
<label class="text-sm font-bold text-[#0e171b] dark:text-slate-200" for="password">Password</label>
<a class="text-xs font-bold text-primary hover:text-primary/80 transition-colors" href="#">Forgot Password?</a>
</div>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
<svg fill="#94a3b8" viewBox="-3 0 32 32" width="100%" class="absolute" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.000,32.000 L3.000,32.000 C1.346,32.000 0.000,30.654 0.000,29.000 L0.000,14.000 C0.000,12.346 1.346,11.000 3.000,11.000 L5.000,11.000 L5.000,8.000 C5.000,3.589 8.589,-0.000 13.000,-0.000 C17.411,-0.000 21.000,3.589 21.000,8.000 L21.000,11.000 L23.000,11.000 C24.654,11.000 26.000,12.346 26.000,14.000 L26.000,29.000 C26.000,30.654 24.654,32.000 23.000,32.000 ZM19.000,8.000 C19.000,4.691 16.309,2.000 13.000,2.000 C9.691,2.000 7.000,4.691 7.000,8.000 L7.000,11.000 L19.000,11.000 L19.000,8.000 ZM24.000,14.000 C24.000,13.448 23.552,13.000 23.000,13.000 L3.000,13.000 C2.448,13.000 2.000,13.448 2.000,14.000 L2.000,29.000 C2.000,29.552 2.448,30.000 3.000,30.000 L23.000,30.000 C23.552,30.000 24.000,29.552 24.000,29.000 L24.000,14.000 ZM14.000,20.722 L14.000,24.000 C14.000,24.553 13.553,25.000 13.000,25.000 C12.447,25.000 12.000,24.553 12.000,24.000 L12.000,20.722 C11.405,20.375 11.000,19.737 11.000,19.000 C11.000,17.898 11.897,17.000 13.000,17.000 C14.102,17.000 15.000,17.898 15.000,19.000 C15.000,19.737 14.595,20.375 14.000,20.722 Z"></path> </g></svg>
</span>
</div>
<input  v-model="password" class="w-full h-12 pl-11 pr-12 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" id="password" placeholder="••••••••" required="" type="password">
<button class="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" type="button">
<span class="material-symbols-outlined text-[20px] relative flex items-center w-[24px]">
        <svg viewBox="0 0 24 24" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#94a3b8"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z" fill="#94a3b8"></path> </g></svg>

</span>
</button>
</div>
</div>
<button class="w-full h-12 bg-[#19a1e6] hover:bg-[#158cc7] text-white font-bold rounded-lg shadow-md shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-wide" type="submit">
<span>Log In</span>
<span class="material-symbols-outlined text-lg font-bold">arrow_forward</span>
</button>
</form>
 <form
      v-else
      key="register"
      class="absolute inset-0 space-y-5 text-left px-4"
    >
        
<div class="space-y-1.5">
<label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block" for="name">Full Name</label>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none ">
<span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
    <svg viewBox="0 0 16 16" class="absolute" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#9facbf"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#9facbf"></path> </g></svg>
</span>
</div>
<input class="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" id="name" placeholder="John Doe" required="" type="text">
</div>
</div>
<div class="space-y-1.5">
<label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block" for="email">Email Address</label>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" class="absolute"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <rect x="3" y="5" width="18" height="14" rx="2" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"></rect> </g></svg>
</span>
</div>
<input class="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" id="email" placeholder="name@example.com" required="" type="email">
</div>
</div>
<div class="space-y-1.5">
<label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block" for="password">Password</label>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
<svg fill="#94a3b8" viewBox="-3 0 32 32" width="100%" class="absolute" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.000,32.000 L3.000,32.000 C1.346,32.000 0.000,30.654 0.000,29.000 L0.000,14.000 C0.000,12.346 1.346,11.000 3.000,11.000 L5.000,11.000 L5.000,8.000 C5.000,3.589 8.589,-0.000 13.000,-0.000 C17.411,-0.000 21.000,3.589 21.000,8.000 L21.000,11.000 L23.000,11.000 C24.654,11.000 26.000,12.346 26.000,14.000 L26.000,29.000 C26.000,30.654 24.654,32.000 23.000,32.000 ZM19.000,8.000 C19.000,4.691 16.309,2.000 13.000,2.000 C9.691,2.000 7.000,4.691 7.000,8.000 L7.000,11.000 L19.000,11.000 L19.000,8.000 ZM24.000,14.000 C24.000,13.448 23.552,13.000 23.000,13.000 L3.000,13.000 C2.448,13.000 2.000,13.448 2.000,14.000 L2.000,29.000 C2.000,29.552 2.448,30.000 3.000,30.000 L23.000,30.000 C23.552,30.000 24.000,29.552 24.000,29.000 L24.000,14.000 ZM14.000,20.722 L14.000,24.000 C14.000,24.553 13.553,25.000 13.000,25.000 C12.447,25.000 12.000,24.553 12.000,24.000 L12.000,20.722 C11.405,20.375 11.000,19.737 11.000,19.000 C11.000,17.898 11.897,17.000 13.000,17.000 C14.102,17.000 15.000,17.898 15.000,19.000 C15.000,19.737 14.595,20.375 14.000,20.722 Z"></path> </g></svg>
</span>
</div>
<input class="w-full h-12 pl-11 pr-12 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" id="password" placeholder="••••••••" required="" type="password">
<button class="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" type="button">
<span class="material-symbols-outlined text-[20px] relative flex items-center w-[21px]"> 
    <svg viewBox="0 0 24 24" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#94a3b8"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z" fill="#94a3b8"></path> </g></svg>
</span>
</button>
</div>
</div>
<div class="space-y-1.5">
<label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block" for="password_confirmation">Confirm Password</label>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
<svg fill="#94a3b8" viewBox="-3 0 32 32" width="100%" class="absolute" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.000,32.000 L3.000,32.000 C1.346,32.000 0.000,30.654 0.000,29.000 L0.000,14.000 C0.000,12.346 1.346,11.000 3.000,11.000 L5.000,11.000 L5.000,8.000 C5.000,3.589 8.589,-0.000 13.000,-0.000 C17.411,-0.000 21.000,3.589 21.000,8.000 L21.000,11.000 L23.000,11.000 C24.654,11.000 26.000,12.346 26.000,14.000 L26.000,29.000 C26.000,30.654 24.654,32.000 23.000,32.000 ZM19.000,8.000 C19.000,4.691 16.309,2.000 13.000,2.000 C9.691,2.000 7.000,4.691 7.000,8.000 L7.000,11.000 L19.000,11.000 L19.000,8.000 ZM24.000,14.000 C24.000,13.448 23.552,13.000 23.000,13.000 L3.000,13.000 C2.448,13.000 2.000,13.448 2.000,14.000 L2.000,29.000 C2.000,29.552 2.448,30.000 3.000,30.000 L23.000,30.000 C23.552,30.000 24.000,29.552 24.000,29.000 L24.000,14.000 ZM14.000,20.722 L14.000,24.000 C14.000,24.553 13.553,25.000 13.000,25.000 C12.447,25.000 12.000,24.553 12.000,24.000 L12.000,20.722 C11.405,20.375 11.000,19.737 11.000,19.000 C11.000,17.898 11.897,17.000 13.000,17.000 C14.102,17.000 15.000,17.898 15.000,19.000 C15.000,19.737 14.595,20.375 14.000,20.722 Z"></path> </g></svg>
</span>
</div>
<input class="w-full h-12 pl-11 pr-12 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" id="password_confirmation" placeholder="••••••••" required="" type="password">
</div>
</div>
<button class="w-full h-12 bg-primary hover:bg-[#158cc7] text-white font-bold rounded-lg shadow-md shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-wide" type="submit">
<span>Register</span>
<span class="material-symbols-outlined text-lg font-bold">arrow_forward</span>
</button>
</form>
</transition>
</div>
<div class="relative py-2">
<div class="absolute inset-0 flex items-center">
<div class="w-full border-t border-slate-200 dark:border-slate-700"></div>
</div>
<div class="relative flex justify-center">
<span class="bg-white dark:bg-background-dark px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Or continue with</span>
</div>
</div>
<div class="grid grid-cols-2 gap-4">
<button class="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-[#d0dfe7] dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-[#0e171b] dark:text-slate-200 font-bold text-sm group">
<img alt="Google Logo" class="w-5 h-5 transition-transform group-hover:scale-110" data-alt="Google G Logo Color" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAddrZilh0cyBxlpT0utn38MLnp_HcZzYrntxq6RONW2j844Yd8KsbIwctlQUw37lPTFbbGqTMBMiiXP_LqteXVWVOZEoLC2SN4hSWbuWvZR43BeOJIloxzANa_D_f7omXK276Em1JFdh7g6LxiABBq5re2gi-QcUnldcw7KZKM2UXEido7Tnz7XWGONboHJ7eamkSRrvOCB739mMa4n6H2KDmWqVgsPu9NDi6m4M-c66vljWs_JYMlf9kbOFaGcTSLZo8N3SiubOh">
<span>Google</span>
</button>
<button class="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-[#d0dfe7] dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-[#0e171b] dark:text-slate-200 font-bold text-sm group">
<span class="material-symbols-outlined text-[24px] transition-transform group-hover:scale-110">ios</span>
<span>Apple</span>
</button>
</div>
</div>
</div>
<div class="py-6 border-t border-slate-50 dark:border-slate-800/50 mt-auto">
<p class="text-xs text-center text-slate-400">
                    Protected by reCAPTCHA and subject to the 
                    <a class="text-primary hover:underline" href="#">Privacy Policy</a> and 
                    <a class="text-primary hover:underline" href="#">Terms of Service</a>.
                </p>
</div>
</div>
</div>
<transition name="scale">
  <div
    v-if="showErrorModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div class="bg-white dark:bg-slate-900 rounded-xl p-6 w-[90%] max-w-sm text-center">
      <h3 class="text-lg font-bold text-red-600 mb-2">Error</h3>
      <p class="text-slate-600 dark:text-slate-300">
        {{ errorMessage }}
      </p>
      <button
        @click="showErrorModal = false"
        class="mt-5 px-6 py-2 bg-red-500 text-white rounded-lg"
      >
        Cerrar
      </button>
    </div>
  </div>
</transition>
<transition name="scale">
  <div
    v-if="showSuccessModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div class="bg-white dark:bg-slate-900 rounded-xl p-6 w-[90%] max-w-sm text-center">
      <h3 class="text-lg font-bold text-green-600 mb-2">Login exitoso 🎉</h3>
      <p class="text-slate-600 dark:text-slate-300">
        {{ welcomeMessage }}
      </p>
    </div>
  </div>
</transition>

</template>