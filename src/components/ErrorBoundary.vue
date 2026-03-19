<script setup lang="ts">
import { defineComponent, h, ref, onErrorCaptured, type VNode } from 'vue'

interface Props {
  fallback?: string
}

const props = withDefaults(defineProps<Props>(), {
  fallback: 'Something went wrong',
})

const hasError = ref(false)
const errorMessage = ref<string>('')

onErrorCaptured((error) => {
  hasError.value = true
  errorMessage.value = error.message
  console.error('[ErrorBoundary] Captured error:', error)
  return false
})

const ErrorFallback = defineComponent({
  props: ['message', 'fallback'],
  render() {
    return h(
      'div',
      {
        class: 'flex items-center justify-center min-h-[200px] bg-red-500/10 border border-red-500/20 rounded-lg p-6',
      },
      [
        h('div', { class: 'text-center' }, [
          h('div', { class: 'text-red-400 text-4xl mb-2' }, '⚠️'),
          h('h3', { class: 'text-lg font-bold text-red-400 mb-2' }, 'Component Error'),
          h('p', { class: 'text-sm text-slate-400 mb-4' }, this.fallback),
          h(
            'button',
            {
              class: 'px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors text-sm font-semibold',
              onClick: () => {
                this.$emit('retry')
              },
            },
            'Retry'
          ),
        ]),
      ]
    )
  },
})

defineEmits<{
  (e: 'retry'): void
}>()
</script>

<template>
  <ErrorFallback
    v-if="hasError"
    :message="errorMessage"
    :fallback="fallback"
    @retry="hasError = false"
  />
  <slot v-else />
</template>
