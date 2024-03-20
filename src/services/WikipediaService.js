
const BASE_URL = 'https://en.wikipedia.org/w/api.php';

export async function fetchArticleData(query) {
  const params = new URLSearchParams({
    action: 'parse',
    format: 'json',
    page: query,
    formatversion: 2,
    origin: '*'
  });
  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  return await response.json();
}

export async function fetchSearchResults(lang, word, limit) {
  const apiUrl = `https://${lang}.wikipedia.org/w/api.php`;
  const params = new URLSearchParams({
    action: 'opensearch',
    search: encodeURIComponent(word),
    limit: limit,
    format: 'json',
    origin: '*'
  });
  const response = await fetch(`${apiUrl}?${params.toString()}`);
  return await response.json();
}
