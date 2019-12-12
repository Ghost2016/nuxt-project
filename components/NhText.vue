<template>
  <div>
    {{$props.text}}
  </div>
</template>
<script>
export default {
  name: 'NhText',
  props: {
    text: 'default text'
  },
  data() {
    return {
      
    }
  }
}
</script>
<style lang="scss" scoped>

</style>