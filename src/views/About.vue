<template>
  <div class="about-view" :class="{ 'dark-mode': darkMode, 'light-mode': !darkMode }">
   <div class="heading"> <h1>About: WIKI WORD</h1></div>
    <DarkModeToggle :darkMode="darkMode" @update:dark-mode="updateDarkMode" />
    <InfoIcon />
    <p>Wiki Word is a Vue JS app using the Opensearch API  and Codex UI library.
         One can serach for an article and it shows another search field where one can select the article language they want to search in,
         the word they want to serach for and the number of serach results to be shown(1-500). All this is clubbed with a dark mode functionality,
         and an about page which you are seeing right now :P , click on the home icon to get back to the main page. Adios!
    </p>
  
  </div>
</template>

<script>
import DarkModeToggle from '../components/DarkModeToggle.vue';
import InfoIcon from '../components/InfoIcon.vue';  
import '../assets/css/About.css';
export default {
  components: {
    DarkModeToggle,
    InfoIcon,
  },
  data() {
    return {
      darkMode: false,
    };
  },
  methods: {
    updateDarkMode(newDarkMode) {
      this.darkMode = newDarkMode;
    }
  }
};
</script>


