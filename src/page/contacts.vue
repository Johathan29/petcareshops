<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrum from '../components/Breadcrum.vue'

/* form state */
const floating_email = ref('')
const floating_first_name = ref('')
const floating_last_name = ref('')
const floating_message = ref('')

/* breadcrumb */
const route = useRoute()
const breadCrumUrl = computed(() => route.path.split('/').filter(Boolean))

/* submit */
function sendData() {
  console.log({
    email: floating_email.value,
    firstName: floating_first_name.value,
    lastName: floating_last_name.value,
    message: floating_message.value
  })

  // aquí luego puedes hacer fetch / axios
}
</script>

<template>
  <BreadCrum :name="breadCrumUrl" />

  <!-- HERO -->
 

  <!-- CONTENT -->
  <section class="py-[4rem] bg-slate-50">
    <div class="max-w-screen-xl md:mx-auto px-[3rem]">

      <div class="layout-content-container flex flex-col w-full max-w-[1200px] mx-auto flex-1">
<div class="flex flex-col gap-3 pb-8">
<h1 class="text-3xl font-bold text-[#0F6CBD] dark:text-white tracking-tight text-left">Contacts</h1>
<p class="text-[#5a668c] dark:text-gray-400 text-left font-normal leading-normal ">
                        We're here to help with your furry friends. Whether you have questions about appointments, records, or our services, fill out the form below.
                    </p>
</div>
<div class="flex flex-col bg-white dark:bg-[#1a1d26] rounded-xl shadow-sm border border-[#e9ebf1] dark:border-[#2a2e3b] overflow-hidden mb-12">
<div class="flex flex-col lg:flex-row min-h-[600px]">
<div class="lg:w-2/5 bg-primary p-10 flex flex-col justify-between text-white relative overflow-hidden">
<div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none"></div>
<div class="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 rounded-full bg-white/5 pointer-events-none"></div>
<div class="relative z-10">
<h3 class="text-2xl font-bold mb-6">Contact Information</h3>
<p class="text-blue-100 mb-10 leading-relaxed">
                                    Prefer to reach out directly? Give us a call or drop by our office during business hours.
                                </p>
<div class="flex flex-col gap-8">
<div class="flex items-start gap-4">
<span class="material-symbols-outlined text-blue-200 mt-1">call</span>
<div>
<p class="font-semibold text-lg">+1 (555) 123-4567</p>
<p class="text-blue-200 text-sm">Mon-Fri, 9am - 6pm EST</p>
</div>
</div>
<div class="flex items-start gap-4">
<span class="material-symbols-outlined text-blue-200 mt-1">mail</span>
<div>
<p class="font-semibold text-lg">support@petmanager.app</p>
<p class="text-blue-200 text-sm">We reply within 24 hours</p>
</div>
</div>
<div class="flex items-start gap-4">
<span class="material-symbols-outlined text-blue-200 mt-1">location_on</span>
<div>
<p class="font-semibold text-lg">123 Kennel Lane</p>
<p class="text-blue-200 text-sm">Pet City, PC 90210</p>
</div>
</div>
</div>
</div>
<div class="relative z-10 mt-12">
<p class="text-sm text-blue-200 mb-4">Find us on social media:</p>
<div class="flex gap-4">
<a class="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" href="#">
<svg class="size-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
</a>
<a class="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" href="#">
<svg class="size-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
</a>
</div>
</div>
</div>
<div class="lg:w-3/5 p-6 md:p-10 flex flex-col justify-center">
<form class="flex flex-col gap-6">
<div class="flex flex-col md:flex-row gap-6">
<label class="flex flex-col flex-1">
<p class="text-[#101219] dark:text-gray-200 text-sm font-medium leading-normal pb-2">Full Name</p>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#101219] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d3d7e3] dark:border-[#3e4451] bg-[#f9f9fb] dark:bg-[#13161f] focus:border-primary h-12 placeholder:text-[#5a668c] dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-all" placeholder="Jane Doe" type="text">
</label>
<label class="flex flex-col flex-1">
<p class="text-[#101219] dark:text-gray-200 text-sm font-medium leading-normal pb-2">Email Address</p>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#101219] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d3d7e3] dark:border-[#3e4451] bg-[#f9f9fb] dark:bg-[#13161f] focus:border-primary h-12 placeholder:text-[#5a668c] dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-all" placeholder="jane@example.com" type="email">
</label>
</div>
<label class="flex flex-col w-full">
<p class="text-[#101219] dark:text-gray-200 text-sm font-medium leading-normal pb-2">Subject</p>
<div class="relative">
<select class="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#101219] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d3d7e3] dark:border-[#3e4451] bg-[#f9f9fb] dark:bg-[#13161f] focus:border-primary h-12 px-4 text-base font-normal leading-normal transition-all appearance-none cursor-pointer">
<option disabled="" selected="" value="">Select a topic</option>
<option value="appointment">Appointment Inquiry</option>
<option value="medical">Medical Records</option>
<option value="billing">Billing Question</option>
<option value="other">Other</option>
</select>
<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#5a668c] dark:text-gray-400">
<span class="material-symbols-outlined">expand_more</span>
</div>
</div>
</label>
<label class="flex flex-col w-full">
<p class="text-[#101219] dark:text-gray-200 text-sm font-medium leading-normal pb-2">Message</p>
<textarea class="form-textarea flex w-full min-w-0 flex-1 resize-none rounded-lg text-[#101219] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#d3d7e3] dark:border-[#3e4451] bg-[#f9f9fb] dark:bg-[#13161f] focus:border-primary min-h-[160px] placeholder:text-[#5a668c] dark:placeholder:text-gray-500 p-4 text-base font-normal leading-normal transition-all" placeholder="Tell us about your pet's needs..."></textarea>
</label>
<div class="pt-2">
<button class="w-full md:w-auto bg-primary hover:bg-[#1f3066] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2 group">
                                        Send Message
                                        <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">send</span>
