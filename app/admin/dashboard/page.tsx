"use client";

import { useState, useEffect } from "react";
import { registrationService } from "@/lib/registration";

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  eventTitle: string;
  eventDate: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    attended: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/register");
      const data = await res.json();
      setRegistrations(data.registrations);

      // Calculate stats
      const total = data.registrations.length;
      const pending = data.registrations.filter(
        (r: any) => r.status === "PENDING",
      ).length;
      const confirmed = data.registrations.filter(
        (r: any) => r.status === "CONFIRMED",
      ).length;
      const attended = data.registrations.filter(
        (r: any) => r.status === "ATTENDED",
      ).length;
      const cancelled = data.registrations.filter(
        (r: any) => r.status === "CANCELLED",
      ).length;

      setStats({ total, pending, confirmed, attended, cancelled });
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/register/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchRegistrations();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
        <div className="text-[#c9a84c]">Loading registrations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Registration Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333333]">
            <p className="text-[#7a7270] text-sm">Total</p>
            <p className="text-white text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333333]">
            <p className="text-[#7a7270] text-sm">Pending</p>
            <p className="text-yellow-400 text-2xl font-bold">
              {stats.pending}
            </p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333333]">
            <p className="text-[#7a7270] text-sm">Confirmed</p>
            <p className="text-green-400 text-2xl font-bold">
              {stats.confirmed}
            </p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333333]">
            <p className="text-[#7a7270] text-sm">Attended</p>
            <p className="text-blue-400 text-2xl font-bold">{stats.attended}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333333]">
            <p className="text-[#7a7270] text-sm">Cancelled</p>
            <p className="text-red-400 text-2xl font-bold">{stats.cancelled}</p>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#333333] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d0d0d] border-b border-[#333333]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#7a7270] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#7a7270] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#7a7270] uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#7a7270] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#7a7270] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#7a7270] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333]">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#2a2a2a] transition">
                    <td className="px-4 py-3 text-sm text-white">
                      {reg.fullName}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#b8b0a8]">
                      {reg.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#b8b0a8]">
                      {reg.eventTitle}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#b8b0a8]">
                      {reg.eventDate}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          reg.status === "PENDING"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : reg.status === "CONFIRMED"
                              ? "bg-green-500/20 text-green-400"
                              : reg.status === "ATTENDED"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={reg.status}
                        onChange={(e) => updateStatus(reg.id, e.target.value)}
                        className="bg-[#0d0d0d] text-white text-sm rounded-lg border border-[#333333] px-3 py-1.5 focus:border-[#c9a84c] focus:outline-none"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="ATTENDED">Attended</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
