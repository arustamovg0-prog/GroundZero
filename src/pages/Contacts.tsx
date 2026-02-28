import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contacts() {
  return (
    <div className="flex flex-col w-full pt-24">
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            Контакты. <br />
            <span className="text-primary">Записаться на визит.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Оставьте заявку, и наш менеджер свяжется с вами для подбора
            оптимального решения и организации визита в одну из наших локаций.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">Свяжитесь с нами</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-background border border-border text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Телефон</h4>
                    <p className="text-muted-foreground">+998 71 200 00 00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-background border border-border text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                    <p className="text-muted-foreground">hello@groundzero.uz</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-background border border-border text-primary shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Режим работы</h4>
                    <p className="text-muted-foreground">
                      Для резидентов: 24/7
                      <br />
                      Ресепшен: 09:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6">Локации</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-background border border-border flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Kitob Olami</h4>
                    <p className="text-xs text-muted-foreground">
                      пр. Мустакиллик, 6/7
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Minor</h4>
                    <p className="text-xs text-muted-foreground">ул. Осиё, 1</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Sharq</h4>
                    <p className="text-xs text-muted-foreground">
                      ул. Буюк Ипак Йули, 1
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background p-8 rounded-3xl border border-border">
              <h2 className="text-2xl font-bold mb-6">Оставить заявку</h2>
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
              >
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

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Интересующее решение
                  </label>
                  <select className="bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>Hot / Personal Desk</option>
                    <option>Corporate / Team</option>
                    <option>Night Flow</option>
                    <option>Meeting Rooms</option>
                    <option>Event Spaces</option>
                    <option>Virtual Office</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Предпочитаемая локация
                  </label>
                  <select className="bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>Любая</option>
                    <option>Kitob Olami</option>
                    <option>Minor</option>
                    <option>Sharq</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Комментарий (опционально)
                  </label>
                  <textarea
                    className="bg-card border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none h-24"
                    placeholder="Опишите ваши задачи..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors mt-2"
                >
                  Отправить заявку
                </button>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Ответим в течение рабочего дня. Без спама.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
