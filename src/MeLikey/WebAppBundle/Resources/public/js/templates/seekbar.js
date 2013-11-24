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
    seekbar = function (env) {
        twig.Template.call(this, env);
    };
    twig.inherits(seekbar, twig.Template);

    /**
     * @inheritDoc
     */
    seekbar.prototype.getParent_ = function(context) {
        return false;
    };

    /**
     * @inheritDoc
     */
    seekbar.prototype.render_ = function(sb, context, blocks) {
        // line 2
        sb.append("\n<section>\n    <div class=\"played\"><\/div>\n    <div class=\"loaded\"><\/div>\n<\/section>\n");
    };

    /**
     * @inheritDoc
     */
    seekbar.prototype.getTemplateName = function() {
        return "seekbar";
    };

    /**
     * Returns whether this template can be used as trait.
     *
     * @return {boolean}
     */
    seekbar.prototype.isTraitable = function() {
        return false;
    };
    return seekbar;
});