<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import data from '../Data'
import Breadcrum from '../components/Breadcrum.vue';
const route = useRoute()
const diseasesId = computed(() => Number(route.params.id))
const diseases = computed(() =>
  data.value[2].find(item => item.id === diseasesId.value)
)
const breadCrumUrl = computed(() => [
  'Diseases',
  diseases.value?.title || ''
])


</script>
<template>
  <Breadcrum :name="breadCrumUrl"></Breadcrum>
<section class="bg-slate-50 dark:bg-[#0F6CBD] py-12 border-b-2 border-gray-500/10">

  <div class="max-w-screen-xl md:mx-auto px-5">
      <div class=" mb-10">
<div class="flex items-center gap-3 mb-6">
<span  :class="diseases.color" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 shadow-sm">
              {{ diseases.type }}
            </span>
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
<span class="material-symbols-outlined text-[14px] mr-1">schedule</span> 5 min read
            </span>
</div>
<h1 class="text-4xl text-left sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 leading-tight">
            Canine Parvovirus: {{ diseases.title }}
        </h1>
<p class="text-lg text-left text-slate-600 dark:text-slate-300 ">
            Parvovirus is a highly contagious viral illness that affects dogs, particularly puppies. Understanding the symptoms and acting fast can save your pet's life.
        </p>
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
<div class="flex items-center gap-4">
<div class="h-10 w-10 rounded-full bg-cover bg-center border border-slate-200 dark:border-slate-700" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLIVrf7NxI27eGtuVStYCuK4v-Ittg2L8innuq-c-WG5pzA6WN6-bhhNjuDsmTqa6Xfo318kdp6RGwlsjCPVlOwI78tigPlsMJzsaQlV2V-QP3VRbTPhHkoUSm0Wy6yuGdUubDlqxwkPiooKuUQh3yIbfC4-Hi4VzHqfrzwZe5G1AC70v4rJOsW82ormVqPH3RhlMSmTNmZv3nQ4O72z6CQcOZMeZ7UZphcIsVxkhcR7mc5DLCAAdI669Ombzc0Z3DBr7t1lkutxDi');"></div>
<div>
<div class="text-sm font-semibold text-slate-900 dark:text-white">Medically Reviewed by Dr. Michael Chen</div>
<div class="text-xs text-slate-500 dark:text-slate-400">Last updated: October 24, 2023</div>
</div>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 transition-all shadow-sm">
<span class="material-symbols-outlined text-[20px]">bookmark</span>
<span class="hidden sm:inline">Save</span>
</button>
<button class="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-95">
<span class="material-symbols-outlined text-[20px]">ios_share</span>
<span>Share Article</span>
</button>
</div>
</div>
</div>
<div class="relative w-full aspect-[21/9] h-max rounded-3xl overflow-hidden mb-12 shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
<img alt="Dog resting with sad expression indicating illness" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLIVrf7NxI27eGtuVStYCuK4v-Ittg2L8innuq-c-WG5pzA6WN6-bhhNjuDsmTqa6Xfo318kdp6RGwlsjCPVlOwI78tigPlsMJzsaQlV2V-QP3VRbTPhHkoUSm0Wy6yuGdUubDlqxwkPiooKuUQh3yIbfC4-Hi4VzHqfrzwZe5G1AC70v4rJOsW82ormVqPH3RhlMSmTNmZv3nQ4O72z6CQcOZMeZ7UZphcIsVxkhcR7mc5DLCAAdI669Ombzc0Z3DBr7t1lkutxDi">
<div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
<div class="lg:col-span-4 lg:order-2 space-y-8">
<div class="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm sticky top-24">
<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">info</span>
                    At a Glance
                </h3>
