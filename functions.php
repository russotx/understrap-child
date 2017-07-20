<?php
// function understrap_remove_scripts() {
//     wp_dequeue_style( 'understrap-styles' );
//     wp_deregister_style( 'understrap-styles' );

//     wp_dequeue_script( 'understrap-scripts' );
//     wp_deregister_script( 'understrap-scripts' );

//     // Removes the parent themes stylesheet and scripts from inc/enqueue.php
// }
// add_action( 'wp_enqueue_scripts', 'understrap_remove_scripts', 9999 );

function understrap_scripts() {
		// Get the theme data.
		$the_theme = wp_get_theme();
		//wp_enqueue_style( 'understrap-styles', get_stylesheet_directory_uri() . '/css/theme.min.css', array(), $the_theme->get( 'Version' ) );
		// wp_enqueue_script( 'jquery' );
		// wp_enqueue_script( 'understrap-scripts', get_template_directory_uri() . '/js/theme.min.js', array(), $the_theme->get( 'Version' ), true );
		// if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		// 	wp_enqueue_script( 'comment-reply' );
		// }
	}


function load_devicons() {
	wp_enqueue_style( 'cool-devicons', get_stylesheet_directory_uri() . '/css/devicon.css', array(), '', '' );
}
add_action( 'wp_enqueue_scripts', 'load_devicons' );


add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

function theme_enqueue_styles() {

	// Get the theme data
	$the_theme = wp_get_theme();

    wp_enqueue_style( 'child-understrap-styles', get_stylesheet_directory_uri() . '/css/child-theme.min.css', array(), $the_theme->get( 'Version' ) );
//     wp_enqueue_script( 'child-understrap-scripts', get_stylesheet_directory_uri() . '/js/child-theme.min.js', array(), $the_theme->get( 'Version' ), true );
 }
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

function load_my_js() {
  wp_enqueue_script( 'landing-page-scripts', get_stylesheet_directory_uri() . '/js/landing-page.js', array(), '', true );
}
add_action( 'wp_enqueue_scripts', 'load_my_js' );

function getImgTag( $atts ) {
	$a = shortcode_atts( array(
												'img_end_url' => '',
												'class_list' => '',
												'alt' => '',
											), $atts );
	$end_url = $a['img_end_url'];
	$classes = $a['class_list'];
	$alt_text = $a['alt'];
	$full_url = get_stylesheet_directory_uri() . '/../..' . $end_url;	
	$img_tag = '<img src="' . $full_url . '" class="' . $classes . '" alt="' . $alt_text . '">'; 
	return $img_tag;
}
add_shortcode( 'relImgTag', 'getImgTag' );
