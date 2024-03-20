<template>
  <div class="search-container">
    <cdx-field>
      <cdx-search-input
        v-model="input"
        @input="handleInput"
        button-label="Search"
        @submit-click="searchArticles"
        class="rounded-input"
      />
      <template #label>
        Search articles
      </template>
      <template #description>
        Find Wikipedia articles
      </template>
    </cdx-field>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { CdxSearchInput, CdxField } from '@wikimedia/codex';
import '../assets/css/Searchbar.css';
export default defineComponent({
  name: 'SearchBar',
  components: { CdxSearchInput, CdxField },
  setup(_, { emit }) {
    const input = ref("");

    const handleInput = () => {
    
    };

    const searchArticles = () => {
      emit('search', input.value);
      input.value = ""; 
    };

    return {
      input,
      handleInput,
      searchArticles,
    };
  }
});
</script>

