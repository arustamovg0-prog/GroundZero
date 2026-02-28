import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { MapPin, CheckCircle2 } from "lucide-react";
import { B2BForm } from "@/components/forms/B2BForm";

export function DynamicLanding() {
  const { slug } = useParams<{ slug: string }>();

  // Parse slug: e.g. "office-for-10-people-in-tashkent"
  const title =
    slug
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Аренда офиса";

  // Extract number if exists
  const match = slug?.match(/\d+/);
  const peopleCount = match ? parseInt(match[0]) : 5;

  const isIT = slug?.includes("it");

  return (
    <div className="flex flex-col w-full pt-24">
      <Helmet>
        <title>{title} | Ground Zero</title>
        <link rel="canonical" href={`https://groundzero.uz/l/${slug}`} />
        <meta
          name="description"
          content={`Ищете ${title.toLowerCase()}? Готовые решения от Ground Zero с доступом 24/7 и премиальным сервисом.`}
        />
      </Helmet>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6"
          >
            <MapPin className="w-4 h-4" /> Ташкент, Узбекистан
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Готовое рабочее пространство для вашей команды. Без скрытых
            платежей, с полным сервисным обслуживанием и доступом 24/7.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Что включено в стоимость?
            </h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <strong className="block text-foreground">
                    Полностью оборудованные рабочие места
                  </strong>
                  <span className="text-muted-foreground text-sm">
                    Эргономичная мебель для {peopleCount} сотрудников.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <strong className="block text-foreground">
                    Высокоскоростной интернет
                  </strong>
                  <span className="text-muted-foreground text-sm">
                    Резервные каналы связи
                    {isIT ? " специально для IT-команд" : ""}.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <strong className="block text-foreground">
                    Переговорные комнаты
                  </strong>
                  <span className="text-muted-foreground text-sm">
                    Кредиты на использование оборудованных meeting rooms.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <B2BForm productName={`Решение для ${peopleCount} человек`} />
          </div>
        </div>
      </section>
    </div>
  );
}
