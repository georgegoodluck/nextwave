"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Download,
  Trash2,
  CheckCircle,
  XCircle,
  LogOut,
} from "lucide-react";

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  status: string;
  createdAt: string;
  event: {
    id: string;
    title: string;
    date: string;
  };
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchRegistrations();
  }, [statusFilter]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const url = `/api/admin/registrations${
        statusFilter !== "all" ? `?status=${statusFilter}` : ""
      }`;
      const response = await fetch(url);
      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRegistration = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      const response = await fetch(`/api/admin/registrations?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRegistrations(registrations.filter((reg) => reg.id !== id));
        alert("Registration deleted successfully");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete registration");
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
      alert("Failed to delete registration");
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setRegistrations(
          registrations.map((reg) =>
            reg.id === id ? { ...reg, status: newStatus } : reg,
          ),
        );
        alert("Status updated successfully");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Event", "Date", "Status"];
    const rows = registrations.map((reg) => [
      reg.fullName,
      reg.email,
      reg.phone || "N/A",
      reg.event.title,
      new Date(reg.createdAt).toLocaleDateString(),
      reg.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.fullName.toLowerCase().includes(search.toLowerCase()) ||
      reg.email.toLowerCase().includes(search.toLowerCase()) ||
      reg.event.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a84c]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Registrations</h1>
            <p className="text-[#7a7270] mt-1">
              Total: {registrations.length} registrations
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-[#0d0d0d] rounded-lg hover:bg-[#a8873a] transition font-semibold"
            >
              <Download size={18} />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#333333] p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7270]"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, email, or event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0d0d0d] border border-[#333333] rounded-lg focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent outline-none text-white"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-[#0d0d0d] border border-[#333333] rounded-lg focus:ring-2 focus:ring-[#c9a84c] focus:border-transparent outline-none text-white"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="waitlisted">Waitlisted</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#333333] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d0d0d] border-b border-[#333333]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7a7270] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7a7270] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7a7270] uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7a7270] uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7a7270] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7a7270] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7a7270] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333]">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-[#7a7270]"
                    >
                      No registrations found
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-[#2a2a2a] transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-white">
                          {reg.fullName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b8b0a8]">
                        {reg.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b8b0a8]">
                        {reg.phone || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {reg.event.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b8b0a8]">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reg.status === "confirmed"
                              ? "bg-green-500/20 text-green-400"
                              : reg.status === "cancelled"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          {reg.status !== "confirmed" && (
                            <button
                              onClick={() => updateStatus(reg.id, "confirmed")}
                              className="p-1 text-green-400 hover:bg-green-500/20 rounded transition"
                              title="Confirm"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          {reg.status !== "cancelled" && (
                            <button
                              onClick={() => updateStatus(reg.id, "cancelled")}
                              className="p-1 text-red-400 hover:bg-red-500/20 rounded transition"
                              title="Cancel"
                            >
                              <XCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteRegistration(reg.id)}
                            className="p-1 text-[#7a7270] hover:text-red-400 hover:bg-red-500/20 rounded transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
