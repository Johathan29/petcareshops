<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "../components/Auth/LoginForm.vue";
import RegisterForm from "../components/Auth/RegisterForm.vue";
import { supabase } from "../config/supabase";
const authMode = ref("login");
const setAuthMode = (mode: "login" | "register") => {
  authMode.value = mode;
};

const loginWithGoogle = async () => {
  const { data,error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://hsdtlmycrajelwnoarcz.supabase.co/auth/v1/callback",
    },
  });

  if (error) {
    console.error(error.message);
  }
};
const loginWithFacebook = async () => {
  const { data,error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "https://hsdtlmycrajelwnoarcz.supabase.co/auth/v1/callback",
    },
  });
  console.log(data);
sessionStorage.setItem("user",JSON.stringify(data))
  if (error) {
    console.error(error.message);
  }
};
</script>

<template>
  <div class="flex h-screen w-full relative">
    <div
      class="hidden lg:flex lg:w-1/2 relative bg-slate-200 dark:bg-slate-800 overflow-hidden"
    >
      <div
        class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
        data-alt="A happy golden retriever dog sitting next to a white cat on a grassy field"
        style="
          background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuDrgzZoR76YLCsEIhDU0ItoYVtYVdE6nUtcPyMQifA0QjuPwrQNUZu2CEE7rQcYaUTTSK3iMSZC1839A2CQibFWbpxLg3ojQP4BNb2G080kllOv8t39jZL9iXPmEiSQrgWJ_3cUb-jayKKnQB0pSrptKBs8QtB0TcLAsb-iqRm6OVSYRAHuKIADGMzLncqVum2qn_--TpcZ2zgfCeh6icK8b2xgX_ExWo0FX9KWz0i5Mm1dthcpNUTCzxiYbAKYKKi_rYoJYP81gB9L&quot;);
        "
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#111c21]/80 via-[#111c21]/20 to-transparent flex flex-col justify-end p-16 text-white"
      >
        <div class="max-w-lg text-left">
          <div
            class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-md border border-white/10"
          >
            <span class="material-symbols-outlined text-white text-2xl"
              >pets</span
            >
          </div>
          <h2
            class="text-[3.25rem] font-bold leading-tight mb-4 drop-shadow-sm"
          >
            Everything your pet needs, right at your fingertips.
          </h2>
          <p
            class="text-lg text-slate-200 font-medium leading-relaxed drop-shadow-sm"
          >
            Track vaccinations, schedule vet appointments, and manage your furry
            friend's diet all in one place.
          </p>
        </div>
      </div>
    </div>
    <div
      class="w-full lg:w-1/2 flex flex-col h-full bg-white dark:bg-background-dark relative shadow-2xl lg:shadow-none overflow-y-auto page-scrollbar"
    >
      <header
        class="flex items-center justify-between px-6 py-5 lg:px-12 border-b border-slate-100 dark:border-slate-800 lg:border-none"
      >
        <div class="flex items-center gap-3 text-[#0e171b] dark:text-white">
          <div class="size-8 text-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-3xl">pets</span>
          </div>
          <h2 class="text-xl font-bold tracking-tight">PetCare App</h2>
        </div>
        <router-link
          to="/"
          class="group hidden sm:flex h-9 items-center transition duration-700 ease-in-out justify-center rounded-lg px-4 bg-[#19a1e6]/30 hover:bg-[#19a1e6]/50 hover:text-white hover:scale-[1.1] text-slate-500 text-sm font-bold transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            width="24px "
            class="group-hover:-translate-x-4 duration-300 transition group-hover:fill-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M4 12H20M4 12L8 8M4 12L8 16"
                stroke="#485364"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
          Home page
        </router-link>
      </header>
      <div
        class="flex-1 flex flex-col justify-center items-center px-6 py-10 sm:py-12 lg:px-16 xl:px-24"
      >
        <div class="w-full max-w-md sm:max-w-lg space-y-8">
          <div
            class="bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-xl flex relative"
          >
            <!-- LOGIN -->
            <button
              type="button"
              @click="setAuthMode('login')"
              class="flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200"
              :class="
                authMode === 'login'
                  ? 'bg-[#19a1e6] text-white shadow-md shadow-[#19a1e6]'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              "
            >
              Login
            </button>

            <!-- REGISTER -->
            <button
              type="button"
              @click="setAuthMode('register')"
              class="flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200"
              :class="
                authMode === 'register'
                  ? 'bg-[#19a1e6] text-white shadow-md shadow-[#19a1e6]'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              "
            >
              Register
            </button>
          </div>

          <div class="space-y-2 text-center">
            <h1
              class="text-3xl font-bold text-[#0e171b] dark:text-white tracking-tight"
            >
              {{ authMode === "login" ? "Welcome Back" : "Create Account" }}
            </h1>
            <p class="text-slate-500 dark:text-slate-400">
              {{
                authMode === "login"
                  ? "Enter your credentials to access your account."
                  : "Fill the form to create your account."
              }}
            </p>
          </div>
          <div
            class="relative transition-all duration-500 ease-in-out"
            :class="authMode === 'login' ? 'min-h-[320px]' : 'min-h-[730px]'"
          >
            <transition name="auth-smooth" mode="out-in">
              <div v-if="authMode === 'login'">
                <LoginForm />
              </div>
              <div v-else>
                <RegisterForm />
              </div>
            </transition>
          </div>

          <div class="relative py-2">
            <div class="absolute inset-0 flex items-center">
              <div
                class="w-full border-t border-slate-200 dark:border-slate-700"
              ></div>
            </div>
            <div class="relative flex justify-center">
              <span
                class="bg-white dark:bg-background-dark px-4 text-xs font-medium text-slate-500 uppercase tracking-wider"
                >Or continue with</span
              >
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <button
              @click="loginWithGoogle"
              class="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-[#d0dfe7] rounded-lg bg-white hover:bg-slate-50 transition-all font-bold text-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                class="w-5 h-5"
              />
              <span>Google</span>
            </button>
            <button
              @click="loginWithFacebook"
              class="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-[#1877F2] rounded-lg bg-[#1877F2] hover:bg-[#166FE5] transition-all font-bold text-sm text-white"
            >
              <i class="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
      <div
        class="py-6 border-t border-slate-50 dark:border-slate-800/50 mt-auto"
      >
        <p class="text-xs text-center text-slate-400">
          Protected by reCAPTCHA and subject to the
          <a class="text-primary hover:underline" href="#">Privacy Policy</a>
          and
          <a class="text-primary hover:underline" href="#">Terms of Service</a>.
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.auth-smooth-enter-active,
.auth-smooth-leave-active {
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-smooth-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.auth-smooth-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.auth-smooth-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.auth-smooth-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>
