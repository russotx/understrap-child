<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package understrap
 */

$the_theme = wp_get_theme();
$container = get_theme_mod( 'understrap_container_type' );
?>

<?php get_sidebar( 'footerfull' ); ?>

  <footer class="navbar">
				<h5 id="footer-notice">&copy;Copyright 2017 Daniel Russo</h5> 
  </footer>

<?php wp_footer(); ?>
</body>

</html>

