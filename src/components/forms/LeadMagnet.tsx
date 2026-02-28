import { useState, FormEvent } from "react";
import { FileText, CheckCircle2, AlertCircle, Mail } from "lucide-react";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Введите корректный email");
      return;
    }

    setStatus("loading");
    try {
      // Simulate Mailchimp API
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.1)
            reject(new Error("Ошибка отправки. Проверьте email."));
          else resolve(true);
        }, 1500);
      });
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl text-center">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">PDF успешно отправлен!</h3>
        <p className="text-muted-foreground mb-4">
          Проверьте почту {email}. Мы также запустили серию полезных писем с
          кейсами.
        </p>
        <div className="inline-flex items-center gap-2 text-xs font-mono bg-card px-3 py-1.5 rounded border border-border">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Lead Status: Warm B2B | Sequence: Active
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">
          <FileText className="w-4 h-4" /> Бесплатный гайд
        </div>
        <h3 className="text-2xl font-bold mb-3">
          Как снизить офисные расходы на 30%?
        </h3>
        <p className="text-muted-foreground">
          Скачайте PDF-руководство с реальными кейсами компаний, которые перешли
          на гибкие решения и оптимизировали бюджет.
        </p>
      </div>
      <div className="flex-1 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Ваш рабочий email"
              className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          {status === "error" && (
            <div className="text-red-500 text-sm flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {errorMsg}
            </div>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center"
          >
            {status === "loading" ? "Отправка..." : "Получить PDF на почту"}
          </button>
        </form>
      </div>
    </div>
  );
}
