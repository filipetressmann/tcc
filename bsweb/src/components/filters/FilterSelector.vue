<template>
    <div>
        <select @change="selectFilter($event)">
            <option disabled selected>Selecione para adicionar</option>
            <option v-for="filter in filters"
                    :value="filter.id">
                {{  filter.name }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    data() {
      return {
        filters: [],
        selectedFilter: null
      };
    },
    methods: {
        // fetch filter names and ids from server
        fetchOptions() {
            this.$http.get('http://127.0.0.1:5000/fetchfilters')
              .then(response => {
                  return response.json();
                })
                .then(filters => {
                  this.filters = filters;
                });
        },
        // handle selecting a filter
        selectFilter(event) {
          this.selectedFilter = event.target.value;
          console.log(this.selectedFilter);
        }
    },
    created() {
      this.fetchOptions();
    }
}
</script>