'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CreateAgentPage = () => {
  const [customAgentUrl, setCustomAgentUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const router = useRouter();

  const handleCustomAgentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAgentUrl) {
      setSubmitMessage('Please enter a valid website URL.');
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('Submitting...');

    // Ensure URL starts with https://
    let urlToSubmit = customAgentUrl.trim();
    // Remove existing protocol if user pasted it
    urlToSubmit = urlToSubmit.replace(/^https?:\/\//, '');
    // Add https:// prefix
    urlToSubmit = `https://${urlToSubmit}`;

    try {
      const response = await fetch('https://n8n-6421994137235212.kloudbeansite.com/webhook/ultravox_inbound_custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlToSubmit }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.joinUrl) {
          setSubmitMessage('Agent created! Redirecting to live demo...');
          router.push(`/demo/try?joinUrl=${encodeURIComponent(data.joinUrl)}`);
        } else {
          setSubmitMessage('Success! Your custom agent is being created. We will notify you once it is ready.');
          setCustomAgentUrl('');
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
      console.error('Webhook submission error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#110E19',
      color: 'white',
      padding: '2rem',
    },
    backLink: {
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        color: '#d1d5db',
        textDecoration: 'none',
        fontSize: '1rem',
    },
    content: {
      textAlign: 'center',
      maxWidth: '600px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#e5e7eb',
      marginBottom: '3rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: '1rem',
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    prefix: {
      color: '#9ca3af',
      fontSize: '1rem',
      userSelect: 'none',
    },
    input: {
      flex: 1,
      padding: '1rem 0 1rem 0.25rem',
      border: 'none',
      backgroundColor: 'transparent',
      color: 'white',
      fontSize: '1rem',
      outline: 'none',
    },
    button: {
      padding: '1rem',
      borderRadius: '8px',
      border: 'none',
      background: 'linear-gradient(to right, #9333ea, #7e22ce)',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
    },
    message: {
      marginTop: '1.5rem',
      fontSize: '1rem',
      color: '#d1d5db',
    },
  };

  return (
    <div style={styles.container}>
      <Link href="/demo" style={styles.backLink}>&larr; Back to Demo Options</Link>
      <div style={styles.content}>
        <h1 style={styles.title}>Create Your Own Agent</h1>
        <p style={styles.subtitle}>Provide your website URL, and our AI will learn its content to build a knowledgeable agent for you.</p>
        <form onSubmit={handleCustomAgentSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <span style={styles.prefix}>https://</span>
            <input
              type="text"
              value={customAgentUrl}
              onChange={(e) => setCustomAgentUrl(e.target.value)}
              placeholder="your-website.com"
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Create Agent'}
          </button>
        </form>
        {submitMessage && <p style={styles.message}>{submitMessage}</p>}
      </div>
    </div>
  );
};

export default CreateAgentPage;
