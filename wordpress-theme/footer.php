	</main><!-- #main -->

	<footer id="colophon" class="bg-card border-t border-border py-12 mt-auto">
		<div class="container mx-auto px-6 max-w-6xl">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div class="col-span-1 md:col-span-2">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-2xl font-bold text-white tracking-tighter flex items-center gap-2 mb-4">
                        <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-background">GZ</div>
                        GroundZero
                    </a>
                    <p class="text-gray-400 max-w-sm">
                        Сеть коворкингов премиум-класса в Ташкенте. Создаем идеальную среду для вашего бизнеса.
                    </p>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-4">Навигация</h4>
                    <?php
                    wp_nav_menu(
                        array(
                            'theme_location' => 'footer',
                            'container'      => false,
                            'menu_class'     => 'flex flex-col gap-2 text-gray-400',
                            'fallback_cb'    => false,
                        )
                    );
                    ?>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-4">Контакты</h4>
                    <ul class="flex flex-col gap-2 text-gray-400">
                        <li>+998 71 200 00 00</li>
                        <li>info@groundzero.uz</li>
                        <li>Ташкент, Узбекистан</li>
                    </ul>
                </div>
            </div>
            <div class="pt-8 border-t border-border text-center text-gray-500 text-sm">
                &copy; <?php echo date('Y'); ?> GroundZero. Все права защищены.
            </div>
		</div>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
