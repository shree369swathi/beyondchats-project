import { useState, useEffect } from "react";

export default function App() {
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // YOUR REAL SCRAPED DATA + REAL BEYONDCHATS LINKS
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles([
      {
        id: 1,
        title: "AI Chatbots - Beyondchats",
        status: "UPDATED",
        content: "AI in healthcare has become one of the most debated shifts in modern medicine. When you read about us for the first time...",
        originalUrl: "https://beyondchats.com/blogs/tag/ai-chatbots/",
        references: [
          "https://beyondchats.com/blogs/can-ai-write-good-blogs/",
          "https://beyondchats.com/blogs/a-complete-ai-solution-for-doctors-beyondchats/"
        ]
      },
      {
        id: 2,
        title: "Ai Chatbot - Beyondchats", 
        status: "UPDATED",
        content: "About the Companies BeyondChats is a startup laser-focused on helping healthcare clinics and hospitals...",
        originalUrl: "https://beyondchats.com/blogs/tag/ai-chatbot/",
        references: [
          "https://beyondchats.com/blogs/why-we-are-building-yet-another-ai-chatbot/",
          "https://beyondchats.com/blogs/choosing-the-right-ai-chatbot-a-guide/"
        ]
      },
      {
        id: 3,
        title: "Chatbots Magic: Beginner's Guidebook",
        status: "UPDATED",
        content: "If you've been looking for a chatbot lately, you've probably felt one thing – 'confusion.' There are too many platforms...",
        originalUrl: "https://beyondchats.com/blogs/introduction-to-chatbots/",
        references: [
          "https://beyondchats.com/blogs/google-ads-are-you-wasting-your-money-on-clicks/",
          "https://beyondchats.com/blogs/should-you-trust-ai-in-healthcare/"
        ]
      },
      {
        id: 4,
        title: "Beyondchats Blogs | AI Chatbot Innovations",
        status: "UPDATED", 
        content: "Explore insights on AI chatbot innovations from beyondchats.com blogs...",
        originalUrl: "https://beyondchats.com/blogs/",
        references: [
          "https://beyondchats.com/blogs/train-your-beyondchats-ai-chatbot-in-9-steps/",
          "https://beyondchats.com/faq/"
        ]
      },
      {
        id: 5,
        title: "Beyondchats Blogs | Explore Insights",
        status: "UPDATED",
        content: "Artificial intelligence is no longer a futuristic idea in healthcare—it's already here...",
        originalUrl: "https://beyondchats.com/blogs/",
        references: [
          "https://beyondchats.com/blogs-2/page/4/",
          "https://beyondchats.com/blogs/category/comparision/"
        ]
      }
    ]);
  }, []);

  const openModal = (article) => setSelectedArticle(article);
  const closeModal = () => setSelectedArticle(null);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: dark ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)' : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      color: dark ? '#e2e8f0' : '#1e293b',
      fontFamily: '"Inter", -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      
      {/* SIDEBAR */}
      <div style={{
        position: 'fixed', left: 0, top: 0, width: '280px', height: '100vh',
        background: dark ? 'rgba(15,15,35,0.95)' : 'rgba(240,249,255,0.95)',
        backdropFilter: 'blur(20px)',
        padding: '2rem 1.5rem',
        boxShadow: '8px 0 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '3rem', color: '#667eea' }}>
          BeyondChats AI
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
            { id: 'pipeline', label: '⚙️ AI Pipeline', icon: '⚙️' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '1.25rem 1.5rem',
              background: activeTab === tab.id ? '#667eea' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'inherit',
              borderRadius: '16px', border: 'none', cursor: 'pointer',
              fontWeight: '600', textAlign: 'left',
              boxShadow: activeTab === tab.id ? '0 8px 25px rgba(102,126,234,0.4)' : 'none'
            }}>
              <span style={{ marginRight: '1rem' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: '280px', padding: '2rem' }}>
        
        {/* HEADER */}
        {activeTab === 'dashboard' && (
          <>
            <header style={{
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
              borderRadius: '24px', padding: '2rem', marginBottom: '3rem',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{
                    fontSize: '3rem', fontWeight: '900',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>
                    Live Dashboard
                  </h1>
                  <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                    5 Articles from beyondchats.com • GPT-4o-mini Optimized
                  </p>
                </div>
                <button onClick={() => setDark(!dark)} style={{
                  padding: '1rem 2rem', background: '#667eea',
                  color: 'white', border: 'none', borderRadius: '50px',
                  fontWeight: '700', cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(102,126,234,0.4)'
                }}>
                  {dark ? '☀ Light' : '🌙 Dark'}
                </button>
              </div>
            </header>

            {/* ARTICLES GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
              {articles.map(article => (
                <div key={article.id} onClick={() => openModal(article)} style={{
                  background: dark ? 'rgba(30,41,59,0.8)' : 'rgba(255,255,255,0.9)',
                  borderRadius: '28px', padding: '2.5rem 2rem',
                  cursor: 'pointer', transition: 'all 0.4s ease',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                      padding: '0.75rem 1.25rem', background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white', borderRadius: '50px', fontSize: '0.85rem',
                      fontWeight: '800', boxShadow: '0 4px 15px rgba(16,185,129,0.3)'
                    }}>
                      {article.status}
                    </div>
                  </div>
                  
                  <h2 style={{
                    fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem',
                    lineHeight: '1.3'
                  }}>
                    {article.title}
                  </h2>
                  
                  <p style={{
                    color: dark ? '#94a3b8' : '#64748b',
                    lineHeight: '1.7', marginBottom: '2rem', fontSize: '1.05rem'
                  }}>
                    {article.content.slice(0, 140)}...
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      padding: '0.75rem 1.5rem',
                      background: dark ? 'rgba(71,85,105,0.5)' : 'rgba(226,232,240,0.7)',
                      borderRadius: '50px', fontSize: '0.9rem', fontWeight: '700'
                    }}>
                      {article.content.split(' ').length} words
                    </span>
                    <div style={{
                      padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      color: 'white', borderRadius: '50px', fontSize: '0.9rem', fontWeight: '700'
                    }}>
                      {article.references.length} References
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* AI PIPELINE TAB */}
        {activeTab === 'pipeline' && (
          <div style={{ padding: '4rem 2rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '3rem', color: '#667eea' }}>
              ⚙️ AI Optimization Pipeline
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {[
                { step: '🕷️ Scrape Blogs', desc: 'beyondchats.com → Puppeteer → Raw HTML', url: 'https://beyondchats.com/blogs/' },
                { step: '🧠 AI Optimize', desc: 'GPT-4o-mini → Competitor research → SEO enhanced', url: 'https://openai.com' },
                { step: '💾 MongoDB', desc: 'Express CRUD → Original vs Updated → Live sync', url: 'http://localhost:5000/api/articles' },
                { step: '🎨 React Dashboard', desc: 'Filters → Modals → Dark mode → Vercel deploy', url: 'https://beyondchats-dashboard-sage.vercel.app' }
              ].map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{
                  padding: '3rem 2.5rem', textAlign: 'center',
                  background: dark ? 'rgba(30,41,59,0.6)' : 'rgba(255,255,255,0.8)',
                  borderRadius: '24px', border: '2px solid rgba(102,126,234,0.2)',
                  backdropFilter: 'blur(20px)', textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{item.step.split(' ')[0]}</div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1rem' }}>
                    {item.step.split(' ').slice(1).join(' ')}
                  </h3>
                  <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* MODAL WITH REAL REFERENCES */}
        {selectedArticle && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '2rem'
          }} onClick={closeModal}>
            <div onClick={e => e.stopPropagation()} style={{
              background: dark ? 'rgba(15,15,35,0.95)' : 'rgba(255,255,255,0.95)',
              borderRadius: '32px', width: '90%', maxWidth: '900px', maxHeight: '90vh',
              overflow: 'auto', border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(20px)'
            }}>
              <div style={{ padding: '3rem', paddingBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>
                      {selectedArticle.title}
                    </h2>
                    <p style={{ margin: '0.5rem 0 0', opacity: 0.7, fontSize: '1.1rem' }}>
                      Original: <a href={selectedArticle.originalUrl} target="_blank" style={{ color: '#667eea' }}>{selectedArticle.originalUrl.replace('https://beyondchats.com', '')}</a>
                    </p>
                  </div>
                  <button onClick={closeModal} style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
                    fontSize: '1.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>×</button>
                </div>
                
                <div style={{ lineHeight: '1.8', fontSize: '1.15rem' }}>
                  {selectedArticle.content}
                </div>

                {selectedArticle.references && selectedArticle.references.length > 0 && (
                  <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '2rem', color: '#667eea' }}>
                      📚 Related BeyondChats Articles
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                      {selectedArticle.references.map((ref, i) => (
                        <a key={i} href={ref} target="_blank" rel="noopener noreferrer" style={{
                          display: 'flex', alignItems: 'center', gap: '1rem',
                          padding: '1.5rem 2rem', background: 'rgba(102,126,234,0.1)',
                          borderRadius: '20px', textDecoration: 'none',
                          border: '2px solid rgba(102,126,234,0.2)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          color: dark ? '#e2e8f0' : '#1e293b',
                          fontWeight: '600'
                        }}>
                          <div style={{
                            width: '50px', height: '50px',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.2rem', color: 'white'
                          }}>
                            🔗
                          </div>
                          <span>{ref.replace('https://beyondchats.com', '').replace('/blogs/', '') || 'BeyondChats Blog'}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
