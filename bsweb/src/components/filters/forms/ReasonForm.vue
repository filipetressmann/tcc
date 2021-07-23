<template>
  <div>
    <div>
      <input type="checkbox" value="1" v-model="reasons" />
      <label>{{ $t('smallDistance') }}</label>
    </div>
    <div>
      <input type="checkbox" value="2" v-model="reasons" />
      <label>{{ $t('expensiveTransport') }}</label>
    </div>
    <div>
      <input type="checkbox" value="3" v-model="reasons" />
      <label>{{ $t('publicTransportStationDistance') }}</label>
    </div>
    <div>
      <input type="checkbox" value="4" v-model="reasons" />
      <label>{{ $t('publicTransportSlow') }}</label>
    </div>
    <div>
      <input type="checkbox" value="5" v-model="reasons" />
      <label>{{ $t('publicTransportDistance') }}</label>
    </div>
    <div>
      <input type="checkbox" value="6" v-model="reasons" />
      <label>{{ $t('crowdedPublicTransport') }}</label>
    </div>
    <div>
      <input type="checkbox" value="7" v-model="reasons" />
      <label>{{ $t('fitness') }}</label>
    </div>
    <div>
      <input type="checkbox" value="8" v-model="reasons" />
      <label>{{ $t('others') }}</label>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  
  export default {
    props: ["fid"],
    data() {
      return {
        reasons: []
      };
    },
    computed: {
      filterData() {
        return {
          id: this.fid,
          params: {
            reasons: this.reasons
          }
        }
      }
    },
    methods: {
      ...mapActions([
        'updateFilterParams'
      ])
    },
    watch: {
      filterData: function(value) {
        this.updateFilterParams(value);
      }
    }
  }
</script>

<style scoped>
  label {
    margin: 0 5px;
  }

  input {
    cursor: pointer;
  }
</style>
