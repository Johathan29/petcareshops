<script setup lang="ts">
import { defineProps, ref, computed, onMounted, onUnmounted } from "vue"

/* 🔹 Interface */
interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  quote: string
  rating: number
}

/* 🔹 Props */
const props = defineProps<{
  testimonial: Testimonial
}>()

/* 🔹 LocalStorage key */
const STORAGE_KEY = `testimonial-rating-${props.testimonial.id}`

/* 🔹 Rating state */
const totalVotes = ref(0)
const totalStars = ref(0)
const userVoted = ref(false)

/* 🔹 Scroll animation state */
const cardRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

/* 🔹 Load rating */
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const data = JSON.parse(saved)
    totalVotes.value = data.totalVotes
    totalStars.value = data.totalStars
    userVoted.value = data.userVoted
  } else {
    totalVotes.value = 1
    totalStars.value = props.testimonial.rating
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect() // 👈 anima solo una vez
      }
    },
    {
      threshold: 0.25,
      rootMargin: "0px 0px -80px 0px",
    }
  )

  if (cardRef.value) observer.observe(cardRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})

/* 🔹 Computed */
const averageRating = computed(() =>
  Number((totalStars.value / totalVotes.value).toFixed(1))
)

/* 🔹 Vote */
const vote = (stars: number) => {
  if (userVoted.value) return

  totalVotes.value++
  totalStars.value += stars
  userVoted.value = true

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      totalVotes: totalVotes.value,
      totalStars: totalStars.value,
      userVoted: true,
    })
  )
}
</script>
<template>
  <div ref="cardRef" :class="[
    'testimonial-card',
    isVisible ? 'is-visible' : ''
  ]" class="bg-[#70809029] dark:bg-slate-800 p-8 rounded-2xl
           border border-slate-200 dark:border-slate-700
           shadow-sm hover:shadow-lg transition-all
           hover:-translate-y-1 relative">
    <!-- Quote icon -->
    <span class="absolute top-6 left-6 text-6xl text-gray-500/20 font-serif leading-none">
      "
    </span>

    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <div class="h-14 w-14 rounded-full bg-cover bg-center border-2 border-primary/20"
        :style="{ backgroundImage: `url(${testimonial.avatar})` }"></div>

      <div>
        <h4 class="font-bold text-primary dark:text-white text-lg">
          {{ testimonial.name }}
        </h4>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ testimonial.role }}
        </p>
      </div>
    </div>

    <!-- Quote -->
    <p class="text-slate-600 dark:text-slate-300 italic mb-4">
      "{{ testimonial.quote }}"
    </p>

    <!-- Rating -->
    <div class="flex items-center gap-3">
      <div class="flex gap-1 text-yellow-400">
        <span v-for="n in 5" :key="n" class="material-symbols-outlined text-lg cursor-pointer transition" :class="[
    n <= averageRating ? 'fill-current' : 'text-slate-300',
    userVoted ? 'cursor-not-allowed opacity-60' : 'hover:scale-110'
  ]" @click="vote(n)">
          star
        </span>
      </div>

      <span class="text-sm text-slate-500 dark:text-slate-400">
        {{ averageRating }} / 5
      </span>
    </div>

    <p class="text-xs text-slate-400 mt-2">
      {{ totalVotes }} people rated this
      <span v-if="userVoted" class="ml-1 text-green-500">(You voted)</span>
    </p>
  </div>
</template>

<style scoped>
.testimonial-card {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.testimonial-card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>