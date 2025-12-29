require('dotenv').config();
const axios = require('axios');
const GoogleSearchResults = require('google-search-results-nodejs');
const cheerio = require('cheerio');
const OpenAI = require('openai');

const search = new GoogleSearchResults.GoogleSearch(process.env.SERPAPI_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const API_BASE = 'http://localhost:5001';

/**
 * Scrape main content from competitor URL
 */
async function scrapeCompetitor(url) {
  try {
    console.log(`   🕷️ Scraping: ${url.slice(0, 60)}...`);
    const { data } = await axios.get(url, { 
      timeout: 10000,
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(data);
    const selectors = [
      'article', '.post-content', '.entry-content', 'main', 
      '.content', '.article-body', '.blog-post', '[class*="content"]'
    ];
    
    let content = '';
    for (const selector of selectors) {
      content = $(selector).text().trim();
      if (content.length > 800) break;
    }
    
    return content.slice(0, 2500).trim() || 'Content extraction failed';
  } catch (error) {
    console.log(`   ❌ Scrape failed: ${error.message}`);
    return 'Content not available';
  }
}

/**
 * Full Phase 2 optimization for single article
 */
async function optimizeSingleArticle(article) {
  console.log(`\n🔍 Processing: "${article.title.substring(0, 60)}..."`);

  if (article.status === 'updated') {
    console.log('   ⏭️ Already optimized');
    return article;
  }

  try {
    // STEP 1: Google Search for competitors
    console.log(`   🔍 Searching Google for: "${article.title}"`);
    const results = await search.json({
      q: `"${article.title}" (blog OR article OR chatbot OR "AI chatbots") -beyondchats -site:beyondchats.com`,
      num: 15,
      location: "India",
      gl: "in",
      lr: "lang_en"
    });

    // STEP 2: Filter REAL blog competitors
    const competitors = results.organic_results
      ?.filter(result => {
        const link = result.link.toLowerCase();
        return (link.includes('/blog/') || link.includes('.com/blog') || link.includes('.io/blog') || link.includes('chatbot')) &&
               !link.includes('beyondchats.com') &&
               !link.includes('youtube.com') &&
               !link.includes('facebook.com') &&
               !link.includes('twitter.com') &&
               result.link.startsWith('http');
      })
      ?.slice(0, 3)
      ?.map(result => result.link) || [];

    console.log(`   📄 Found ${competitors.length} competitors:`, competitors.slice(0, 2).map(c => new URL(c).hostname));

    // STEP 3: Scrape competitor content (max 2)
    let comp1 = '', comp2 = '';
    if (competitors[0]) comp1 = await scrapeCompetitor(competitors[0]);
    if (competitors[1]) comp2 = await scrapeCompetitor(competitors[1]);

    // STEP 4: OpenAI optimization with REAL competitor data
    console.log('   🧠 Calling GPT-4o-mini with competitor content...');
    const prompt = `You are a senior SEO content strategist. Transform this BeyondChats article to match the professional quality, formatting, depth, and SEO optimization of these TOP GOOGLE COMPETITOR results.

ORIGINAL BEYONDCHATS ARTICLE (preserve core message but elevate):
${article.content.substring(0, 4000)}

TOP GOOGLE COMPETITOR #1 (${new URL(competitors[0] || '').hostname}):
${comp1}

TOP GOOGLE COMPETITOR #2 (${new URL(competitors[1] || '').hostname}):
${comp2}

CRITICAL REQUIREMENTS:
1. Professional B2B tone matching competitors
2. Add H2/H3 headings, bullet lists, numbered steps
3. Natural SEO keywords: chatbot, AI chatbot, customer service, lead generation
4. Competitor-level depth (examples, stats, use cases)
5. 25-40% longer than original
6. Perfect formatting (short paragraphs, scannable)
7. End EXACTLY with: "[AI Optimized Version - Enhanced with competitor research from ${new URL(competitors[0] || '').hostname}]"

Output ONLY the rewritten article.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3000,
      temperature: 0.2
    });

    const optimizedContent = response.choices[0].message.content.trim();

    // STEP 5: Prepare updated article
    const updatedArticle = {
      ...article,
      content: optimizedContent,
      status: "updated",
      references: competitors.slice(0, 2),
      updatedAt: new Date().toISOString(),
      googleSearchQuery: `"${article.title}" blog OR article -beyondchats`
    };

    // STEP 6: Publish via YOUR CRUD API
    console.log('   💾 Publishing via PUT API...');
    await axios.put(`${API_BASE}/api/articles/${article._id}`, updatedArticle);
    
    console.log(`   ✅ SUCCESS! ${competitors.length} real competitor references added`);
    console.log(`   📎 ${competitors.slice(0, 2).map(c => new URL(c).hostname).join(', ')}`);
    
    return updatedArticle;

  } catch (error) {
    console.error(`   ❌ FAILED: ${error.message}`);
    return article;
  }
}

/**
 * MAIN EXECUTION - Phase 2 Complete
 */
async function main() {
  console.log('='.repeat(70));
  console.log('🚀 BEYONDCHATS PHASE 2: REAL Google → Competitor Scrape → GPT-4o-mini → API');
  console.log('📡 Backend API:', API_BASE);
  console.log('='.repeat(70));
  
  try {
    // Fetch from YOUR API
    const { data } = await axios.get(`${API_BASE}/api/articles`);
    const allArticles = data.data || data;
    const originals = allArticles.filter(a => a.status === 'original');
    
    console.log(`📚 Total articles: ${allArticles.length}`);
    console.log(`🎯 Original articles to optimize: ${originals.length}`);

    if (originals.length === 0) {
      console.log('\nℹ️  All articles already optimized!');
      console.log('✅ View results: http://localhost:5001/api/articles');
      return;
    }

    // Process each original
    for (let i = 0; i < originals.length; i++) {
      const article = originals[i];
      await optimizeSingleArticle(article);
      
      // Rate limiting (Google API + OpenAI)
      const remaining = originals.length - i - 1;
      console.log(`⏳ Rate limit wait... (${i + 1}/${originals.length}) | ${remaining} remaining`);
      await new Promise(r => setTimeout(r, 6000));
    }

    console.log('\n' + '🎉'.repeat(20));
    console.log('✅ PHASE 2 100% COMPLETE!');
    console.log('🔗 Backend results: http://localhost:5001/api/articles');
    console.log('📱 Frontend dashboard: http://localhost:5173');
    console.log('🎯 Ready for submission!');
    console.log('🎉'.repeat(20));

  } catch (error) {
    console.error('\n💥 MAIN EXECUTION FAILED:', error.message);
  }
}

// RUN!
main();
