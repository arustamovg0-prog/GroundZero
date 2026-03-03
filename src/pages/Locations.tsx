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
import { locationsData } from "@/data/locations";

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
  const [locations, setLocations] = useState<any[]>(locationsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const cmsData: any = await fetchOccupancyFromCMS();
        if (isMounted) {
          const merged = locationsData.map((loc) => {
            const cmsLoc = cmsData.find((c: any) => c.id === loc.id);
            return { ...loc, ...cmsLoc };
          });
          setLocations(merged);
        }
      } catch (error) {
        console.error("Failed to fetch from CMS, using static fallback", error);
        // Fallback: оставляем locationsData без изменений
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
          <div className="flex flex-col gap-12">
            {locations.map((loc, i) => (
              <Link
                key={loc.id}
                to={`/locations/${loc.id}`}
                className="group block bg-background border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                  <div
                    className={cn(
                      "p-8 lg:p-12 flex flex-col justify-center",
                      i % 2 === 0 ? "lg:order-1" : "lg:order-2",
                    )}
                  >
                    {getOccupancyBadge(loc)}
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {loc.name}
                    </h2>
                    <p className="text-muted-foreground flex items-center gap-2 mb-6">
                      <MapPin className="w-5 h-5 text-primary" /> {loc.address}
                    </p>
                    <p className="text-foreground leading-relaxed mb-8 line-clamp-3">
                      {loc.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-muted-foreground">
                        Доступные форматы
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {loc.formats.map((f: string) => (
                          <span
                            key={f}
                            className="px-3 py-1.5 rounded-md bg-card border border-border text-xs font-medium text-foreground"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto inline-flex text-primary font-semibold items-center gap-2 group-hover:gap-3 transition-all">
                      Подробнее о локации
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                  <div
                    className={cn(
                      "relative h-64 lg:h-auto overflow-hidden",
                      i % 2 === 0 ? "lg:order-2" : "lg:order-1",
                    )}
                  >
                    <img
                      src={loc.images[0]}
                      alt={loc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
