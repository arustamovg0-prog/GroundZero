import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Gift, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function B2BForm({ productName }: { productName?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    employees: "",
    contractTerm: "6", // in months
    comments: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Введите ваше имя";
    if (!formData.phone.trim()) newErrors.phone = "Введите номер телефона";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }
    if (!formData.company.trim())
      newErrors.company = "Введите название компании";
    if (!formData.employees.trim() || Number(formData.employees) < 1) {
      newErrors.employees = "Укажите количество сотрудников";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          teamSize: Number(formData.employees),
          term: Number(formData.contractTerm),
          segment: productName || "Corporate",
          utm: window.location.search,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const serverErrors: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            serverErrors[err.path[0]] = err.message;
          });
          setErrors(serverErrors);
          throw new Error("Пожалуйста, исправьте ошибки в форме");
        }
        throw new Error(data.message || "Ошибка при отправке данных");
      }

      // Fire GA4 event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          currency: "UZS",
          value: 0,
          lead_type: "B2B",
        });
      }

      window.location.href = "/thank-you";
    } catch (err: any) {
      setSubmitError(err.message || "Произошла ошибка");
      setIsSubmitting(false);
    }
  };

  const isLongTerm = Number(formData.contractTerm) >= 12;
  const isPriority = Number(formData.contractTerm) >= 24;

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background p-10 rounded-3xl border border-border text-center flex flex-col items-center justify-center min-h-[400px]"
      >
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Заявка успешно отправлена!</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Мы получили ваши данные. Подтверждение отправлено на{" "}
          <strong className="text-foreground">{formData.email}</strong>. Наш
          B2B-менеджер свяжется с вами в течение 30 минут.
        </p>
        <div className="flex flex-col gap-2 mt-4 text-xs text-muted-foreground/60 font-mono bg-card px-4 py-3 rounded-xl border border-border text-left">
          <div>✓ Уведомление менеджеру отправлено</div>
          <div>✓ Данные записаны в Google Sheets</div>
          <div>✓ Email-подтверждение клиенту отправлено</div>
          {isPriority && (
            <div className="text-emerald-500 font-bold">
              ✓ Статус: Priority Client (Уведомление руководителю)
            </div>
          )}
        </div>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              name: "",
              phone: "",
              email: "",
              company: "",
              employees: "",
              contractTerm: "6",
              comments: "",
            });
          }}
          className="mt-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Отправить новую заявку
        </button>
      </motion.div>
    );
  }

  return (
    <form
      className="bg-background p-8 rounded-3xl border border-border text-left flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-card rounded-lg border border-border">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Корпоративная заявка</h3>
          <p className="text-sm text-muted-foreground">
            Для команд и долгосрочных контрактов
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Имя представителя *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            className={cn(
              "bg-card border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-colors",
              errors.name
                ? "border-red-500 focus:border-red-500"
                : "border-border focus:border-primary",
            )}
            placeholder="Иван Иванов"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Телефон *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: "" });
            }}
            className={cn(
              "bg-card border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-colors",
              errors.phone
                ? "border-red-500 focus:border-red-500"
                : "border-border focus:border-primary",
            )}
            placeholder="+998 90 123 45 67"
          />
          {errors.phone && (
            <span className="text-red-500 text-xs">{errors.phone}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Рабочий Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            className={cn(
              "bg-card border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-colors",
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-border focus:border-primary",
            )}
            placeholder="ivan@company.com"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Название компании *
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => {
              setFormData({ ...formData, company: e.target.value });
              if (errors.company) setErrors({ ...errors, company: "" });
            }}
            className={cn(
              "bg-card border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-colors",
              errors.company
                ? "border-red-500 focus:border-red-500"
                : "border-border focus:border-primary",
            )}
            placeholder="ООО Ромашка"
          />
          {errors.company && (
            <span className="text-red-500 text-xs">{errors.company}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Размер команды *
          </label>
          <input
            type="number"
            min="1"
            value={formData.employees}
            onChange={(e) => {
              setFormData({ ...formData, employees: e.target.value });
              if (errors.employees) setErrors({ ...errors, employees: "" });
            }}
            className={cn(
              "bg-card border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-colors",
              errors.employees
                ? "border-red-500 focus:border-red-500"
                : "border-border focus:border-primary",
            )}
            placeholder="Например: 12"
          />
          {errors.employees && (
            <span className="text-red-500 text-xs">{errors.employees}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Срок контракта (мес)
          </label>
          <select
            value={formData.contractTerm}
            onChange={(e) =>
              setFormData({ ...formData, contractTerm: e.target.value })
            }
            className="bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
          >
            <option value="1">1 месяц</option>
            <option value="3">3 месяца</option>
            <option value="6">6 месяцев</option>
            <option value="12">12 месяцев</option>
            <option value="24">24 месяца</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {isLongTerm && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 flex gap-4 items-start">
              <div className="p-2 bg-primary/20 rounded-full shrink-0 mt-0.5">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">
                  Специальные условия для долгосрочных контрактов
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  При контракте от 12 месяцев вы получаете скидку до 15%,
                  бесплатное брендирование офиса и удвоенные кредиты на
                  переговорные комнаты.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted-foreground">
          Комментарий (опционально)
        </label>
        <textarea
          value={formData.comments}
          onChange={(e) =>
            setFormData({ ...formData, comments: e.target.value })
          }
          className="bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none h-24"
          placeholder="Опишите специфичные требования вашей команды..."
        ></textarea>
      </div>

      {submitError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-primary-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Отправка...
          </span>
        ) : (
          `Получить B2B-предложение${productName ? ` на ${productName}` : ""}`
        )}
      </button>
    </form>
  );
}