</button>
</div>
</form>
</div>
</div>
<div class="w-full h-[400px] border-t border-[#e9ebf1] dark:border-[#2a2e3b] relative bg-gray-50 dark:bg-[#13161f]">
<iframe class="w-full h-full border-0 filter grayscale transition-all duration-300 hover:grayscale-0 dark:invert dark:hue-rotate-180 dark:brightness-75 dark:contrast-125" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-118.4214,34.0789,-118.3914,34.0989&amp;layer=mapnik" title="Office Location Map"></iframe>
<div class="absolute bottom-4 left-4 bg-white dark:bg-[#1a1d26] px-4 py-2 rounded-lg shadow-lg border border-[#e9ebf1] dark:border-[#2a2e3b] flex items-center gap-2 pointer-events-none">
<span class="material-symbols-outlined text-primary dark:text-blue-400 text-xl">location_on</span>
<div>
<p class="text-xs font-bold text-[#101219] dark:text-white">PetManager HQ</p>
<p class="text-[10px] text-[#5a668c] dark:text-gray-400">123 Kennel Lane</p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="bg-white pb-4">
  <div class="max-w-screen-xl md:mx-auto px-[3rem]">
<div class="mt-16 flex flex-col gap-8 mb-12 ">
<div class="flex flex-col gap-2 items-start text-left">
<h2 class="text-3xl font-bold text-[#0F6CBD] dark:text-white tracking-tight text-lef">Frequently Asked Questions</h2>
<p class="text-[#5a668c] dark:text-gray-400 text-base font-normal leading-normal max-w-2xl">
            Quick answers to common questions about our services and policies.
        </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-5xl mx-auto w-full">
<div class="bg-white dark:bg-[#1a1d26] rounded-xl border border-[#e9ebf1] dark:border-[#2a2e3b] overflow-hidden group">
<details class="group w-full">
<summary class="flex items-center justify-between p-6 cursor-pointer list-none select-none">
<span class="text-[#101219] dark:text-white font-semibold text-lg">What are your operating hours?</span>
<span class="material-symbols-outlined text-[#5a668c] transition-transform duration-300 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-6 pb-6 text-[#5a668c] dark:text-gray-400 leading-relaxed border-t border-[#e9ebf1] dark:border-[#2a2e3b] pt-4 mt-2">
                    We are open Monday through Friday from 9:00 AM to 6:00 PM EST. We are closed on weekends and major public holidays, though emergency services may be available by calling our hotline.
                </div>
</details>
</div>
<div class="bg-white dark:bg-[#1a1d26] rounded-xl border border-[#e9ebf1] dark:border-[#2a2e3b] overflow-hidden group">
<details class="group w-full">
<summary class="flex items-center justify-between p-6 cursor-pointer list-none select-none">
<span class="text-[#101219] dark:text-white font-semibold text-lg">Do you offer emergency care?</span>
<span class="material-symbols-outlined text-[#5a668c] transition-transform duration-300 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-6 pb-6 text-[#5a668c] dark:text-gray-400 leading-relaxed border-t border-[#e9ebf1] dark:border-[#2a2e3b] pt-4 mt-2">
                    Yes, we have an emergency veterinarian on call 24/7. For after-hours emergencies, please call our main line and follow the prompts to be connected to the on-call doctor.
                </div>
