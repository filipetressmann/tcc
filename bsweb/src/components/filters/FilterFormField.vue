<template>
  <div>
    <age-form v-if="filter.filter_key == 'age'" :fid="filter.id" />
  </div>
</template>
<script>
  import AgeForm from './forms/AgeForm';
  export default {
    components: {
      AgeForm
    },
    props: ['filter'],
  }
</script>