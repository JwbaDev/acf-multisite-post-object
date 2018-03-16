(function($){


	function initialize_field( $el ) {

		//$el.doStuff();
		var blog = $el.find('select[name$="[blog_id]"]');
		var blog_id = blog.val();
		var post = $el.find('input[name$="[post_id]"]');
		var post_id = post.val();
		//this could be better...
		post.select2({
			width: '100%',
			ajax: {
				url: ajaxurl + '?action=acf-multisite-post-object&blog_id=' + blog_id,
				dataType: 'json',
				data: function(term){
					return {
						term: term
					};
				},
				results: function(results){
					return results;
				}
			},
			initSelection: function(element, callback){
				callback({
					id: element.val(),
					text: element.attr('data-text')
				});
			}
		});
		//this could be better...
		blog.on('change', function(e){
			blog_id = blog.val();
			post.select2({
				width: '100%',
				ajax: {
					url: ajaxurl + '?action=acf-multisite-post-object&blog_id=' + blog_id,
					dataType: 'json',
					data: function(term){
						return {
							term: term
						};
					},
					results: function(results){
						return results;
					}
				},
				initSelection: function(element, callback){
					callback({
						id: element.val(),
						text: element.attr('data-text')
					});
				}
			});
		});

	}

	if( typeof acf.add_action !== 'undefined' ) {

		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/

		acf.add_action('ready append', function( $el ){

			// search $el for fields of type 'multisite_post_object'
			acf.get_fields({ type : 'multisite_post_object'}, $el).each(function(){

				initialize_field( $(this) );

			});

		});


	} else {


		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM.
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/

		$(document).on('acf/setup_fields', function(e, postbox){

			$(postbox).find('.field[data-field_type="multisite_post_object"]').each(function(){

				initialize_field( $(this) );

			});

		});


	}


})(jQuery);
