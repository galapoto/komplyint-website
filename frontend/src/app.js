import { translations } from '/translations.js';

// Language and theme state
let currentLang = localStorage.getItem('komplyint-lang') || 'en';
let isDarkMode = localStorage.getItem('komplyint-theme') === 'dark' || 
                 (!localStorage.getItem('komplyint-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  setupThemeToggle();
  setupLanguageToggle();
  setupContactForm();
});

// Theme functions
function initTheme() {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();
}

function setupThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      localStorage.setItem('komplyint-theme', isDarkMode ? 'dark' : 'light');
      initTheme();
    });
  }
}

function updateThemeIcon() {
  const icon = document.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = isDarkMode ? '☀️' : '🌙';
  }
}

// Language functions
function initLanguage() {
  updateLanguage();
  updateLanguageToggle();
}

function setupLanguageToggle() {
  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'fi' : 'en';
      localStorage.setItem('komplyint-lang', currentLang);
      updateLanguage();
      updateLanguageToggle();
      document.documentElement.lang = currentLang;
    });
  }
}

function updateLanguageToggle() {
  const enSpan = document.querySelector('.lang-en');
  const fiSpan = document.querySelector('.lang-fi');
  if (enSpan && fiSpan) {
    enSpan.style.fontWeight = currentLang === 'en' ? '600' : '400';
    enSpan.style.opacity = currentLang === 'en' ? '1' : '0.6';
    fiSpan.style.fontWeight = currentLang === 'fi' ? '600' : '400';
    fiSpan.style.opacity = currentLang === 'fi' ? '1' : '0.6';
  }
}

function updateLanguage() {
  const t = translations[currentLang];
  if (!t) return;

  // Handle plain text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(t, key);
    if (value !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        // Don't update input values if they have user content (unless placeholder)
        if (el.hasAttribute('data-i18n-placeholder')) {
          el.placeholder = value;
        } else if (!el.value || el.value === el.getAttribute('data-original-value')) {
          el.value = value;
        }
      } else if (el.tagName === 'BUTTON') {
        // Update button text only if not disabled/sending
        if (!el.disabled) {
          el.textContent = value;
        }
      } else {
        el.textContent = value;
      }
    }
  });

  // Handle HTML content
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const value = getNestedValue(t, key);
    if (value !== undefined) {
      el.innerHTML = value;
    }
  });

  // Handle placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = getNestedValue(t, key);
    if (value !== undefined) {
      el.placeholder = value;
    }
  });
  
  // Update button text (after placeholder handling)
  document.querySelectorAll('button[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(t, key);
    if (value !== undefined && !el.disabled) {
      el.textContent = value;
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Contact form functions
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = form.querySelector('.btn-submit');
    const messageDiv = document.getElementById('formMessage');
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name') || undefined,
      email: formData.get('email'),
      message: formData.get('message')
    };

    // Disable submit button
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    const t = translations[currentLang];
    submitButton.textContent = t.contact.form.sending;

    // Hide previous messages
    messageDiv.style.display = 'none';
    messageDiv.className = 'form-message';

    try {
      const response = await fetch('http://localhost:8600/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.ok) {
        // Success
        messageDiv.className = 'form-message form-message-success';
        messageDiv.textContent = t.contact.form.success;
        messageDiv.style.display = 'block';
        form.reset();
      } else {
        // Error
        messageDiv.className = 'form-message form-message-error';
        messageDiv.textContent = t.contact.form.error;
        messageDiv.style.display = 'block';
      }
    } catch (error) {
      // Network or other error
      messageDiv.className = 'form-message form-message-error';
      messageDiv.textContent = t.contact.form.error;
      messageDiv.style.display = 'block';
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      const t = translations[currentLang];
      submitButton.textContent = t.contact.form.submit;
      
      // Scroll to message
      messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

