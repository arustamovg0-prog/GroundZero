import { motion } from "motion/react";
import {
  CheckCircle2,
  Shield,
  Clock,
  Monitor,
  Coffee,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Standard() {
  return (
    <div className="flex flex-col w-full pt-24">
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            Стандарт 24/7. <br />
            <span className="text-primary">
              Среда, которая ускоряет результат.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Мы не продаем столы и стулья. Мы предоставляем управляемую
            бизнес-среду, где всё подчинено одной цели — вашей продуктивности.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-6">Кто мы</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Ground Zero — это сеть премиальных бизнес-пространств в
                Ташкенте. Мы создаем инфраструктуру для предпринимателей,
                IT-специалистов и команд, которые ценят свое время и фокус.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                В отличие от обычных коворкингов, мы не продаем "тусовку" или
                "атмосферу". Наш продукт — это дисциплина, тишина и безупречный
                сервис.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden border border-border bg-background aspect-square relative">
              <img
                src="https://picsum.photos/seed/standard1/800/800"
                alt="Ground Zero Standard"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-12 text-center">
            Наши стандарты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: <Clock className="w-8 h-8 text-primary" />,
                title: "Доступ 24/7",
                desc: "Ваш бизнес не спит, и мы тоже. Резиденты имеют круглосуточный доступ к своему рабочему месту.",
              },
              {
                icon: <Shield className="w-8 h-8 text-primary" />,
                title: "Безопасность",
                desc: "Контроль доступа по Face ID и картам, круглосуточная охрана и видеонаблюдение.",
              },
              {
                icon: <Monitor className="w-8 h-8 text-primary" />,
                title: "Эргономика",
                desc: "Профессиональные кресла, широкие столы и правильное освещение для долгих часов работы.",
              },
              {
                icon: <Coffee className="w-8 h-8 text-primary" />,
                title: "Сервис-менеджмент",
                desc: "Клининг, интернет, канцелярия, кофе — мы берем всю операционку на себя.",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Правила среды",
                desc: "Строгие правила тишины в Open Space. Звонки только в специальных зонах.",
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
                title: "Стабильность",
                desc: "Резервные каналы интернета и бесперебойное питание для критически важных задач.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-background border border-border"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-background p-12 rounded-3xl border border-border text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Готовы повысить свою продуктивность?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Запишитесь на гостевой визит и оцените нашу инфраструктуру лично.
            </p>
            <Link
              to="/contacts"
              className="inline-flex bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              Записаться на визит
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
