import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function SummarizerOptions({ onOptionsChange }: { onOptionsChange: (opts: any) => void }) {
  const [language, setLanguage] = useState("auto");
  const [summaryRatio, setSummaryRatio] = useState(35);
  const [wordLimit, setWordLimit] = useState(0);

  const handleOptionsChange = () => {
    onOptionsChange({ language, summaryRatio, wordLimit });
  };

  return (
    <div className="mt-4 mb-6 p-4 rounded-2xl shadow bg-white border space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>🔤 اللغة</Label>
          <Select value={language} onValueChange={(val) => { setLanguage(val); handleOptionsChange(); }}>
            <SelectTrigger>
              <SelectValue placeholder="تحديد تلقائي" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">تحديد تلقائي</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">الإنجليزية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>📉 نسبة التلخيص (%)</Label>
          <Slider
            defaultValue={[summaryRatio]}
            min={20}
            max={50}
            step={5}
            onValueChange={(val) => { setSummaryRatio(val[0]); handleOptionsChange(); }}
          />
          <div className="text-sm text-gray-500 mt-1">الملخص سيكون حوالي {summaryRatio}% من حجم النص الأصلي</div>
        </div>

        <div>
          <Label>✏️ عدد الكلمات (اختياري)</Label>
          <Input
            type="number"
            min={0}
            placeholder="مثال: 100"
            value={wordLimit > 0 ? wordLimit : ""}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setWordLimit(isNaN(val) ? 0 : val);
              handleOptionsChange();
            }}
          />
        </div>
      </div>

      <div className="pt-2">
        <Button variant="secondary" className="w-full" onClick={() => {
          const content = document.querySelector("#summary-output")?.textContent;
          if (content) {
            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "ملخص.txt";
            link.click();
            URL.revokeObjectURL(url);
          }
        }}>⬇️ تحميل الملخص كنص</Button>
      </div>
    </div>
  );
}
