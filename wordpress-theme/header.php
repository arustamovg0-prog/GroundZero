<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
    
    <!-- Tailwind CSS (CDN for Development) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#FDD835',
                        background: '#121212',
                        card: '#1E1E1E',
                        border: '#333333',
                        foreground: '#FFFFFF',
                        brand: {
                            blue: '#211964',
                            yellow: '#ffd714'
                        }
                    },
                    fontFamily: {
                        sans: ['Roboto', 'sans-serif'],
                        roboto: ['Roboto', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style type="text/tailwindcss">
        @layer utilities {
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        }
    </style>
</head>

<body <?php body_class('bg-background text-foreground font-sans antialiased'); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site flex flex-col min-h-screen">
	<header id="masthead" class="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
		<div class="container mx-auto px-6 h-20 flex items-center justify-between">
            <div class="site-branding">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="text-2xl font-bold text-white tracking-tighter flex items-center gap-2">
                    <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-background">GZ</div>
                    GroundZero
                </a>
            </div>

            <nav id="site-navigation" class="hidden md:flex items-center gap-8">
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'menu-1',
                        'menu_id'        => 'primary-menu',
                        'container'      => false,
                        'menu_class'     => 'flex items-center gap-8 text-sm font-medium text-gray-300',
                        'fallback_cb'    => false,
                    )
                );
                ?>
                <a href="/contacts" class="bg-primary text-background px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                    Оставить заявку
                </a>
            </nav>
		</div>
	</header>

	<main id="primary" class="site-main flex-grow pt-20">
