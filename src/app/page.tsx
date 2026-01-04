'use client'

import { useState, useEffect } from 'react'
import { translations, type Language } from '@/lib/translations'

export default function Home() {
  const [lang, setLang] = useState<Language>('en')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('language') as Language | null
    if (saved === 'en' || saved === 'fi') {
      setLang(saved)
    }
    
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
  }, [theme, mounted])

  // Always use a valid language (default to 'en' during SSR)
  const currentLang: Language = mounted ? lang : 'en'
  const t = translations[currentLang]

  const handleLangToggle = () => {
    const newLang: Language = lang === 'en' ? 'fi' : 'en'
    setLang(newLang)
    if (mounted) {
      localStorage.setItem('language', newLang)
    }
  }

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (mounted) {
      localStorage.setItem('theme', newTheme)
    }
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo">
              <img src="/logo.svg" alt="KOMPLYINT OY" className="logo-img" />
            </a>
            <div className="header-controls">
              <button
                onClick={handleLangToggle}
                className={`lang-toggle ${currentLang === 'fi' ? 'active' : ''}`}
                aria-label="Switch language"
              >
                <span>{currentLang.toUpperCase()}</span>
              </button>
              <button
                onClick={handleThemeToggle}
                className="theme-toggle"
                aria-label="Toggle theme"
              >
                <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero bg-green">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{t.hero.title}</h1>
            <h2 className="hero-subtitle">{t.hero.subtitle}</h2>
            <p className="hero-text">{t.hero.text}</p>
            <blockquote className="hero-disclaimer">{t.hero.disclaimer}</blockquote>
            <a href="#contact" className="btn-contact">{t.hero.contactBtn}</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services bg-blue">
        <div className="container">
          <h2 className="section-title">{t.services.title}</h2>
          <div className="cards">
            <div className="card bg-green-card">
              <h3 className="card-title">{t.services.card1.title}</h3>
              <p className="card-text">{t.services.card1.text}</p>
            </div>
            <div className="card bg-blue-card">
              <h3 className="card-title">{t.services.card2.title}</h3>
              <p className="card-text">{t.services.card2.text}</p>
            </div>
            <div className="card bg-green-card">
              <h3 className="card-title">{t.services.card3.title}</h3>
              <p className="card-text">{t.services.card3.text}</p>
            </div>
            <div className="card bg-blue-card">
              <h3 className="card-title">{t.services.card4.title}</h3>
              <p className="card-text">{t.services.card4.text}</p>
            </div>
          </div>
          <blockquote
            className="services-disclaimer"
            dangerouslySetInnerHTML={{ __html: t.services.disclaimer }}
          />
        </div>
      </section>

      {/* How We Typically Work */}
      <section className="howwework bg-green">
        <div className="container">
          <h2 className="section-title">{t.howwework.title}</h2>
          <ul className="approach-list">
            <li>{t.howwework.item1}</li>
            <li>{t.howwework.item2}</li>
            <li>{t.howwework.item3}</li>
          </ul>
        </div>
      </section>

      {/* Our Approach */}
      <section className="approach bg-green">
        <div className="container">
          <h2 className="section-title">{t.approach.title}</h2>
          <ul className="approach-list">
            <li>{t.approach.item1}</li>
            <li>{t.approach.item2}</li>
            <li>{t.approach.item3}</li>
            <li>{t.approach.item4}</li>
          </ul>
        </div>
      </section>

      {/* About */}
      <section className="about bg-blue">
        <div className="container">
          <h2 className="section-title">{t.about.title}</h2>
          <div className="about-content">
            <p className="about-text">{t.about.text1}</p>
            <p
              className="about-text"
              dangerouslySetInnerHTML={{ __html: t.about.text2 }}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact bg-green">
        <div className="container">
          <h2 className="section-title">{t.contact.title}</h2>
          <div className="contact-content">
            <ContactForm t={t.contact} lang={lang} />
            <blockquote className="contact-disclaimer">{t.contact.disclaimer}</blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p
            className="footer-text"
            dangerouslySetInnerHTML={{ __html: t.footer.text1 }}
          />
          <p
            className="footer-text footer-independence"
            dangerouslySetInnerHTML={{ __html: t.footer.text2 }}
          />
        </div>
      </footer>
    </>
  )
}

function ContactForm({ t, lang }: { t: typeof translations.en.contact; lang: Language }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(t.form.error)
    }
  }

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{t.form.name}</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.form.namePlaceholder}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            {t.form.email} <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.form.emailPlaceholder}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">
            {t.form.message} <span className="required">*</span>
          </label>
          <textarea
            id="message"
            className="form-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.form.messagePlaceholder}
            required
            rows={6}
          />
        </div>
        {status === 'success' && (
          <div className="form-message success">{t.form.success}</div>
        )}
        {status === 'error' && (
          <div className="form-message error">{errorMessage || t.form.error}</div>
        )}
        <button type="submit" className="btn-submit" disabled={status === 'sending'}>
          {status === 'sending' ? t.form.sending : t.form.submit}
        </button>
      </form>
    </>
  )
}
