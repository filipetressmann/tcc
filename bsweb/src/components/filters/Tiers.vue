<template>
  <div>
    <p class="label">{{ $t('selectTiers') }}</p>
    <b-checkbox v-show="tierList.length > 0" v-for="(count, index) in tierList" v-model="shownTiers" :native-value="index" :key="index" type="is-info">
      {{ $t('tier') }} {{ index+1 }} ({{ count }} {{ $tc('flow', count)}})
    </b-checkbox>
    <span v-if="tierList.length === 0">{{ $t('notFoundTiers') }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        shownTiers: []
      };
    },
    methods: {
      ...mapActions([
        'addToMap',
        'removeFromMap',
        'resetMapResource'
      ]),
      resetTiers() {
        const resource = {
          mapkey: "main",
          category: "flows",
          type: "polyline"
        };
        this.resetMapResource(resource);
      }
    },
    computed: {
      ...mapGetters([
        'tierList'
      ])
      // tierList() {
      //   debugger;
      //   return this.$store.getters.tierList;
      // }
    },
    watch: {
      shownTiers: function(value) {
        this.resetTiers();
        value.map(tier => {
          const data = {
            mapkey: "main",
            category: "flows",
            type: "polyline",
            key: tier
          };
          this.addToMap(data);
        })
      }
    }
  }
</script>
