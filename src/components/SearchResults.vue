<template>
  <div class="result-container">
    <p v-if="loading">Loading search results...</p>
    <div v-else class="scrollable-results">
      <ul class="search-results">
        <li v-for="(title, index) in searchResults" :key="index" class="search-result">
          {{ index + 1 }}. {{ title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '../assets/css/SearchResults.css'; 
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    searchResults: {
      type: Array,
      required: true
    }
  }
};
</script>


