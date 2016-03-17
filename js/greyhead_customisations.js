/**
 * @file: greyhead_customisations.js
 *
 * Little JS nips and tucks go in here.
 */

var Drupal = Drupal || {};

(function($, Drupal){
  "use strict";

  /**
   * If we're on a node edit page and the URL slug field is present, copy the
   * menu title into the URL slug field converted to lowercase alphanumeric-
   * only.
   */
  Drupal.behaviors.greyheadAutoPopulateURLSlugField = {
    attach: function (context, settings) {
      // Are we on a node edit/add page?
      var nodeFormSelector = 'form.node-form';
      var nodeForm = $(nodeFormSelector);
      if (nodeForm.length) {
        // Do we have a URL slug field?
        var urlSlugField = $(nodeFormSelector + ' #edit-field-parapg-url-slug-und-0-value');
        if (urlSlugField.length) {
          // Yes, we are Go. Add a watcher to add a data-manuallyEdited=yes
          // attribute if the field is changed.
          urlSlugField.data('manuallyEdited', 'no').blur(function() {
            $(this).data('manuallyEdited', 'yes');
          });

          // Get the node title field.
          var nodeTitleField = $(nodeFormSelector + ' #edit-title');
          nodeTitleField.blur(function() {
            greyheadCopyNodeTitleToURLSlugField($(this).val(), urlSlugField);
          });
        }
      }

      /**
       * Copy the node title to the menu title if the menu title field doesn't
       * have a data-manuallyEdited attribute.
       *
       * @param nodeTitle
       * @param menuTitleField
       */
      function greyheadCopyNodeTitleToURLSlugField(nodeTitle, urlSlugField) {
        // Is the URL slug field empty?
        if (urlSlugField.data('manuallyEdited') !== 'yes') {
          var nodeTitleConverted = nodeTitle.replace(/\W/g, '').toLowerCase();
          urlSlugField.val(nodeTitleConverted);
        }
      }
    }
  };

  /**
   * If we're on an admin page, get the height of the admin toolbar and set the
   * body's top margin accordingly.
   */
  Drupal.behaviors.greyheadCorrectBodyMarginForAdminMenu = {
    attach: function(context, settings) {
      if ($('body', context).hasClass('admin-menu')) {
        var height = $('#admin-menu').height();

        if (!(height === null) && (height > 0)) {
          console.log('Setting body top-margin to ' + height + 'px.');

          $('body', context).attr('style', 'margin-top: ' + $('#admin-menu').height() + 'px !important');
        }
      }
    }
  };
})(jQuery, Drupal);
