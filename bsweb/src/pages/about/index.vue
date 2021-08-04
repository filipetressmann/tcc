<template>
  <div class="about-container">
    <h1 class="bsw">BikeScienceWeb</h1>
    <div class="about-selector center">
      <ButtonAbout
        :text="'Sobre'"
        :isActive="activeSection[0]"
        @click.native="select(0)"
      />
      <ButtonAbout
        :text="'Funcionalidades'"
        :isActive="activeSection[1]"
        @click.native="select(1)"
      />
      <ButtonAbout
        :text="'Equipe'"
        :isActive="activeSection[2]"
        @click.native="select(2)"
      />
      <ButtonAbout
        :text="'Guia do Usuário'"
        :isActive="activeSection[3]"
        @click.native="select(3)"
      />
    </div>
    <div class="about-content">
      <About v-if="activeSection[0]" />
      <Features v-if="activeSection[1]" />
      <Team v-if="activeSection[2]" />
      <UserGuide v-if="activeSection[3]" />
    </div>
  </div>
</template>

<script>
  import About from './components/About';
  import Features from './components/Features';
  import Team from './components/Team';
  import UserGuide from './components/UserGuide';
  import ButtonAbout from '@/components/buttons/ButtonAbout.vue';

  export default {
    components: {
      ButtonAbout,
      About,
      Features,
      Team,
      UserGuide
    },
    data() {
      return {
        activeSection: [true, false, false, false]
      }
    },
    methods: {
      select(clickedIndex) {
        if (this.activeSection[clickedIndex]) return;
        this.activeSection = this.activeSection.map((v, index) => index === clickedIndex);
      }
    }
  }
</script>

<style scoped>
  .about-container {
    padding: 0 15%;
    height: 100vh;
    overflow: scroll;
  }
  .bsw {
    font-size: 36px;
    color: #363636;
    font-weight: 600;
    line-height: 1.125;
    margin: 40px 0;
    text-align: center;
  }
  .about-selector {
    display: flex;
    justify-content: center;
  }
  .about-content {
    margin: 40px 0;
  }

  @media only screen and (max-width: 768px) {
  .about-selector {
    flex-direction: column;
  }
}
</style>

