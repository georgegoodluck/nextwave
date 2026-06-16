export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  registered: number;
  price: string;
  speakers: string[];
  status: string;
  image?: string;
}

export interface FormData {
  fullName: string;
  email: string;
  eventId: string;
  phone?: string;
}

export const CATEGORY_COLORS = {
  Learn: "bg-blue-100 text-blue-700",
  Earn: "bg-green-100 text-green-700",
  Lead: "bg-purple-100 text-purple-700",
  All: "bg-gold-100 text-gold-700",
} as const;
