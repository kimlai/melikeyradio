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
    playercontrols = function (env) {
        twig.Template.call(this, env);
    };
    twig.inherits(playercontrols, twig.Template);

    /**
     * @inheritDoc
     */
    playercontrols.prototype.getParent_ = function(context) {
        return false;
    };

    /**
     * @inheritDoc
     */
    playercontrols.prototype.render_ = function(sb, context, blocks) {
        // line 2
        sb.append("\n<section>\n    <div class=\"buffering-indicator\">Loading<\/div>\n    <div class=\"pause\">Pause<\/div>\n    <div class=\"play\">Play<\/div>\n<\/section>\n");
    };

    /**
     * @inheritDoc
     */
    playercontrols.prototype.getTemplateName = function() {
        return "playercontrols";
    };

    /**
     * Returns whether this template can be used as trait.
     *
     * @return {boolean}
     */
    playercontrols.prototype.isTraitable = function() {
        return false;
    };
    return playercontrols;
});