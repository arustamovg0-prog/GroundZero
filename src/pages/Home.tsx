import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  Clock,
  MapPin,
  Briefcase,
  Shield,
  Wifi,
  Monitor,
  Users,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MultiStepCalculator } from "@/components/calculator/MultiStepCalculator";
import { LeadMagnet } from "@/components/forms/LeadMagnet";

export function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Block 1. Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/workspace-dark/1920/1080?blur=2"
            alt="Workspace"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-start max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <span className="px-3 py-1 rounded-full border border-border bg-card/50 text-xs font-medium tracking-wide uppercase flex items-center gap-2">
              <Clock className="w-3 h-3 text-primary" /> 24/7 доступ
            </span>
            <span className="px-3 py-1 rounded-full border border-border bg-card/50 text-xs font-medium tracking-wide uppercase flex items-center gap-2">
              <MapPin className="w-3 h-3 text-primary" /> 3 локации в Ташкенте
            </span>
            <span className="px-3 py-1 rounded-full border border-border bg-card/50 text-xs font-medium tracking-wide uppercase flex items-center gap-2">
              <Briefcase className="w-3 h-3 text-primary" /> Night Flow /
              Meeting / Event / Resident
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6"
          >
            Управляемая бизнес-среда <br className="hidden md:block" />
            <span className="text-primary">для вашего результата.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Инфраструктура 24/7 в центре Ташкента для предпринимателей,
            IT-специалистов и команд. Без суеты — только фокус, статус и
            контроль.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              to="#lead-form"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("lead-form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Начать работу в Ground Zero
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/solutions/team"
              className="bg-card border border-border text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
            >
              Подобрать решение для команды
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-sm text-muted-foreground/80 font-medium"
          >
            Мы не про "дешевле". Мы про среду, которая ускоряет результат.
          </motion.p>
        </div>
      </section>

      {/* Block 2. Отстройка / проблема → решение */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ваша среда больше не будет мешать вашему росту.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Типичный офис негибок и требует долгосрочных обязательств. Дом
              снижает продуктивность. Обычные коворкинги продают хаос и
              "атмосферу". <br />
              <br />
              <strong className="text-foreground font-semibold">
                Ground Zero — инфраструктура результата: стандартизированная,
                управляемая, 24/7.
              </strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Дисциплина и фокус",
                desc: "Пространство для глубокой работы.",
                icon: <Monitor className="w-6 h-6 text-primary" />,
              },
              {
                title: "Доступ 24/7",
                desc: "Вы работаете по своему ритму.",
                icon: <Clock className="w-6 h-6 text-primary" />,
              },
              {
                title: "Профессиональный имидж",
                desc: "Представительская среда для партнёров.",
                icon: <Briefcase className="w-6 h-6 text-primary" />,
              },
              {
                title: "Экономическая эффективность",
                desc: "Оптимизация затрат без потери статуса.",
                icon: <Shield className="w-6 h-6 text-primary" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 3. Продуктовая лестница */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Решения под масштаб вашего бизнеса.
            </h2>
            <p className="text-lg text-muted-foreground">
              Начните с точки входа и переходите на следующий уровень — без
              смены среды.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Night Flow",
                subtitle: "Ночной фокус",
                desc: "Ночная операционная система для тех, кому нужна абсолютная тишина. Концентрация без отвлекающих факторов.",
                link: "/solutions/night-flow",
                cta: "Выбрать Night Flow",
              },
              {
                title: "Hot / Personal Desk",
                subtitle: "Резидентство",
                desc: "Индивидуальная инфраструктура для трейдеров, IT-специалистов и фаундеров. Личная стабильная среда и сервис.",
                link: "/solutions/resident",
                cta: "Стать резидентом",
              },
              {
                title: "Corporate & Team",
                subtitle: "Для команд 2–10",
                desc: "Масштабируемая инфраструктура для команды. Экономически эффективная альтернатива классическому офису, без потери статуса.",
                link: "/solutions/team",
                cta: "Подобрать решение команде",
              },
              {
                title: "Meeting Rooms & Events",
                subtitle: "Переговоры и события",
                desc: "Статусные пространства для переговоров, презентаций, бизнес-встреч и профильных событий.",
                link: "/solutions/meeting",
                cta: "Забронировать зал",
              },
              {
                title: "Virtual Office",
                subtitle: "Виртуальный офис",
                desc: "Юридический адрес + ресепшен + корреспонденция. Профессиональный контур для бизнеса.",
                link: "/solutions/virtual",
                cta: "Подключить Virtual Office",
              },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className={cn(
                  "flex flex-col p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group",
                  i === 4 ? "md:col-span-2 lg:col-span-1" : "",
                )}
              >
                <div className="text-xs font-bold tracking-widest text-primary uppercase mb-2">
                  {item.subtitle}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-auto">
                  {item.cta} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground font-medium px-6 py-4 bg-card inline-block rounded-full border border-border">
              Максимальная ценность — долгосрочные резиденты и команды. Event и
              Night Flow — точки входа.
            </p>
          </div>
        </div>
      </section>

      {/* Block 4. Инфраструктура / Экосистема */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Всё, что нужно для системного роста.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {[
              {
                icon: <Wifi className="w-6 h-6" />,
                text: "Интернет с резервом — стабильная работа и звонки.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                text: "Контроль доступа и безопасность — управляемая среда 24/7.",
              },
              {
                icon: <Monitor className="w-6 h-6" />,
                text: "Эргономика и технология — рабочие зоны и переговорные без компромиссов.",
              },
              {
                icon: <Coffee className="w-6 h-6" />,
                text: "Сервис-менеджмент — мы берём операционку на себя.",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                text: "Стандарты тишины и порядка — среда поддерживает фокус.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-background border border-border text-primary shrink-0">
                  {item.icon}
                </div>
                <p className="text-foreground font-medium leading-relaxed pt-2">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5. Локации */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Три бизнес-пространства. Единый стандарт качества.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kitob Olami",
                address: "пр. Мустакиллик, 6/7",
                formats: ["Open Space", "Meeting", "Event", "Night"],
                img: "https://picsum.photos/seed/office1/800/600",
              },
              {
                name: "Minor",
                address: "ул. Осиё, 1",
                formats: ["Open Space", "Offices", "Meeting", "Night"],
                img: "https://picsum.photos/seed/office2/800/600",
              },
              {
                name: "Sharq",
                address: "ул. Буюк Ипак Йули, 1",
                formats: ["Offices", "Meeting", "Event"],
                img: "https://picsum.photos/seed/office3/800/600",
              },
            ].map((loc, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden border border-border bg-card flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={loc.img}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-2">{loc.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {loc.address}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {loc.formats.map((f) => (
                      <span
                        key={f}
                        className="px-2.5 py-1 rounded-md bg-background border border-border text-xs font-medium text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-col gap-3">
                    <Link
                      to="/contacts"
                      className="w-full bg-foreground text-background py-3 rounded-xl font-semibold text-center hover:bg-foreground/90 transition-colors text-sm"
                    >
                      Забронировать визит
                    </Link>
                    <Link
                      to="/locations"
                      className="w-full bg-transparent border border-border text-foreground py-3 rounded-xl font-semibold text-center hover:border-primary/50 transition-colors text-sm"
                    >
                      Смотреть детали
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <LeadMagnet />
        </div>
      </section>

      {/* Block 6. Лидогенерация (квалификация) */}
      <section id="lead-form" className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Инвестируйте в среду, которая приносит результат.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Оставьте заявку — мы подберём экономически эффективное решение
                под задачи вашего бизнеса или команды.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                Среда, которая поддерживает фокус и результат. 24/7.
              </div>
            </div>

            <div className="w-full">
              <MultiStepCalculator />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
