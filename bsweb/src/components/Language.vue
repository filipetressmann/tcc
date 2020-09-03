<template>
  <div>
    <b-button class="button is-info lang-selector" @click="changeLanguage()" outlined>   
        <span>{{ btn }}</span>
    </b-button>
  </div>
</template>

<script>
  import { i18n } from '../main.js'

  export default {
    data() {
      return {
        pt: true,
        btn: 'English'
      }
      
    },
    methods: {
      changeLanguage() {
        if(this.pt) {
          i18n.locale = 'en'
          this.btn = 'Português'
        } else {
          i18n.locale = 'pt-br'
          this.btn = 'English'
        }
        this.pt = !this.pt
        localStorage.pt_br = this.pt
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