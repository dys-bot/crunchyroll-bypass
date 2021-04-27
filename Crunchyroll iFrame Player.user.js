// ==UserScript==
// @name         Crunchyroll Premium Bypass
// @namespace    http://tampermonkey.net/
// @version      1.3

// @description  Este script Permite ver todos os vídeos do site crunchyroll gratuitamente.

// @author       dys-bot

// @match        http://www.crunchyroll.com/*
// @match        https://www.crunchyroll.com/*
// @grant        none
// @icon         https://www.crunchyroll.com/favicons/favicon-32x32.png
// ==/UserScript==

(function() {
    'use strict';

    var HTML = document.documentElement.innerHTML;
    var new_str;
    var ifrm;

function pegaString(str, first_character, last_character) {
	if(str.match(first_character + "(.*)" + last_character) == null){
		return null;
	}else{
	    new_str = str.match(first_character + "(.*)" + last_character)[1].trim()
	    return(new_str)
    }
}

function importPlayer(){
		console.log("[CR Premium] Removendo player da Crunchyroll...");
		var elem = document.getElementById('showmedia_video_player');
    	elem.parentNode.removeChild(elem);

		console.log("[CR Premium] Pegando dados da stream...");
		var video_config_media = JSON.parse(pegaString(HTML, "vilos.config.media = ", ";"));

    	console.log("[CR Premium] Adicionando o jwplayer...");
    	ifrm = document.createElement("iframe");
    	ifrm.setAttribute("id", "frame");
		ifrm.setAttribute("src", " https://mateus7g.github.io/crp-iframe-player/");
		ifrm.setAttribute("width","100%");
		ifrm.setAttribute("height","100%");
		ifrm.setAttribute("frameborder","0");
		ifrm.setAttribute("scrolling","no");
		ifrm.setAttribute("allowfullscreen","allowfullscreen");
		ifrm.setAttribute("allow","autoplay; encrypted-media *");

		if(document.body.querySelector("#showmedia_video_box") != null){
			document.body.querySelector("#showmedia_video_box").appendChild(ifrm);
		}else{
			document.body.querySelector("#showmedia_video_box_wide").appendChild(ifrm);
		}

		
		if (document.body.querySelector(".freetrial-note") != null) {
			console.log("[CR Premium] Removendo Free Trial Note...");
			document.body.querySelector(".freetrial-note").style.display = "none";
		}

	
		if(document.body.querySelector(".showmedia-trailer-notice") != null){
			console.log("[CR Premium] Removendo Trailer Notice...");
			document.body.querySelector(".showmedia-trailer-notice").style.display = "none";
		}

		
		if(document.body.querySelector("#showmedia_free_trial_signup") != null){
			console.log("[CR Premium] Removendo Free Trial Signup...");
			document.body.querySelector("#showmedia_free_trial_signup").style.display = "none";
		}


		ifrm.onload = function(){
			ifrm.contentWindow.postMessage({
           		'video_config_media': [JSON.stringify(video_config_media)],
           		'lang': [pegaString(HTML, 'LOCALE = "', '",')]
        	},"*");
	    };

		
}
function onloadfunction() {
	if(pegaString(HTML, "vilos.config.media = ", ";") != null){
		importPlayer();
	}
}
document.addEventListener("DOMContentLoaded", onloadfunction());
})();