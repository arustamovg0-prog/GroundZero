import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Info, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { B2BForm } from "@/components/forms/B2BForm";
import { EventCalculator } from "@/components/calculator/EventCalculator";
import { useInventory } from "@/hooks/useInventory";

export function Product() {
  const { id } = useParams<{ id: string }>();
  const product = id ? products[id as keyof typeof products] : null;
  const { status: inventoryStatus } = useInventory(id || "");

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero продукта */}
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={product.heroImg}
            alt={product.title}
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm font-bold tracking-widest text-primary uppercase mb-4">
              {product.subtitle}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-6">
              {product.heroPromise}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              {product.heroDesc}
            </p>
            <Link
              to="#lead-form"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("lead-form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors items-center gap-2"
            >
              Получить предложение
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Для кого / Кейсы применения */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12">Для кого это решение</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.forWhom.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-background border border-border"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Что входит & Как работает */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">Что входит в стандарт</h2>
              <ul className="space-y-4">
                {product.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8">Правила среды</h2>
              <div className="space-y-6">
                {product.rules.map((rule, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shrink-0 text-primary font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">
                        {rule.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Пакеты/тарифы */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Пакеты и стоимость
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {product.pricing.map((plan, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-background border border-border flex flex-col"
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">
                    / {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {inventoryStatus === "Full" ? (
                  <div className="w-full bg-muted text-muted-foreground py-3 rounded-xl font-semibold text-center text-sm">
                    Мест нет
                  </div>
                ) : (
                  <Link
                    to="#lead-form"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("lead-form")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full bg-card border border-border text-foreground py-3 rounded-xl font-semibold text-center hover:border-primary transition-colors"
                  >
                    Выбрать пакет
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Частые вопросы
          </h2>
          <div className="space-y-6">
            {product.faq.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <h4 className="font-semibold text-lg mb-2 flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {item.q}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed pl-8">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA-форма */}
      <section id="lead-form" className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Оставьте заявку на {product.title}
          </h2>
          <p className="text-muted-foreground mb-10">
            Мы свяжемся с вами в течение рабочего дня для уточнения деталей.
          </p>

          {product.id === "event" ? (
            <EventCalculator />
          ) : product.id === "team" || product.id === "virtual" ? (
            <B2BForm productName={product.title} />
          ) : (
            <form
              className="bg-background p-8 rounded-3xl border border-border text-left flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Имя
                  </label>
                  <input
                    type="text"
                    className="bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    className="bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors mt-2"
              >
                Получить предложение
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Переход вверх по лестнице */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link
            to={product.nextLevel.link}
            className="group flex flex-col sm:flex-row items-center justify-between p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors gap-6"
          >
            <div>
              <div className="text-sm font-bold tracking-widest text-primary uppercase mb-2">
                Следующий уровень
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {product.nextLevel.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {product.nextLevel.desc}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ChevronRight className="w-6 h-6 text-foreground" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
