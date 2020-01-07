/**
 * tasks/pipeline.js
 *
 * The order in which your CSS, JavaScript, and client-side template files
 * injected as <script> or <link> tags.
 *
 * > If you are not relying on automatic asset linking, then you can safely ignore this file.
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/pipeline.js
 */



//  ██████╗ ██╗      █████╗ ██╗███╗   ██╗        ██████╗███████╗███████╗
//  ██╔══██╗██║     ██╔══██╗██║████╗  ██║       ██╔════╝██╔════╝██╔════╝
//  ██████╔╝██║     ███████║██║██╔██╗ ██║       ██║     ███████╗███████╗
//  ██╔═══╝ ██║     ██╔══██║██║██║╚██╗██║       ██║     ╚════██║╚════██║
//  ██║     ███████╗██║  ██║██║██║ ╚████║    ██╗╚██████╗███████║███████║
//  ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚═╝ ╚═════╝╚══════╝╚══════╝
//
//  ███████╗██╗██╗     ███████╗███████╗
//  ██╔════╝██║██║     ██╔════╝██╔════╝
//  █████╗  ██║██║     █████╗  ███████╗
//  ██╔══╝  ██║██║     ██╔══╝  ╚════██║
//  ██║     ██║███████╗███████╗███████║
//  ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
//
// CSS files to inject as <link> tags, in order.
//
// > Note: if you're using built-in LESS support with default settings,
// > you'll want to change `assets/styles/importer.less` instead.
//
var cssFilesToInject = [
  '/dependencies/bootstrap-4/bootstrap-4.css',
  '/dependencies/fontawesome/all.css',
  '/dependencies/fontawesome/brands.css',
  '/dependencies/fontawesome/fontawesome.css',
  '/dependencies/fontawesome/regular.css',
  '/dependencies/fontawesome/solid.css',
  '/dependencies/fontawesome/v4-shims.css',
  '/styles/importer.css'
];

var cssWeddingFilesToInject = [
  '/styles/wedding/bootstrap/bootstrap.css',
  '/styles/wedding/preloader.css',
  '/styles/wedding/preloader-default.css',
  '/styles/wedding/flexslider/flexslider.css',
  '/styles/wedding/animate/animate.css',
  '/styles/wedding/countdown/jquery.countdown.css',
  '/styles/wedding/magnific-popup/magnific-popup.css',
  '/styles/wedding/owlcarousel/owl.carousel.css',
  '/styles/wedding/owlcarousel/owl.theme.css',
  '/styles/wedding/fontello.css',
  '/styles/wedding/style.css',
  '/styles/wedding/twemoji-amazing/twemoji-amazing.css',
  '/styles/wedding/skin/pattern/pattern-1.css',
];


