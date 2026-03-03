<?php
/* Template Name: Шаблон Локации (Single) */
// В реальном WP это файл single-location.php
get_header();

function icon_arrow_left() { return '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>'; }
function icon_map_pin_s() { return '<svg class="w-5 h-5 text-[#FDD835]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>'; }
function icon_check_s() { return '<svg class="w-5 h-5 text-[#FDD835] shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'; }

// Имитация данных поста
$location = array(
    'name' => 'GroundZero Kitob Olami',
    'address' => 'Ташкент, пр. Мустакиллик, 6/7',
    'description' => 'Флагманская локация в самом центре города. Идеально подходит для крупных команд и проведения масштабных мероприятий. Просторный Open Space, изолированные офисы для команд и большая Event-площадка.',
    'features' => array('Амфитеатр на 100 человек', 'Кофе-поинт', 'Высокоскоростной Wi-Fi', 'Зона отдыха', 'Переговорные комнаты', 'Лаунж-зона', 'Парковка'),
    'formats' => array('Open Space', 'Team Office', 'Meeting', 'Event'),
    'images' => array(
        'https://picsum.photos/seed/kitob1/1200/800',
        'https://picsum.photos/seed/kitob2/1200/800',
        'https://picsum.photos/seed/kitob3/1200/800',
        'https://picsum.photos/seed/kitob4/1200/800'
    )
);
?>

<div class="min-h-screen bg-[#121212] text-white pb-16 font-sans">
    <div class="container mx-auto px-6 max-w-6xl">
        <!-- Back Button -->
        <a href="/locations" class="inline-flex items-center gap-2 text-gray-400 hover:text-[#FDD835] transition-colors mb-8">
            <?php echo icon_arrow_left(); ?>
            Назад к локациям
        </a>

        <!-- Header -->
        <div class="mb-10">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
                    <?php echo $location['name']; ?>
                </h1>
            </div>
            
            <p class="text-gray-400 flex items-center gap-2 text-lg">
                <?php echo icon_map_pin_s(); ?>
                <?php echo $location['address']; ?>
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <!-- Left Column: Gallery -->
            <div class="lg:col-span-7 flex flex-col gap-4">
                <!-- Main Image -->
                <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
                    <img id="main-gallery-image" src="<?php echo esc_url($location['images'][0]); ?>" alt="<?php echo esc_attr($location['name']); ?>" class="w-full h-full object-cover transition-opacity duration-300" />
                </div>
                
                <!-- Thumbnails -->
                <div class="grid grid-cols-4 gap-4">
                    <?php foreach ($location['images'] as $idx => $img): ?>
                        <button 
                            onclick="changeGalleryImage('<?php echo esc_url($img); ?>', this)"
                            class="gallery-thumb aspect-video rounded-xl overflow-hidden border-2 transition-all <?php echo $idx === 0 ? 'border-[#FDD835] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'; ?>"
                        >
                            <img src="<?php echo esc_url($img); ?>" alt="Thumbnail" class="w-full h-full object-cover" />
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Right Column: Info & Actions -->
            <div class="lg:col-span-5 flex flex-col">
                <p class="text-gray-300 text-lg leading-relaxed mb-10">
                    <?php echo $location['description']; ?>
                </p>

                <!-- Formats -->
                <div class="mb-10">
                    <h3 class="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                        Доступные форматы
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        <?php foreach ($location['formats'] as $format): ?>
                            <span class="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-sm font-medium text-gray-200">
                                <?php echo $format; ?>
                            </span>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Features -->
                <div class="mb-12">
                    <h3 class="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                        Особенности
                    </h3>
                    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                        <?php foreach ($location['features'] as $feature): ?>
                            <li class="flex items-start gap-3 text-gray-300">
                                <?php echo icon_check_s(); ?>
                                <span><?php echo $feature; ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <!-- Action Buttons -->
                <div class="mt-auto flex flex-col sm:flex-row gap-4">
                    <a href="/contacts" class="flex-1 bg-[#FDD835] text-black px-6 py-4 rounded-xl font-bold text-center hover:bg-[#FDD835]/90 transition-colors">
                        Забронировать визит
                    </a>
                    <a href="/contacts" class="flex-1 bg-transparent border border-gray-600 text-white px-6 py-4 rounded-xl font-bold text-center hover:bg-gray-800 transition-colors">
                        Оставить заявку
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function changeGalleryImage(src, btn) {
    const mainImg = document.getElementById('main-gallery-image');
    mainImg.style.opacity = 0;
    
    setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = 1;
    }, 150);

    // Update thumbnail styles
    document.querySelectorAll('.gallery-thumb').forEach(el => {
        el.classList.remove('border-[#FDD835]', 'opacity-100');
        el.classList.add('border-transparent', 'opacity-50');
    });
    
    btn.classList.remove('border-transparent', 'opacity-50');
    btn.classList.add('border-[#FDD835]', 'opacity-100');
}
</script>

<?php get_footer(); ?>
