  <template>
  <nav class="p-2 bg-[#fff]" aria-label="Breadcrumb" v-if="homeurl !== '#/'">
    <div class="max-w-screen-xl md:mx-auto px-[3.5rem]">
      <ol class="flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">

        <!-- HOME -->
        <li class="inline-flex items-center">
          <router-link
            to="/"
            class="inline-flex capitalize items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            Home
          </router-link>
        </li>

        <!-- ITEMS -->
        <li
          v-for="(item, index) in name"
          :key="index"
        >
          <div class="flex items-center">
            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                 aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>

            <!-- ÚLTIMO (NO LINK) -->
            <span
              v-if="index === name.length - 1"
              class="ms-1 capitalize text-sm font-medium text-primary md:ms-2 dark:text-gray-400"
              aria-current="page"
            >
              {{ clean(item) }}
            </span>

            <!-- ANTERIORES (LINK) -->
            <router-link
              v-else
              :to="'/' + item"
              class="ms-1 capitalize text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
            >
              {{ clean(item) }}
            </router-link>

          </div>
        </li>

      </ol>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'BreadCrum',
  props: {
    name: {
      type: Array,
      required: true
    }
  },
  methods: {
    clean(value: string) {
      return value.replace(/[^a-zA-Z]+name=/g, '')
    }
  }
}
</script>
<style scoped>
  nav {
  animation: fadeDown 0.4s ease-out;
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
