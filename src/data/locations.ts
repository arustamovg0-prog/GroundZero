export interface LocationData {
  id: string;
  name: string;
  address: string;
  description: string;
  features: string[];
  formats: string[];
  images: string[];
  status: string;
}

export const locationsData: LocationData[] = [
  {
    id: "kitob-olami",
    name: "GroundZero Kitob Olami",
    address: "Ташкент, пр. Мустакиллик, 6/7",
    description: "Флагманская локация в самом центре города. Идеально подходит для крупных команд и проведения масштабных мероприятий. Просторный Open Space, изолированные офисы для команд и большая Event-площадка.",
    features: [
      "Амфитеатр на 100 человек",
      "Кофе-поинт",
      "Высокоскоростной Wi-Fi",
      "Зона отдыха",
      "Переговорные комнаты",
      "Лаунж-зона",
      "Парковка"
    ],
    formats: ["Open Space", "Team Office", "Meeting", "Event"],
    images: [
      "https://picsum.photos/seed/kitob1/1200/800",
      "https://picsum.photos/seed/kitob2/1200/800",
      "https://picsum.photos/seed/kitob3/1200/800",
      "https://picsum.photos/seed/kitob4/1200/800"
    ],
    status: "Высокая загруженность"
  },
  {
    id: "minor",
    name: "GroundZero Minor",
    address: "Ташкент, ул. Осиё, 1",
    description: "Современный коворкинг с панорамными окнами и тихой рабочей атмосферой. Отличный выбор для фрилансеров и небольших команд. Тихая и сфокусированная среда рядом с мечетью Минор.",
    features: [
      "Панорамные окна",
      "Бесплатная парковка",
      "Skype-кабины",
      "Кухня",
      "Круглосуточный доступ",
      "Изолированные офисы",
      "Переговорные комнаты"
    ],
    formats: ["Open Space", "Personal Desk", "Meeting", "Night"],
    images: [
      "https://picsum.photos/seed/minor1/1200/800",
      "https://picsum.photos/seed/minor2/1200/800",
      "https://picsum.photos/seed/minor3/1200/800",
      "https://picsum.photos/seed/minor4/1200/800"
    ],
    status: "Есть места"
  },
  {
    id: "sharq",
    name: "GroundZero Sharq",
    address: "Ташкент, ул. Буюк Ипак Йули, 12",
    description: "Бизнес-пространство для корпоративных клиентов. Большие офисы, статусные переговорные и высокий уровень сервиса. Уютное пространство в спальном районе.",
    features: [
      "Конференц-зал",
      "VIP-переговорные",
      "Ресепшен",
      "Охраняемая парковка",
      "Уютная атмосфера",
      "Кофе и чай",
      "Принтер/Скан"
    ],
    formats: ["Offices", "Meeting", "Event"],
    images: [
      "https://picsum.photos/seed/sharq1/1200/800",
      "https://picsum.photos/seed/sharq2/1200/800",
      "https://picsum.photos/seed/sharq3/1200/800",
      "https://picsum.photos/seed/sharq4/1200/800"
    ],
    status: "Свободно"
  }
];
