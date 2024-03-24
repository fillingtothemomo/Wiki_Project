<template>
    <div class="info-icon" >
    <router-link :to="isHomePage ? '/about' : '/'">
      <cdx-icon :icon="isHomePage ? cdxIconInfo : cdxIconHome" />
    </router-link>
</div>
  </template>
  
  <script>
  import '../assets/css/InfoIcon.css';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { cdxIconInfo, cdxIconHome } from '@wikimedia/codex-icons';
  import { CdxIcon } from '@wikimedia/codex';   
  
  export default {
    components: {
      CdxIcon
    },

    setup() {
      const route = useRoute();
      const isHomePage = computed(() => route.path === '/');
  
      return {
        isHomePage,
        cdxIconInfo,
        cdxIconHome
      };
    }
  };
  </script>
  