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

    try {
      const response = await fetch('https://n8n-6421994137235212.kloudbeansite.com/webhook/ultravox_inbound_custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: customAgentUrl }),
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
    input: {
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontSize: '1rem',
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
          <input
            type="url"
            value={customAgentUrl}
            onChange={(e) => setCustomAgentUrl(e.target.value)}
            placeholder="https://your-website.com"
            style={styles.input}
            required
          />
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
