import React from "react";
import { SocialIcon } from "react-social-icons";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter text-(--nw-charcoal)">
              Nextwave <span className="text-(--nw-gold)">Global</span>
            </h3>
            <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
              Equipping students with the knowledge, skills, and mindset to
              thrive academically and professionally. Bridging the gap between
              education and real-world opportunities.
            </p>
            <div className="flex gap-4">
              <SocialIcon
                url="https://linkedin.com/in/your-profile"
                bgColor="#1a1a1a"
                fgColor="#fdfbf7"
                style={{ height: 36, width: 36 }}
                className="hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              />
              <SocialIcon
                url="https://twitter.com/your-handle"
                bgColor="#1a1a1a"
                fgColor="#fdfbf7"
                style={{ height: 36, width: 36 }}
                className="hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              />
              <SocialIcon
                url="https://instagram.com/your-handle"
                bgColor="#1a1a1a"
                fgColor="#fdfbf7"
                style={{ height: 36, width: 36 }}
                className="hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>

          {/* Programs Column */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-(--nw-charcoal)">
              Initiatives
            </h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li>
                <a
                  href="#programs"
                  className="hover:text-(--nw-gold) transition"
                >
                  Scholar Reboot
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="hover:text-(--nw-gold) transition"
                >
                  Campus2LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#mentorship"
                  className="hover:text-(--nw-gold) transition"
                >
                  Mentorship
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-(--nw-charcoal)">
              Contact
            </h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="flex items-center gap-2">
                <Mail size={16} /> hello@nextwaveglobal.org
              </li>
              <li className="text-(--nw-gold) font-bold italic">
                Learn. Earn. Lead.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
          <p>
            © {new Date().getFullYear()} Nextwave Global. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-(--nw-gold) transition">
              Privacy
            </a>
            <a href="#" className="hover:text-(--nw-gold) transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
