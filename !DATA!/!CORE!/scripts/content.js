/* jslint asi:true, browser:true, sub:true */

var Content = {
    checkScrollEvent: function() {
        var scroll_events = document.getElementsByClassName("content_scroll_event");
        var viewport_mid = window.innerHeight/2;
        var i;
        for (i = 0; i < scroll_events.length; i++) {
            if (scroll_events.item(i).dataset.activated === undefined && scroll_events.item(i).getBoundingClientRect().top < viewport_mid) {
                Content.runScrollEvent(scroll_events.item(i));
                scroll_events.item(i).dataset.activated = "";
            }
        }
        for (i = scroll_events.length - 1; i >= 0; i--) {
            if (scroll_events.item(i).dataset.activated === "" && scroll_events.item(i).getBoundingClientRect().top > viewport_mid) {
                Content.runScrollEvent(scroll_events.item(i-1));
                scroll_events.item(i).removeAttribute("data-activated");
            }
        }
    },
    div: null,
    get: function() {
        var hash_array = window.location.hash.substr(1).split(/;/);
        Content.variables = {};
        for (var i = 0; i < hash_array.length; i++) {
            var hash_pair = hash_array[i].split(/=/);
            if (hash_pair.length == 2) {
                Content.variables[hash_pair[0]] = hash_pair[1];
            }
        }
        if (Content.variables["e"] && Content.variables["e"] != Content.div.dataset.episodeId) {
            Content.Reader.open("GET", "!DATA!/Episodes/" + Content.variables["e"], true);
            Content.div.dataset.episodeId = Content.variables["e"];
            Content.Reader.overrideMimeType("text/html");
            Content.Reader.responseType = "document";
            if (Content.div.dataset.visible === "") {
                Content.div.removeAttribute("data-visible");
                window.setTimeout(function(){Content.Reader.send()}, 500);
            }
            else Content.Reader.send();
        }
        else if (Content.div.dataset.visible === "") {
            window.location.assign(".");
        }
    },
    init: function() {
        Content.div = document.getElementById("content");
        Content.Reader = new XMLHttpRequest();
        Content.Reader.addEventListener("load", Content.load, false);
        if (!window.location.hash) window.location.hash = "";
        window.addEventListener("hashchange", Content.get, false);
        Content.get();
        document.addEventListener("scroll", Content.checkScrollEvent, false);
        document.getElementById("audio-toggle").addEventListener("click", function() {
            if (document.getElementById("audio")) {
                if (!document.getElementById("audio").paused) {
                    document.getElementById("audio").pause();
                    document.getElementById("audio-toggle").textContent = "Unmute Audio";
                    document.getElementById("audio").autoplay = false;
                }
                else {
                    document.getElementById("audio").play();
                    document.getElementById("audio-toggle").textContent = "Mute Audio";
                    document.getElementById("audio").autoplay = true;
                }
            }
        }, false);
    },
    load: function(e) {
        var contents = this.response.body.children;
        Content.div.textContent = null;
        for (var i = 0; i < contents.length; i++) {
            Content.div.appendChild(document.importNode(contents.item(i), true));
        }
        Content.checkScrollEvent();
        Content.div.dataset.visible = "";
        if (document.getElementById("overlay-toggle") && document.getElementById("overlay-toggle").dataset.on === "") document.getElementById("overlay-toggle").removeAttribute("data-on");
    },
    Reader: null,
    runScrollEvent: function(e) {
        var i = 0;
        if (e.dataset.background && document.getElementById("background")) document.getElementById("background").setAttribute("style", "background-image:url(" + e.dataset.background + ");");
        if (e.dataset.audio && document.getElementById("audio")) {
            if (e.dataset.audio == "!REMOVE!") {
                document.getElementById("audio").textContent = null;
                document.getElementById("audio").dataset.name = "";
                document.getElementById("audio").load();
            }
            else if (e.dataset.audio == "!RELOAD!") document.getElementById("audio").load();
            else if (e.dataset.audio != document.getElementById("audio").dataset.name) {
                document.getElementById("audio").textContent = null;
                var audioSourceLists = document.getElementsByClassName("audio_source_list");
                var audioSources;
                for (i = 0; i < audioSourceLists.length; i++) {
                    if (audioSourceLists.item(i).dataset.name == e.dataset.audio) audioSources = audioSourceLists.item(i).getElementsByClassName("audio_source");
                }
                if (audioSources) {
                    var source;
                    for (i = 0; i < audioSources.length; i++) {
                        source = document.createElement("source");
                        source.setAttribute("type", audioSources.item(i).dataset.type);
                        source.setAttribute("src", audioSources.item(i).dataset.src);
                        document.getElementById("audio").appendChild(source);
                    }
                }
                document.getElementById("audio").dataset.name = e.dataset.audio;
                document.getElementById("audio").load();
            }
        }
        if (document.getElementById("background-source")) {
            document.getElementById("background-source").textContent = null;
            if (e.getElementsByClassName("background_source").length) document.getElementById("background-source").appendChild(e.getElementsByClassName("background_source").item(0).cloneNode(true));
        }
    },
    variables: null
}

document.addEventListener("DOMContentLoaded", Content.init, false);