//   ██████╗██╗     ██╗███████╗███╗   ██╗████████╗   ███████╗██╗██████╗ ███████╗
//  ██╔════╝██║     ██║██╔════╝████╗  ██║╚══██╔══╝   ██╔════╝██║██╔══██╗██╔════╝
//  ██║     ██║     ██║█████╗  ██╔██╗ ██║   ██║█████╗███████╗██║██║  ██║█████╗
//  ██║     ██║     ██║██╔══╝  ██║╚██╗██║   ██║╚════╝╚════██║██║██║  ██║██╔══╝
//  ╚██████╗███████╗██║███████╗██║ ╚████║   ██║      ███████║██║██████╔╝███████╗
//   ╚═════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝      ╚══════╝╚═╝╚═════╝ ╚══════╝
//
//          ██╗███████╗    ███████╗██╗██╗     ███████╗███████╗
//          ██║██╔════╝    ██╔════╝██║██║     ██╔════╝██╔════╝
//          ██║███████╗    █████╗  ██║██║     █████╗  ███████╗
//     ██   ██║╚════██║    ██╔══╝  ██║██║     ██╔══╝  ╚════██║
//  ██╗╚█████╔╝███████║    ██║     ██║███████╗███████╗███████║
//  ╚═╝ ╚════╝ ╚══════╝    ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
//
// Client-side javascript files to inject as <script> tags, in order.
//
var jsFilesToInject = [
  // Load `sails.io` before everything else.
  '/dependencies/sails.io.js',

  // Bring in `.js` files for any other client-side JavaScript dependencies.
  // (e.g. Lodash, Vue.js, jQuery, Bootstrap, Ember, Angular, etc.)
  // > Be sure to list dependencies that depend on each other in the right order!
  '/dependencies/lodash.js',
  '/dependencies/jquery.min.js',
  '/dependencies/vue.js',
  '/dependencies/vue-router.js',
  '/dependencies/bootstrap-4/bootstrap-4.bundle.js',
  '/dependencies/cloud.js',
  '/dependencies/moment.js',
  '/dependencies/parasails.js',

  // First amongst the app-level files, bring in cloud configuration
  'js/cloud.setup.js',

  // Bring in components & utilities before bringing in the rest (i.e. page scripts)
  '/js/components/ajax-button.component.js',
  '/js/components/ajax-form.component.js',
  '/js/components/js-timestamp.component.js',
  '/js/components/modal.component.js',

  // All of the rest of your custom client-side js files will be injected here,
  // in no particular order.  To customize the ordering, add additional items
  // here, _above_ this one.
  '/js/pages/498.page.js',
  '/js/pages/account/account-overview.page.js',
  '/js/pages/account/edit-password.page.js',
  '/js/pages/account/edit-profile.page.js',
  '/js/pages/dashboard/welcome.page.js',
  '/js/pages/entrance/confirmed-email.page.js',
  '/js/pages/entrance/forgot-password.page.js',
  '/js/pages/entrance/login.page.js',
  '/js/pages/entrance/new-password.page.js',
  '/js/pages/entrance/signup.page.js',
  '/js/pages/error.page.js',
  '/js/pages/guest/create.page.js',
  '/js/pages/guest/details.page.js',
  '/js/pages/guest/edit.page.js',
  '/js/pages/guest/list.page.js',
  '/js/pages/homepage.page.js',
  '/js/pages/invitation/create.page.js',
  '/js/pages/invitation/details.page.js',
  '/js/pages/invitation/edit.page.js',
  '/js/pages/invitation/list.page.js'
];

var jsWeddingFilesToInject = [

  // Load `sails.io` before everything else.
  'dependencies/sails.io.js',

  // Bring in `.js` files for any other client-side JavaScript dependencies.
  // (e.g. Lodash, Vue.js, jQuery, Bootstrap, Ember, Angular, etc.)
  // > Be sure to list dependencies that depend on each other in the right order!
  '/dependencies/lodash.js',
  '/dependencies/vue.js',
  '/dependencies/cloud.js',
  '/dependencies/parasails.js',
  '/dependencies/moment.js',

  // First amongst the app-level files, bring in cloud configuration
  'js/cloud.setup.js',

  // Bring in components & utilities before bringing in the rest (i.e. page scripts)
  '/js/components/ajax-button-template.component.js',
  '/js/components/ajax-form.component.js',

  // All of the rest of your custom client-side js files will be injected here,
  // in no particular order.  To customize the ordering, add additional items
  // here, _above_ this one.
  '/js/pages/wedding.page.js',
  // '/js/wedding/moment/moment-timezone-with-data-10-year-range.js',
  '/js/wedding/jquery-1.11.1.min.js',
  '/js/wedding/pace/pace.min.js',
  '/js/wedding/bootstrap/bootstrap.js',
  '/js/wedding/modernizr/modernizr.js',
  '/js/wedding/devicejs/device.js',
  '/js/wedding/tinynav/tinynav.js',
  '/js/wedding/smoothscroll/jquery.smooth-scroll.js',
  '/js/wedding/flexslider/jquery.flexslider.js',
  '/js/wedding/sticky/jquery.sticky.js',
  '/js/wedding/waypoint/jquery.waypoints.min.js',
  '/js/wedding/jquery-ui-widget/jquery.ui.widget.js',
  '/js/wedding/jquery-doubletaptogo/jquery.dcd.doubletaptogo.js',
  '/js/wedding/vide/jquery.vide.js',
  '/js/wedding/stellar/jquery.stellar.js',
  '/js/wedding/masonry/masonry.pkgd.min.js',
  '/js/wedding/countdown/jquery.plugin.js',
  '/js/wedding/countdown/jquery.countdown.js',
  '/js/wedding/magnific-popup/jquery.magnific-popup.js',
  '/js/wedding/owlcarousel/owl.carousel.js',
  '/js/wedding/markerlabel/markerwithlabel.js',
  '/js/wedding/script.js',
  '/js/wedding/map-script.js',
  '/js/wedding/main-slider-fade.js'
];

