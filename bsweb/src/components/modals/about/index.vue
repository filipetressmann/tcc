<template>
  <Modal name="about">
    <div class="about-container">
      <h1 class="bsw">
        BikeScienceWeb
      </h1>
      <div class="about-selector center">
        <ButtonAbout
          :text="'Sobre'"
          :is-active="activeSection[0]"
          @click.native="select(0)"
        />
        <ButtonAbout
          :text="'Funcionalidades'"
          :is-active="activeSection[1]"
          @click.native="select(1)"
        />
        <ButtonAbout
          :text="'Equipe'"
          :is-active="activeSection[2]"
          @click.native="select(2)"
        />
        <ButtonAbout
          :text="'Guia do Usuário'"
          :is-active="activeSection[3]"
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
  </Modal>
</template>

<script>
import Modal from '../../Modal';
import About from './components/About';
import Features from './components/Features';
import Team from './components/Team';
import UserGuide from './components/UserGuide';
import ButtonAbout from '@/components/buttons/ButtonAbout.vue';

export default {
  components: {
    Modal,
    ButtonAbout,
    About,
    Features,
    Team,
    UserGuide,
  },
  data() {
    return {
      activeSection: [true, false, false, false],
    };
  },
  methods: {
    select(clickedIndex) {
      if (this.activeSection[clickedIndex]) return;
      this.activeSection = this.activeSection.map((v, index) => index === clickedIndex);
    },
  },
};
</script>

<style scoped>
  .about-container {
    padding: 0 15%;
    height: 97%;
    overflow: scroll;
  }
  .bsw {
    font-size: 36px;
    color: #363636;
    font-weight: 600;
    line-height: 1.125;
    margin-bottom: 40px;
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

