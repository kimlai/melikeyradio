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
    contact = function (env) {
        twig.Template.call(this, env);
    };
    twig.inherits(contact, twig.Template);

    /**
     * @inheritDoc
     */
    contact.prototype.getParent_ = function(context) {
        return false;
    };

    /**
     * @inheritDoc
     */
    contact.prototype.render_ = function(sb, context, blocks) {
        // line 2
        sb.append("\n<p>This is where the contact stuff will go.<\/p>\n");
    };

    /**
     * @inheritDoc
     */
    contact.prototype.getTemplateName = function() {
        return "contact";
    };

    /**
     * Returns whether this template can be used as trait.
     *
     * @return {boolean}
     */
    contact.prototype.isTraitable = function() {
        return false;
    };
    return contact;
});