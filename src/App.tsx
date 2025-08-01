import { useState } from 'react'
import './App.css'
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import type { Ticket } from './types/ticket';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const addTicket = (ticket: Ticket) => {
    setTickets([ticket, ...tickets]);
  };

  const toggleTicketStatus = (id: string) => {
    setTickets(
      tickets.map(ticket =>
        ticket.id === id ? { ...ticket, status: ticket.status === 'Open' ? 'Closed' : 'Open' } : ticket
      )
    );
  }
    
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">MiniTicket Support System</h1>
      <TicketForm onSubmit={addTicket} />
      <TicketList tickets={tickets} toggleStatus={toggleTicketStatus} />
    </div>
  );
}

export default App