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
    track = function (env) {
        twig.Template.call(this, env);
    };
    twig.inherits(track, twig.Template);

    /**
     * @inheritDoc
     */
    track.prototype.getParent_ = function(context) {
        return false;
    };

    /**
     * @inheritDoc
     */
    track.prototype.render_ = function(sb, context, blocks) {
        // line 2
        sb.append("\n<img class=\"artwork\" src=\"\/");
        // line 3
        sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "albumartWebPath"), "html", null, true));
        sb.append("\/300.jpg\"><\/img>\n<a class=\"toggle-infos\">Infos<\/a>\n<ul class=\"actions\">\n    <li><a class=\"addLikey\">Likey<\/a><\/li>\n    <li><a class=\"fb-share\">Facebook<\/a><\/li>\n    <li><a class=\"tw-share\">Twitter<\/a><\/li>\n<\/ul>\n<section class=\"infos\">\n    <a href=\"");
        // line 11
        sb.append(twig.filter.escape(this.env_, this.env_.invoke("path", "me_likey_web_app_track_show", {"id": twig.attr(("track" in context ? context["track"] : null), "id")}), "html", null, true));
        sb.append("\">\n        <div class=\"artist\">");
        // line 12
        sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "artist"), "html", null, true));
        sb.append("<\/div>\n        <div class=\"title\">");
        // line 13
        sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "title"), "html", null, true));
        sb.append("<\/div>\n    <\/a>\n    <ul class=\"extra-infos\">\n        ");
        // line 16
        if (twig.attr(("track" in context ? context["track"] : null), "musiclabel")) {
            // line 17
            sb.append("            <li>Label : <a target=\"_blank\" href=\"");
            sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "musiclabel"), "html", null, true));
            sb.append("\">");
            sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "musiclabel"), "html", null, true));
            sb.append("<\/a><\/li>\n        ");
        }
        // line 19
        sb.append("        ");
        if (twig.attr(("track" in context ? context["track"] : null), "website")) {
            // line 20
            sb.append("            <li>Website : <a target=\"_blank\" href=\"");
            sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "website"), "html", null, true));
            sb.append("\">");
            sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "website"), "html", null, true));
            sb.append("<\/a><\/li>\n        ");
        }
        // line 22
        sb.append("        <li class=\"source\">Source :\n        ");
        // line 23
        if (twig.attr(("track" in context ? context["track"] : null), "soundcloud")) {
            // line 24
            sb.append("            <a class=\"soundcloud\" href=\"");
            sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "soundcloud"), "html", null, true));
            sb.append("\" target=\"_blank\">Soundcloud<\/a>\n        ");
        } else if (twig.attr(("track" in context ? context["track"] : null), "youtube")) {
            // line 26
            sb.append("            <a class=\"youtube\" href=\"http:\/\/youtube.com\/watch?v=");
            sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "youtube"), "html", null, true));
            sb.append("\" target=\"_blank\">Youtube<\/a>\n        ");
        } else if (twig.attr(("track" in context ? context["track"] : null), "vimeo")) {
            // line 28
            sb.append("            <a class=\"vimeo\" href=\"http:\/\/vimeo.com\/");
            sb.append(twig.filter.escape(this.env_, twig.attr(("track" in context ? context["track"] : null), "vimeo"), "html", null, true));
            sb.append("\" target=\"_blank\">Vimeo<\/a>\n        ");
        }
        // line 30
        sb.append("        <\/li>\n    <\/ul>\n<\/section>\n");
    };

    /**
     * @inheritDoc
     */
    track.prototype.getTemplateName = function() {
        return "track";
    };

    /**
     * Returns whether this template can be used as trait.
     *
     * @return {boolean}
     */
    track.prototype.isTraitable = function() {
        return false;
    };
    return track;
});