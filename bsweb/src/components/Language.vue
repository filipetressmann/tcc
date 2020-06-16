<template>
  <div>
    <b-dropdown aria-role="list">
      <b-button class="button is-info lang-selector" slot="trigger" slot-scope="{ active }" outlined>
        <span>{{ $t('language') }}</span>
          <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
      </b-button>
      <b-dropdown-item aria-role="listitem" @click="changeLanguage('pt-br')">{{ $t('portuguese') }}</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="changeLanguage('en')">{{ $t('english') }}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
  import { i18n } from '../main.js'

  export default {
    methods: {
      changeLanguage(locale) {
        i18n.locale = locale;
      }
    }  
  }
</script>

<style>
  .dropdown.is-mobile-modal > .dropdown-menu {
    z-index: 500 !important;
  }

  .dropdown-menu {
    z-index: 500 !important;
  }

  .lang-selector {
    padding: 8;
  }
</style>