import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', message: '' });
    const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setStatus(res.ok ? 'sent' : 'error');
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* inputs bound to formData */}
      <button type="submit">Send</button>
      <p>{status}</p>
    </form>
  );
}
