<template>
  <div id="tmp" class="wrapper">
    <b-slider
      v-model="tmp"
      lazy
      type="is-info"
      :min="0"
      :max="1"
      :tooltip="false"
    >
      <b-slider-tick :value="0">
        2021
      </b-slider-tick>
      <b-slider-tick :value="1">
        2022
      </b-slider-tick>
    </b-slider>
  </div>
</template>

<script>

export default {
  data() {
    return {
      value: 1,
    };
  },
};
</script>

<style scoped>
.wrapper {
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 30px;
}
</style>