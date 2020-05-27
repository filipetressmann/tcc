<template>
  <div>
    <b-collapse
      class="card"
      animation="slide"
      :key="filter.id"
      :open="false"
      @open="isOpen = filter.id">
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <p class="card-header-title">
          {{ filter.filter_name }}
        </p>
          <a class="card-header-icon" v-if="filter.has_form">
            <b-icon
              :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
          </a>
        </div>
        <div class="card-content" v-if="filter.has_form">
          <div class="content">
            <p>
              <FilterFormField :filter="filter" />
            </p>
          </div>
        </div>
    </b-collapse>
  </div>
</template>

<script>
  import FilterFormField from './FilterFormField'

  export default {
    props: ['filter'],
    components: {
      FilterFormField
    }
  }
</script>

<style scoped>

</style>