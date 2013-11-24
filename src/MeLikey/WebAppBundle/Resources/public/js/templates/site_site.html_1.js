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
    site = function (env) {
        twig.Template.call(this, env);
    };
    twig.inherits(site, twig.Template);

    /**
     * @inheritDoc
     */
    site.prototype.getParent_ = function(context) {
        return false;
    };

    /**
     * @inheritDoc
     */
    site.prototype.render_ = function(sb, context, blocks) {
        // line 2
        sb.append("\n<div id=\"main-header\"><\/div>\n<div id=\"main-container\"><\/div>\n<div id=\"main-footer\">\n    <div id=\"global-player\"><\/div>\n    <div id=\"global-playlist\"><\/div>\n<\/div>\n");
    };

    /**
     * @inheritDoc
     */
    site.prototype.getTemplateName = function() {
        return "site";
    };

    /**
     * Returns whether this template can be used as trait.
     *
     * @return {boolean}
     */
    site.prototype.isTraitable = function() {
        return false;
    };
    return site;
});