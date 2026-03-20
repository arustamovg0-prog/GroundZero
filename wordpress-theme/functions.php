<?php
function groundzero_enqueue_scripts() {
    // Подключаем скомпилированные файлы React из папки dist
    // Важно: после npm run build файлы в dist будут иметь хеши в названиях, 
    // их нужно будет обновить здесь или настроить автоматический поиск.
    wp_enqueue_script('groundzero-react', get_template_directory_uri() . '/assets/index.js', array(), null, true);
    wp_enqueue_style('groundzero-tailwind', get_template_directory_uri() . '/assets/index.css');
}
add_action('wp_enqueue_scripts', 'groundzero_enqueue_scripts');
?>
