// client/src/types/ticket.d.ts
export interface Ticket {
  _id: string;
  id?: string;
  id?: string;
  name: string;
  email: string;
  category: 'Bug' | 'Feature Request' | 'Question';
  description: string;
  status: 'Open' | 'Closed';
}

export type FormTicket =  {
  name: string;
  email: string;
  category: 'Bug' | 'Feature Request' | 'Question';
  description: string;
};

export type Ticket = FormTicket & {
  _id: string;
  status: 'Open' | 'Closed';
};  