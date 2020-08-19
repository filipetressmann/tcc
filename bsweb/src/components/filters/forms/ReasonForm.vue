<template>
  <div>
    <div class="field">
      <b-checkbox v-model="reasons" native-value="1" type="is-info">
        {{ $t('smallDistance') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="reasons" native-value="2"  type="is-info">
        {{ $t('expensiveTransport') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="reasons" native-value="3"  type="is-info">
        {{ $t('publicTransportStationDistance') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="reasons" native-value="4"  type="is-info">
        {{ $t('publicTransportSlow') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="reasons" native-value="5"  type="is-info">
        {{ $t('publicTransportDistance') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="reasons" native-value="6"  type="is-info">
        {{ $t('crowdedPublicTransport') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="reasons" native-value="7"  type="is-info">
        {{ $t('fitness') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="reasons" native-value="8"  type="is-info">
        {{ $t('others') }}
      </b-checkbox>
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
