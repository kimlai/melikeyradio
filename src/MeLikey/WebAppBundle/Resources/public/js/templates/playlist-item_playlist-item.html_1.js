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
    playlistItem = function (env) {
        twig.Template.call(this, env);
    };
    twig.inherits(playlistItem, twig.Template);

    /**
     * @inheritDoc
     */
    playlistItem.prototype.getParent_ = function(context) {
        return false;
    };

    /**
     * @inheritDoc
     */
    playlistItem.prototype.render_ = function(sb, context, blocks) {
        // line 2
        sb.append("\n<img class=\"artwork\" src=\"\/");
        // line 3
        sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "albumartWebPath"), "html", null, true));
        sb.append("\/100.jpg\"><\/img>\n<section class=\"infos\">\n\t<div class=\"artist\">");
        // line 5
        sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "artist"), "html", null, true));
        sb.append("<\/div>\n\t<div class=\"title\">");
        // line 6
        sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "title"), "html", null, true));
        sb.append("<\/div>\n<\/section>\n");
    };

    /**
     * @inheritDoc
     */
    playlistItem.prototype.getTemplateName = function() {
        return "playlistItem";
    };

    /**
     * Returns whether this template can be used as trait.
     *
     * @return {boolean}
     */
    playlistItem.prototype.isTraitable = function() {
        return false;
    };
    return playlistItem;
});