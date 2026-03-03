<?php
/**
 * GroundZero Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function groundzero_setup() {
	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );

	// Register menus
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary Menu', 'groundzero' ),
			'footer' => esc_html__( 'Footer Menu', 'groundzero' ),
		)
	);

	// Switch default core markup for search form, comment form, and comments to output valid HTML5.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
}
add_action( 'after_setup_theme', 'groundzero_setup' );

/**
 * Enqueue scripts and styles.
 */
function groundzero_scripts() {
	wp_enqueue_style( 'groundzero-style', get_stylesheet_uri(), array(), '1.0.0' );
    
    // Google Fonts: Roboto
    wp_enqueue_style( 'groundzero-fonts', 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap', false );
}
add_action( 'wp_enqueue_scripts', 'groundzero_scripts' );

/**
 * Register Custom Post Types
 */
function groundzero_register_cpts() {
    // Locations CPT
    register_post_type('location', array(
        'labels'      => array(
            'name'          => 'Локации',
            'singular_name' => 'Локация',
        ),
        'public'      => true,
        'has_archive' => true,
        'menu_icon'   => 'dashicons-location',
        'supports'    => array('title', 'editor', 'thumbnail', 'custom-fields', 'excerpt'),
        'rewrite'     => array('slug' => 'locations'),
    ));

    // Tariffs/Products CPT
    register_post_type('product', array(
        'labels'      => array(
            'name'          => 'Тарифы',
            'singular_name' => 'Тариф',
        ),
        'public'      => true,
        'has_archive' => true,
        'menu_icon'   => 'dashicons-cart',
        'supports'    => array('title', 'editor', 'thumbnail', 'custom-fields', 'excerpt'),
        'rewrite'     => array('slug' => 'solutions'),
    ));
}
add_action('init', 'groundzero_register_cpts');
