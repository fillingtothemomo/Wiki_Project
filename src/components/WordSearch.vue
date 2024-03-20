<template>
    <div class="word-search">
      <cdx-field :status="status" :messages="messages">
        <cdx-text-input placeholder="enter word" v-model="searchValue" />
      
      </cdx-field>
      <cdx-field>
        <div class="number-input" ><input  type="number" v-model="numberInput" min="1" max="500" placeholder="Enter a number" /></div>
      </cdx-field>
      <button class="search-button" @click="searchWords">
        <cdx-icon class="search-icon" :icon="cdxIconSearch" />
      </button>
    </div>
  </template>
  
  <script>
  import { ref, defineComponent } from "vue";
  import { cdxIconSearch } from '@wikimedia/codex-icons';
  import { CdxIcon, CdxField, CdxTextInput } from '@wikimedia/codex';
  import  './WordSearch.css';
  export default defineComponent({
    name: 'WordSearch',
    components: { CdxIcon, CdxField, CdxTextInput },
    setup(_, { emit }) {
      const searchValue = ref("");
      const numberInput = ref(1);
  
      const searchWords = () => {
        emit("search", { word: searchValue.value, limit: numberInput.value });
        searchValue.value = "";
        numberInput.value = 1;
      };
  
      return {
        searchValue,
        numberInput,
        searchWords,
        cdxIconSearch,
      };
    }
  });
  </script>
  
  