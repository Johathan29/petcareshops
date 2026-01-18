<script setup lang="ts">
import CardTestimonio from '../components/UI/cardTestimonio.vue';

 const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Dog Owner",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBEArkGOFoAv_4LV_1dvqQY5jvcqoV0_1TtJkStRPrudmRjnqJyraf32UTijDZBzDS8wqNnavaZCN4WOUsOvza760HMgDno-TYgWJv80T9431YZBANOD3wU264rz6bB_7ceDv7km9Z9lAHZjJcInJDG0_EGl45XwjrvydFWvJUpogvv3yCol_nXMWvi0I1oiOGpvR6zRnKnhajqDiQ1X2_xq0uGbzZ1DdB-k4VWsRi8Cg65ZWeUDUxvDm1R87yWjoc5Py7nc5yY1SLt",
    quote:
      "PetManager has been a lifesaver for keeping track of Bella's vaccinations and vet appointments. The interface is so intuitive and I love the reminders!",
    rating: 5
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Veterinarian",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFP5xGMfboLS4z9edwxTo_HcdPDQGnF0H6kvTQO9iJtQ2_Z42n5foR_H4RDr6YapqymhvqaetvZ1vuO75atyWS5ZUiPqdzGr6hjn3mDcYINGqEY8Wrl1ddZueu6WEabYHxeyiw-eRjl1m25kCQQbxuXBnFYe9dgRiwbBeaTbe3yWt-4KGuluq9BFpzxYBHxNXWUw1DcqHFbJ5l42FW9mVUschM0cVwzoMCIN3skbfH8ZVRM7ZYhhItS2wfz3Pdck7jeYrE1yPWjqgF",
    quote:
      "As a vet, I recommend this app to all my clients. It makes sharing medical history and dietary needs incredibly seamless between the clinic and home.",
    rating: 4.5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Cat Lover",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBoBTCgFnRYppqcZsw0qStqKv__WRtGdOccEso7RuNuh5yhEYLf8LiWC59HnXrHdFqe8PwJcZplGyv3za-A9xNRkeKfLIqgBRZvwiRz4to-OA0Jdjpfia0tg0aj0tsy_jXFhwKt4Oyq3Z7GugOv-1fFP6UxeKP7Sfk7qNaubS3nd5vDsngGsqMb90OOpEkLKnyt_sXHDvDrHK4PTXztdhfg3sTpgQZxyzIYqVzkw15lPPdzh6zPYPMkJ4g6bSwtJ4xkt2Pej8uZY_JX",
    quote:
      "I have three cats with different dietary needs. The new nutrition tracking feature is fantastic! I can finally keep everything organized without spreadsheets.",
    rating: 5
  }
]
const handleLike = (testimonial: Testimonial) => {
  console.log("Liked:", testimonial.name)
}
</script>
<template>
    <section class="py-12 " >
        <div class="max-w-screen-xl mx-auto px-4">
<div class="text-center mb-12">
<h2 class="text-3xl font-bold text-[#0F6CBD] dark:text-white tracking-tight text-left">What Our Users Say</h2>
<p class="text-slate-500 dark:text-slate-400 text-base text-left">
            Trusted by pet owners and veterinarians across the globe. See how PetManager has simplified their lives.
        </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<CardTestimonio v-for="item in testimonials"
  :key="item.id"
  :testimonial="item"
  ></CardTestimonio>
</div>
</div>
</section>
</template>