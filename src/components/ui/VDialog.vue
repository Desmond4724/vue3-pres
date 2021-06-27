<template>
  <teleport to="body" v-if="modelValue">
    <div @click="close" class="h-screen top-0 overflow-auto p-4 left-0 bg-gray-500 bg-opacity-50 w-screen absolute flex items-center justify-center">
      <div :class="contentClass" style="max-width: 100%" @click.stop>
        <slot :close="close"></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'VDialog',
  props: {
    modelValue: {
      type: Boolean,
    },
    contentClass: {
      default: 'v-dialog__content'
    }
  },
  watch: {
    modelValue(val) {
      if(val) {
        document.addEventListener('keydown', this.keyDown)
      } else {
        document.removeEventListener('keydown', this.keyDown)
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false)
    },
    keyDown(e) {
      if(e.key === 'Escape') {
        this.close()
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.keyDown)
  }
}
</script>