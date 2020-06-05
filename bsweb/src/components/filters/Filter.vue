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
        'fetchCPTM',
        'fetchSubway',
        'fetchBikelane',
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
            options: options.railways
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
            options: options.railways
          }
        }
        this.addToMap(this.resourceInfo);
      },
      showBikelane() {
        this.resourceInfo = {
          category: "layers",
          type: "geojson",
          mapkey: "main",
          key: "bikelane",
          options: {
            style: style.bikelane
          }
        }
        this.addToMap(this.resourceInfo);
      },
      isLayer(resource) {
        return resource.id == 14 || resource.id == 15 || resource.id == 16;
      }
    },
    created() {
      const resource = this.filter;
      if (this.isLayer(resource)) {
        if (resource.id == 14) {
          this.showCptm();
        } else if (resource.id == 15) {
          this.showSubway();
        } else if (resource.id == 16) {
          this.showBikelane();
        }
      }
    }
  }
</script>