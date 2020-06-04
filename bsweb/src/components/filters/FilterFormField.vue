<template>
  <div>
    <age-form v-if="filter.filter_key == 'age'" :fid="filter.id" />
    <time-form v-if="filter.filter_key == 'horary'" :fid="filter.id" />
  </div>
</template>
<script>
  import AgeForm from './forms/AgeForm';
  import TimeForm from './forms/TimeForm';
  export default {
    components: {
      AgeForm,
      TimeForm
    },
    data() {
      return {
        filters: []
      };
    },
    props: ['filter'],
  }
</script>