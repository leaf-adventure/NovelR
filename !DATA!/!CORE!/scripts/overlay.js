/* jslint asi:true, browser:true */

var Overlay = {
    div: null,
    init: function() {
        document.getElementById("overlay-toggle").addEventListener("click", function() {document.getElementById("overlay-toggle").dataset.on = "";}, false);
        document.getElementById("content").addEventListener("click", function() {if (document.getElementById("overlay-toggle").dataset.on === "") document.getElementById("overlay-toggle").removeAttribute("data-on");}, false);
        Overlay.div = document.getElementById("overlay");
        Overlay.Reader = new XMLHttpRequest();
        Overlay.Reader.open("GET", "!DATA!/overlay.html", true);
        Overlay.Reader.overrideMimeType("text/html");
        Overlay.Reader.responseType = "document";
        Overlay.Reader.addEventListener("load", Overlay.load, false);
        Overlay.Reader.send();
    },
    load: function(e) {
        var contents = this.response.body.children;
        Overlay.div.textContent = null;
        for (var i = 0; i < contents.length; i++) {
            Overlay.div.appendChild(document.importNode(contents.item(i), true));
        }
    },
    Reader: null
}

document.addEventListener("DOMContentLoaded", Overlay.init, false);
