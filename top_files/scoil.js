var scoil_util_zerofill=function(a){return a<10?"0"+a:a},scoil_util_strtotime=function(a){var t=new Date(1e3*a);return t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate()},scoil_tw=function(a){var t=$(a).data("val"),e="395";$(a).data("h")&&$(a).data("h").toString().match(/^\d+$/)&&(e=$(a).data("h")),$(a).html('<a class="twitter-timeline" href="https://twitter.com/'+t+'" height="'+e+'" data-chrome="nofooter transparent" style="display:none">Tweets by '+t+"</a>"),$.ajax({timeout:5e3,url:"http"+(document.URL.match(/^https:/)?"s":"")+"://platform.twitter.com/widgets.js",dataType:"script",cache:!1})},scoil_inst=function(a,t){var e=$(a).data("val");if($(a).html('<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="12" style="width:100%;"><a href="'+e+'" target="_blank"></a></blockquote>'),!t&&$("div.scoil_inst").length>1&&$("div.scoil_inst:last")[0]!=a)return"";$.isEmptyObject(window.instgrm)||delete window.instgrm,$.ajax({timeout:5e3,url:"//platform.instagram.com/en_US/embeds.js",dataType:"script",cache:!1})},scoil_rss=function(a){$.ajax({timeout:5e3,url:"https://mamewaza.net/b/",dataType:"jsonp",data:{feed:$(a).data("val")},success:function(t){if("object"!=typeof t||!t.title||!t.url||"object"!=typeof t.articles)return"";var e=$(a).data("notitle")?"":'<h5><a href="'+t.url+'" target="_blank">'+t.title+"</a></h5>",l=$(a).data("rpp");l&&l.toString().match(/^\d+$/)||(l=10),e+="<ul>";for(var o=0;o<t.articles.length&&!(o>=l);o++)e+='<li><a href="'+t.articles[o].link+'" target="_blank">'+t.articles[o].title+"</a>"+($(a).data("noexp")?"":t.articles[o].desc.substr(0,30)+"...")+($(a).data("nodate")?"":"<span>"+scoil_util_strtotime(t.articles[o].date)+"</span>")+($(a).data("url")?"<br /><span>"+t.articles[o].link+"</span>":"")+"</li>";e+="</ul>",$(a).html(e)},error:function(a,t){}})},scoil_yt_players={},scoil_yt_tn=120,scoil_yt_scroll_timer,scoil_yt_scroll_tgt,scoil_yt_scroll_l=function(){if(!scoil_yt_scroll_tgt[0])return scoil_yt_scroll_off(),"";scoil_yt_scroll_tgt.scrollLeft(scoil_yt_scroll_tgt.scrollLeft()-1)},scoil_yt_scroll_r=function(){if(!scoil_yt_scroll_tgt[0])return scoil_yt_scroll_off(),"";scoil_yt_scroll_tgt.scrollLeft(scoil_yt_scroll_tgt.scrollLeft()+1)},scoil_yt_scroll_off=function(){clearInterval(scoil_yt_scroll_timer)},scoil_yt_scroll_on=function(a,t){scoil_yt_scroll_tgt=$("div.scoil_yt_list",$(t).parent()),scoil_yt_scroll_timer=setInterval("l"==a?"scoil_yt_scroll_l()":"scoil_yt_scroll_r()",10)},scoil_yt_play_sp=function(a,t){var e=$(a).parents(".scoil_yt").eq(0),l=$("div.scoil_yt_display",e).css("background-image");if(!l||!l.match(/https?:\/\/i\.ytimg\.com\/vi\/([^\/]+)\/(?:0|maxresdefault)\.jpg/i))return"";var o=RegExp.$1;t&&tracking("yt","push",t),location.href="https://youtube.com/watch?v="+o+"&autoplay=1"},scoil_yt_play=function(a,t){var e=$(a).data("id"),l=$(a).parents(".scoil_yt").eq(0);if(is_sp)$("div.scoil_yt_display",l).css("background-image","url(https://i.ytimg.com/vi/"+e+"/0.jpg)"),$('<img src="https://i.ytimg.com/vi/'+e+'/maxresdefault.jpg" />').load(function(){if(this.width&&this.width<=480)return"";$("div.scoil_yt_display",l).css("background-image","url(https://i.ytimg.com/vi/"+e+"/maxresdefault.jpg)")});else if($("iframe",l)[0]){var o=$("iframe",l).attr("id");scoil_yt_players[o].cueVideoById(e),t&&tracking("yt","push",t)}else scoil_yt_bind($("div.scoil_yt_display",l),e,t);$(a).siblings(".on").removeClass("on"),$(a).addClass("on"),scoil_yt_move($(a).parents("div.scoil_yt_list").eq(0))},scoil_yt_move=function(a){var t=0;$("span.scoil_yt_list span",a).each(function(){if($(this).hasClass("on"))return!1;t++});var e=t*scoil_yt_tn-Math.floor(a.width()/2)+scoil_yt_tn/2;a.stop().animate({scrollLeft:e>0?e:0})},scoil_yt_bind=function(a,t,e){var l="id"+(new Date).getTime().toString()+Math.round(100*Math.random()).toString();$(a).attr("id",l);var o=$(a).width(),s=$(a).height();$(a).height(s),is_sp?($(a).attr("onclick","scoil_yt_play_sp(this"+(e?",'"+e+"'":"")+")"),scoil_yt_play_sp(a,e)):(e&&tracking("yt","push",e),$(a).next().css("z-index",-1),scoil_yt_players[l]=new YT.Player(l,{width:o,height:s,videoId:t,events:{onReady:function(){scoil_yt_players[l].playVideo()}}}))},scoil_yt_set=function(a,t){var e="";if($(a).data("tracking")&&(e=$(a).parents("div.deco").eq(0).attr("id")),$(a).html('<div class="scoil_yt_display" style="background-image:url(https://i.ytimg.com/vi/'+t[0]+'/0.jpg)"></div><img class="scoil_yt_arrow" src="'+root+'css/scoil_yt.svg" onclick="scoil_yt_bind($(this).prev(),\''+t[0]+"'"+(e?",'"+e+"'":"")+')" />'),$('<img src="https://i.ytimg.com/vi/'+t[0]+'/maxresdefault.jpg" />').load(function(){if(this.width&&this.width<=480)return"";$("div.scoil_yt_display",a).css("background-image","url(https://i.ytimg.com/vi/"+t[0]+"/maxresdefault.jpg)")}),t.length>1){$(a).addClass("scoil_yt_margin"),$(".scoil_yt_list",a)[0]&&$(".scoil_yt_list",a).remove(),$("span.scoil_yt_controller",a)[0]&&$("span.scoil_yt_controller",a).remove();for(var l=$('<span class="scoil_yt_list"></span>'),o=0;o<t.length;o++)l.append("<span"+(0==o?' class="on"':"")+' style="background-image:url(https://img.youtube.com/vi/'+t[o]+'/default.jpg)" onclick="scoil_yt_play(this,\''+e+'\')" data-id="'+t[o]+'"></span>');$(a).append($('<div class="scoil_yt_list"></div>').append(l.width(t.length*scoil_yt_tn))),t.length>1&&$(a).append('<a href="javascript:void(0)" onmouseover="scoil_yt_scroll_on(\'l\',this)" onmouseout="scoil_yt_scroll_off()" class="scoil_yt_controller_l"></a><a href="javascript:void(0)" onmouseover="scoil_yt_scroll_on(\'r\',this)" onmouseout="scoil_yt_scroll_off()" class="scoil_yt_controller_r"></a>'),$("div.scoil_yt_list",a).scrollLeft(0)}},scoil_yt_ids_make=function(a){for(var t=$(a).data("val").split(","),e="",l=[],o=0;o<t.length;o++)t[o].match(/^!(.+)/)&&!e?e=RegExp.$1:t[o].match(/^[\w-]+$/)&&l.push(t[o]);e?$.ajax({timeout:5e3,url:"https://www.googleapis.com/youtube/v3/playlistItems",type:"GET",dataType:"jsonp",data:{part:"snippet",playlistId:e,key:"AIzaSyAkQwz-EPBTZo-5a5QRCt1Q5kvOePyHNmQ",maxResults:50},success:function(t){if(!(t&&t.items&&t.items[0]&&t.items[0].snippet&&t.items[0].snippet.resourceId&&t.items[0].snippet.resourceId.videoId))return"";for(var e=0;e<t.items.length;e++){var o=t.items[e].snippet.resourceId.videoId;-1==$.inArray(o,l)&&l.push(o)}scoil_yt_set(a,l)},error:function(a,t){}}):scoil_yt_set(a,l)},scoil_yt=function(a){"undefined"==typeof YT&&$.ajax({dataType:"script",url:"//www.youtube.com/iframe_api"}),scoil_yt_ids_make(a)},scoil_we=function(a){var t=$(a).data("val");$.ajax({timeout:5e3,url:"https://mamewaza.net/w2/",dataType:"jsonp",data:{w_id:t},success:function(t){if(!t||!t.channel||!t.channel.item)return"";for(var e="<table>",l=t.channel.item,o=0;o<l.length;o++)!l[o].date&&l[o].description&&l[o].description.match(/(\d{2})日（(月|火|水|木|金|土|日)）の天気は([^、]+)、最高気温は([\d\.-]*)℃ (?:最低気温は([\d\.-]*)℃)?でしょう。/)&&(l[o].date=RegExp.$1,l[o].day=RegExp.$2,l[o].label=RegExp.$3,l[o].max=RegExp.$4,l[o].min=RegExp.$5,l[o].icon=l[o].image&&l[o].image.url.match(/\/(\d+)\.gif$/i)?RegExp.$1:""),e+="<tr><td"+("土"==l[o].day?' class="sat"':"日"==l[o].day?' class="sun"':"")+">"+l[o].date+"日("+l[o].day+')</td><td><span class="we_icon">'+(l[o].icon?"&#xe"+(parseInt(l[o].icon,10)+800).toString()+";":"")+"</span><br />"+l[o].label+'</td><td class="degree">'+l[o].max+'</td><td class="degree">'+l[o].min+"</td></tr>";e+="</table><p>"+t.channel.description+"</p>",$(a).html(e)},error:function(a,t){}})},scoil_map_dfn={gray:{label:"グレー",bg:"f5f5f5",poi:"dddddd",road:"ffffff",highway:"cccccc",transit:"cccccc",water:"bbbbbb",font:"666666",font_stroke:"ffffff"},white:{label:"白",bg:"ffffff",poi:"eeeeee",road:"f5f5f5",highway:"dddddd",water:"cccccc",font:"666666"},black:{label:"黒",bg:"000000",poi:"222222",road:"333333",highway:"444444",water:"555555",font:"ffffff"},deep:{label:"コッテリ",bg:"b2a57f",poi:"a39466",park:"81944c",road:"d1c9b2",highway:"e4994c",water:"7f9f9f",font:"333333",font_stroke:"d1c9b2"},retro:{label:"レトロ",bg:"ebe3cd",poi:"dfd2ae",park:"a5b076",highway:"F8C967",water:"b9d3c2",font:"523735"},pastel:{label:"パステル",bg:"f7f7f0",poi:"e4e4d6",park:"e0fa8f",highway:"ffdf7f",water:"b7edff",font:"909087",font_stroke:"ffffff"},green:{label:"緑",bg:"f2f9f2",poi:"d9eed9",highway:"cce8cc",water:"bfe2bf",font:"008c00",font_stroke:"ffffff"},beige:{label:"肌色",bg:"fafaf2",poi:"f0f0d9",highway:"ebebcc",water:"e5e5bf",font:"999900",font_stroke:"ffffff"},blue:{label:"青",bg:"f2f7f9",poi:"d9e9ee",highway:"cce1e8",water:"bfd9e2",font:"00698c",font_stroke:"ffffff"},red:{label:"赤",bg:"fbf4f2",poi:"f4e0d9",highway:"f0d5cc",water:"eccabf",font:"b22d00",font_stroke:"ffffff"},dark_green:{label:"緑(濃)",bg:"0d1100",poi:"1b2400",road:"283500",highway:"354700",water:"425900",font:"f3f7e5"},dark_beige:{label:"肌色(濃)",bg:"151000",poi:"2b2100",road:"413100",highway:"574100",water:"6c5100",font:"fbf6e5"},dark_blue:{label:"青(濃)",bg:"001015",poi:"00212b",road:"003141",highway:"004157",water:"00516c",font:"e5f6fb"},dark_red:{label:"赤(濃)",bg:"240900",poi:"350d00",road:"471200",highway:"591600",water:"6b1b00",font:"f7eae5"}},scoil_map_obj={},scoil_map_jump=function(a){if(!a||"object"!=typeof scoil_map_obj[a]||"function"!=typeof scoil_map_obj[a].getCenter)return"";var t=scoil_map_obj[a].getCenter(),e=["ie=UTF8","z="+(scoil_map_obj[a].getZoom()+1),"ll="+t.lat+","+t.lng,"q="+t.lat+","+t.lng];window.open("https://maps.google.co.jp/maps?"+e.join("&"))},scoil_map_gapi1loaded=0,scoil_map_gapi2loaded=0,scoil_map_disp={g:function(a,t){if("object"!=typeof t)return"";if(t.pin.length>0)return t.zoom-=t.zoom>1?1:0,scoil_map_disp.c(a,t),"";var e=["hl="+(t.hl&&t.hl.match(/^[a-z]{2}(?:-[A-Z]{2})?$/)?t.hl:"ja"),"ie=UTF8","t=m","z="+t.zoom,"output=embed","ll="+t.lat+","+t.lng,"q=loc:"+t.lat+","+t.lng];a.html('<iframe style="width:100%;height:100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.jp/maps?'+e.join("&amp;")+'" loading="lazy"></iframe>')},c:function(a,t){if("object"!=typeof L){var e=root+"js/leaflet/leaflet.css";return document.createStyleSheet?document.createStyleSheet(e):$("head").append('<link href="'+e+'?200819" rel="stylesheet" type="text/css" />'),$.ajax({url:root+"js/leaflet/leaflet.js",dataType:"script",success:function(){scoil_map_disp.c(a,t)}}),""}var l=a.parents("div.deco").eq(0).attr("id"),o={attribution:'<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a> | <a href="javascript:void(0)" onclick="scoil_map_jump(\''+l+"')\">中心をGoogleで見る</a>"},s=L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",o),i=L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",o),n=L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",o);if(scoil_map_obj[l]=L.map(a[0],{center:[t.lat,t.lng],zoom:t.zoom,layers:[s]}),L.control.layers({"地図":s,"写真":i,"地図(濃)":n}).addTo(scoil_map_obj[l]),0==t.pin.length)L.marker([t.lat,t.lng]).addTo(scoil_map_obj[l]);else{var c=!t.lat||!t.lng;if(c)var r=[];for(var d=0;d<t.pin.length;d++){var p=[t.pin[d].lat,t.pin[d].lng];o={};t.pin[d].color&&(o.icon=L.icon({iconUrl:root+"js/leaflet/images/marker-icon_"+t.pin[d].color+".png",iconRetinaUrl:root+"js/leaflet/images/marker-icon-2x.png",shadowUrl:root+"js/leaflet/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]}));var _=L.marker(p,o).addTo(scoil_map_obj[l]);if(t.pin[d].label){var g=t.pin[d].label.replace(/\r?\n/g,"<br />");is_sp||_.bindTooltip(g),_.bindPopup((t.pin[d].link?'<a href="'+t.pin[d].link+'#contents" target="_blank">':"")+g+(t.pin[d].link?"</a>":""))}c&&r.push(p)}c&&(scoil_map_obj[l].fitBounds(r),scoil_map_obj[l].getZoom()>14&&scoil_map_obj[l].setZoom(14))}},y:function(a,t){0==t.pin.length?scoil_map_disp.g(a,t):(t.zoom-=t.zoom>1?1:0,scoil_map_disp.c(a,t))},ystatic:function(a,t){0==t.pin.length?scoil_map_disp.g(a,t):(t.zoom-=t.zoom>1?1:0,scoil_map_disp.c(a,t))},gapi:function(a,t){if("undefined"==typeof google)return scoil_map_gapi1loaded?scoil_map_gapi1loaded>10?"":(setTimeout(function(){scoil_map_disp.gapi(a,t)},100),scoil_map_gapi1loaded++,""):($.ajax({timeout:5e3,url:"https://www.google.com/jsapi",dataType:"script",success:function(){scoil_map_disp.gapi(a,t)}}),scoil_map_gapi1loaded=1,"");if(void 0===google.maps||void 0===google.maps.Map)return scoil_map_gapi2loaded?scoil_map_gapi2loaded>10?"":(setTimeout(function(){scoil_map_disp.gapi(a,t)},100),scoil_map_gapi2loaded++,""):(document.getElementsByTagName("base").item(0)||(t.api="AIzaSyDjGUOboRnylhlYfhQFUPfmpuY-xeb9y-g"),google.load("maps","3",{other_params:"key="+t.api+"&language="+(t.hl&&t.hl.match(/^[a-z]{2}(?:-[A-Z]{2})?$/)?t.hl:"ja"),callback:function(e){scoil_map_disp.gapi(a,t)}}),scoil_map_gapi2loaded=1,"");var e=[];t.style&&scoil_map_dfn[t.style]&&(e=[{elementType:"geometry",stylers:[{color:"#"+scoil_map_dfn[t.style].bg}]},{elementType:"labels.text.fill",stylers:[{color:"#"+(scoil_map_dfn[t.style].font?scoil_map_dfn[t.style].font:"000000")}]},{elementType:"labels.text.stroke",stylers:[{color:"#"+(scoil_map_dfn[t.style].font_stroke?scoil_map_dfn[t.style].font_stroke:scoil_map_dfn[t.style].bg)}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#"+scoil_map_dfn[t.style].poi}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#"+(scoil_map_dfn[t.style].road?scoil_map_dfn[t.style].road:"ffffff")}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#"+scoil_map_dfn[t.style].highway}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#"+(scoil_map_dfn[t.style].transit?scoil_map_dfn[t.style].transit:scoil_map_dfn[t.style].highway)}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#"+scoil_map_dfn[t.style].water}]}],scoil_map_dfn[t.style].park&&e.push({featureType:"poi.park",elementType:"geometry",stylers:[{color:"#"+scoil_map_dfn[t.style].park}]}));var l={mapTypeId:google.maps.MapTypeId.ROADMAP,streetViewControl:!1};if(t.lat&&t.lng&&(l.zoom=t.zoom,l.center=new google.maps.LatLng(t.lat,t.lng)),e.length>0){var o=new google.maps.StyledMapType(e,{name:"ja"!=t.hl&&t.hl?"My Color":"カスタム色"});l.mapTypeControlOptions={mapTypeIds:["roadmap","satellite","hybrid","terrain","mystyle"]}}var s=new google.maps.Map(a[0],l);e.length>0&&(s.mapTypes.set("mystyle",o),s.setMapTypeId("mystyle")),0==t.pin.length&&t.lat&&t.lng&&t.pin.push({lat:t.lat,lng:t.lng});var i=!t.lat||!t.lng;if(i)var n=new google.maps.LatLngBounds;for(var c=0;c<t.pin.length;c++){var r=new google.maps.LatLng(t.pin[c].lat,t.pin[c].lng),d=new google.maps.Marker({position:r,map:s,label:t.pin[c].label?{text:t.pin[c].label,fontWeight:"bold",fontSize:"12px",fontFamily:"Yu Gothic"}:"",mkr:(t.pin[c].link?'<a href="'+t.pin[c].link+'#contents" target="_blank">':"")+t.pin[c].label.replace(/\r?\n/g,"<br />")+(t.pin[c].link?"</a>":""),icon:t.pin[c].color?{url:root+"js/leaflet/images/marker-icon_"+t.pin[c].color+".png",scaledSize:new google.maps.Size(25,41)}:""});t.pin[c].label&&google.maps.event.addListener(d,"click",function(){new google.maps.InfoWindow({content:"<p>"+this.mkr+"</p>"}).open(s,this)}),i&&n.extend(r)}i&&s.fitBounds(n)}},scoil_map_ybind=function(a){(a=$(a)).removeAttr("onclick");var t=scoil_map_val(a.parent(".scoil_map"));t.type="y",a.empty(),scoil_map_disp.y(a,t)},scoil_map_val=function(a){var t={lat:"",lng:"",zoom:15,pin:[],type:"",style:"",api:"",hl:""};if(a.data("pin"))for(var e=a.data("pin").split("|"),l=0;l<e.length;l++)e[l]&&e[l].match(/^(-?[\d\.]+),(-?[\d\.]+)(?:,([\s\S]+?))?(?:,link=(\.\/[^,]+))?(?:,color=(\w+))?$/)&&t.pin.push({lat:RegExp.$1,lng:RegExp.$2,label:RegExp.$3?decodeURIComponent(RegExp.$3):"",link:RegExp.$4?RegExp.$4:"",color:RegExp.$5?RegExp.$5:""});return a.data("val")&&a.data("val").match(/^(-?[\d\.]+),(-?[\d\.]+)(?:,(\d+))?$/)&&(t.lat=RegExp.$1,t.lng=RegExp.$2,RegExp.$3&&(t.zoom=parseInt(RegExp.$3,10))),a.data("llz")&&a.data("llz").match(/^(-?[\d\.]+),(-?[\d\.]+),(\d+)$/)&&(t.lat=RegExp.$1,t.lng=RegExp.$2,t.zoom=parseInt(RegExp.$3,10)),t.pin.length>0&&t.lat&&t.lng&&!a.data("llz")&&t.pin.unshift({lat:t.lat,lng:t.lng,label:"ホーム"}),a.data("type")&&-1!=$.inArray(a.data("type"),["g","y","ystatic","gapi","c"])?t.type=a.data("type"):t.type="g",a.data("style")&&scoil_map_dfn[a.data("style")]&&(t.style=a.data("style")),"gapi"==t.type&&a.data("api")&&(t.api=a.data("api")),a.data("hl")&&-1!=$.inArray(a.data("type"),["g","gapi"])&&(t.hl=a.data("hl")),a.attr("style")&&a.attr("style").match(/height\s*:\s*\d+px/i)&&$("img.scoil_map_spacer",a).remove(),t},scoil_map_load=function(a){var t=scoil_map_val(a);scoil_map_disp[t.type]($("div.scoil_map_wrap",a),t)},scoil_map=function(a){$('<img class="scoil_map_spacer" src="'+root+'css/scoil_map.gif" />').bind("load",function(){$(a).empty().append(this).append('<div class="scoil_map_wrap"></div>'),scoil_map_load($(a))})},scoil_countdown_calc=function(a,t,e,l,o,s){var i=a-Math.round((new Date).getTime()/1e3);if(i<0)return"";var n=Math.floor(i/86400),c=l>0&&n>=l;return(t||"")+'<span class="countdown_body">'+(c?'<span class="countdown">'+(n+1)+"</span>日 (":"")+(n?'<span class="countdown">'+n+"</span>日と":"")+'<span class="countdown countdown2">'+("0"+Math.floor(i%86400/3600).toString()).slice(-2)+"</span>"+("ja"==s?"時間":"：")+'<span class="countdown countdown2">'+("0"+Math.floor(i%3600/60).toString()).slice(-2)+"</span>"+("ja"==s?"分":"：")+'<span class="countdown countdown2">'+("0"+(i%60).toString()).slice(-2)+"</span>"+(o?'.<span class="countdown countdown1">9</span>':"")+("ja"==s?"秒":"")+(c?")":"")+"</span>"+(e||"")},scoil_countdown=function(a){var t=$(a).data("limit");if(!t||!t.match(/^(20\d{2})\D+(\d{1,2})\D+(\d{1,2})\D*(\d{1,2})?\D*(\d{1,2})?\D*(\d{1,2})?$/))return"";var e=RegExp.$1,l=RegExp.$2-1,o=RegExp.$3,s=RegExp.$4?RegExp.$4:0,i=RegExp.$5?RegExp.$5:0,n=RegExp.$6?RegExp.$6:0,c=$(a).data("precomment"),r=$(a).data("postcomment"),d=$(a).data("limitafter"),p=Math.round(new Date(e,l,o,s,i,n).getTime()/1e3);p<(new Date).getTime()/1e3&&$(a).html('<span class="countdown_str">'+(d||"&nbsp;")+"</span>");var _=$(a).data("days")?parseInt($(a).data("days"),10):0,g=$(a).data("milli"),m=$(a).data("lang"),f=scoil_countdown_calc(p,c,r,_,g,m);if(!f)return $(a).html('<span class="countdown_str">'+(d||"&nbsp;")+"</span>"),"";$(a).html(f),g&&setInterval(function(){$("span.countdown1",a).text(10-Math.ceil(((new Date).getMilliseconds()-1)/100))},100);var y=setInterval(function(){var t=scoil_countdown_calc(p,c,r,_,g,m);t?$(a).html(t):(clearInterval(y),$(a).html('<span class="countdown_str">'+(d||"&nbsp;")+"</span>"))},1e3)},scoil_calday_ym,scoil_calday_ymd={},scoil_calday_dobj2ym=function(a,t,e){return a&&"object"==typeof a&&"function"==typeof a.getFullYear?t?(a.setDate(a.getDate()-(e?0==a.getDay()?6:a.getDay()-1:a.getDay())),1e4*a.getFullYear()+100*(a.getMonth()+1)+a.getDate()):100*a.getFullYear()+a.getMonth()+1:""},scoil_calday_onoff=function(a,t){if(!a||!t||!t.toString().match(/^20\d{2}\d{2}$/))return"";$("table",a).hide();var e=$("span.scoil",a).eq(0),l=parseInt(e.data("mpp"),10);l=l>0?l:1;for(var o=a.hasClass("cal")?"cal":"caltbl",s=(new Date).getDate(),i=t,n=0;n<l;n++,i++){i%100==13&&(i+=88);var c=$('table[data-ym="'+i.toString()+'"]',a);c.removeAttr("style"),scoil_calday_ym>i?$("tbody "+("caltbl"==o?"tr":"td"),c).addClass("cal_past"):scoil_calday_ym==i&&$("caltbl"==o?"th":"span.cal_date",c).each(function(){var a=parseInt($(this).text(),10);a<s?$(this).parent("caltbl"==o?"tr":"td").addClass("cal_past"):a==s&&$("caltbl"==o?this:$(this).parent("td")).addClass("cal_today")})}$("span.cal_prev",a).remove(),$("span.cal_next",a).remove();var r=e.data("en");t>parseInt($(a).data("min"),10)&&$("table:visible:first caption",a).append('<span class="cal_prev" onclick="scoil_calday_turn(this,'+t+',-1)">'+(r?"PREV":"前へ")+"</span>"),i<=parseInt($(a).data("max"),10)&&$("table:visible:last caption",a).append('<span class="cal_next" onclick="scoil_calday_turn(this,'+t+',1)">'+(r?"NEXT":"次へ")+"</span>")},scoil_calday_weekly_onoff=function(a,t){if(!a||!t||!t.toString().match(/^20\d{6}$/))return"";$("table",a).hide();var e=$("span.scoil",a).eq(0),l=parseInt(e.data("mpp"),10);l=l>0?l:1;for(var o=e.data("mon")?"mon":"sun",s=new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()).getTime(),i=t,n=0;n<l;n++,i+=7)if(i.toString().match(/^(\d{4})(\d{2})(\d{2})$/)){var c=new Date(RegExp.$1,RegExp.$2-1,RegExp.$3);i=scoil_calday_dobj2ym(c,1,"mon"==o?1:0);var r=$('table[data-ym="'+i.toString()+'"]',a);if(r.removeAttr("style"),scoil_calday_ymd[o]>i)$("tbody tr",r).addClass("cal_past");else if(scoil_calday_ymd[o]==i){$("th.cal_past,td.cal_past",r).removeClass("cal_past");var d=0;$("th",r).each(function(){var a=c.getTime();a<s?($(this).addClass("cal_past"),$("td",r).eq(d).addClass("cal_past")):a==s&&$(this).addClass("cal_today"),c.setDate(c.getDate()+1),d++})}}$("span.cal_prev",a).remove(),$("span.cal_next",a).remove();var p=e.data("en");t>parseInt($(a).data("min"),10)&&$("table:visible:first caption",a).append('<span class="cal_prev" onclick="scoil_calday_turn(this,'+t+',-7)">'+(p?"PREV":"前へ")+"</span>"),i<=parseInt($(a).data("max"),10)&&$("table:visible:last caption",a).append('<span class="cal_next" onclick="scoil_calday_turn(this,'+t+',7)">'+(p?"NEXT":"次へ")+"</span>")},scoil_calday_turn=function(a,t,e){var l=$(a).parents("div.cal,div.caltbl").eq(0);if(!(l[0]&&"number"==typeof e&&e.toString().match(/^-?\d+$/)&&t&&t.toString().match(/^(20\d{2})(\d{2})(\d{2})?$/)))return"";if(RegExp.$3){var o=$("span.scoil",l).data("mon");(i=new Date(RegExp.$1,RegExp.$2-1,RegExp.$3,0,0,0)).setDate(parseInt(RegExp.$3,10)+e);var s=scoil_calday_dobj2ym(i,1,o);scoil_calday_weekly_onoff(l,s)}else{var i;(i=new Date(RegExp.$1,parseInt(RegExp.$2,10)-1,1,0,0,0)).setMonth(parseInt(RegExp.$2,10)-1+e);s=scoil_calday_dobj2ym(i);scoil_calday_onoff(l,s)}},scoil_calday=function(a){var t=parseInt($(a).data("mpp"),10);t=t>0?t:1;var e=$(a).parent("div.cal,div.caltbl"),l=$(a).data("layout");scoil_calday_ym||(scoil_calday_ym=scoil_calday_dobj2ym(new Date));var o=$(a).data("mon")?"mon":"sun";scoil_calday_ymd[o]||"weekly"!=l||(scoil_calday_ymd[o]=scoil_calday_dobj2ym(new Date,1,"mon"==o?1:0));var s=$("table[data-ym]:first",e).data("ym"),i=$("table[data-ym]:last",e).data("ym");if(e.data("max",i),e.data("min",s),$(".cal_today",e).removeClass("cal_today"),"weekly"==l){var n=$('table[data-ym="'+scoil_calday_ymd[o]+'"]',e)[0]?scoil_calday_ymd[o]:i;scoil_calday_weekly_onoff(e,n)}else{var c=$('table[data-ym="'+scoil_calday_ym+'"]',e)[0]?scoil_calday_ym:i;scoil_calday_onoff(e,c)}},scoil_calayer_disp=function(a,t,e){var l=$('tbody[data-dnum="'+t+'"]'+(e?'[data-cat="'+e+'"]':""),a),o=$("caption",a),s={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};if(!$(".cal_past,.cal_today",l)[0]){var i,n=o.data("type"),c=new Date;if("caltbl"==n){if(c.setDate(c.getDate()+-1*c.getDay()),t<(i=1e4*c.getFullYear()+100*(c.getMonth()+1)+c.getDate()))$("tr:eq(0) th,tr:gt(0) td",l).addClass("cal_past");else if(t==i){var r=100*((new Date).getMonth()+1)+(new Date).getDate(),d=0,p=0;$("tr",l).each(function(){$("th:gt(0)",this).each(function(){var a=$(this).text(),t=0;a.match(/(\d+)\/(\d+)/)?t=100*RegExp.$1+parseInt(RegExp.$2,10):a.match(/([a-zA-Z]{3})\.\s(\d+)/)&&(t=100*s[RegExp.$1]+parseInt(RegExp.$2,10)),t<r?$(this).addClass("cal_past"):t==r&&($(this).addClass("cal_today"),p=d),d++})}),$("tr:gt(0)",l).each(function(){$("td:lt("+p+")",this).addClass("cal_past")})}}else if(t<(i=100*c.getFullYear()+c.getMonth()+1))$("td",l).addClass("cal_past");else if(t==i){var _=(new Date).getDate();$("span.cal_date",l).each(function(){var a=parseInt($(this).text(),10);a<_?($(this).parent("td").addClass("cal_past"),"cal_all"==n&&$('td[data-d="'+a+'"]',l).addClass("cal_past")):a==_&&($(this).parent("td").addClass("cal_today"),"cal_all"==n&&$('td[data-d="'+a+'"]',l).addClass("cal_today"))})}}if(parseInt($("tbody"+(e?'[data-cat="'+e+'"]':"")+":not(.hidden)",a).data("dnum"),10)==parseInt(t,10))return"";$("tbody:not(.hidden)",a).addClass("hidden"),l.css({opacity:0}).removeClass("hidden").animate({opacity:1}),$("div:not(.hidden)",o).addClass("hidden"),$('div[data-dnum="'+t+'"]',o).removeClass("hidden")},scoil_calayer_tab=function(a,t){if($(a).hasClass("on"))return"";$(a).siblings(".on").removeClass("on"),$(a).addClass("on");var e=$(a).parents("div.cal_tab").eq(0).next("table"),l=parseInt($("tbody:not(.hidden)",e).data("dnum"),10);scoil_calayer_disp(e,l,t)},scoil_calayer_turn=function(a,t){var e=$(a).parents("caption").eq(0),l=e.data("type"),o=e.parents("table").eq(0),s="cal_tab"==l?$("tbody:not(.hidden)",o).data("cat"):"";scoil_calayer_disp(o,t,s)},scoil_calayer=function(a){var t=$(a).data("type"),e=new Date;if("caltbl"==t){e.setDate(e.getDate()+-1*e.getDay());var l=1e4*e.getFullYear()+100*(e.getMonth()+1)+e.getDate()}else l=100*e.getFullYear()+e.getMonth()+1;var o=$(a).parents("table").eq(0);if(!$('tbody[data-dnum="'+l+'"]',o)[0]){var s=$("caption",o),i=parseInt(s.data("min"),10),n=parseInt(s.data("max"),10);l=n<l?n:i}var c="cal_tab"==t?$("tbody:not(.hidden)",o).data("cat"):"";scoil_calayer_disp(o,l,c)},tglbtn=function(a,t){var e=$(a).parents("div.tglbtn").eq(0);e.hasClass("tglbtn_show")?(e.removeClass("tglbtn_show"),$(a).prev("a").show()):(e.addClass("tglbtn_show"),$(a).next("a").show()),$(a).hide()},scoil_tglbtn=function(a){var t=$(a).parents("div.deco").eq(0),e=$(a).parents("div.row").eq(0);t.next("div.deco")[0]?t.addClass("tglbtn"):e.next("div.row")[0]&&e.addClass("tglbtn")};function googleTranslateElementInit(){$("#google_translate_element").next("img").remove(),$("#google_translate_element").html("");var a=$("#google_translate_element").data("hl"),t=$("#google_translate_element").data("lang");new google.translate.TranslateElement({pageLanguage:a||"ja",includedLanguages:"all"==t?"":t,autoDisplay:!1},"google_translate_element")}var scoil_lang=function(){if("undefined"==typeof google)return $.ajax({timeout:5e3,url:"https://www.google.com/jsapi",dataType:"script",success:scoil_lang}),"";$.ajax({timeout:5e3,url:"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",dataType:"script"})},scoil_dfn=["tw","inst","rss","yt","we","map","countdown","calday","calayer","tglbtn"],scoil_each=function(self){for(var i=0;i<scoil_dfn.length;i++)if($(self).hasClass("scoil_"+scoil_dfn[i])){eval("scoil_"+scoil_dfn[i]+"(self)");break}},scoil=function(a){(a=$(a)[0]?$(a):$(".scoil")).each(function(){scoil_each(this)}),$("div.scoil_lang")[0]&&scoil_lang()};$(document).ready(function(){"undefined"==typeof root&&(root="undefined"!=typeof basc?basc:"https://at.mamewaza.com/"),scoil()});