</details>
</div>
<div class="bg-white dark:bg-[#1a1d26] rounded-xl border border-[#e9ebf1] dark:border-[#2a2e3b] overflow-hidden group">
<details class="group w-full">
<summary class="flex items-center justify-between p-6 cursor-pointer list-none select-none">
<span class="text-[#101219] dark:text-white font-semibold text-lg">How do I book an appointment?</span>
<span class="material-symbols-outlined text-[#5a668c] transition-transform duration-300 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-6 pb-6 text-[#5a668c] dark:text-gray-400 leading-relaxed border-t border-[#e9ebf1] dark:border-[#2a2e3b] pt-4 mt-2">
                    You can book an appointment directly through our online portal under the 'Appointments' tab, or by calling our office during business hours. New clients will need to fill out a registration form first.
                </div>
</details>
</div>
<div class="bg-white dark:bg-[#1a1d26] rounded-xl border border-[#e9ebf1] dark:border-[#2a2e3b] overflow-hidden group">
<details class="group w-full">
<summary class="flex items-center justify-between p-6 cursor-pointer list-none select-none">
<span class="text-[#101219] dark:text-white font-semibold text-lg">What payment methods do you accept?</span>
<span class="material-symbols-outlined text-[#5a668c] transition-transform duration-300 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-6 pb-6 text-[#5a668c] dark:text-gray-400 leading-relaxed border-t border-[#e9ebf1] dark:border-[#2a2e3b] pt-4 mt-2">
                    We accept all major credit cards (Visa, MasterCard, Amex), debit cards, and cash. We also partner with pet insurance providers for direct billing in some cases.
                </div>
</details>
</div>
<div class="bg-white dark:bg-[#1a1d26] rounded-xl border border-[#e9ebf1] dark:border-[#2a2e3b] overflow-hidden group">
<details class="group w-full">
<summary class="flex items-center justify-between p-6 cursor-pointer list-none select-none">
<span class="text-[#101219] dark:text-white font-semibold text-lg">Can I access my pet's medical records online?</span>
<span class="material-symbols-outlined text-[#5a668c] transition-transform duration-300 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-6 pb-6 text-[#5a668c] dark:text-gray-400 leading-relaxed border-t border-[#e9ebf1] dark:border-[#2a2e3b] pt-4 mt-2">
                    Absolutely! Once you create an account on our PetManager portal, you can view vaccination history, upcoming appointments, and past treatment records securely online.
                </div>
</details>
</div>
<div class="bg-white dark:bg-[#1a1d26] rounded-xl border border-[#e9ebf1] dark:border-[#2a2e3b] overflow-hidden group">
<details class="group w-full">
<summary class="flex items-center justify-between p-6 cursor-pointer list-none select-none">
<span class="text-[#101219] dark:text-white font-semibold text-lg">Do you treat exotic pets?</span>
<span class="material-symbols-outlined text-[#5a668c] transition-transform duration-300 group-open:rotate-180">expand_more</span>
</summary>
<div class="px-6 pb-6 text-[#5a668c] dark:text-gray-400 leading-relaxed border-t border-[#e9ebf1] dark:border-[#2a2e3b] pt-4 mt-2">
                    Our primary focus is on cats and dogs. However, we have a specialist on staff who sees small mammals (rabbits, guinea pigs) on select days. Please call ahead to confirm availability.
                </div>
</details>
</div>
</div>
</div>
<div class="mt-4 flex justify-center">
<p class="text-[#5a668c] dark:text-gray-400 text-sm text-center">
                        Still have questions? Reach out directly via the form above or check our full <a class="text-primary dark:text-blue-400 font-semibold hover:underline" href="#">Help Center</a>.
                    </p>
</div>

</div>
  </section>
</template>

<style scoped>
  .bg-primary {
    background-color: #0F6CBD;
}
.input-floating {
  @apply block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
  border-0 border-b-2 border-gray-300 appearance-none
  focus:outline-none focus:ring-0 focus:border-blue-600;
}

.input-floating + label {
  @apply absolute text-sm text-gray-500 duration-300 transform
  -translate-y-6 scale-75 top-3 origin-[0];
}
</style>
