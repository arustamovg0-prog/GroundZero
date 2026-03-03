<?php
/* Template Name: Тарифы и Услуги */
get_header();

// Иконки SVG (замена Lucide React)
function icon_check() { return '<svg class="w-4 h-4 text-brand-yellow shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'; }
function icon_map_pin() { return '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>'; }
function icon_users() { return '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'; }

// Данные тарифов (в идеале должны тянуться из ACF или Custom Post Types)
$pricingData = array(
    'eventZones' => array(
        array('title' => 'Kitob Olami', 'capacity' => 'до 60 чел', 'prices' => array(array('duration' => '2 часа', 'price' => '1 600 000 сум'), array('duration' => '4 часа', 'price' => '2 200 000 сум'), array('duration' => 'более 4 часов', 'price' => '500 000 сум/час')), 'included' => array('Wi-Fi', 'LED Проектор', 'Звук', 'Флипчарт')),
        array('title' => 'Minor', 'capacity' => 'до 70 чел', 'prices' => array(array('duration' => '2 часа', 'price' => '1 600 000 сум'), array('duration' => '4 часа', 'price' => '2 200 000 сум'), array('duration' => 'более 4 часов', 'price' => '500 000 сум/час')), 'included' => array('Wi-Fi', 'LED Проектор', 'Звук', 'Флипчарт')),
        array('title' => 'Амфитеатр Kitob Olami', 'capacity' => 'до 30 чел', 'prices' => array(array('duration' => '2 часа', 'price' => '1 000 000 сум')), 'included' => array('Wi-Fi', 'LED Проектор', 'Звук', 'Флипчарт'))
    ),
    'meetingRooms' => array(
        array('location' => 'Kitob Olami', 'capacity' => '6 мест', 'price' => '135 000 сум/час'),
        array('location' => 'Kitob Olami', 'capacity' => '8 мест', 'price' => '155 000 сум/час'),
        array('location' => 'Kitob Olami', 'capacity' => '10 мест', 'price' => '190 000 сум/час'),
        array('location' => 'Kitob Olami', 'capacity' => '12 мест', 'price' => '235 000 сум/час'),
        array('location' => 'Minor', 'capacity' => '10 мест', 'price' => '185 000 сум/час'),
        array('location' => 'Sharq', 'capacity' => '8 мест', 'price' => '130 000 сум/час'),
        array('location' => 'Sharq', 'capacity' => '10 мест', 'price' => '165 000 сум/час'),
        array('location' => 'Sharq', 'capacity' => '16 мест', 'price' => '220 000 сум/час')
    ),
    'nightFlow' => array(
        array('title' => 'Night Pass', 'price' => '90 000 сум', 'period' => 'ночь', 'desc' => 'одноразовый доступ', 'highlight' => false),
        array('title' => 'Night Pack 10', 'price' => '700 000 сум', 'period' => '10 ночей', 'desc' => '', 'highlight' => false),
        array('title' => 'Night Pack 20', 'price' => '1 300 000 сум', 'period' => '20 ночей', 'desc' => '', 'highlight' => false),
        array('title' => 'Night Unlimited PRO', 'price' => '1 500 000 сум', 'period' => 'мес', 'desc' => 'безлимит', 'highlight' => true)
    ),
    'resident' => array(
        array('title' => 'Hot Desk Unlimited', 'price' => '2 200 000 сум', 'period' => 'мес', 'desc' => 'незакрепленное место, фитнес-зал, капсулы для сна'),
        array('title' => 'Personal Hot Desk', 'price' => '2 900 000 сум', 'period' => 'мес', 'desc' => 'закрепленное место, юридический адрес')
    ),
    'virtualOffice' => array(
        array('title' => 'Virtual Desk', 'price' => '920 000 сум', 'period' => 'мес', 'desc' => 'юридический адрес, ресепшен, обработка писем'),
        array('title' => 'Юридический адрес', 'price' => '600 000 сум', 'period' => 'мес', 'desc' => ''),
        array('title' => 'Гость 365', 'price' => '5 400 000 сум', 'period' => 'год', 'desc' => '')
    )
);

$tabs = array(
    array('id' => 'eventZones', 'label' => 'Event-зоны'),
    array('id' => 'meetingRooms', 'label' => 'Переговорные'),
    array('id' => 'nightFlow', 'label' => 'Night Flow'),
    array('id' => 'resident', 'label' => 'Резидент'),
    array('id' => 'virtualOffice', 'label' => 'Виртуальный офис')
);
?>

