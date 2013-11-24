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
    about = function (env) {
        twig.Template.call(this, env);
    };
    twig.inherits(about, twig.Template);

    /**
     * @inheritDoc
     */
    about.prototype.getParent_ = function(context) {
        return false;
    };

    /**
     * @inheritDoc
     */
    about.prototype.render_ = function(sb, context, blocks) {
        // line 2
        sb.append("\n<p>This is where the about stuff will go.<\/p>\n");
    };

    /**
     * @inheritDoc
     */
    about.prototype.getTemplateName = function() {
        return "about";
    };

    /**
     * Returns whether this template can be used as trait.
     *
     * @return {boolean}
     */
    about.prototype.isTraitable = function() {
        return false;
    };
    return about;
});