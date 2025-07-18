'use client';

import { useState } from 'react';
import { summarizeText } from '@/lib/summarize';
import SummarizerOptions from '@/components/SummarizerOptions';

export default function SummarizerForm() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(1); // المحاولة المجانية
  const [options, setOptions] = useState({
    language: 'auto',
    summaryRatio: 35,
    wordLimit: 0,
  });

  const handleSummarize = async () => {
    setError('');
    setOutput('');

    if (attempts <= 0) {
      alert('يرجى إكمال عرض بسيط للحصول على محاولات إضافية.');
      window.open('https://your-cpa-link.com', '_blank');
      return;
    }

    if (!input.trim()) {
      setError('يرجى إدخال نص لتلخيصه.');
      return;
    }

    try {
      setLoading(true);
      const summary = await summarizeText(input, options); // تمرير الخيارات
      setOutput(summary);
      setAttempts((prev) => prev - 1);
    } catch (err: any) {
      console.error('❌ Error during summarization:', err);
      setError(err.message || 'حدث خطأ غير متوقع أثناء التلخيص.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ملخص.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border">
      <h1 className="text-2xl font-bold mb-6 text-center">✂️ أداة تلخيص النصوص</h1>

      <SummarizerOptions onOptionsChange={setOptions} />

      <textarea
        className="w-full p-4 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={6}
        placeholder="أدخل النص هنا..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {error && (
        <div className="mt-3 text-red-600 bg-red-100 p-3 rounded text-sm">
          ⚠️ {error}
        </div>
      )}

      <button
        className={`w-full mt-4 py-2 px-4 rounded text-white transition ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? 'جارٍ التلخيص...' : 'تلخيص النص'}
      </button>

      <p className="mt-2 text-sm text-gray-500 text-center">
        عدد المحاولات المتبقية: {attempts}
      </p>

      {output && (
        <div className="mt-6 p-4 bg-gray-100 border rounded" id="summary-output">
          <h2 className="text-lg font-bold mb-2">💡 الملخص:</h2>
          <p className="whitespace-pre-line leading-relaxed">{output}</p>

          <button
            onClick={handleDownload}
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded w-full"
          >
            ⬇️ تحميل الملخص كنص
          </button>
        </div>
      )}
    </div>
  );
}
