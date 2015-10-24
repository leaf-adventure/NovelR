#  EMBED-SCRIPT  #

Embedding scripting elements into HTML pages that activate as you scroll.

##  Basic Markup:  ##

An EMBED-SCRIPT element is any element with the `data-embed-script` attribute set.
The value of this attribute is the name of the EMBED-SCRIPT package to load.
The optional attribute `data-embed-param` can be used to specify additional parameters for the script's operation.

##  Loading and Packages:  ##

You can load EMBED-SCRIPT by placing the following line in the `<head>` of your document:

```html
<!-- Replace "embed-script.js" with the path to the EMBED-SCRIPT javascript file -->
<script type="text/javascript" src="embed-script.js"></script>
```

Additional EMBED-SCRIPT packages should be loaded **after** this initial script.

##  Operation:  ##

EMBED-SCRIPT elements activate when they reach a position on the screen defined by their package, and will de-activate if the window is scrolled back.
This status is tracked in the attribute `data-embed-active`, which, if present, denotes an active element.

##  Included Packages:  ##

###  EMBED-AUDIO  ###

Load `embed-audio.js` in the head of your page.
EMBED-AUDIO plays an audio resource while a specified segment of a page is scrolled into view.
You can use an element with `data-embed-script` set to `audio` to load an audio resource (specified with `data-embed-param`)—this resource will play until another such element is scrolled into view.
Furthermore, when the page is scrolled backwards, the audio resource will load once again.
