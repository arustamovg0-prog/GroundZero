import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

export function Solutions() {
  const solutions = Object.values(products);

  return (
    <div className="flex flex-col w-full pt-24">
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            Решения под масштаб <br />
            <span className="text-primary">вашего бизнеса.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Начните с точки входа и переходите на следующий уровень — без смены
            среды. Мы предлагаем инфраструктуру, которая растет вместе с вами.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {solutions.map((item, i) => (
              <Link
                key={item.id}
                to={`/solutions/${item.id}`}
                className={cn(
                  "flex flex-col p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all group",
                  i === 4 ? "md:col-span-2 lg:col-span-1" : "",
                )}
              >
                <div className="text-xs font-bold tracking-widest text-primary uppercase mb-2">
                  {item.subtitle}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                  {item.heroDesc}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-auto">
                  Подробнее <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground font-medium px-6 py-4 bg-background inline-block rounded-full border border-border">
              Максимальная ценность — долгосрочные резиденты и команды. Event и
              Night Flow — точки входа.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