<div class="space-y-6">
<div class="flex items-start gap-4">
<div class="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 shrink-0">
<span class="material-symbols-outlined">warning</span>
</div>
<div>
<h4 class="text-sm font-bold text-slate-900 dark:text-white">Severity</h4>
<p class="text-sm text-slate-600 dark:text-slate-400">Critical. Requires immediate veterinary attention.</p>
</div>
</div>
<div class="flex items-start gap-4">
<div class="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0">
<span class="material-symbols-outlined">pets</span>
</div>
<div>
<h4 class="text-sm font-bold text-slate-900 dark:text-white">Affected Species</h4>
<p class="text-sm text-slate-600 dark:text-slate-400">Dogs, Wolves, Foxes. Cats have a related virus (Panleukopenia).</p>
</div>
</div>
<div class="flex items-start gap-4">
<div class="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 shrink-0">
<span class="material-symbols-outlined">vaccines</span>
</div>
<div>
<h4 class="text-sm font-bold text-slate-900 dark:text-white">Prevention</h4>
<p class="text-sm text-slate-600 dark:text-slate-400">Core vaccination (DAPP/DHPP) is highly effective.</p>
</div>
</div>
</div>
<div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
<div class="bg-gray-500/10 dark:bg-primary/10 rounded-xl p-4 border border-primary/10 dark:border-primary/20">
<h4 class="text-sm font-bold text-primary mb-2">Need a Veterinarian?</h4>
<p class="text-xs text-slate-600 dark:text-slate-300 mb-4">Don't wait if you suspect Parvo. Early treatment improves survival rates dramatically.</p>
<button class="w-full py-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg shadow-sm transition-all active:scale-95">
                            Find Clinic Nearby
                        </button>
</div>
</div>
</div>
<div class="hidden lg:block">
<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Related Conditions</h3>
<div class="space-y-4">
<a class="group flex gap-4 items-center bg-white dark:bg-surface-dark p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:shadow-md" href="#">
<img alt="Lyme Disease" class="w-16 h-16 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1AW26knWed7RlbWBYYtyCl3kWGnWJ3bJahhYz5-OEodWohzllKhvhgV2TXqWzltyQpTxnDal-NGqtGq3K7uqNn5EUsJZzKrtHeHg0StbAqTCsOlm6JS65x0L51EA0r7e6qbKDFqh1d1-hsWWXmTsxaCBTYxDR9HY_4lb8eG8meFpc25TH7lCz0YmEl4kannKEe0QaY4B22gaGbrWLk5o8OrDMf-lTSq5SBMQgPLn07PDiuplt6fiGec841Ni82glLB5v0SUlEDUDD">
<div>
<h4 class="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Lyme Disease</h4>
<span class="text-xs text-slate-500">Bacterial Infection</span>
</div>
</a>
<a class="group flex gap-4 items-center bg-white dark:bg-surface-dark p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:shadow-md" href="#">
<img alt="Kennel Cough" class="w-16 h-16 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZR1yEy0CtRVO1LdxagMOO_RSnQ-rJBovG61wlu-hOe7mGyzhTLaSG-9C1tEMTIk8tx7y5lvoZDJeM5C7DZ7B7XdhSj65WanjobDYot7s1KGb0r8rRjmkwk0GNLzQFxAIAC-yAQf5q562iWNQtLgmrhn43vzlmwaVg66JM0v9EKSfg8TR5Ctr7UK-terJ0Kjr3T6r1pCIZkbSQ0WVo-W_j00pNRetwo7gs1DB33JoN0muLLcQHfWo2hsQ_4RyQIV8ajhSuEhIrlnG_">
<div>
<h4 class="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Kennel Cough</h4>
<span class="text-xs text-slate-500">Respiratory Infection</span>
</div>
</a>
</div>
</div>
</div>
<div class="lg:col-span-8 lg:order-1 text-slate-600 dark:text-slate-300 space-y-12">
<section>
<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Understanding the Virus</h2>
<p class="mb-4 leading-relaxed text-lg text-left">
                    Canine parvovirus (CPV) is a highly contagious virus that can affect all dogs, but unvaccinated dogs and puppies younger than four months old are the most at risk. The virus affects dogs' gastrointestinal tracts and is spread by direct dog-to-dog contact and contact with contaminated feces, environments, or people.
                </p>
<p class="leading-relaxed text-lg text-left">
                    The virus can survive in the environment for long periods, making it difficult to eradicate without proper disinfection. It is resistant to heat, cold, humidity, and drying.
                </p>
</section>
<section class="bg-white dark:bg-surface-dark rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
<span class="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
<span class="material-symbols-outlined text-[20px]">medical_services</span>
</span>
                    Signs &amp; Symptoms
                </h2>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
