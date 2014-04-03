/* global Backbone, jQuery, _, wp:true, tinyMCE, switchEditors */
var oneApp = oneApp || {}, $oneApp = $oneApp || jQuery(oneApp);

(function (window, Backbone, $, _, oneApp, $oneApp) {
	'use strict';

	oneApp.BannerSlideView = Backbone.View.extend({
		template: '',
		className: 'ttf-one-banner-slide',

		events: {
			'click .ttf-one-slide-remove': 'removeItem'
		},

		initialize: function (options) {
			this.model = options.model;
			this.idAttr = 'ttf-one-banner-slide-' + this.model.get('id');
			this.serverRendered = ( options.serverRendered ) ? options.serverRendered : false;
			this.template = _.template($('#tmpl-ttf-one-banner-slide').html());
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()))
				.attr('id', this.idAttr)
				.attr('data-id', this.model.get('id'));
			return this;
		},

		removeItem: function (evt) {
			evt.preventDefault();

			var $stage = this.$el.parents('.ttf-one-banner-slides'),
				$orderInput = $('.ttf-one-banner-slide-order', $stage);

			oneApp.removeOrderValue(this.model.get('id'), $orderInput);

			// Fade and slide out the section, then cleanup view
			this.$el.animate({
				opacity: 'toggle',
				height: 'toggle'
			}, oneApp.options.closeSpeed, function() {
				this.remove();
			}.bind(this));
		}
	});
})(window, Backbone, jQuery, _, oneApp, $oneApp);