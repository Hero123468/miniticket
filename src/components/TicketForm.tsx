// client/src/components/TicketForm.tsx
import React, { useState } from 'react';
import type { Ticket } from '../types/ticket';

type Props = {
  onSubmit: (ticket: Ticket) => void;
};

export default function TicketForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Omit<Ticket, 'id' | 'status'>>({
    name: '',
    email: '',
    category: 'Bug',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket: Ticket = {
      ...form,
      id: Date.now().toString(),
      status: 'Open',
    };
    onSubmit(ticket);
    setForm({ name: '', email: '', category: 'Bug', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required className="w-full p-2 border" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Your email" type="email" required className="w-full p-2 border" />
      <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border">
        <option value="Bug">Bug</option>
        <option value="Feature Request">Feature Request</option>
        <option value="Question">Question</option>
      </select>
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the issue" required className="w-full p-2 border" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Ticket</button>
    </form>
  );
}
