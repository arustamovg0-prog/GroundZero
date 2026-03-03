<?php
/* Template Name: Локации */
get_header();

function icon_map_pin_loc() { return '<svg class="w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>'; }
function icon_arrow_right() { return '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>'; }

// В WordPress данные должны выводиться через WP_Query для типа поста 'location'.
// Для демонстрации адаптации React-кода используем массив.
$locations = array(
    array(
        'id' => 'kitob-olami',
        'name' => 'GroundZero Kitob Olami',
        'address' => 'Ташкент, пр. Мустакиллик, 6/7',
        'description' => 'Флагманская локация в самом центре города. Идеально подходит для крупных команд и проведения масштабных мероприятий.',
        'formats' => array('Open Space', 'Team Office', 'Meeting', 'Event'),
        'image' => 'https://picsum.photos/seed/kitob1/1200/800',
        'link' => '/locations/kitob-olami'
    ),
    array(
        'id' => 'minor',
        'name' => 'GroundZero Minor',
        'address' => 'Ташкент, ул. Осиё, 1',
        'description' => 'Современный коворкинг с панорамными окнами и тихой рабочей атмосферой. Отличный выбор для фрилансеров и небольших команд.',
        'formats' => array('Open Space', 'Personal Desk', 'Meeting', 'Night'),
        'image' => 'https://picsum.photos/seed/minor1/1200/800',
        'link' => '/locations/minor'
    ),
    array(
        'id' => 'sharq',
        'name' => 'GroundZero Sharq',
        'address' => 'Ташкент, ул. Буюк Ипак Йули, 12',
        'description' => 'Бизнес-пространство для корпоративных клиентов. Большие офисы, статусные переговорные и высокий уровень сервиса.',
        'formats' => array('Offices', 'Meeting', 'Event'),
        'image' => 'https://picsum.photos/seed/sharq1/1200/800',
        'link' => '/locations/sharq'
    )
);
?>

<div class="flex flex-col w-full">
    <section class="py-12 bg-background">
        <div class="container mx-auto px-6 max-w-5xl">
            <h1 class="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white">
                Три бизнес-пространства. <br />
                <span class="text-primary">Единый стандарт качества.</span>
            </h1>
            <p class="text-lg text-gray-400 max-w-2xl">
                Выберите локацию, которая лучше всего подходит для ваших задач. Везде вас ждет управляемая среда, стабильный интернет и премиальный сервис.
            </p>
        </div>
    </section>

    <section class="py-12 bg-card border-t border-border">
        <div class="container mx-auto px-6 max-w-5xl">
            <div class="flex flex-col gap-12">
                <?php foreach ($locations as $i => $loc): ?>
                    <a href="<?php echo esc_url($loc['link']); ?>" class="group block bg-background border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                        <div class="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                            <div class="p-8 lg:p-12 flex flex-col justify-center <?php echo $i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'; ?>">
                                <h2 class="text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                                    <?php echo $loc['name']; ?>
                                </h2>
                                <p class="text-gray-400 flex items-center gap-2 mb-6">
                                    <?php echo icon_map_pin_loc(); ?> <?php echo $loc['address']; ?>
                                </p>
                                <p class="text-gray-300 leading-relaxed mb-8 line-clamp-3">
                                    <?php echo $loc['description']; ?>
                                </p>

                                <div class="mb-8">
                                    <h4 class="font-semibold mb-4 text-sm uppercase tracking-widest text-gray-500">
                                        Доступные форматы
                                    </h4>
                                    <div class="flex flex-wrap gap-2">
                                        <?php foreach ($loc['formats'] as $f): ?>
                                            <span class="px-3 py-1.5 rounded-md bg-card border border-border text-xs font-medium text-white">
                                                <?php echo $f; ?>
                                            </span>
                                        <?php endforeach; ?>
                                    </div>
                                </div>

                                <div class="mt-auto inline-flex text-primary font-semibold items-center gap-2 group-hover:gap-3 transition-all">
                                    Подробнее о локации
                                    <?php echo icon_arrow_right(); ?>
                                </div>
                            </div>
                            <div class="relative h-64 lg:h-auto overflow-hidden <?php echo $i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'; ?>">
                                <img src="<?php echo esc_url($loc['image']); ?>" alt="<?php echo esc_attr($loc['name']); ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
</div>

<?php get_footer(); ?>
