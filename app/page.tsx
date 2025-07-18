import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        مرحباً بك في منصة أدوات الذكاء الاصطناعي
      </h1>
      <Link
        href="/tools/chat-assistant"
        className="bg-blue-600 text-white text-lg px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
      >
        ابدأ الآن
      </Link>
    </main>
  );
}
