// lib/summarize.ts

/**
 * خيارات مخصصة للتلخيص
 */
interface SummarizeOptions {
  language?: string;      // "ar", "en", أو "auto"
  summaryRatio?: number;  // نسبة التلخيص (مثال: 35)
  wordLimit?: number;     // عدد الكلمات (اختياري)
}

/**
 * دالة لإرسال نص إلى API التلخيص واستلام الملخص الناتج.
 * @param text - النص الكامل المطلوب تلخيصه.
 * @param options - خيارات إضافية للتلخيص.
 * @returns الملخص الناتج من الذكاء الاصطناعي.
 */
export async function summarizeText(text: string, options?: SummarizeOptions): Promise<string> {
  const res = await fetch("/api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      ...options,
    }),
  });

  // ✅ تحقق من أن الاستجابة من الخادم ناجحة
  if (!res.ok) {
    const errorText = await res.text(); // حتى لو لم تكن JSON
    console.error("❌ API Error:", errorText);
    throw new Error("فشل تلخيص النص. يرجى المحاولة مرة أخرى.");
  }

  // ✅ محاولة قراءة JSON بأمان ومعالجة الأخطاء
  try {
    const data = await res.json();
    if (!data.summary) {
      throw new Error("الملخص غير متاح في الرد.");
    }
    return data.summary;
  } catch (err) {
    console.error("❌ JSON Parse Error:", err);
    throw new Error("حدث خطأ أثناء تحليل الرد من الخادم.");
  }
}
