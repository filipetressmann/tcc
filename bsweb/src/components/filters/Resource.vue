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
          {{ $t(filter.filter_name) }}
        </p>
          <a class="card-header-icon" v-if="filter.has_form">
            <b-icon
              :icon="props.open ? 'menu-down' : 'menu-up'" type="is-info">
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
  import { mapActions } from 'vuex';
  import * as style from './../../store/helpers/style_layers';
  import * as options from './../../store/helpers/option_helpers';

  export default {
    props: ["filter"],
    components: {
      FilterFormField
    },
    data() {
      return {
        resourceInfo: {}
      }
    },
    methods: {
      ...mapActions([
        'addToMap',
        'removeFromMap'
      ]),
      showCptm() {
        this.resourceInfo = {
          category: "layers",
          type: "geojson",
          mapkey: "main",
          key: "cptm",
          options: {
            style: style.railway,
            options: options.railway
          }
        }
        this.addToMap(this.resourceInfo);
      },
      showSubway() {
        this.resourceInfo = {
          category: "layers",
          type: "geojson",
          mapkey: "main",
          key: "subway",
          options: {
            style: style.subway,
            options: options.subway
          }
        }
        this.addToMap(this.resourceInfo);
      },
      showBikelane(key) {
        this.resourceInfo = {
          category: "layers",
          type: "geojson",
          mapkey: "main",
          key,
          options: {
            style: style.bikelane,
            options: options.bikeLane
          }
        }
        this.addToMap(this.resourceInfo);
      },
      showAccidents() {
        this.resourceInfo = {
          category: "layers",
          type: "geojson",
          mapkey: "main",
          key: "sp_accidents",
          options: {
            style: style.accidents,
            options: options.accidents
          }
        }
        this.addToMap(this.resourceInfo);
      },
      isLayer(resource) {
        return [14, 15, 16, 18, 19, 20].includes(resource.id);
      }
    },
    created() {
      const resource = this.filter;
      if (this.isLayer(resource)) {
        if (resource.id == 14) {
          this.showCptm();
        } else if (resource.id == 15) {
          this.showSubway();
          } else if ([16, 18, 19].includes(resource.id)) {
          this.showBikelane(resource.filter_key);
        } else if (resource.id == 20) {
          this.showAccidents();
        }
      }
    }
  }
</script>