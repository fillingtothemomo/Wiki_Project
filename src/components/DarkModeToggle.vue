<template>
    <cdx-toggle-switch class="switch" :checked="darkMode" @change="toggleDarkMode" aria-label="toggle theme"></cdx-toggle-switch>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { CdxToggleSwitch } from '@wikimedia/codex';
  import '../assets/css/DarkModeToggle.css';
  export default defineComponent({
    name: 'DarkModeToggle',
    props: {
      darkMode: Boolean, 
    },
    components: {
      CdxToggleSwitch,
    },
    methods: {
   
      toggleDarkMode() {
        this.$emit('update:dark-mode', !this.darkMode);
      },
    },
  });
  </script>
  
  
  