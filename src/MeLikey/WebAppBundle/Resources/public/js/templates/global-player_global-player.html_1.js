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
    globalPlayer = function (env) {
        twig.Template.call(this, env);
    };
    twig.inherits(globalPlayer, twig.Template);

    /**
     * @inheritDoc
     */
    globalPlayer.prototype.getParent_ = function(context) {
        return false;
    };

    /**
     * @inheritDoc
     */
    globalPlayer.prototype.render_ = function(sb, context, blocks) {
        // line 2
        sb.append("<section class=\"controls\">\n\t<div class=\"toggle-playlist\">Playlist<\/div>\n\t<div class=\"prev\">Prev<\/div>\n\t<div class=\"next\">Next<\/div>\n<\/section>\n<div class=\"info\">\n\t<span class=\"artist\">");
        // line 8
        sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "artist"), "html", null, true));
        sb.append("<\/span> - <span class=\"title\">");
        sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "title"), "html", null, true));
        sb.append("<\/span>\n<\/div>\n<ul class=\"actions\">\n\t<li><a class=\"addLikey\">Likey<\/a><\/li>\n\t<li><a class=\"fb-share\">Facebook<\/a><\/li>\n\t<li><a class=\"tw-share\">Twitter<\/a><\/li>\n<\/ul>\n");
    };

    /**
     * @inheritDoc
     */
    globalPlayer.prototype.getTemplateName = function() {
        return "globalPlayer";
    };

    /**
     * Returns whether this template can be used as trait.
     *
     * @return {boolean}
     */
    globalPlayer.prototype.isTraitable = function() {
        return false;
    };
    return globalPlayer;
});