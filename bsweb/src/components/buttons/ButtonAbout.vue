<template>
  <div :class="['button-about', {'active': isActive}]">{{ text }}</div>
</template>

<script>
  export default {
    props: [
      'text',
      'isActive'
    ]
  }
</script>

<style scoped>
  .button-about {
    cursor: pointer;
    border: 1px solid blue;
    border-radius: 5px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
  }
  .active {
    background-color: red;
  }
</style>
