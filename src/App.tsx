import { useEffect, useState } from 'react'
import './App.css'
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import type { Ticket } from './types/ticket';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    console.log('Fetching tickets from server...');
    fetch('http://localhost:5000/api/tickets')
      .then(res => res.json())
      .then(data => {
        console.log('Tickets received:', data);
        setTickets(data);
      })
      .catch(err => console.error('Failed to fetch tickets:', err));
  }, []);

  const addTicket = (ticket: Ticket) => {
    setTickets([ticket, ...tickets])
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
      <TicketForm onSubmit={(formTicket) => {
        const newTicket: Ticket = {
          ...formTicket,
          id: crypto.randomUUID(),
          status: 'Open'
        };
        addTicket(newTicket);
      }} />
      <TicketList tickets={tickets} toggleStatus={toggleTicketStatus} />
    </div>
  );
}

export default App