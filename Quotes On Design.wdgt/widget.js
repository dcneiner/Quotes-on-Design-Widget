/*
	Quotes on Desgin Widget
	© 2009 by Douglas C. Neiner | http://dougneiner.com
	Licensed under the MIT license. See license.txt for details
*/

var gInfoButton, front, back, attr, loading, quote_w, wrapper, head, gMyScrollbar, gMyScrollArea, script;

function setup(){
    wrapper = document.getElementById('wrapper');
    front   = document.getElementById('front');
    quote_w = document.getElementById('quote');
    attr    = document.getElementById('attribution');
    back    = document.getElementById('back');
    loading = document.getElementById('loading');
    head    = document.getElementsByTagName('head')[0];


    if(window.widget){
        wrapper.addEventListener('click', function(e){
            if(e.target.getAttribute('target') == "_blank"){
               e.preventDefault();
                widget.openURL( e.target.href );
            }  
        });
    }
        
    window.setTimeout(function(){
        if(window.widget){
            widget.onshow = function(){
                get_quote();
            }
        };
        setup_ui();
        get_quote();
    }, 2000);
}

function setup_ui(){
    gDoneButton = new AppleGlassButton(document.getElementById("doneButton"), "Done", hidePrefs);
    gInfoButton = new AppleInfoButton(document.getElementById("infoButton"), document.getElementById("front"), "white", "white", showPrefs);

    gMyScrollbar  = new AppleVerticalScrollbar( document.getElementById("scroll-bar") );
    gMyScrollArea = new AppleScrollArea( document.getElementById("quote-text") );

    gMyScrollArea.addScrollbar(gMyScrollbar);
}

function showPrefs(){
    if(window.widget) widget.prepareForTransition('ToBack');
    
	wrapper.style.height  = front.offsetHeight + "px";
      front.style.display = "none";
       back.style.display = "block"; 
	
    if (window.widget) {
        var offset = ((wrapper.offsetHeight / 2) - 76);
        if(offset > 100) offset = 100;
		widget.setCloseBoxOffset(18, offset);
		setTimeout('widget.performTransition();', 0);
	}
}

function hidePrefs(){
    if(window.widget) widget.prepareForTransition('ToFront');
    
	front.style.display = "block";
     back.style.display = "none"; 
   
    
	if (window.widget) {
		widget.setCloseBoxOffset(16,16);
        setTimeout(function(){
            widget.performTransition();
            get_quote();
        }, 0);
    } else {
		get_quote();
	}
}

function get_quote(){
    loading.style.display = "block";
	
    // Get rid of old script tag
    if(script) script.parentNode.removeChild(script);

    script      = document.createElement('script');
    script.src  = "http://quotesondesign.com/api/3.0/api-3.0.json?callback=process_quote";
    script.type = "text/javascript";
    
    window.setTimeout(function(){
    head.appendChild(script);    
    }, 0); // This code is only needed when testing. Change 0 to 3000 to see refreshes.

}


function process_quote( data ){
    var quote = document.getElementById('quote-text'),
        a = document.createElement('a'),
        attr_html = "";
    
    quote.innerHTML = '<div>' + data.quote + '</div>';
    quote_w.style.paddingRight = "55px";
    attr.innerHTML = "";
    
    a.href      = data.permalink;
    a.innerHTML = "&mdash; " + data.author;
    a.target    = "_blank";

    attr.appendChild(a);

    wrapper.style.height = front.offsetHeight + "px";

    if(window.widget) window.resizeTo(342, front.offsetHeight);

	gMyScrollArea.refresh();
    loading.style.display = "none";
}