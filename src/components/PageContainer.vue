<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>
<template>
  <el-card class="page_container">
    <template #header>
      <div class="page_container_header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>
<style lang="scss" scoped>
.page_container {
  min-height: 100%;
  box-sizing: border-box;
  .page_container_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
