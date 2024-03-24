<template>
    <div class="home-view">
      <img src="/MediaWiki-2020-large-icon.svg.png" alt="Logo" class="logo" />
      <div class="search" :class="{ 'dark-mode': darkMode, 'light-mode': !darkMode }">
        <DarkModeToggle :darkMode="darkMode" @update:dark-mode="updateDarkMode" />
        <InfoIcon/>
        <SearchBar @search="handleSearch" />
        <div class="search-info">
          <p class="error" v-if="error">{{ error }}</p>
          <div v-else>
            <p v-if="articles.length > 0">Searching in article {{ selectedArticle }}</p>
            <p v-else>No articles found.</p>
          </div>
        </div>
        <template v-if="showWordSearch">
          <WordSearch @search="handleWordSearch" />
          <div class="lang-dropdown">
            <cdx-select
              v-model:selected="selectedLang"
              :menu-items="langLinks.map(langLink => ({ label: langLink.langname, value: langLink.lang, url: langLink.url }))"
              :menu-config="menuConfig"
              default-label="Select a language"
              @change="handleLangChange"
            >
              <template #menu-item="{ menuItem }">
                <div class="menu-item-container">
                  <span>{{ menuItem.label }}</span>
                  <a v-if="menuItem.url" :href="menuItem.url" target="_blank" class="link-icon">
                    <cdx-icon :icon="cdxIconLinkExternal" />
                  </a>
                </div>
              </template>
            </cdx-select>
          </div>
        </template>
        <p class="words-search" v-if="searchedWord">Search Results for words with "{{ searchedWord }}"</p>
        <SearchResults :loading="loading" :searchResults="searchResults" />
      </div>
    </div>
  </template>
  
  <script>
  import SearchBar from "../components/Searchbar.vue";
  import WordSearch from "../components/WordSearch.vue";
  import SearchResults from "../components/SearchResults.vue";
  import DarkModeToggle from '../components/DarkModeToggle.vue';
  import { fetchArticleData, fetchSearchResults } from '../services/WikipediaService';
  import { CdxSelect, CdxIcon } from '@wikimedia/codex';
  import { cdxIconLinkExternal } from '@wikimedia/codex-icons';
  import InfoIcon from "../components/InfoIcon.vue";
  import '../assets/css/Home.css';  
  export default {
    components: {
      SearchBar,
      WordSearch,
      SearchResults,
      DarkModeToggle,
      CdxSelect,
      CdxIcon,
      InfoIcon,
    },
    data() {
      return {
        loading: false,
        error: null,
        articles: [],
        langLinks: [],
        selectedLang: null,
        selectedArticle: null,
        darkMode: false,
        searchedWord: '',
        menuConfig: {
          visibleItemLimit: 4,
        },
        cdxIconLinkExternal,
        searchResults: [], 
      };
    },
    computed: {
      showWordSearch() {
        return this.langLinks.length > 0;
      },
    },
    methods: {
      updateDarkMode(newDarkMode) {
        this.darkMode = newDarkMode;
      },
  
      handleLangChange() {
        this.selectedArticle = null;
      },
      async handleSearch(query) {
        this.error = null;
        
        try {
          const data = await fetchArticleData(query);
          if (data.error) {
            this.error = data.error.info;
          } else {
            const langLinks = data.parse.langlinks;
            if (langLinks && langLinks.length > 0) {
              this.articles = langLinks.map((langLink) => ({
                lang: langLink.langname,
                link: langLink.url,
              }));
              this.langLinks = langLinks;
              this.selectedArticle = query;
            } 
          }
        } catch (error) {
          this.error = "Error fetching article data.";
          console.error(error);
        }
      },
  
      async handleWordSearch({ word, limit }) {
        this.searchedWord = word;
        this.loading = true;
        try {
          const searchData = await fetchSearchResults(this.selectedLang, word, limit);
          if (searchData[1] && searchData[1].length > 0) {
            const articleTitles = searchData[1];
            this.searchResults = articleTitles;
          } else {
            this.searchResults = [];
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          this.loading = false;
        }
      },
    }
  };
  </script>
  
  <style>  @import '@wikimedia/codex-design-tokens/theme-wikimedia-ui.css';
  
  .search-info {
    margin-top: 5px;
  }
  
  .error {
    color: var(--color-error) !important;
  }
  .menu-item-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 0.8; 
  }
  .words-search {
    position: absolute;
    margin-top: -40px;
    font-weight:bolder ;
    font-size: 20px;;
  }
  .search {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    box-shadow: var(--box-shadow-drop-xx-large);
    height: 79vh;
    width: 150vh;
    border-radius: 5px;
    margin: 100px;
  }
  
  .light-mode .cdx-search-input--has-end-button .cdx-search-input__input-wrapper .cdx-text-input {
    background-color: white; 
  }
  
  .dark-mode .cdx-search-input--has-end-button .cdx-search-input__input-wrapper .cdx-text-input {
    background-color: #333;
  }
  .dark-mode .cdx-search-input__end-button.cdx-button {
    border-radius: 0px;
  }
  
  .dark-mode {
    background-color: #333;
    color: #fff;
  }
  
  .light-mode {
    background-color: #fff;
    color: #000;
  }
  
  .lang-dropdown {
    margin-top: 45px;
    margin-left:-500px;
  }
  
  .menu-item-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    position: absolute;
    top: 150px;
    left: 300px;
    width: 150px;
    height: 150px;
  }
  .link-icon {
    cursor: pointer;
  }
 
</style>