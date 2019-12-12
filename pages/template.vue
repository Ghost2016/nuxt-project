<template>
  <div>
    <textarea   v-model="title" ></textarea><div v-text="title2"   @click="click0" ></div><span v-text="title"   @click="click1" ></span>
  </div>
</template>
<script>
export default {
  data() {
    return {title: 1,title2: 2}
  },
  methods: {
    click0() {
        this.title = 'modify by gulp001'
      },click1() {
        this.title = 'modify by gulp002'
      }
  }
}
</script>