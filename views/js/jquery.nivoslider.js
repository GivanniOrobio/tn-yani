(function($){var NivoSlider=function(element,options){var settings=$.extend({},$.fn.nivoSlider.defaults,options),vars={currentSlide:0,currentImage:"",totalSlides:0,running:!1,paused:!1,stop:!1,controlNavEl:!1},slider=$(element);slider.data("nivo:vars",vars).addClass("nivoSlider");var kids=slider.children();kids.each(function(){var child2=$(this),link="";child2.is("img")||(child2.is("a")&&(child2.addClass("nivo-imageLink"),link=child2),child2=child2.find("img:first"));var childWidth=childWidth===0?child2.attr("width"):child2.width(),childHeight=childHeight===0?child2.attr("height"):child2.height();link!==""&&link.css("display","none"),child2.css("display","none"),vars.totalSlides++}),settings.randomStart&&(settings.startSlide=Math.floor(Math.random()*vars.totalSlides)),settings.startSlide>0&&(settings.startSlide>=vars.totalSlides&&(settings.startSlide=vars.totalSlides-1),vars.currentSlide=settings.startSlide),$(kids[vars.currentSlide]).is("img")?vars.currentImage=$(kids[vars.currentSlide]):vars.currentImage=$(kids[vars.currentSlide]).find("img:first"),$(kids[vars.currentSlide]).is("a")&&$(kids[vars.currentSlide]).css("display","block");var sliderImg=$("<img/>").addClass("nivo-main-image").attr("alt","");sliderImg.attr("src",vars.currentImage.attr("src")).show(),slider.append(sliderImg),$(window).resize(function(){slider.children("img").width(slider.width()),sliderImg.attr("src",vars.currentImage.attr("src")),sliderImg.stop().height("auto"),$(".nivo-slice").remove(),$(".nivo-box").remove()}),slider.append($('<div class="nivo-caption"></div>'));var processCaption=function(settings2){var nivoCaption=$(".nivo-caption",slider);if(vars.currentImage.attr("title")!=""&&vars.currentImage.attr("title")!=null){var title=vars.currentImage.attr("title");title.substr(0,1)=="#"&&(title=$(title).html()),nivoCaption.css("display")=="block"?setTimeout(function(){nivoCaption.html(title)},settings2.animSpeed):(nivoCaption.html(title),nivoCaption.stop().fadeIn(settings2.animSpeed))}else nivoCaption.stop().fadeOut(settings2.animSpeed)};processCaption(settings);var timer=0;if(!settings.manualAdvance&&kids.length>1&&(timer=setInterval(function(){nivoRun(slider,kids,settings,!1)},settings.pauseTime)),settings.directionNav&&(slider.append('<div class="nivo-directionNav"><a class="nivo-prevNav"><i class="fa fa-angle-left"></i><span>'+settings.prevText+'</span></a><a class="nivo-nextNav"><i class="fa fa-angle-right"></i><span>'+settings.nextText+"</span></a></div>"),$(slider).on("click","a.nivo-prevNav",function(){if(vars.running)return!1;clearInterval(timer),timer="",vars.currentSlide-=2,nivoRun(slider,kids,settings,"prev")}),$(slider).on("click","a.nivo-nextNav",function(){if(vars.running)return!1;clearInterval(timer),timer="",nivoRun(slider,kids,settings,"next")})),settings.controlNav){vars.controlNavEl=$('<div class="nivo-controlNav"></div>'),slider.after(vars.controlNavEl);for(var i=0;i<kids.length;i++)if(settings.controlNavThumbs){vars.controlNavEl.addClass("nivo-thumbs-enabled");var child=kids.eq(i);child.is("img")||(child=child.find("img:first")),child.attr("data-thumb")&&vars.controlNavEl.append('<a class="nivo-control" rel="'+i+'"><img src="'+child.attr("data-thumb")+'" alt="" /></a>')}else vars.controlNavEl.append('<a class="nivo-control" rel="'+i+'"><i class="fa fa-circle-o"></i><span>'+(i+1)+"</span></a>");$("a:eq("+vars.currentSlide+")",vars.controlNavEl).addClass("active"),$("a",vars.controlNavEl).bind("click",function(){if(vars.running||$(this).hasClass("active"))return!1;clearInterval(timer),timer="",sliderImg.attr("src",vars.currentImage.attr("src")),vars.currentSlide=$(this).attr("rel")-1,nivoRun(slider,kids,settings,"control")})}settings.pauseOnHover&&slider.hover(function(){vars.paused=!0,clearInterval(timer),timer=""},function(){vars.paused=!1,timer===""&&!settings.manualAdvance&&(timer=setInterval(function(){nivoRun(slider,kids,settings,!1)},settings.pauseTime))}),slider.bind("nivo:animFinished",function(){sliderImg.attr("src",vars.currentImage.attr("src")),vars.running=!1,$(kids).each(function(){$(this).is("a")&&$(this).css("display","none")}),$(kids[vars.currentSlide]).is("a")&&$(kids[vars.currentSlide]).css("display","block"),timer===""&&!vars.paused&&!settings.manualAdvance&&(timer=setInterval(function(){nivoRun(slider,kids,settings,!1)},settings.pauseTime)),settings.afterChange.call(this)});var createSlices=function(slider2,settings2,vars2){$(vars2.currentImage).parent().is("a")&&$(vars2.currentImage).parent().css("display","block"),$('img[src="'+vars2.currentImage.attr("src")+'"]',slider2).not(".nivo-main-image,.nivo-control img").width(slider2.width()).css("visibility","hidden").show();for(var sliceHeight=$('img[src="'+vars2.currentImage.attr("src")+'"]',slider2).not(".nivo-main-image,.nivo-control img").parent().is("a")?$('img[src="'+vars2.currentImage.attr("src")+'"]',slider2).not(".nivo-main-image,.nivo-control img").parent().height():$('img[src="'+vars2.currentImage.attr("src")+'"]',slider2).not(".nivo-main-image,.nivo-control img").height(),i2=0;i2<settings2.slices;i2++){var sliceWidth=Math.round(slider2.width()/settings2.slices);i2===settings2.slices-1?slider2.append($('<div class="nivo-slice" name="'+i2+'"><img src="'+vars2.currentImage.attr("src")+'" style="position:absolute; width:'+slider2.width()+"px; height:auto; display:block !important; top:0; left:-"+(sliceWidth+i2*sliceWidth-sliceWidth)+'px;" /></div>').css({left:sliceWidth*i2+"px",width:slider2.width()-sliceWidth*i2+"px",height:sliceHeight+"px",opacity:"0",overflow:"hidden"})):slider2.append($('<div class="nivo-slice" name="'+i2+'"><img src="'+vars2.currentImage.attr("src")+'" style="position:absolute; width:'+slider2.width()+"px; height:auto; display:block !important; top:0; left:-"+(sliceWidth+i2*sliceWidth-sliceWidth)+'px;" /></div>').css({left:sliceWidth*i2+"px",width:sliceWidth+"px",height:sliceHeight+"px",opacity:"0",overflow:"hidden"}))}$(".nivo-slice",slider2).height(sliceHeight),sliderImg.stop().animate({height:$(vars2.currentImage).height()},settings2.animSpeed)},createBoxes=function(slider2,settings2,vars2){$(vars2.currentImage).parent().is("a")&&$(vars2.currentImage).parent().css("display","block"),$('img[src="'+vars2.currentImage.attr("src")+'"]',slider2).not(".nivo-main-image,.nivo-control img").width(slider2.width()).css("visibility","hidden").show();for(var boxWidth=Math.round(slider2.width()/settings2.boxCols),boxHeight=Math.round($('img[src="'+vars2.currentImage.attr("src")+'"]',slider2).not(".nivo-main-image,.nivo-control img").height()/settings2.boxRows),rows=0;rows<settings2.boxRows;rows++)for(var cols=0;cols<settings2.boxCols;cols++)cols===settings2.boxCols-1?(slider2.append($('<div class="nivo-box" name="'+cols+'" rel="'+rows+'"><img src="'+vars2.currentImage.attr("src")+'" style="position:absolute; width:'+slider2.width()+"px; height:auto; display:block; top:-"+boxHeight*rows+"px; left:-"+boxWidth*cols+'px;" /></div>').css({opacity:0,left:boxWidth*cols+"px",top:boxHeight*rows+"px",width:slider2.width()-boxWidth*cols+"px"})),$('.nivo-box[name="'+cols+'"]',slider2).height($('.nivo-box[name="'+cols+'"] img',slider2).height()+"px")):(slider2.append($('<div class="nivo-box" name="'+cols+'" rel="'+rows+'"><img src="'+vars2.currentImage.attr("src")+'" style="position:absolute; width:'+slider2.width()+"px; height:auto; display:block; top:-"+boxHeight*rows+"px; left:-"+boxWidth*cols+'px;" /></div>').css({opacity:0,left:boxWidth*cols+"px",top:boxHeight*rows+"px",width:boxWidth+"px"})),$('.nivo-box[name="'+cols+'"]',slider2).height($('.nivo-box[name="'+cols+'"] img',slider2).height()+"px"));sliderImg.stop().animate({height:$(vars2.currentImage).height()},settings2.animSpeed)},nivoRun=function(slider2,kids2,settings2,nudge){var vars2=slider2.data("nivo:vars");if(vars2&&vars2.currentSlide===vars2.totalSlides-1&&settings2.lastSlide.call(this),(!vars2||vars2.stop)&&!nudge)return!1;settings2.beforeChange.call(this),nudge?(nudge==="prev"&&sliderImg.attr("src",vars2.currentImage.attr("src")),nudge==="next"&&sliderImg.attr("src",vars2.currentImage.attr("src"))):sliderImg.attr("src",vars2.currentImage.attr("src")),vars2.currentSlide++,vars2.currentSlide===vars2.totalSlides&&(vars2.currentSlide=0,settings2.slideshowEnd.call(this)),vars2.currentSlide<0&&(vars2.currentSlide=vars2.totalSlides-1),$(kids2[vars2.currentSlide]).is("img")?vars2.currentImage=$(kids2[vars2.currentSlide]):vars2.currentImage=$(kids2[vars2.currentSlide]).find("img:first"),settings2.controlNav&&($("a",vars2.controlNavEl).removeClass("active"),$("a:eq("+vars2.currentSlide+")",vars2.controlNavEl).addClass("active")),processCaption(settings2),$(".nivo-slice",slider2).remove(),$(".nivo-box",slider2).remove();var currentEffect=settings2.effect,anims="";settings2.effect==="random"&&(anims=new Array("sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","boxRandom","boxRain","boxRainReverse","boxRainGrow","boxRainGrowReverse"),currentEffect=anims[Math.floor(Math.random()*(anims.length+1))],currentEffect===void 0&&(currentEffect="fade")),settings2.effect.indexOf(",")!==-1&&(anims=settings2.effect.split(","),currentEffect=anims[Math.floor(Math.random()*anims.length)],currentEffect===void 0&&(currentEffect="fade")),vars2.currentImage.attr("data-transition")&&(currentEffect=vars2.currentImage.attr("data-transition")),vars2.running=!0;var timeBuff=0,i2=0,slices="",firstSlice="",totalBoxes="",boxes="";if(currentEffect==="sliceDown"||currentEffect==="sliceDownRight"||currentEffect==="sliceDownLeft")createSlices(slider2,settings2,vars2),timeBuff=0,i2=0,slices=$(".nivo-slice",slider2),currentEffect==="sliceDownLeft"&&(slices=$(".nivo-slice",slider2)._reverse()),slices.each(function(){var slice=$(this);slice.css({top:"0px"}),i2===settings2.slices-1?setTimeout(function(){slice.animate({opacity:"1.0"},settings2.animSpeed,"",function(){slider2.trigger("nivo:animFinished")})},100+timeBuff):setTimeout(function(){slice.animate({opacity:"1.0"},settings2.animSpeed)},100+timeBuff),timeBuff+=50,i2++});else if(currentEffect==="sliceUp"||currentEffect==="sliceUpRight"||currentEffect==="sliceUpLeft")createSlices(slider2,settings2,vars2),timeBuff=0,i2=0,slices=$(".nivo-slice",slider2),currentEffect==="sliceUpLeft"&&(slices=$(".nivo-slice",slider2)._reverse()),slices.each(function(){var slice=$(this);slice.css({bottom:"0px"}),i2===settings2.slices-1?setTimeout(function(){slice.animate({opacity:"1.0"},settings2.animSpeed,"",function(){slider2.trigger("nivo:animFinished")})},100+timeBuff):setTimeout(function(){slice.animate({opacity:"1.0"},settings2.animSpeed)},100+timeBuff),timeBuff+=50,i2++});else if(currentEffect==="sliceUpDown"||currentEffect==="sliceUpDownRight"||currentEffect==="sliceUpDownLeft"){createSlices(slider2,settings2,vars2),timeBuff=0,i2=0;var v=0;slices=$(".nivo-slice",slider2),currentEffect==="sliceUpDownLeft"&&(slices=$(".nivo-slice",slider2)._reverse()),slices.each(function(){var slice=$(this);i2===0?(slice.css("top","0px"),i2++):(slice.css("bottom","0px"),i2=0),v===settings2.slices-1?setTimeout(function(){slice.animate({opacity:"1.0"},settings2.animSpeed,"",function(){slider2.trigger("nivo:animFinished")})},100+timeBuff):setTimeout(function(){slice.animate({opacity:"1.0"},settings2.animSpeed)},100+timeBuff),timeBuff+=50,v++})}else if(currentEffect==="fold")createSlices(slider2,settings2,vars2),timeBuff=0,i2=0,$(".nivo-slice",slider2).each(function(){var slice=$(this),origWidth=slice.width();slice.css({top:"0px",width:"0px"}),i2===settings2.slices-1?setTimeout(function(){slice.animate({width:origWidth,opacity:"1.0"},settings2.animSpeed,"",function(){slider2.trigger("nivo:animFinished")})},100+timeBuff):setTimeout(function(){slice.animate({width:origWidth,opacity:"1.0"},settings2.animSpeed)},100+timeBuff),timeBuff+=50,i2++});else if(currentEffect==="fade")createSlices(slider2,settings2,vars2),firstSlice=$(".nivo-slice:first",slider2),firstSlice.css({width:slider2.width()+"px"}),firstSlice.animate({opacity:"1.0"},settings2.animSpeed*2,"",function(){slider2.trigger("nivo:animFinished")});else if(currentEffect==="slideInRight")createSlices(slider2,settings2,vars2),firstSlice=$(".nivo-slice:first",slider2),firstSlice.css({width:"0px",opacity:"1"}),firstSlice.animate({width:slider2.width()+"px"},settings2.animSpeed*2,"",function(){slider2.trigger("nivo:animFinished")});else if(currentEffect==="slideInLeft")createSlices(slider2,settings2,vars2),firstSlice=$(".nivo-slice:first",slider2),firstSlice.css({width:"0px",opacity:"1",left:"",right:"0px"}),firstSlice.animate({width:slider2.width()+"px"},settings2.animSpeed*2,"",function(){firstSlice.css({left:"0px",right:""}),slider2.trigger("nivo:animFinished")});else if(currentEffect==="boxRandom")createBoxes(slider2,settings2,vars2),totalBoxes=settings2.boxCols*settings2.boxRows,i2=0,timeBuff=0,boxes=shuffle($(".nivo-box",slider2)),boxes.each(function(){var box=$(this);i2===totalBoxes-1?setTimeout(function(){box.animate({opacity:"1"},settings2.animSpeed,"",function(){slider2.trigger("nivo:animFinished")})},100+timeBuff):setTimeout(function(){box.animate({opacity:"1"},settings2.animSpeed)},100+timeBuff),timeBuff+=20,i2++});else if(currentEffect==="boxRain"||currentEffect==="boxRainReverse"||currentEffect==="boxRainGrow"||currentEffect==="boxRainGrowReverse"){createBoxes(slider2,settings2,vars2),totalBoxes=settings2.boxCols*settings2.boxRows,i2=0,timeBuff=0;var rowIndex=0,colIndex=0,box2Darr=[];box2Darr[rowIndex]=[],boxes=$(".nivo-box",slider2),(currentEffect==="boxRainReverse"||currentEffect==="boxRainGrowReverse")&&(boxes=$(".nivo-box",slider2)._reverse()),boxes.each(function(){box2Darr[rowIndex][colIndex]=$(this),colIndex++,colIndex===settings2.boxCols&&(rowIndex++,colIndex=0,box2Darr[rowIndex]=[])});for(var cols=0;cols<settings2.boxCols*2;cols++){for(var prevCol=cols,rows=0;rows<settings2.boxRows;rows++)prevCol>=0&&prevCol<settings2.boxCols&&(function(row,col,time,i3,totalBoxes2){var box=$(box2Darr[row][col]),w=box.width(),h=box.height();(currentEffect==="boxRainGrow"||currentEffect==="boxRainGrowReverse")&&box.width(0).height(0),i3===totalBoxes2-1?setTimeout(function(){box.animate({opacity:"1",width:w,height:h},settings2.animSpeed/1.3,"",function(){slider2.trigger("nivo:animFinished")})},100+time):setTimeout(function(){box.animate({opacity:"1",width:w,height:h},settings2.animSpeed/1.3)},100+time)}(rows,prevCol,timeBuff,i2,totalBoxes),i2++),prevCol--;timeBuff+=100}}},shuffle=function(arr){for(var j,x,i2=arr.length;i2;j=parseInt(Math.random()*i2,10),x=arr[--i2],arr[i2]=arr[j],arr[j]=x);return arr},trace=function(msg){this.console&&typeof console.log!="undefined"&&console.log(msg)};return this.stop=function(){$(element).data("nivo:vars").stop||($(element).data("nivo:vars").stop=!0,trace("Stop Slider"))},this.start=function(){$(element).data("nivo:vars").stop&&($(element).data("nivo:vars").stop=!1,trace("Start Slider"))},settings.afterLoad.call(this),this};$.fn.nivoSlider=function(options){return this.each(function(key,value){var element=$(this);if(element.data("nivoslider"))return element.data("nivoslider");var nivoslider=new NivoSlider(this,options);element.data("nivoslider",nivoslider)})},$.fn.nivoSlider.defaults={effect:"random",slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3e3,startSlide:0,directionNav:!0,controlNav:!0,controlNavThumbs:!1,pauseOnHover:!0,manualAdvance:!1,prevText:"Prev",nextText:"Next",randomStart:!1,beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}},$.fn._reverse=[].reverse})(jQuery);
//# sourceMappingURL=/cdn/shop/t/2/assets/jquery.nivoslider.js.map?v=100412545119716063671408461199
