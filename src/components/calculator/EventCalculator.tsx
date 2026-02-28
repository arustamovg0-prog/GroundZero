import { useState } from "react";
import {
  Users,
  Calendar,
  Download,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export function EventCalculator() {
  const [guests, setGuests] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [price, setPrice] = useState<{
    base: number;
    surcharge: number;
    total: number;
  } | null>(null);

  const calculatePrice = () => {
    if (!guests || !date) return;

    const numGuests = Number(guests);
    const selectedDate = new Date(date);
    const isWeekend =
      selectedDate.getDay() === 0 || selectedDate.getDay() === 6;

    // Base logic
    let baseRate = 500000; // per hour base
    if (numGuests > 50) baseRate = 800000;
    if (numGuests > 100) baseRate = 1200000; // Corporate package

    const surcharge = isWeekend ? baseRate * 0.2 : 0; // 20% weekend surcharge

    setPrice({
      base: baseRate,
      surcharge,
      total: baseRate + surcharge,
    });
  };

  const handleGeneratePDF = async () => {
    setStatus("loading");
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.2) reject(new Error("Ошибка генерации PDF"));
          else resolve(true);
        }, 1500);
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-background p-8 rounded-3xl border border-border">
      <h3 className="text-2xl font-bold mb-6">
        Динамический расчет стоимости мероприятия
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Количество гостей
          </label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => {
                setGuests(e.target.value ? Number(e.target.value) : "");
                setPrice(null);
                setStatus("idle");
              }}
              onBlur={calculatePrice}
              className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-foreground focus:outline-none focus:border-primary"
              placeholder="Например: 50"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Дата мероприятия
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setPrice(null);
                setStatus("idle");
              }}
              onBlur={calculatePrice}
              className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {price && (
        <div className="p-6 rounded-2xl bg-card border border-border mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">Тариф:</span>
            <span className="font-bold">
              {Number(guests) > 100 ? "Корпоративный пакет" : "Стандартный"}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">
              Базовая стоимость (час):
            </span>
            <span className="font-medium">
              {price.base.toLocaleString()} UZS
            </span>
          </div>
          {price.surcharge > 0 && (
            <div className="flex justify-between items-center mb-4 text-orange-500">
              <span>Надбавка за выходной день (20%):</span>
              <span>+{price.surcharge.toLocaleString()} UZS</span>
            </div>
          )}
          <div className="pt-4 border-t border-border flex justify-between items-center">
            <span className="text-lg font-bold">Итого (час):</span>
            <span className="text-2xl font-bold text-primary">
              {price.total.toLocaleString()} UZS
            </span>
          </div>
        </div>
      )}

      {status === "error" ? (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-bold">Ошибка генерации PDF</span>
          </div>
          <p>
            Ориентировочная стоимость: от{" "}
            {(price?.base || 500000).toLocaleString()} UZS/час. Оставьте заявку,
            и наш менеджер подготовит точный расчет.
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium w-fit">
            Запросить консультацию
          </button>
        </div>
      ) : status === "success" ? (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-bold">
            Предварительное КП сгенерировано и отправлено!
          </span>
        </div>
      ) : (
        <button
          onClick={handleGeneratePDF}
          disabled={!price || status === "loading"}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            "Генерация..."
          ) : (
            <>
              <Download className="w-5 h-5" /> Сгенерировать КП в PDF
            </>
          )}
        </button>
      )}
    </div>
  );
}