<div class="flex gap-4">
<span class="material-symbols-outlined text-red-500 mt-1">sick</span>
<div>
<h3 class="font-bold text-slate-900 dark:text-white">Severe Vomiting</h3>
<p class="text-sm mt-1">Often the first sign, leading to rapid dehydration.</p>
</div>
</div>
<div class="flex gap-4">
<span class="material-symbols-outlined text-red-500 mt-1">water_drop</span>
<div>
<h3 class="font-bold text-slate-900 dark:text-white">Bloody Diarrhea</h3>
<p class="text-sm mt-1">Often with a very distinct, strong metallic smell.</p>
</div>
</div>
<div class="flex gap-4">
<span class="material-symbols-outlined text-red-500 mt-1">sentiment_very_dissatisfied</span>
<div>
<h3 class="font-bold text-slate-900 dark:text-white">Lethargy</h3>
<p class="text-sm mt-1">Extreme tiredness, lack of interest in play or food.</p>
</div>
</div>
<div class="flex gap-4">
<span class="material-symbols-outlined text-red-500 mt-1">thermometer</span>
<div>
<h3 class="font-bold text-slate-900 dark:text-white">Fever or Hypothermia</h3>
<p class="text-sm mt-1">Body temperature fluctuations are common.</p>
</div>
</div>
</div>
</section>
<section class="text-left">
<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Transmission Causes</h2>
<p class="mb-6 leading-relaxed text-lg">
                    Parvovirus is shed in the feces of infected dogs. Transmission occurs through:
                </p>
<ul class="list-none space-y-3 mb-6">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1 text-[20px]">check_circle</span>
<span>Direct contact with an infected dog.</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1 text-[20px]">check_circle</span>
<span>Indirect contact with contaminated objects (food bowls, shoes, clothes).</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1 text-[20px]">check_circle</span>
<span>Sniffing contaminated soil or grass in parks.</span>
</li>
</ul>
<div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
<p class="text-sm text-blue-800 dark:text-blue-200">
<strong>Did you know?</strong> The virus can live in soil for up to a year. It is resistant to most household cleaners. Bleach is one of the few effective disinfectants against parvo.
                    </p>
</div>
</section>
<section class="text-left">
<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Treatment &amp; Recovery</h2>
<p class="mb-4 leading-relaxed text-lg">
                    There is no specific drug to kill the virus in infected dogs, so treatment is supportive. This means the goal is to support the dog's body systems until their immune system can fight off the viral infection.
                </p>
<p class="mb-6 leading-relaxed text-lg">
                    Hospitalization is often required. Treatment typically consists of:
                </p>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div class="p-4 bg-white dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
<h4 class="font-bold text-slate-900 dark:text-white mb-2">IV Fluids</h4>
<p class="text-sm">To combat dehydration and electrolyte imbalances from vomiting and diarrhea.</p>
</div>
<div class="p-4 bg-white dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
<h4 class="font-bold text-slate-900 dark:text-white mb-2">Antibiotics</h4>
<p class="text-sm">To prevent secondary bacterial infections which can be fatal.</p>
</div>
<div class="p-4 bg-white dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
<h4 class="font-bold text-slate-900 dark:text-white mb-2">Anti-Nausea Meds</h4>
<p class="text-sm">To stop vomiting and allow the dog to rest and eventually eat.</p>
</div>
<div class="p-4 bg-white dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
<h4 class="font-bold text-slate-900 dark:text-white mb-2">Nutritional Support</h4>
<p class="text-sm">Sometimes involving a feeding tube if the dog cannot eat on their own.</p>
</div>
</div>
</section>
</div>
</div>
<div class="my-20 py-10 border-t border-slate-200 dark:border-slate-800">
<div class="flex items-center justify-between mb-8">
<h2 class="text-2xl font-bold text-slate-900 dark:text-white">Related Articles</h2>
<a class="hidden sm:flex items-center gap-1 text-primary hover:text-primary-dark font-medium text-sm transition-colors" href="#">
                View Library <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<a class="group block bg-white shadow-md rounded-2xl pb-5  " href="#">
