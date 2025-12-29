import { useEffect, useState } from "react";
// REMOVED axios import - MOCK DATA for Vercel deployment

export default function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // FULL MOCK DATA - 10 articles (5 original + 5 updated) for Vercel LIVE demo
    const mockArticles = [
      {
        _id: "1",
        title: "🤖 AI Chatbots Magic: The Future of Customer Engagement",
        status: "updated",
        content: "AI-optimized content with competitor research from Tidio, Intercom, and Drift. Enhanced with GPT-4o-mini for 2x engagement rates and better SEO performance. Added competitor pricing analysis and feature comparison tables.",
        references: ["tidio.com/blog/ai-chatbots", "intercom.com/learn/ai-customer-service", "drift.com/blog/chatbot-statistics"]
      },
      {
        _id: "2",
        title: "📈 Chatbot SEO Guide: Rank Higher in 2025",
        status: "original",
        content: "Original scraped content from beyondchats.com blogs about chatbot SEO best practices and optimization strategies for search engines."
      },
      {
        _id: "3",
        title: "🎓 Train Your BeyondChats AI Chatbot in 9 Steps",
        status: "updated",
        content: "Enhanced with OpenAI GPT-4o-mini improvements and competitor analysis from ChatGPT, Claude, and Gemini. Added training data optimization techniques and performance benchmarking.",
        references: ["openai.com/gpt-4o", "anthropic.com/claude", "deepmind.google/gemini"]
      },
      {
        _id: "4",
        title: "📊 Chatbot Analytics Dashboard Setup",
        status: "original",
        content: "Original scraped content from beyondchats.com blogs about analytics dashboard setup and performance tracking for chatbots."
      },
      {
        _id: "5",
        title: "💬 WhatsApp Business Chatbots Guide",
        status: "updated",
        content: "Competitor analysis + AI enhancements for WhatsApp Business API integration. Compared with Twilio, MessageBird, and Gupshup pricing and features.",
        references: ["whatsapp.com/business/api", "twilio.com/whatsapp", "messagebird.com/whatsapp"]
      },
      {
        _id: "6",
        title: "🎙️ Voice Chatbots: Beyond Text Conversations",
        status: "original",
        content: "Original scraped content from beyondchats.com blogs about voice AI integration and conversational interfaces."
      },
      {
        _id: "7",
        title: "🌐 Multilingual Chatbots for Global Markets",
        status: "updated",
        content: "Translated + optimized for global markets with DeepL and Google Translate integration. Added 15+ language support comparison with competitors.",
        references: ["deepl.com", "translate.google.com", "microsoft.com/translator"]
      },
      {
        _id: "8",
        title: "🛒 Ecommerce Chatbots: Shopify & WooCommerce",
        status: "original",
        content: "Original scraped content from beyondchats.com blogs about ecommerce platform integrations."
      },
      {
        _id: "9",
        title: "🎯 Lead Generation Chatbots That Convert",
        status: "updated",
        content: "Conversion optimized with A/B testing results and HubSpot/Marketo integration guides. Added qualification scoring algorithms.",
        references: ["hubspot.com/products/chatbot-builder", "marketo.com/engage"]
      },
      {
        _id: "10",
        title: "🛠️ 24/7 Customer Support AI Systems",
        status: "original",
        content: "Original scraped content from beyondchats.com blogs about automated customer support systems and Zendesk integration."
      }
    ];
    
    // Simulate loading
    setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1500);
  }, []);

  return { articles, loading, error };
}
