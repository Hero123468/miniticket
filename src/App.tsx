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

  const toggleTicketStatus = async (id: string) => {
  const ticketToUpdate = tickets.find(ticket => ticket.id === id || ticket._id=== id);
  if (!ticketToUpdate) return;

  const newStatus = ticketToUpdate.status === 'Open' ? 'Closed' : 'Open';

  try {
    const response = await fetch(`http://localhost:5000/api/tickets/${ticketToUpdate._id || ticketToUpdate.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) throw new Error('Failed to update ticket status');

    const updatedTicket = await response.json();

    setTickets(tickets.map(ticket =>
      (ticket.id === id || ticket._id === id) ? updatedTicket : ticket
    ));
  } catch (err) {
    console.error('Error updating ticket status:', err);
  }
};

    
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">MiniTicket Support System</h1>
      <TicketForm onSubmit={(formTicket) => {
        const tempTicket: Ticket = {
          ...formTicket,
          _id: crypto.randomUUID(),
          status: 'Open'
        };
        addTicket(tempTicket);
      }} />
      <TicketList tickets={tickets} toggleStatus={toggleTicketStatus} />
    </div>
  );
}

export default App