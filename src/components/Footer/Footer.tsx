import React from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Calendar,
  Brain,
} from "lucide-react";
import { Link } from "react-router";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-3 text-white">Mini Event Scheduler</h2>
          <p className="text-sm text-gray-400">
            Plan events quickly. Our AI sorts and reminds you, so you're always
            on time and organized.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/create-event" className="hover:text-white">Create Event</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Features</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              AI Categorization
            </li>
            <li className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              Smart Scheduling
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Connect with Us</h3>
          <div className="flex gap-4 text-gray-400 mb-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="hover:text-white" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="hover:text-white" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="hover:text-white" />
            </a>
            <a href="mailto:example@email.com">
              <Mail className="hover:text-white" />
            </a>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Mini Event Scheduler</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
