<template>
  <div>
    <select>
      <option disabled selected>{{ category.category_name }}</option>
      <option v-for="filter in category.filters" :value="filter.id" :key="filter.id">{{  filter.filter_name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['category']
}
</script>