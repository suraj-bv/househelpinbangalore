import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/blogs", label: "Blogs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glassmorphism border-b border-primary/10 premium-shadow">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-xl font-bold text-primary hover:text-accent transition-colors">
          House Help in Bengaluru
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                isActive(link.to)
                  ? "gradient-primary text-white shadow-lg"
                  : "text-foreground hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-xl p-2 text-foreground hover:bg-primary/10 md:hidden transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="animate-fade-in border-t border-primary/10 glassmorphism px-4 pb-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                isActive(link.to)
                  ? "gradient-primary text-white shadow-lg"
                  : "text-foreground hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
