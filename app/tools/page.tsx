import Link from 'next/link';

export default function ToolsPage() {
  return (
    <main className="min-h-screen p-6 bg-white text-gray-900 dark:bg-zinc-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
          🧰 الأدوات المتاحة
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            href="/tools/summarizer"
            title="✂️ أداة التلخيص"
            description="تلخيص النصوص الطويلة بدقة وسرعة باستخدام الذكاء الاصطناعي."
          />

          <ToolCard
            href="/tools/chat-assistant"
            title="🤖 مساعد الدردشة"
            description="مساعد ذكي يمكنك من التحدث وطرح الأسئلة بلغات مختلفة."
          />

          {/* ✅ يمكنك إضافة أدوات أخرى هنا بنفس التنسيق */}
          {/* <ToolCard
            href="/tools/translator"
            title="🌐 مترجم AI"
            description="ترجمة فورية للنصوص بين عدة لغات."
          /> */}
        </div>
      </div>
    </main>
  );
}

function ToolCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-shadow shadow-sm hover:shadow-md"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-zinc-400">{description}</p>
    </Link>
  );
}
