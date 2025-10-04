<template>
  <div
    :class="[
      'max-w-[70%] p-3 rounded-2xl mb-2 font-mono',
      isUser
        ? 'bg-[#00ffea] text-[#0d0d0d] ml-auto shadow-[0_0_10px_#00ffea]'
        : 'bg-[#222222] text-[#00ffea] shadow-[0_0_5px_#00ffea]',
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ isUser?: boolean }>();
</script>
