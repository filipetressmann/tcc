<template>
  <div :class="['button-about', 'center', {'active': isActive}]">
    <span class="button-txt">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    isActive: Boolean,
  },
};
</script>

<style scoped>
  .button-about {
    cursor: pointer;
    border: 1px solid #167df0;
    border-radius: 5px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
  }
  .button-about:hover:not(.active) {
    color: #363636;
    background-color: #ddd;
  }
  .active {
    background-color: #167df0;
    color: #fff;
  }
  .button-txt {
    padding: 5px 10px;
  }
</style>
