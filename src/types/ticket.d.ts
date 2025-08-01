// client/src/types/ticket.d.ts
export interface Ticket {
  id: string;
  name: string;
  email: string;
  category: 'Bug' | 'Feature Request' | 'Question';
  description: string;
  status: 'Open' | 'Closed';
}