<div class="aspect-[16/9] w-full rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4 border border-slate-200 dark:border-slate-700 relative">
<img alt="Related" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZR1yEy0CtRVO1LdxagMOO_RSnQ-rJBovG61wlu-hOe7mGyzhTLaSG-9C1tEMTIk8tx7y5lvoZDJeM5C7DZ7B7XdhSj65WanjobDYot7s1KGb0r8rRjmkwk0GNLzQFxAIAC-yAQf5q562iWNQtLgmrhn43vzlmwaVg66JM0v9EKSfg8TR5Ctr7UK-terJ0Kjr3T6r1pCIZkbSQ0WVo-W_j00pNRetwo7gs1DB33JoN0muLLcQHfWo2hsQ_4RyQIV8ajhSuEhIrlnG_">
</div>
<div class="flex items-center gap-2 mb-2 px-5 ">
<span class="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 px-2 py-0.5 rounded-full">Prevention</span>
<span class="text-xs text-slate-500">4 min read</span>
</div>
<h3 class="text-lg font-bold text-slate-900 dark:text-white px-5 group-hover:text-[#0F6CBD] text-left transition-colors mb-2">Essential Vaccination Schedule for Puppies</h3>
<p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 px-5 text-left">Learn when to vaccinate your puppy against Parvovirus and other core diseases.</p>
</a>
<a class="group block bg-white shadow-md rounded-2xl pb-5" href="#">
<div class="aspect-[16/9] w-full rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4 border border-slate-200 dark:border-slate-700 relative">
<img alt="Related" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1AW26knWed7RlbWBYYtyCl3kWGnWJ3bJahhYz5-OEodWohzllKhvhgV2TXqWzltyQpTxnDal-NGqtGq3K7uqNn5EUsJZzKrtHeHg0StbAqTCsOlm6JS65x0L51EA0r7e6qbKDFqh1d1-hsWWXmTsxaCBTYxDR9HY_4lb8eG8meFpc25TH7lCz0YmEl4kannKEe0QaY4B22gaGbrWLk5o8OrDMf-lTSq5SBMQgPLn07PDiuplt6fiGec841Ni82glLB5v0SUlEDUDD">
</div>
<div class="flex items-center gap-2 mb-2 px-5">
<span class="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-300 px-2 py-0.5 rounded-full">Health</span>
<span class="text-xs text-slate-500">6 min read</span>
</div>
<h3 class="text-lg font-bold text-slate-900 dark:text-white px-5 group-hover:text-[#0F6CBD] text-left transition-colors mb-2">Recognizing Early Signs of Dehydration</h3>
<p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 text-left px-5">Dehydration can escalate quickly. Here is how to spot it before it becomes critical.</p>
</a>
<a class="group block bg-white shadow-md rounded-2xl pb-5" href="#">
<div class="aspect-[16/9] w-full rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4 border border-slate-200 dark:border-slate-700 relative">
<img alt="Related" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLIVrf7NxI27eGtuVStYCuK4v-Ittg2L8innuq-c-WG5pzA6WN6-bhhNjuDsmTqa6Xfo318kdp6RGwlsjCPVlOwI78tigPlsMJzsaQlV2V-QP3VRbTPhHkoUSm0Wy6yuGdUubDlqxwkPiooKuUQh3yIbfC4-Hi4VzHqfrzwZe5G1AC70v4rJOsW82ormVqPH3RhlMSmTNmZv3nQ4O72z6CQcOZMeZ7UZphcIsVxkhcR7mc5DLCAAdI669Ombzc0Z3DBr7t1lkutxDi">
</div>
<div class="flex items-center gap-2 mb-2 px-5">
<span class="text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-300 px-2 py-0.5 rounded-full">Diet</span>
<span class="text-xs text-slate-500">3 min read</span>
</div>
<h3 class="text-lg font-bold text-slate-900 dark:text-white px-5 group-hover:text-[#0F6CBD] text-left transition-colors mb-2">Recovery Diets for Sensitive Stomachs</h3>
<p class="text-sm text-left text-slate-600 dark:text-slate-400 line-clamp-2 text-left px-5">What to feed your dog when they are recovering from gastrointestinal issues.</p>
</a>
</div>
</div>
  </div>
</section>

</template>
<style scoped>
  .aspect-\[21\/9\] {
    aspect-ratio: 21 / 9;
}
</style>