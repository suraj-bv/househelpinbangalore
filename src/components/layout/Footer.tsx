import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-bold text-primary">
              House Help in Bangalore
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Professional hourly maid services in Bangalore. Get instant help for daily cleaning, dishwashing, laundry, and more – book through our app today!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/blogs" className="hover:text-primary transition-colors">Blogs</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} House Help in Bangalore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
