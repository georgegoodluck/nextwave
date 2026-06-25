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

// Helper function to get status badge color
export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "upcoming":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "past":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    case "coming soon":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  }
};
