<template>
  <Modal name="about">
    <div class="about-container">
      <h1 class="bsw">
        BikeScienceWeb
      </h1>
      <div class="about-selector center">
        <ButtonAbout
          :text="$t('aboutPage.buttons.about')"
          :is-active="activeSection[0]"
          @click="select(0)"
        />
        <ButtonAbout
          :text="$t('aboutPage.buttons.features')"
          :is-active="activeSection[1]"
          @click="select(1)"
        />
        <ButtonAbout
          :text="$t('aboutPage.buttons.team')"
          :is-active="activeSection[2]"
          @click="select(2)"
        />
        <ButtonAbout
          :text="$t('aboutPage.buttons.guide')"
          :is-active="activeSection[3]"
          @click="select(3)"
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

<script setup>
import { ref } from 'vue';
import Modal from '../../Modal.vue';
import About from './components/About.vue';
import Features from './components/Features.vue';
import Team from './components/Team.vue';
import UserGuide from './components/UserGuide.vue';
import ButtonAbout from '@/components/buttons/ButtonAbout.vue';

const activeSection = ref([true, false, false, false]);

const select = (clickedIndex) => {
  if (activeSection.value[clickedIndex]) return;
  activeSection.value = activeSection.value.map((_, index) => index === clickedIndex);
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