<script setup lang="ts">
import { ref } from "vue"
import { supabase } from "../../config/supabase"

const avatarFile = ref<File | null>(null)
const avatarPreview = ref<string | null>(null)

const form = ref({
  insertEmail: "",
  insertPassword: "",
  passwordConfirmation: "",
  insert_username: "",
  insert_phone: ""
})

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files?.length) return

  const file = target.files[0]

  // VALIDAR TIPO
  if (!file.type.startsWith("image/")) {
    alert("Only image files are allowed")
    return
  }

  // VALIDAR TAMAÑO (2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert("Image must be less than 2MB")
    return
  }

  avatarFile.value = file
  avatarPreview.value = URL.createObjectURL(file)
}

const register = async () => {

  if (form.value.insertPassword !== form.value.passwordConfirmation) {
    alert("Passwords do not match")
    return
  }

  const { data, error } = await supabase.auth.signUp({
    email: form.value.insertEmail,
    password: form.value.insertPassword,
    options: {
      data: {
        first_name: form.value.insert_username,
        phone: form.value.insert_phone,
      }
    }
  })

  if (error) {
    alert(error.message)
    return
  }

  if (!data.user) {
    alert("User not created")
    return
  }

  // SUBIR AVATAR
  if (avatarFile.value) {

    const fileExt = avatarFile.value.name.split(".").pop()
    const filePath = `${data.user.id}/avatar.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile.value, { upsert: true })

   if (!uploadError) {

  const { data: publicUrl } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath)

  const avatarUrl = publicUrl.publicUrl
console.log(data.user.id)
  await supabase.from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id",data.user.id )
}
  }

  alert("User registered successfully")
}
</script>
<template>
        <form key="register" @submit.prevent="register" class="absolute inset-0 space-y-5 text-left px-4">
<div class="space-y-1.5">
  <label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block">
    Avatar
  </label>

  <input
    type="file"
    accept="image/*"
    @change="handleFileChange"
    class="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-sm"
  />
  <div v-if="avatarPreview" class="mt-3">
  <img 
    :src="avatarPreview"
    class="w-24 h-24 rounded-full object-cover border"
  />
</div>
</div>
                <div class="space-y-1.5">
                  <label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block" for="name">Full Name</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none ">
                      <span
                        class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
                        <svg viewBox="0 0 16 16" class="absolute" width="100%" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                              fill="#9facbf"></path>
                            <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                              fill="#9facbf"></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                    <input
                      class="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      id="insert_username" placeholder="John Doe" required v-model="form.insert_username" type="text">
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block" for="phone">Phone</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none ">
                      <span
                        class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
                        <svg viewBox="0 0 16 16" class="absolute" width="100%" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                              fill="#9facbf"></path>
                            <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                              fill="#9facbf"></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                    <input
                      class="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      id="insert_phone" placeholder="888-888-8888" required v-model="form.insert_phone" type="tel" />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block" for="email">Email
                    Address</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span
                        class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
                          class="absolute">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#94a3b8"
                              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="#94a3b8" stroke-width="2"
                              stroke-linecap="round"></rect>
                          </g>
                        </svg>
                      </span>
                    </div>
                    <input v-model="form.insertEmail"
                      class="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      id="insertEmail" placeholder="name@example.com" required type="email">
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block"
                    for="password">Password</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span
                        class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
                        <svg fill="#94a3b8" viewBox="-3 0 32 32" width="100%" class="absolute"
                          xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M23.000,32.000 L3.000,32.000 C1.346,32.000 0.000,30.654 0.000,29.000 L0.000,14.000 C0.000,12.346 1.346,11.000 3.000,11.000 L5.000,11.000 L5.000,8.000 C5.000,3.589 8.589,-0.000 13.000,-0.000 C17.411,-0.000 21.000,3.589 21.000,8.000 L21.000,11.000 L23.000,11.000 C24.654,11.000 26.000,12.346 26.000,14.000 L26.000,29.000 C26.000,30.654 24.654,32.000 23.000,32.000 ZM19.000,8.000 C19.000,4.691 16.309,2.000 13.000,2.000 C9.691,2.000 7.000,4.691 7.000,8.000 L7.000,11.000 L19.000,11.000 L19.000,8.000 ZM24.000,14.000 C24.000,13.448 23.552,13.000 23.000,13.000 L3.000,13.000 C2.448,13.000 2.000,13.448 2.000,14.000 L2.000,29.000 C2.000,29.552 2.448,30.000 3.000,30.000 L23.000,30.000 C23.552,30.000 24.000,29.552 24.000,29.000 L24.000,14.000 ZM14.000,20.722 L14.000,24.000 C14.000,24.553 13.553,25.000 13.000,25.000 C12.447,25.000 12.000,24.553 12.000,24.000 L12.000,20.722 C11.405,20.375 11.000,19.737 11.000,19.000 C11.000,17.898 11.897,17.000 13.000,17.000 C14.102,17.000 15.000,17.898 15.000,19.000 C15.000,19.737 14.595,20.375 14.000,20.722 Z">
                            </path>
                          </g>
                        </svg>
                      </span>
                    </div>
                    <input v-model="form.insertPassword"
                      class="w-full h-12 pl-11 pr-12 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      id="insertPassword" placeholder="••••••••" required type="password">
                    <button
                      class="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      type="button">
                      <span class="material-symbols-outlined text-[20px] relative flex items-center w-[21px]">
                        <svg viewBox="0 0 24 24" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                              fill="#94a3b8"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z"
                              fill="#94a3b8"></path>
                          </g>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-sm font-bold text-[#0e171b] dark:text-slate-200 block"
                    for="password_confirmation">Confirm Password</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span
                        class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px] flex items-center relative w-[21px]">
                        <svg fill="#94a3b8" viewBox="-3 0 32 32" width="100%" class="absolute"
                          xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M23.000,32.000 L3.000,32.000 C1.346,32.000 0.000,30.654 0.000,29.000 L0.000,14.000 C0.000,12.346 1.346,11.000 3.000,11.000 L5.000,11.000 L5.000,8.000 C5.000,3.589 8.589,-0.000 13.000,-0.000 C17.411,-0.000 21.000,3.589 21.000,8.000 L21.000,11.000 L23.000,11.000 C24.654,11.000 26.000,12.346 26.000,14.000 L26.000,29.000 C26.000,30.654 24.654,32.000 23.000,32.000 ZM19.000,8.000 C19.000,4.691 16.309,2.000 13.000,2.000 C9.691,2.000 7.000,4.691 7.000,8.000 L7.000,11.000 L19.000,11.000 L19.000,8.000 ZM24.000,14.000 C24.000,13.448 23.552,13.000 23.000,13.000 L3.000,13.000 C2.448,13.000 2.000,13.448 2.000,14.000 L2.000,29.000 C2.000,29.552 2.448,30.000 3.000,30.000 L23.000,30.000 C23.552,30.000 24.000,29.552 24.000,29.000 L24.000,14.000 ZM14.000,20.722 L14.000,24.000 C14.000,24.553 13.553,25.000 13.000,25.000 C12.447,25.000 12.000,24.553 12.000,24.000 L12.000,20.722 C11.405,20.375 11.000,19.737 11.000,19.000 C11.000,17.898 11.897,17.000 13.000,17.000 C14.102,17.000 15.000,17.898 15.000,19.000 C15.000,19.737 14.595,20.375 14.000,20.722 Z">
                            </path>
                          </g>
                        </svg>
                      </span>
                    </div>
                    <input v-model="form.passwordConfirmation"
                      class="w-full h-12 pl-11 pr-12 bg-slate-50 dark:bg-slate-800 border border-[#d0dfe7] dark:border-slate-700 rounded-lg text-base text-[#0e171b] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      id="passwordConfirmation" placeholder="••••••••" required type="password">
                  </div>
                </div>
                <button
                  class="w-full h-12 bg-primary hover:bg-[#158cc7] text-white font-bold rounded-lg shadow-md shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-wide"
                  type="submit">
                  <span>Register</span>
                  <span class="material-symbols-outlined text-lg font-bold">arrow_forward</span>
                </button>
              </form>
</template>

<style scoped>

</style>