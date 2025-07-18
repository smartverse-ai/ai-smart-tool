import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: '❌ النص المرسل فارغ.' }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // مهلة 15 ثانية

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY!}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "AI Smart Tool",
    };

    // 🌍 0. اكتشاف اللغة
    const detectLangRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content: "حدد لغة النص التالي بإرجاع اسم اللغة فقط دون أي إضافات أو شرح."
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
      signal: controller.signal,
    });

    const detectLangData = await detectLangRes.json();
    const language = detectLangData?.choices?.[0]?.message?.content?.trim() || 'unknown';

    // 🧠 1. مرحلة التلخيص
    const summarizationRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content:
              `مهمتك تلخيص النص التالي بلغة النص الأصلية (${language}) دون ترجمة أو تغيير اللغة. اجعل التلخيص في حدود 35٪ من طول النص الأصلي، مع الحفاظ على أهم النقاط والمعنى بدقة.`,
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const summarizationData = await summarizationRes.json();

    if (
      !summarizationRes.ok ||
      !summarizationData.choices ||
      !summarizationData.choices[0]?.message?.content
    ) {
      return NextResponse.json(
        { error: "فشل التلخيص: تحقق من الاتصال أو النموذج." },
        { status: 400 }
      );
    }

    const summary = summarizationData.choices[0].message.content.trim();

    // ✨ 2. مرحلة التصحيح اللغوي
    const correctionRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content:
              `صحح النص التالي لغويًا وإملائيًا فقط، دون تغيير المعنى، ودون ترجمة أو إضافة ملاحظات أو مقدمات.`,
          },
          {
            role: "user",
            content: summary,
          },
        ],
      }),
    });

    const correctionData = await correctionRes.json();

    if (
      !correctionRes.ok ||
      !correctionData.choices ||
      !correctionData.choices[0]?.message?.content
    ) {
      return NextResponse.json(
        { error: "فشل التصحيح اللغوي بعد التلخيص." },
        { status: 400 }
      );
    }

    const corrected = correctionData.choices[0].message.content.trim();

    return NextResponse.json({ summary: corrected });
  } catch (error: any) {
    console.error("❌ خطأ غير متوقع:", error?.message || error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع أثناء المعالجة. حاول لاحقًا." },
      { status: 500 }
    );
  }
}
