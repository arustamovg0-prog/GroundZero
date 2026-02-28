import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const staticLocations = [
  {
    id: "kitob-olami",
    name: "Kitob Olami",
    address: "пр. Мустакиллик, 6/7",
    desc: "Флагманская локация в самом центре города. Просторный Open Space, изолированные офисы для команд и большая Event-площадка.",
    img: "https://picsum.photos/seed/office1/1920/1080",
    formats: ["Open Space", "Meeting", "Event", "Night"],
    features: [
      "Амфитеатр на 50 человек",
      "Кофе-поинт",
      "Лаунж-зона",
      "Парковка",
    ],
  },
  {
    id: "minor",
    name: "Minor",
    address: "ул. Осиё, 1",
    desc: "Тихая и сфокусированная среда рядом с мечетью Минор. Идеально для IT-специалистов и небольших команд.",
    img: "https://picsum.photos/seed/office2/1920/1080",
    formats: ["Open Space", "Offices", "Meeting", "Night"],
    features: [
      "Изолированные офисы",
      "Переговорные комнаты",
      "Кухня",
      "Круглосуточный доступ",
    ],
  },
  {
    id: "sharq",
    name: "Sharq",
    address: "ул. Буюк Ипак Йули, 1",
    desc: "Бизнес-пространство для корпоративных клиентов. Большие офисы, статусные переговорные и высокий уровень сервиса.",
    img: "https://picsum.photos/seed/office3/1920/1080",
    formats: ["Offices", "Meeting", "Event"],
    features: [
      "Конференц-зал",
      "VIP-переговорные",
      "Ресепшен",
      "Охраняемая парковка",
    ],
  },
];

// Симуляция ответа от CMS API
const fetchOccupancyFromCMS = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% шанс ошибки для демонстрации fallback
      if (Math.random() < 0.1) {
        reject(new Error("CMS API Error"));
      } else {
        resolve([
          { id: "kitob-olami", occupancy: 95, status: "High Occupancy" },
          { id: "minor", occupancy: 65, status: "Normal" },
          { id: "sharq", occupancy: 85, status: "Normal" },
        ]);
      }
    }, 800);
  });
};

export function Locations() {
  const [locations, setLocations] = useState<any[]>(staticLocations);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const cmsData: any = await fetchOccupancyFromCMS();
        if (isMounted) {
          const merged = staticLocations.map((loc) => {
            const cmsLoc = cmsData.find((c: any) => c.id === loc.id);
            return { ...loc, ...cmsLoc };
          });
          setLocations(merged);
        }
      } catch (error) {
        console.error("Failed to fetch from CMS, using static fallback", error);
        // Fallback: оставляем staticLocations без изменений
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const getOccupancyBadge = (loc: any) => {
    if (loc.status === "High Occupancy" || loc.occupancy >= 90) {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold mb-4">
          <AlertCircle className="w-3.5 h-3.5" />
          Осталось ограниченное количество мест
        </div>
      );
    } else if (loc.occupancy < 70) {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold mb-4">
          <Users className="w-3.5 h-3.5" />
          Доступны офисы для команд
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full pt-24">
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            Три бизнес-пространства. <br />
            <span className="text-primary">Единый стандарт качества.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Выберите локацию, которая лучше всего подходит для ваших задач.
            Везде вас ждет управляемая среда, стабильный интернет и премиальный
            сервис.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col gap-24">
            {locations.map((loc, i) => (
              <div
                key={loc.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div
                  className={cn(
                    "order-2",
                    i % 2 === 0 ? "lg:order-1" : "lg:order-2",
                  )}
                >
                  {getOccupancyBadge(loc)}
                  <h2 className="text-3xl font-bold mb-4">{loc.name}</h2>
                  <p className="text-muted-foreground flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-primary" /> {loc.address}
                  </p>
                  <p className="text-foreground leading-relaxed mb-8">
                    {loc.desc}
                  </p>

                  <div className="mb-8">
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-muted-foreground">
                      Доступные форматы
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {loc.formats.map((f: string) => (
                        <span
                          key={f}
                          className="px-3 py-1.5 rounded-md bg-background border border-border text-xs font-medium text-foreground"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-10">
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-muted-foreground">
                      Особенности
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {loc.features.map((feat: string, j: number) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contacts"
                    className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors items-center gap-2"
                  >
                    Забронировать визит
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div
                  className={cn(
                    "order-1",
                    i % 2 === 0 ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  <div className="rounded-3xl overflow-hidden border border-border bg-background aspect-video relative">
                    <img
                      src={loc.img}
                      alt={loc.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {isLoading && (
                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium border border-border flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        Синхронизация...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
