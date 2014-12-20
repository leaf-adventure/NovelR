/* jslint asi:true, browser:true */

var Parallax = {
    init: function() {
        if (document.getElementsByClassName("parallax").length) window.addEventListener("mousemove", Parallax.run, false);
    },
    run: function(e) {
        var xDeviation = -e.clientX/window.innerWidth + 0.5;
        var yDeviation = -e.clientY/window.innerHeight + 0.5;
        var parallax_items = document.getElementsByClassName("parallax");
        for (var i = 0; i < parallax_items.length; i++) {
            var item = parallax_items.item(i);
            var multiplier = Number(item.dataset.parallax);
            if (item.classList.contains("container")) item.setAttribute("style", "left: " + (xDeviation * multiplier - 0.5) + "%;" + "top: " + (yDeviation * multiplier - 0.5) + "%;");
            else item.setAttribute("style", "text-shadow: currentColor " + xDeviation * multiplier/10 + "vw " + yDeviation * multiplier/10 + "vh .0625em;");
        }
    }
}

document.addEventListener("DOMContentLoaded", Parallax.init, false);
