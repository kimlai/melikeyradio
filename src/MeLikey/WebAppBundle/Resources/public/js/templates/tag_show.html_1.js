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
    tag = function (env) {
        twig.Template.call(this, env);
    };
    twig.inherits(tag, twig.Template);

    /**
     * @inheritDoc
     */
    tag.prototype.getParent_ = function(context) {
        return false;
    };

    /**
     * @inheritDoc
     */
    tag.prototype.render_ = function(sb, context, blocks) {
        // line 2
        sb.append("\n");
        // line 3
        sb.append(twig.filter.escape(this.env_, twig.attr(("tag" in context ? context["tag"] : null), "name"), "html", null, true));
        sb.append("\n");
    };

    /**
     * @inheritDoc
     */
    tag.prototype.getTemplateName = function() {
        return "tag";
    };

    /**
     * Returns whether this template can be used as trait.
     *
     * @return {boolean}
     */
    tag.prototype.isTraitable = function() {
        return false;
    };
    return tag;
});