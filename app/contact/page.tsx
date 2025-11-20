'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://n8n-6421994137235212.kloudbeansite.com/webhook/contactbnform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div onClick={() => router.push('/')} style={{...styles.logo, cursor: 'pointer'}}>
            <div style={styles.logoIcon}>🎙️</div>
            <span style={styles.logoText}>Billionets A.I</span>
          </div>
          <button onClick={() => router.push('/')} style={styles.navButton}>← Back to Home</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Get in Touch</h1>
          <p style={styles.heroSubtitle}>
            Let's discuss how Billionets A.I can transform your business
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.contactSection}>
        <div style={styles.contactContainer}>
          {/* Contact Form */}
          <div style={styles.formWrapper}>
            <h2 style={styles.formTitle}>Send us a Message</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Your full name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="your@email.com"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="+971 XXX XXX XXX"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Your company name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={styles.textarea}
                  placeholder="Tell us about your project..."
                  rows={5}
                />
              </div>

              {submitStatus === 'success' && (
                <div style={styles.successMessage}>
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={styles.errorMessage}>
                  ❌ {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...styles.submitButton,
                  opacity: isSubmitting ? 0.6 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div style={styles.infoWrapper}>
            <h2 style={styles.infoTitle}>Contact Information</h2>
            <p style={styles.infoDescription}>
              Reach out to us directly or visit our office. We're here to help you succeed.
            </p>

            <div style={styles.infoItems}>
              {/* Office Address */}
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📍</div>
                <div>
                  <h3 style={styles.infoItemTitle}>Office Address</h3>
                  <p style={styles.infoItemText}>
                    Billionets,<br />
                    Regal Tower,<br />
                    Business Bay,<br />
                    Dubai UAE
                  </p>
                </div>
              </div>

              {/* Email */}
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>✉️</div>
                <div>
                  <h3 style={styles.infoItemTitle}>Email</h3>
                  <a href="mailto:info@billionets.com" style={styles.infoLink}>
                    info@billionets.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📞</div>
                <div>
                  <h3 style={styles.infoItemTitle}>Phone</h3>
                  <a href="tel:+971543219060" style={styles.infoLink}>
                    +971 543 219 060
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>🕐</div>
                <div>
                  <h3 style={styles.infoItemTitle}>Business Hours</h3>
                  <p style={styles.infoItemText}>
                    Sunday - Thursday<br />
                    9:00 AM - 6:00 PM GST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 Billionets A.I. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
  },
  nav: {
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  logoIcon: {
    fontSize: '2rem',
  },
  logoText: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  navButton: {
    padding: '0.625rem 1.5rem',
    fontSize: '1rem',
    border: '2px solid #667eea',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: 'white',
    color: '#667eea',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    opacity: 0.95,
    lineHeight: '1.6',
  },
  contactSection: {
    padding: '5rem 2rem',
    backgroundColor: '#f9fafb',
  },
  contactContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '3rem',
  },
  formWrapper: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  formTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#4b5563',
  },
  input: {
    padding: '0.875rem 1rem',
    fontSize: '1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    transition: 'all 0.3s',
    outline: 'none',
  },
  textarea: {
    padding: '0.875rem 1rem',
    fontSize: '1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    transition: 'all 0.3s',
    outline: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    resize: 'vertical',
  },
  submitButton: {
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    marginTop: '0.5rem',
  },
  successMessage: {
    padding: '1rem',
    backgroundColor: '#064e3b',
    color: '#d1fae5',
    borderRadius: '8px',
    border: '1px solid #10b981',
    fontSize: '0.95rem',
  },
  errorMessage: {
    padding: '1rem',
    backgroundColor: '#7f1d1d',
    color: '#fecaca',
    borderRadius: '8px',
    border: '1px solid #ef4444',
    fontSize: '0.95rem',
  },
  infoWrapper: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  infoTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  infoDescription: {
    color: '#6b7280',
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },
  infoItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  infoItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: '2rem',
    minWidth: '3rem',
    textAlign: 'center',
  },
  infoItemTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#667eea',
    marginBottom: '0.5rem',
  },
  infoItemText: {
    color: '#4b5563',
    lineHeight: '1.6',
    margin: 0,
  },
  infoLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s',
  },
  footer: {
    padding: '2rem',
    textAlign: 'center',
    borderTop: '1px solid #e5e7eb',
    color: '#6b7280',
    backgroundColor: '#ffffff',
  },
};
