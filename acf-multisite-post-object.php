<?php

/*
Plugin Name: Advanced Custom Fields: Multisite Post Object
Plugin URI: https://github.com/heyjones/acf-multisite-post-object
Description: Select posts from other blogs in a multisite installation
Version: 1.0.0
Author: Chris Jones
Author URI: http://heyjones.com
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

// exit if accessed directly
if( ! defined( 'ABSPATH' ) ) exit;


// check if class already exists
if( !class_exists('acf_plugin_multisite_post_object') ) :

class acf_plugin_multisite_post_object {

	/*
	*  __construct
	*
	*  This function will setup the class functionality
	*
	*  @type	function
	*  @date	17/02/2016
	*  @since	1.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/

	function __construct() {

		// vars
		$this->settings = array(
			'version'	=> '1.0.0',
			'url'		=> plugin_dir_url( __FILE__ ),
			'path'		=> plugin_dir_path( __FILE__ )
		);


		// set text domain
		// https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
		load_plugin_textdomain( 'acf-multisite_post_object', false, plugin_basename( dirname( __FILE__ ) ) . '/lang' );


		// include field
		add_action('acf/include_field_types', 	array($this, 'include_field_types'));

	}


	/*
	*  include_field_types
	*
	*  This function will include the field type class
	*
	*  @type	function
	*  @date	17/02/2016
	*  @since	1.0.0
	*
	*  @param	$version (int) major ACF version. Defaults to false
	*  @return	n/a
	*/

	function include_field_types( $version = false ) {

		if( !$version || $version != 5 ) return;
		include_once('fields/acf-multisite-post-object-v' . $version . '.php');

	}

}


// initialize
new acf_plugin_multisite_post_object();


// class_exists check
endif;

?>
