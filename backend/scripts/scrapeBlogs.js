/**
 * BeyondChats Blog Scraper - FIXED VERSION
 * Finds last pagination page → Extracts 5 OLDEST articles → Saves to API
 */

const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://beyondchats.com";
const BLOG_LIST_URL = "https://beyondchats.com/blogs/";
const API_ENDPOINT = "http://localhost:5000/api/articles";

/**
 * Fetch HTML helper with error handling
 */
async function fetchHTML(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      timeout: 10000
    });
    return cheerio.load(data);
  } catch (error) {
    console.error(`❌ Failed to fetch ${url}:`, error.message);
    throw error;
  }
}

/**
 * Step 1: Find LAST pagination page (FIXED)
 */
async function getLastPageURL() {
  console.log("🔍 Checking pagination...");
  const $ = await fetchHTML(BLOG_LIST_URL);

  let lastPageUrl = BLOG_LIST_URL;
  let highestPageNum = 1;

  // Find all pagination links and pick the highest page number
  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.includes("/blogs/page/")) {
      const pageMatch = href.match(/page\/(\d+)/);
      if (pageMatch) {
        const pageNum = parseInt(pageMatch[1]);
        if (pageNum > highestPageNum) {
          highestPageNum = pageNum;
          lastPageUrl = href.startsWith('http') ? href : BASE_URL + href;
        }
      }
    }
  });

  console.log(`📄 Last page detected: ${lastPageUrl} (page ${highestPageNum})`);
  return lastPageUrl;
}

/**
 * Step 2: Extract article links from last page (FIXED)
 */
async function getOldestArticleLinks(lastPageUrl) {
  const $ = await fetchHTML(lastPageUrl);
  const links = [];

  // Try multiple selectors for blog article links
  const selectors = [
    'a[href*="/blogs/"]',
    '.blog-post a',
    '.article-card a',
    '.post-title a',
    'article a',
    '.blog-item a'
  ];

  for (const selector of selectors) {
    $(selector).each((_, el) => {
      const href = $(el).attr("href");
      if (href && 
          href.includes("/blogs/") && 
          !href.includes("page") && 
          !href.includes("#") &&
          !links.includes(BASE_URL + href)) {
        const fullUrl = href.startsWith('http') ? href : BASE_URL + href;
        links.push(fullUrl);
      }
    });
    if (links.length > 0) break;
  }

  // Take first 5 unique links
  const oldestFive = links.slice(0, 5);
  
  console.log("🕰 Oldest 5 articles found:");
  oldestFive.forEach((l, i) => console.log(` ${i+1}. ${l}`));
  
  if (oldestFive.length === 0) {
    console.log("⚠️ No articles found. Trying main blog page...");
    return await getOldestArticleLinks(BLOG_LIST_URL);
  }

  return oldestFive;
}

/**
 * Step 3: Scrape full article content (IMPROVED)
 */
async function scrapeArticle(articleUrl) {
  console.log(`   📖 Extracting content...`);
  const $ = await fetchHTML(articleUrl);

  // Multiple title selectors
  const titleSelectors = ['h1', '.post-title', '.article-title', 'title'];
  let title = "Untitled Article";
  for (const sel of titleSelectors) {
    if ($(sel).first().length > 0) {
      title = $(sel).first().text().trim();
      break;
    }
  }

  // Multiple content selectors
  let content = "";
  const contentSelectors = [
    'article p',
    '.post-content p',
    '.article-body p',
    '.content p',
    'main p',
    'p'
  ];

  for (const sel of contentSelectors) {
    $(sel).each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 50) {  // Only meaningful paragraphs
        content += text + "\n\n";
      }
    });
    if (content.length > 200) break;
  }

  return {
    title: title.substring(0, 200),  // Limit title length
    content: content.substring(0, 10000),  // Limit content length
    originalUrl: articleUrl,
    status: "original"
  };
}

/**
 * Step 4: Push article to backend API
 */
async function pushToBackend(article) {
  try {
    const response = await axios.post(API_ENDPOINT, article, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(`✅ Saved: "${article.title.substring(0, 50)}..." (${response.data._id})`);
  } catch (error) {
    console.error(`❌ Failed to save "${article.title.substring(0, 50)}...":`, error.response?.data?.message || error.message);
  }
}

/**
 * MAIN EXECUTION with delays
 */
async function scrapeBeyondChatsBlogs() {
  try {
    console.log("🚀 Starting BeyondChats blog scraping...\n");

    // Step 1: Get last page
    const lastPageUrl = await getLastPageURL();
    
    // Step 2: Get article links
    const articleLinks = await getOldestArticleLinks(lastPageUrl);

    // Step 3: Scrape and save each article
    for (let i = 0; i < articleLinks.length; i++) {
      const url = articleLinks[i];
      console.log(`\n[${i+1}/${articleLinks.length}] 🔍 Scraping: ${url}`);
      
      try {
        const article = await scrapeArticle(url);
        await pushToBackend(article);
        
        // Delay between requests (polite scraping)
        if (i < articleLinks.length - 1) {
          console.log("⏳ Waiting 2 seconds...");
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`❌ Article ${i+1} failed:`, error.message);
      }
    }

    console.log("\n🎉 Scraping completed successfully!");
    console.log("📊 Check your API: http://localhost:5000/api/articles");
    
  } catch (error) {
    console.error("🔥 Scraper crashed:", error.message);
  }
}

// Run scraper
scrapeBeyondChatsBlogs();