//   ██████╗██╗     ██╗███████╗███╗   ██╗████████╗   ███████╗██╗██████╗ ███████╗
//  ██╔════╝██║     ██║██╔════╝████╗  ██║╚══██╔══╝   ██╔════╝██║██╔══██╗██╔════╝
//  ██║     ██║     ██║█████╗  ██╔██╗ ██║   ██║█████╗███████╗██║██║  ██║█████╗
//  ██║     ██║     ██║██╔══╝  ██║╚██╗██║   ██║╚════╝╚════██║██║██║  ██║██╔══╝
//  ╚██████╗███████╗██║███████╗██║ ╚████║   ██║      ███████║██║██████╔╝███████╗
//   ╚═════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝      ╚══════╝╚═╝╚═════╝ ╚══════╝
//
//  ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗███████╗
//  ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝██╔════╝
//     ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  ███████╗
//     ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  ╚════██║
//     ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗███████║
//     ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝
//
// Client-side HTML templates to precompile and inject as a single <script> tag.
// (The ordering of this array shouldn't matter.)
//
// > By default, Sails uses JST (~=lodash/underscore) templates and precompiles
// > them into functions for you.  If you want to use handlebars, pug, dust, etc.,
// > with the asset linker, no problem-- you'll just want to make sure the precompiled
// > templates get spit out to the same file.  For information on customizing and
// > installing your own Grunt tasks or using a different build pipeline, be sure
// > to check out:
// >   https://sailsjs.com/docs/concepts/assets/task-automation
//
var templateFilesToInject = [
  'templates/**/*.html'
];



//  ███╗   ███╗██╗███████╗ ██████╗       ███████╗███████╗████████╗██╗   ██╗██████╗
//  ████╗ ████║██║██╔════╝██╔════╝       ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗
//  ██╔████╔██║██║███████╗██║            ███████╗█████╗     ██║   ██║   ██║██████╔╝
//  ██║╚██╔╝██║██║╚════██║██║            ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝
//  ██║ ╚═╝ ██║██║███████║╚██████╗██╗    ███████║███████╗   ██║   ╚██████╔╝██║
//  ╚═╝     ╚═╝╚═╝╚══════╝ ╚═════╝╚═╝    ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝
//
// The following code exists to parse the arrays of glob expressions above, and
// then expose them via `module.exports`.  **You should not need to change any of
// the code below, unless you are modifying the default asset pipeline.**

// Default path for public folder (see documentation on sailsjs.com for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map((cssPath)=>{
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (cssPath[0] === '!') {
    return require('path').join('!' + tmpPath, cssPath.substr(1));
  }
  return require('path').join(tmpPath, cssPath);
});
module.exports.cssWeddingFilesToInject = cssWeddingFilesToInject.map((cssPath)=>{
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (cssPath[0] === '!') {
    return require('path').join('!' + tmpPath, cssPath.substr(1));
  }
  return require('path').join(tmpPath, cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map((jsPath)=>{
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (jsPath[0] === '!') {
    return require('path').join('!' + tmpPath, jsPath.substr(1));
  }
  return require('path').join(tmpPath, jsPath);
});
module.exports.jsWeddingFilesToInject = jsWeddingFilesToInject.map((jsPath)=>{
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (jsPath[0] === '!') {
    return require('path').join('!' + tmpPath, jsPath.substr(1));
  }
  return require('path').join(tmpPath, jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map((tplPath)=>{
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (tplPath[0] === '!') {
    return require('path').join('!assets/', tplPath.substr(1));
  }
  return require('path').join('assets/', tplPath);
});
