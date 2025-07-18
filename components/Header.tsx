import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          أدوات الذكاء الاصطناعي
        </h1>
        <nav>
          <Link
            href="/"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            الرجوع للرئيسية
          </Link>
        </nav>
      </div>
    </header>
  );
}
