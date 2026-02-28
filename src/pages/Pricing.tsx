import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, MapPin, Users, Clock, Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";

const pricingData = {
  eventZones: [
    {
      title: "Kitob Olami",
      capacity: "до 60 чел",
      prices: [
        { duration: "2 часа", price: "1 600 000 сум" },
        { duration: "4 часа", price: "2 200 000 сум" },
        { duration: "более 4 часов", price: "500 000 сум/час" }
      ],
      included: ["Wi-Fi", "LED Проектор", "Звук", "Флипчарт"]
    },
    {
      title: "Minor",
      capacity: "до 70 чел",
      prices: [
        { duration: "2 часа", price: "1 600 000 сум" },
        { duration: "4 часа", price: "2 200 000 сум" },
        { duration: "более 4 часов", price: "500 000 сум/час" }
      ],
      included: ["Wi-Fi", "LED Проектор", "Звук", "Флипчарт"]
    },
    {
      title: "Амфитеатр Kitob Olami",
      capacity: "до 30 чел",
      prices: [
        { duration: "2 часа", price: "1 000 000 сум" }
      ],
      included: ["Wi-Fi", "LED Проектор", "Звук", "Флипчарт"]
    }
  ],
  meetingRooms: [
    { location: "Kitob Olami", capacity: "6 мест", price: "135 000 сум/час" },
    { location: "Kitob Olami", capacity: "8 мест", price: "155 000 сум/час" },
    { location: "Kitob Olami", capacity: "10 мест", price: "190 000 сум/час" },
    { location: "Kitob Olami", capacity: "12 мест", price: "235 000 сум/час" },
    { location: "Minor", capacity: "10 мест", price: "185 000 сум/час" },
    { location: "Sharq", capacity: "8 мест", price: "130 000 сум/час" },
    { location: "Sharq", capacity: "10 мест", price: "165 000 сум/час" },
    { location: "Sharq", capacity: "16 мест", price: "220 000 сум/час" }
  ],
  nightFlow: [
    { title: "Night Pass", price: "90 000 сум", period: "ночь", desc: "одноразовый доступ", highlight: false },
    { title: "Night Pack 10", price: "700 000 сум", period: "10 ночей", desc: "", highlight: false },
    { title: "Night Pack 20", price: "1 300 000 сум", period: "20 ночей", desc: "", highlight: false },
    { title: "Night Unlimited PRO", price: "1 500 000 сум", period: "мес", desc: "безлимит", highlight: true }
  ],
  resident: [
    { title: "Hot Desk Unlimited", price: "2 200 000 сум", period: "мес", desc: "незакрепленное место, фитнес-зал, капсулы для сна" },
    { title: "Personal Hot Desk", price: "2 900 000 сум", period: "мес", desc: "закрепленное место, юридический адрес" }
  ],
  virtualOffice: [
    { title: "Virtual Desk", price: "920 000 сум", period: "мес", desc: "юридический адрес, ресепшен, обработка писем" },
    { title: "Юридический адрес", price: "600 000 сум", period: "мес", desc: "" },
    { title: "Гость 365", price: "5 400 000 сум", period: "год", desc: "" }
  ]
};

const tabs = [
  { id: "eventZones", label: "Event-зоны" },
  { id: "meetingRooms", label: "Переговорные" },
  { id: "nightFlow", label: "Night Flow" },
  { id: "resident", label: "Резидент" },
  { id: "virtualOffice", label: "Виртуальный офис" }
];

