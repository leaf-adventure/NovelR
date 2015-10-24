/* jslint asi:true, browser:true */
/* global Embed */

Embed.audio = {
    activate: function(e) {
        if (Embed.audio.current) Embed.audio.previous.push(Embed.audio.current);
        Embed.audio.current = e;
        Embed.audio.load();
    },
    current: undefined,
    load: function() {
        if (!Embed.audio.media) return;
        Embed.audio.media.src = Embed.audio.current.getAttribute("data-embed-param") || "";
        Embed.audio.media.load();
    },
    media: undefined,
    previous: [],
    deactivate: function(e) {
        if (e === Embed.audio.current) Embed.audio.current = Embed.audio.previous.pop();
        else if (Embed.audio.previous.indexOf(e) !== -1) Embed.audio.previous.splice(Embed.audio.previous.indexOf(e), 1);
        else return;
        Embed.audio.load();
    },
    init: function(e) {
        Embed.audio.media = new Audio();
        Embed.audio.media.autoplay = true;
    },
    pos: 0.5
}
