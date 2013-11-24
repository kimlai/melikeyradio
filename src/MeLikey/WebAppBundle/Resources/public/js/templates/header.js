/**
 * @fileoverview Compiled template for file
 *
 * 
 *
 * @suppress {checkTypes|fileoverviewTags}
 */

define(['twig'], function (Twig) {
    
    /**
     * @constructor
     * @param {twig.Environment} env
     * @extends {twig.Template}
     */
    header = function (env) {
        twig.Template.call(this, env);
    };
    twig.inherits(header, twig.Template);

    /**
     * @inheritDoc
     */
    header.prototype.getParent_ = function(context) {
        return false;
    };

    /**
     * @inheritDoc
     */
    header.prototype.render_ = function(sb, context, blocks) {
        // line 2
        sb.append("\n<nav id=\"secondary-nav\">\n    <ul>\n        <li><a target=\"_blank\" href=\"");
        // line 5
        sb.append(this.env_.invoke("path", "me_likey_radio_track_suggestion_new"));
        sb.append("\">Suggestion Box<\/a><\/li>\n        <li><a target=\"_blank\" href=\"");
        // line 6
        sb.append(this.env_.invoke("path", "me_likey_radio_newsletter_subscription"));
        sb.append("\">Newsletter<\/a><\/li>\n        <li><a href=\"");
        // line 7
        sb.append(this.env_.invoke("path", "me_likey_radio_contact"));
        sb.append("\">Contact<\/a><\/li>\n        <li><a href=\"");
        // line 8
        sb.append(this.env_.invoke("path", "me_likey_radio_about"));
        sb.append("\">About<\/a><\/li>\n    <\/ul>\n<\/nav>\n\n<section id=\"social-links\">\n    <ul>\n        <li><a class=\"facebook\" target=\"_blank\" href=\"http:\/\/facebook.com\/MeLikeyRadio\">FB<\/a><\/li>\n        <li><a class=\"twitter\" target=\"_blank\" href=\"http:\/\/twitter.com\/melikeyradio\">Tw<\/a><\/li>\n    <\/ul>\n<\/section>\n\n<div id=\"site-title\">Me Likey Radio<\/div>\n\n<nav id=\"main-nav\">\n    <ul>\n        <li><a href=\"");
        // line 23
        sb.append(this.env_.invoke("path", "me_likey_web_app_homepage"));
        sb.append("\">Radio<\/a><\/li>\n        <li><a href=\"");
        // line 24
        sb.append(this.env_.invoke("path", "me_likey_web_app_blog"));
        sb.append("\">New Stuff<\/a><\/li>\n        <li><a href=\"");
        // line 25
        sb.append(this.env_.invoke("path", "me_likey_web_app_blog"));
        sb.append("\">You Likey<\/a><\/li>\n    <\/ul>\n<\/nav>\n");
    };

    /**
     * @inheritDoc
     */
    header.prototype.getTemplateName = function() {
        return "header";
    };

    /**
     * Returns whether this template can be used as trait.
     *
     * @return {boolean}
     */
    header.prototype.isTraitable = function() {
        return false;
    };
    return header;
});