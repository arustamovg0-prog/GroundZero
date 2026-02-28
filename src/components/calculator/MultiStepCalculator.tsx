import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  Users,
  User,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MultiStepCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    employees: "" as number | "",
    startDate: "Срочно",
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (formData.employees === "" || formData.employees < 1) {
        newErrors.employees = "Укажите количество сотрудников";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Введите ваше имя";
    if (!formData.phone.trim()) newErrors.phone = "Введите номер телефона";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Simulate API call to CRM (Bitrix/HubSpot)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random error for demonstration (10% chance)
          if (Math.random() < 0.1) {
            reject(new Error("Ошибка соединения с CRM. Попробуйте еще раз."));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      // Success
      setStep(3);
    } catch (err: any) {
      setSubmitError(err.message || "Произошла ошибка при отправке");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSolution = () => {
    const count = Number(formData.employees) || 0;
    if (count >= 15) {
      return {
        title: "Отдельный этаж (Custom Build)",
        desc: "Изолированное пространство с собственной инфраструктурой, переговорными и лаунж-зоной. Полная кастомизация под ваш бренд.",
        icon: <Building2 className="w-8 h-8 text-primary" />,
        btnText: "Получить индивидуальный расчет",
      };
    } else if (count >= 5) {
      return {
        title: "Team Office / Private Office",
        desc: "Готовый изолированный офис с доступом 24/7. Вся операционка и сервис-менеджмент включены.",
        icon: <Users className="w-8 h-8 text-primary" />,
        btnText: "Получить предложение и PDF",
      };
    } else {
      return {
        title: "Hot Desk / Personal Desk",
        desc: "Индивидуальные рабочие места в премиальном Open Space с доступом к переговорным комнатам.",
        icon: <User className="w-8 h-8 text-primary" />,
        btnText: "Получить предложение и PDF",
      };
    }
  };

  const solution = getSolution();

  return (
    <div className="bg-background p-8 rounded-3xl border border-border relative overflow-hidden min-h-[500px] flex flex-col">
      {/* Progress Bar */}
      {step < 3 && (
        <div className="w-full bg-card h-2 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "50%" }}
            animate={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col flex-grow"
          >
            <h3 className="text-2xl font-bold mb-6">
              Рассчитайте стоимость для вашей команды
            </h3>

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Количество сотрудников
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.employees}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employees: e.target.value ? parseInt(e.target.value) : "",
                    })
                  }
                  className={cn(
                    "bg-card border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-colors text-lg",
                    errors.employees
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-primary",
                  )}
                  placeholder="Например: 7"
                />
                {errors.employees && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.employees}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Когда планируете заезд?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Срочно", "7 дней", "30 дней"].map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input
                        type="radio"
                        name="startDate"
                        checked={formData.startDate === t}
                        onChange={() =>
                          setFormData({ ...formData, startDate: t })
                        }
                        className="peer sr-only"
                      />
                      <div className="text-center py-3 rounded-xl border border-border bg-card peer-checked:border-primary peer-checked:text-primary transition-colors text-sm font-medium">
                        {t}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button
                onClick={handleNext}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Далее <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col flex-grow"
          >
            <button
              onClick={() => setStep(1)}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium mb-6 w-fit transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Назад
            </button>

            <div className="p-5 rounded-2xl bg-card border border-border mb-8 flex gap-4 items-start">
              <div className="p-3 bg-background rounded-xl border border-border shrink-0">
                {solution.icon}
              </div>
              <div>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Рекомендуемое решение
                </div>
                <h4 className="text-lg font-bold mb-1">{solution.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {solution.desc}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={cn(
                    "bg-card border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-colors",
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-primary",
                  )}
                  placeholder="Ваше имя"
                />
                {errors.name && (
                  <span className="text-red-500 text-xs ml-1">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={cn(
                    "bg-card border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-colors",
                    errors.phone
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-primary",
                  )}
                  placeholder="+998 90 123 45 67"
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs ml-1">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={cn(
                    "bg-card border rounded-xl px-4 py-3 text-foreground focus:outline-none transition-colors",
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-primary",
                  )}
                  placeholder="Email для получения PDF"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs ml-1">
                    {errors.email}
                  </span>
                )}
              </div>

              {submitError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-start gap-2 mt-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
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
                  solution.btnText
                )}
              </button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center h-full flex-grow py-8"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Заявка успешно отправлена!
            </h3>
            <p className="text-muted-foreground mb-6 max-w-[280px]">
              Мы отправили PDF-презентацию на ваш email:{" "}
              <strong className="text-foreground">{formData.email}</strong>. Наш
              менеджер свяжется с вами в ближайшее время.
            </p>
            <div className="text-xs text-muted-foreground/50 font-mono bg-card px-3 py-1 rounded-md border border-border">
              CRM Sync: Success (Tag: B2B_LEAD)
            </div>

            <button
              onClick={() => {
                setStep(1);
                setFormData({
                  employees: "",
                  startDate: "Срочно",
                  name: "",
                  phone: "",
                  email: "",
                });
              }}
              className="mt-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Рассчитать для другой команды
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
