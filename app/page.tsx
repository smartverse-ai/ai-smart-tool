import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-zinc-900">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        مرحباً بك في منصة أدوات الذكاء الاصطناعي
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
        مجموعة من الأدوات الذكية المصممة لمساعدتك في الكتابة، التلخيص، إنشاء المحتوى، والمزيد. جربها مجانًا الآن!
      </p>
      <Link
        href="/tools"
        className="bg-blue-600 text-white text-lg px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
      >
        استعرض الأدوات
      </Link>
    </main>
  );
}
