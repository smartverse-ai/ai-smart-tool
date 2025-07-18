// components/Navbar.tsx

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-zinc-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* الشعار */}
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          AI Smart Tool
        </Link>

        {/* الروابط */}
        <nav className="space-x-4 rtl:space-x-reverse">
          <Link
            href="/"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition"
          >
            الرئيسية
          </Link>
          <Link
            href="/tools"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition"
          >
            الأدوات
          </Link>
          <Link
            href="/about"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition"
          >
            من نحن
          </Link>
        </nav>
      </div>
    </header>
  );
}
