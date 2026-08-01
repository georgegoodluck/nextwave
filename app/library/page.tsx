"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  BookOpen,
  Download,
  Eye,
  ArrowLeft,
  Sparkles,
  FileText,
  Video,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";

interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "video" | "link" | "document";
  category: string;
  url: string;
  thumbnail?: string;
  date: string;
}

const libraryItems: LibraryItem[] = [
  {
    id: "1",
    title: "Scholar Reboot Guide",
    description:
      "Complete guide to rebooting your academic journey with proven strategies.",
    type: "pdf",
    category: "Academic",
    url: "/resources/scholar-reboot-guide.pdf",
    date: "2025-10-18",
  },
  {
    id: "2",
    title: "Campus2LinkedIn Workshop Recording",
    description:
      "Full workshop on building professional profiles and networking on LinkedIn.",
    type: "video",
    category: "Career",
    url: "https://www.youtube.com/watch?v=example",
    date: "2025-12-21",
  },
  {
    id: "3",
    title: "Breaking into Tech: Resource Pack",
    description:
      "Essential resources for starting a tech career with limited resources.",
    type: "document",
    category: "Tech",
    url: "/resources/breaking-into-tech-pack.pdf",
    date: "2026-03-25",
  },
  {
    id: "4",
    title: "Leadership in Action: Key Takeaways",
    description:
      "Summary of leadership principles and strategies from the event.",
    type: "pdf",
    category: "Leadership",
    url: "/resources/leadership-takeaways.pdf",
    date: "2026-07-18",
  },
  {
    id: "5",
    title: "NextWave Global Community Guide",
    description:
      "Everything you need to know about being part of the NextWave community.",
    type: "link",
    category: "Community",
    url: "https://chat.whatsapp.com/CGacyht0SVp1YzwTnm3wjm",
    date: "2025-01-01",
  },
  {
    id: "6",
    title: "Student Success Toolkit",
    description:
      "Curated tools and resources for academic and professional success.",
    type: "document",
    category: "Academic",
    url: "/resources/success-toolkit.pdf",
    date: "2025-09-15",
  },
];

const typeIcons = {
  pdf: <FileText className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  link: <LinkIcon className="w-5 h-5" />,
  document: <FileText className="w-5 h-5" />,
};

const typeColors = {
  pdf: "bg-red-500/20 text-red-400 border-red-500/30",
  video: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  link: "bg-green-500/20 text-green-400 border-green-500/30",
  document: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const categories = [
  "All",
  "Academic",
  "Career",
  "Tech",
  "Leadership",
  "Community",
];

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#333333] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#b8b0a8] hover:text-[#c9a84c] transition-colors touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#c9a84c]" />
              <span className="text-white font-bold">Library</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 text-[#c9a84c] text-xs font-bold uppercase tracking-widest bg-[#c9a84c]/10 px-4 py-2 rounded-full mb-4 border border-[#c9a84c]/20">
            <Sparkles className="w-4 h-4" />
            <span>Resource Library</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Explore Our <span className="text-[#c9a84c]">Library</span>
          </h1>
          <p className="text-[#7a7270] max-w-2xl mx-auto text-sm md:text-base">
            Access free resources, guides, and recordings from our past events
            to help you learn, earn, and lead.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7270] w-4 h-4" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-xl focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none text-white placeholder:text-[#7a7270] text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-custom">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all touch-manipulation ${
                  selectedCategory === category
                    ? "bg-[#c9a84c] text-[#0d0d0d]"
                    : "bg-[#1a1a1a] text-[#b8b0a8] hover:bg-[#2a2a2a] border border-[#333333]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-[#7a7270] mb-4">
          {filteredItems.length}{" "}
          {filteredItems.length === 1 ? "resource" : "resources"} found
        </p>

        {/* Library Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#333333] max-w-md mx-auto">
              <BookOpen className="w-12 h-12 text-[#7a7270] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                No Resources Found
              </h3>
              <p className="text-sm text-[#7a7270]">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] rounded-xl border border-[#333333] p-5 hover:border-[#c9a84c] hover:shadow-lg hover:shadow-[#c9a84c]/5 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`p-2.5 rounded-lg border ${typeColors[item.type]}`}
                  >
                    {typeIcons[item.type]}
                  </div>
                  <span className="text-[10px] font-medium text-[#7a7270] bg-[#0d0d0d] px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-bold text-white mb-1.5 group-hover:text-[#c9a84c] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[#7a7270] text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#7a7270]">
                    Added {new Date(item.date).toLocaleDateString()}
                  </span>
                  <a
                    href={item.url}
                    target={item.type === "link" ? "_blank" : "_self"}
                    rel={item.type === "link" ? "noopener noreferrer" : ""}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c9a84c] hover:text-[#a8873a] transition-colors touch-manipulation"
                  >
                    {item.type === "pdf" || item.type === "document" ? (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </>
                    ) : item.type === "video" ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        Watch
                      </>
                    ) : (
                      <>
                        <LinkIcon className="w-3.5 h-3.5" />
                        Visit
                      </>
                    )}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 md:p-8 border border-[#c9a84c]/20 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-white mb-2">
              Can't find what you're looking for?
            </h3>
            <p className="text-[#7a7270] text-sm mb-4">
              Reach out to us and we'll help you find the resources you need.
            </p>
            <a
              href="mailto:nextwaveglobal509@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] hover:bg-[#a8873a] text-[#0d0d0d] font-bold rounded-full transition-all touch-manipulation active:scale-95"
            >
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #c9a84c #1a1a1a;
        }
        .scrollbar-custom::-webkit-scrollbar {
          height: 3px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #c9a84c;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
