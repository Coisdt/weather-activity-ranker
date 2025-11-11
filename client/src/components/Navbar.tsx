import { Logo } from "./Logo";

export function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <Logo />
      </div>
    </nav>
  );
}

