<template>
  <div class="select-container" tabindex="-1" @blur="close">
    <div class="select-button-container" @click="toggle">
      <div class="select-button">
        <span class="select-title">{{ $t(title) }}</span>
      </div>
      <div class="arrow">
        <img :src="iconArrow" :class="[{ active: isActive }]">
      </div>
    </div>
    <div v-if="isActive" class="select-dropdown">
      <ul>
        <li
          v-for="option in options"
          :key="option.id"
          :class="{ active: resourceIsActive(option)}"
          @click.self="handleOptionClick(option)"
        >
          {{ $t(option.filter_name) }}
          <img
            v-if="resourceIsActive(option)"
            :src="iconClose"
            :class="[{ active: resourceIsActive(option) }]"
            @click="handleClickRemove(option)"
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import iconArrow from '@/assets/svg/icon-arrow-dropdown.svg';
import iconClose from '@/assets/svg/icon-close.svg';
import { mapGetters } from 'vuex';

export default ({
  props: {
    category: { type: String, required: true },
    title: { type: String, required: true },
    options: { type: Array, required: true },
    selectResource: { type: Function, required: true },
    deselectResource: { type: Function, required: true },
  },
  data() {
    return {
      iconArrow,
      iconClose,
      isActive: false,
    };
  },
  methods: {
    ...mapGetters(['activeFilters', 'activeLayers']),
    close() {
      this.isActive = false;
    },
    toggle() {
      document.getElementById(`select-${this.title}`).focus();
      this.isActive = !this.isActive;
    },
    handleOptionClick(filter) {
      if (!this.resourceIsActive(filter)) {
        this.selectResource(filter);
      }
    },
    handleClickRemove(filter) {
      this.deselectResource(filter);
    },
    resourceIsActive(resource) {
      let category = this.title;
      if (category != 'layers') {
        const activeFiltersIds = this.activeFilters().map(resource => resource.id);
        return activeFiltersIds.includes(resource.id);
      } else {
        const activeLayersIds = this.activeLayers().map(resource => resource.id);
        return activeLayersIds.includes(resource.id);
      }
    },
  },
});
</script>

<style scoped>
  .select-container {
    position: relative;
  }

  .select-button {
    background: transparent;
    border: 0;
    outline: none;
    color: '#b5b5b5';
    padding: 0 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .select-button-container {
    position: relative;
    width: 190px;
    height: 40px;
    border: 1px solid #e8e8e8;
    outline: none;
    border-radius: 5px;
    text-align: left;
    padding-right: 0;
    color: #b5b5b5;
    display: flex;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 5px;
  }

  .select-title {
    font-size: 14px;
    color: #35495e;
  }

  .select-dropdown {
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 9999;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    cursor: pointer;
  }

  li {
    width: 187px;
    padding: 0 15px;
    color: #b5b5b5;
    display: flex;
    justify-content: space-between;
  }

  li:hover {
    color: #5c5c5c;
    background-color: #e6e6e6;
  }

  li.active {
    color: #0033cc;
    cursor: default;
  }

  li.active:hover {
    color: #0033cc;
    background-color: #fff;
  }

  li > img {
    cursor: pointer;
    height: auto;
    width: 10px;
    transition: all ease-in-out 0.2s;
  }

  .arrow {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arrow > img {
    height: auto;
    width: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease-in-out 0.2s;
  }

  .arrow > img.active {
    transform: rotate(180deg);
  }
</style>