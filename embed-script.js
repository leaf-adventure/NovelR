/* jslint asi:true, browser:true */

var Embed = {}

var ES = {
    checkEmbeds: function() {
        var i;
        var embed;
        var script;
        var pos;
        for (i = 0; i < ES.embeds.length; i++) {
            embed = ES.embeds.item(i);
            script = Embed[embed.getAttribute("data-embed-script")];
            if (!script) continue;
            pos = window.innerHeight * script.pos;
            if (!(embed.hasAttribute("data-embed-active")) && embed.getBoundingClientRect().top < pos) {
                script.activate(embed);
                embed.setAttribute("data-embed-active", "");
            }
        }
        for (i = ES.embeds.length - 1; i >= 0; i--) {
            embed = ES.embeds.item(i);
            script = Embed[embed.getAttribute("data-embed-script")];
            if (!script || !pos) continue;
            if (embed.hasAttribute("data-embed-active") && embed.getBoundingClientRect().top > pos) {
                script.deactivate(embed);
                embed.removeAttribute("data-embed-active");
            }
        }
    },
    embeds: undefined,
    init: function() {
        ES.loadEmbeds();
        for (var id in Embed) {
            if (Embed[id].init) Embed[id].init();
        }
        document.addEventListener("scroll", ES.checkEmbeds, false);
        ES.checkEmbeds();
    },
    loadEmbeds: function() {
        ES.embeds = document.querySelectorAll("*[data-embed-script]");
    }
}

window.addEventListener("load", ES.init, false);
