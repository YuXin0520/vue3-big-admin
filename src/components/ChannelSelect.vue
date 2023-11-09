<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref, defineProps, defineEmits } from 'vue'
//获取分类数据
const channelList = ref([])
const getChannelList = async () => {
  const {
    data: { data }
  } = await artGetChannelsService()
  channelList.value = data
}
getChannelList()
//接收props实现双向绑定第一种方式
// const props = defineProps({
//   modelValue: {
//     type: [String, Number],
//     default: ''
//   }
// })
// const modelValue = props.modelValue
// const emit = defineEmits(['update:modelValue'])
// <el-select v-model="modelValue"@change="emit('update:modelValue', modelValue)">

//接收props实现双向绑定第二种方式
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    />
  </el-select>
</template>
