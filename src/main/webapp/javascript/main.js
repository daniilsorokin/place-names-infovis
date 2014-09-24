var VIZAPP = new Object();

VIZAPP.isLoginRequired = false;

VIZAPP.initialize = function()
{	    
    VIZAPP.gui.init();
}

$( document ).ready( function() {
    VIZAPP.initialize();
});