<div class="flex flex-col w-full min-h-screen bg-white font-roboto text-brand-blue">
    <!-- Hero Section -->
    <section class="py-16 bg-brand-blue text-white">
        <div class="container mx-auto px-6 max-w-6xl text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6"><?php the_title(); ?></h1>
            <p class="text-xl opacity-90 max-w-2xl mx-auto">
                Гибкие решения для фрилансеров, команд и крупных компаний. Выберите подходящий тариф и начните работать в комфортной среде.
            </p>
        </div>
    </section>

    <!-- Tabs -->
    <section class="py-8 border-b border-gray-200 sticky top-20 z-30 bg-white/90 backdrop-blur-md">
        <div class="container mx-auto px-6 max-w-6xl">
            <div class="flex overflow-x-auto hide-scrollbar gap-2 pb-2" id="pricing-tabs">
                <?php foreach ($tabs as $index => $tab): ?>
                    <button 
                        onclick="switchTab('<?php echo $tab['id']; ?>')"
                        class="tab-btn px-6 py-3 rounded-full text-base font-medium whitespace-nowrap transition-colors <?php echo $index === 0 ? 'bg-brand-blue text-white active-tab' : 'bg-gray-100 text-brand-blue hover:bg-gray-200'; ?>"
                        data-target="<?php echo $tab['id']; ?>"
                    >
                        <?php echo $tab['label']; ?>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Content -->
    <section class="py-16 flex-1 bg-gray-50">
        <div class="container mx-auto px-6 max-w-6xl">
            
            <!-- Event Zones -->
            <div id="tab-eventZones" class="tab-content transition-opacity duration-300">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <?php foreach ($pricingData['eventZones'] as $zone): ?>
                        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                            <div class="p-8 flex-1">
                                <div class="flex items-center gap-2 text-brand-blue/70 mb-3">
                                    <?php echo icon_map_pin(); ?>
                                    <h3 class="text-xl font-bold"><?php echo $zone['title']; ?></h3>
                                </div>
                                <h2 class="text-3xl font-bold mb-6 text-brand-blue"><?php echo $zone['capacity']; ?></h2>
                                <div class="space-y-4 mb-8">
                                    <?php foreach ($zone['prices'] as $price): ?>
                                        <div class="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                            <span class="text-base text-brand-blue/80"><?php echo $price['duration']; ?></span>
                                            <span class="text-xl font-bold text-brand-blue"><?php echo $price['price']; ?></span>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-xl">
                                    <p class="text-sm font-medium text-brand-blue mb-3">Включено в стоимость:</p>
                                    <ul class="grid grid-cols-2 gap-2">
                                        <?php foreach ($zone['included'] as $item): ?>
                                            <li class="flex items-center gap-2 text-sm text-brand-blue/80">
                                                <?php echo icon_check(); ?>
                                                <?php echo $item; ?>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                            </div>
                            <div class="p-6 bg-gray-50 border-t border-gray-100">
                                <button class="w-full bg-brand-blue text-white py-4 rounded-xl text-base font-bold hover:bg-brand-yellow hover:text-brand-blue transition-colors">
                                    Забронировать
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Meeting Rooms -->
            <div id="tab-meetingRooms" class="tab-content hidden transition-opacity duration-300">
                <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-50 border-b border-gray-200">
                                    <th class="p-6 text-base font-medium text-brand-blue/70">Локация</th>
                                    <th class="p-6 text-base font-medium text-brand-blue/70">Вместимость</th>
                                    <th class="p-6 text-base font-medium text-brand-blue/70">Стоимость (час)</th>
                                    <th class="p-6 text-base font-medium text-brand-blue/70 text-right">Действие</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                <?php foreach ($pricingData['meetingRooms'] as $room): ?>
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="p-6">
                                            <div class="flex items-center gap-2 text-brand-blue font-medium text-base">
                                                <span class="text-brand-yellow"><?php echo icon_map_pin(); ?></span>
                                                <?php echo $room['location']; ?>
                                            </div>
                                        </td>
                                        <td class="p-6">
                                            <div class="flex items-center gap-2 text-brand-blue text-base">
                                                <span class="text-brand-blue/50"><?php echo icon_users(); ?></span>
                                                <?php echo $room['capacity']; ?>
                                            </div>
                                        </td>
                                        <td class="p-6 text-xl font-bold text-brand-blue">
                                            <?php echo $room['price']; ?>
                                        </td>
                                        <td class="p-6 text-right">
                                            <button class="bg-brand-blue text-white px-6 py-2.5 rounded-lg text-base font-medium hover:bg-brand-yellow hover:text-brand-blue transition-colors">
                                                Бронь
                                            </button>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Night Flow -->
            <div id="tab-nightFlow" class="tab-content hidden transition-opacity duration-300">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <?php foreach ($pricingData['nightFlow'] as $plan): ?>
                        <div class="rounded-2xl shadow-sm border overflow-hidden flex flex-col <?php echo $plan['highlight'] ? 'bg-brand-yellow border-brand-yellow text-brand-blue' : 'bg-white border-gray-200 text-brand-blue'; ?>">
                            <div class="p-8 flex-1 flex flex-col">
                                <h3 class="text-xl font-bold mb-4"><?php echo $plan['title']; ?></h3>
                                <div class="mb-6">
                                    <span class="text-3xl font-bold"><?php echo $plan['price']; ?></span>
                                    <span class="text-base ml-1 <?php echo $plan['highlight'] ? 'opacity-80' : 'text-brand-blue/60'; ?>">
                                        / <?php echo $plan['period']; ?>
                                    </span>
                                </div>
                                <?php if ($plan['desc']): ?>
                                    <p class="text-base mt-auto <?php echo $plan['highlight'] ? 'opacity-90 font-medium' : 'text-brand-blue/70'; ?>">
                                        <?php echo $plan['desc']; ?>
                                    </p>
                                <?php endif; ?>
                            </div>
                            <div class="p-6 border-t <?php echo $plan['highlight'] ? 'border-brand-blue/10' : 'border-gray-100 bg-gray-50'; ?>">
                                <button class="w-full py-4 rounded-xl text-base font-bold transition-colors <?php echo $plan['highlight'] ? 'bg-brand-blue text-white hover:bg-white hover:text-brand-blue' : 'bg-brand-blue text-white hover:bg-brand-yellow hover:text-brand-blue'; ?>">
                                    Выбрать
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Resident -->
            <div id="tab-resident" class="tab-content hidden transition-opacity duration-300">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <?php foreach ($pricingData['resident'] as $plan): ?>
                        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                            <div class="p-10 flex-1">
                                <h3 class="text-xl font-bold mb-6 text-brand-blue"><?php echo $plan['title']; ?></h3>
                                <div class="mb-8">
                                    <span class="text-3xl font-bold text-brand-blue"><?php echo $plan['price']; ?></span>
                                    <span class="text-base text-brand-blue/60 ml-2">/ <?php echo $plan['period']; ?></span>
                                </div>
                                <div class="flex items-start gap-3">
                                    <?php echo icon_check(); ?>
                                    <p class="text-base text-brand-blue/80 leading-relaxed">
                                        <?php echo $plan['desc']; ?>
                                    </p>
                                </div>
                            </div>
                            <div class="p-8 bg-gray-50 border-t border-gray-100">
                                <button class="w-full bg-brand-blue text-white py-4 rounded-xl text-base font-bold hover:bg-brand-yellow hover:text-brand-blue transition-colors">
                                    Стать резидентом
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Virtual Office -->
            <div id="tab-virtualOffice" class="tab-content hidden transition-opacity duration-300">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <?php foreach ($pricingData['virtualOffice'] as $plan): ?>
                        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                            <div class="p-8 flex-1">
                                <h3 class="text-xl font-bold mb-4 text-brand-blue"><?php echo $plan['title']; ?></h3>
                                <div class="mb-6">
                                    <span class="text-3xl font-bold text-brand-blue"><?php echo $plan['price']; ?></span>
                                    <span class="text-base text-brand-blue/60 ml-1">/ <?php echo $plan['period']; ?></span>
                                </div>
                                <?php if ($plan['desc']): ?>
                                    <p class="text-base text-brand-blue/80">
                                        <?php echo $plan['desc']; ?>
                                    </p>
                                <?php endif; ?>
                            </div>
                            <div class="p-6 bg-gray-50 border-t border-gray-100">
                                <button class="w-full bg-brand-blue text-white py-4 rounded-xl text-base font-bold hover:bg-brand-yellow hover:text-brand-blue transition-colors">
                                    Оформить
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

        </div>
    </section>
</div>

<script>
function switchTab(tabId) {
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(function(el) {
        el.classList.add('hidden');
        el.style.opacity = '0';
    });
    
    // Reset all buttons
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.classList.remove('bg-brand-blue', 'text-white', 'active-tab');
        btn.classList.add('bg-gray-100', 'text-brand-blue', 'hover:bg-gray-200');
    });
    
    // Show target content
    const targetEl = document.getElementById('tab-' + tabId);
    targetEl.classList.remove('hidden');
    setTimeout(() => { targetEl.style.opacity = '1'; }, 50);
    
    // Highlight active button
    const activeBtn = document.querySelector(`.tab-btn[data-target="${tabId}"]`);
    activeBtn.classList.remove('bg-gray-100', 'text-brand-blue', 'hover:bg-gray-200');
    activeBtn.classList.add('bg-brand-blue', 'text-white', 'active-tab');
}
</script>

<?php get_footer(); ?>