export function Pricing() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col w-full pt-24 min-h-screen bg-white font-roboto text-brand-blue">
      <Helmet>
        <title>Тарифы и Услуги | Ground Zero</title>
        <meta name="description" content="Тарифы и услуги коворкинга Ground Zero. Event-зоны, переговорные, Night Flow, резидентство и виртуальный офис." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Тарифы и Услуги
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Гибкие решения для фрилансеров, команд и крупных компаний. Выберите подходящий тариф и начните работать в комфортной среде.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 border-b border-gray-200 sticky top-16 z-30 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-brand-blue text-white"
                    : "bg-gray-100 text-brand-blue hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 flex-1 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Event Zones */}
              {activeTab === "eventZones" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pricingData.eventZones.map((zone, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                      <div className="p-8 flex-1">
                        <div className="flex items-center gap-2 text-brand-blue/70 mb-3">
                          <MapPin className="w-5 h-5" />
                          <h3 className="text-xl font-bold">{zone.title}</h3>
                        </div>
                        <h2 className="text-3xl font-bold mb-6 text-brand-blue">{zone.capacity}</h2>
                        <div className="space-y-4 mb-8">
                          {zone.prices.map((price, j) => (
                            <div key={j} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                              <span className="text-base text-brand-blue/80">{price.duration}</span>
                              <span className="text-xl font-bold text-brand-blue">{price.price}</span>
                            </div>
                          ))}
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm font-medium text-brand-blue mb-3">Включено в стоимость:</p>
                          <ul className="grid grid-cols-2 gap-2">
                            {zone.included.map((item, j) => (
                              <li key={j} className="flex items-center gap-2 text-sm text-brand-blue/80">
                                <CheckCircle2 className="w-4 h-4 text-brand-yellow shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <button className="w-full bg-brand-blue text-white py-4 rounded-xl text-base font-bold hover:bg-brand-yellow hover:text-brand-blue transition-colors">
                          Забронировать
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Meeting Rooms */}
              {activeTab === "meetingRooms" && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="p-6 text-base font-medium text-brand-blue/70">Локация</th>
                          <th className="p-6 text-base font-medium text-brand-blue/70">Вместимость</th>
                          <th className="p-6 text-base font-medium text-brand-blue/70">Стоимость (час)</th>
                          <th className="p-6 text-base font-medium text-brand-blue/70 text-right">Действие</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {pricingData.meetingRooms.map((room, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="p-6">
                              <div className="flex items-center gap-2 text-brand-blue font-medium text-base">
                                <MapPin className="w-5 h-5 text-brand-yellow" />
                                {room.location}
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center gap-2 text-brand-blue text-base">
                                <Users className="w-5 h-5 text-brand-blue/50" />
                                {room.capacity}
                              </div>
                            </td>
                            <td className="p-6 text-xl font-bold text-brand-blue">
                              {room.price}
                            </td>
                            <td className="p-6 text-right">
                              <button className="bg-brand-blue text-white px-6 py-2.5 rounded-lg text-base font-medium hover:bg-brand-yellow hover:text-brand-blue transition-colors">
                                Бронь
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Night Flow */}
              {activeTab === "nightFlow" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pricingData.nightFlow.map((plan, i) => (
                    <div 
                      key={i} 
                      className={`rounded-2xl shadow-sm border overflow-hidden flex flex-col ${
                        plan.highlight 
                          ? "bg-brand-yellow border-brand-yellow text-brand-blue" 
                          : "bg-white border-gray-200 text-brand-blue"
                      }`}
                    >
                      <div className="p-8 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                        <div className="mb-6">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          <span className={`text-base ml-1 ${plan.highlight ? "opacity-80" : "text-brand-blue/60"}`}>
                            / {plan.period}
                          </span>
                        </div>
                        {plan.desc && (
                          <p className={`text-base mt-auto ${plan.highlight ? "opacity-90 font-medium" : "text-brand-blue/70"}`}>
                            {plan.desc}
                          </p>
                        )}
                      </div>
                      <div className={`p-6 border-t ${plan.highlight ? "border-brand-blue/10" : "border-gray-100 bg-gray-50"}`}>
                        <button 
                          className={`w-full py-4 rounded-xl text-base font-bold transition-colors ${
                            plan.highlight
                              ? "bg-brand-blue text-white hover:bg-white hover:text-brand-blue"
                              : "bg-brand-blue text-white hover:bg-brand-yellow hover:text-brand-blue"
                          }`}
                        >
                          Выбрать
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Resident */}
              {activeTab === "resident" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {pricingData.resident.map((plan, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                      <div className="p-10 flex-1">
                        <h3 className="text-xl font-bold mb-6 text-brand-blue">{plan.title}</h3>
                        <div className="mb-8">
                          <span className="text-3xl font-bold text-brand-blue">{plan.price}</span>
                          <span className="text-base text-brand-blue/60 ml-2">/ {plan.period}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-yellow shrink-0 mt-0.5" />
                          <p className="text-base text-brand-blue/80 leading-relaxed">
                            {plan.desc}
                          </p>
                        </div>
                      </div>
                      <div className="p-8 bg-gray-50 border-t border-gray-100">
                        <button className="w-full bg-brand-blue text-white py-4 rounded-xl text-base font-bold hover:bg-brand-yellow hover:text-brand-blue transition-colors">
                          Стать резидентом
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Virtual Office */}
              {activeTab === "virtualOffice" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pricingData.virtualOffice.map((plan, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                      <div className="p-8 flex-1">
                        <h3 className="text-xl font-bold mb-4 text-brand-blue">{plan.title}</h3>
                        <div className="mb-6">
                          <span className="text-3xl font-bold text-brand-blue">{plan.price}</span>
                          <span className="text-base text-brand-blue/60 ml-1">/ {plan.period}</span>
                        </div>
                        {plan.desc && (
                          <p className="text-base text-brand-blue/80">
                            {plan.desc}
                          </p>
                        )}
                      </div>
                      <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <button className="w-full bg-brand-blue text-white py-4 rounded-xl text-base font-bold hover:bg-brand-yellow hover:text-brand-blue transition-colors">
                          Оформить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
