import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-white text-center p-4 mt-8">
      <div className="space-x-4">
        <Link to="/terms" className="hover:underline">
          Terms of Service
        </Link>
        <Link to="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>
      <p className="mt-2 text-sm">
        &copy; {new Date().getFullYear()} Bondz. All rights reserved.
      </p>
    </footer>
  );
}
