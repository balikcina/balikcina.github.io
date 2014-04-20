if(typeof jQuery==="undefined"){throw new Error("Bootstrap's JavaScript requires jQuery")}+function(e){"use strict";function t(){var e=document.createElement("bootstrap");var t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in t){if(e.style[n]!==undefined){return{end:t[n]}}}return false}e.fn.emulateTransitionEnd=function(t){var n=false,r=this;e(this).one(e.support.transition.end,function(){n=true});var i=function(){if(!n)e(r).trigger(e.support.transition.end)};setTimeout(i,t);return this};e(function(){e.support.transition=t()})}(jQuery);+function(e){"use strict";var t='[data-dismiss="alert"]';var n=function(n){e(n).on("click",t,this.close)};n.prototype.close=function(t){function s(){i.trigger("closed.bs.alert").remove()}var n=e(this);var r=n.attr("data-target");if(!r){r=n.attr("href");r=r&&r.replace(/.*(?=#[^\s]*$)/,"")}var i=e(r);if(t)t.preventDefault();if(!i.length){i=n.hasClass("alert")?n:n.parent()}i.trigger(t=e.Event("close.bs.alert"));if(t.isDefaultPrevented())return;i.removeClass("in");e.support.transition&&i.hasClass("fade")?i.one(e.support.transition.end,s).emulateTransitionEnd(150):s()};var r=e.fn.alert;e.fn.alert=function(t){return this.each(function(){var r=e(this);var i=r.data("bs.alert");if(!i)r.data("bs.alert",i=new n(this));if(typeof t=="string")i[t].call(r)})};e.fn.alert.Constructor=n;e.fn.alert.noConflict=function(){e.fn.alert=r;return this};e(document).on("click.bs.alert.data-api",t,n.prototype.close)}(jQuery);+function(e){"use strict";var t=function(n,r){this.$element=e(n);this.options=e.extend({},t.DEFAULTS,r);this.isLoading=false};t.DEFAULTS={loadingText:"loading..."};t.prototype.setState=function(t){var n="disabled";var r=this.$element;var i=r.is("input")?"val":"html";var s=r.data();t=t+"Text";if(!s.resetText)r.data("resetText",r[i]());r[i](s[t]||this.options[t]);setTimeout(e.proxy(function(){if(t=="loadingText"){this.isLoading=true;r.addClass(n).attr(n,n)}else if(this.isLoading){this.isLoading=false;r.removeClass(n).removeAttr(n)}},this),0)};t.prototype.toggle=function(){var e=true;var t=this.$element.closest('[data-toggle="buttons"]');if(t.length){var n=this.$element.find("input");if(n.prop("type")=="radio"){if(n.prop("checked")&&this.$element.hasClass("active"))e=false;else t.find(".active").removeClass("active")}if(e)n.prop("checked",!this.$element.hasClass("active")).trigger("change")}if(e)this.$element.toggleClass("active")};var n=e.fn.button;e.fn.button=function(n){return this.each(function(){var r=e(this);var i=r.data("bs.button");var s=typeof n=="object"&&n;if(!i)r.data("bs.button",i=new t(this,s));if(n=="toggle")i.toggle();else if(n)i.setState(n)})};e.fn.button.Constructor=t;e.fn.button.noConflict=function(){e.fn.button=n;return this};e(document).on("click.bs.button.data-api","[data-toggle^=button]",function(t){var n=e(t.target);if(!n.hasClass("btn"))n=n.closest(".btn");n.button("toggle");t.preventDefault()})}(jQuery);+function(e){"use strict";var t=function(t,n){this.$element=e(t);this.$indicators=this.$element.find(".carousel-indicators");this.options=n;this.paused=this.sliding=this.interval=this.$active=this.$items=null;this.options.pause=="hover"&&this.$element.on("mouseenter",e.proxy(this.pause,this)).on("mouseleave",e.proxy(this.cycle,this))};t.DEFAULTS={interval:2e3,pause:"hover",wrap:true};t.prototype.cycle=function(t){t||(this.paused=false);this.interval&&clearInterval(this.interval);this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval));return this};t.prototype.getActiveIndex=function(){this.$active=this.$element.find(".item.active");this.$items=this.$active.parent().children();return this.$items.index(this.$active)};t.prototype.to=function(t){var n=this;var r=this.getActiveIndex();if(t>this.$items.length-1||t<0)return;if(this.sliding)return this.$element.one("slid.bs.carousel",function(){n.to(t)});if(r==t)return this.pause().cycle();return this.slide(t>r?"next":"prev",e(this.$items[t]))};t.prototype.pause=function(t){t||(this.paused=true);if(this.$element.find(".next, .prev").length&&e.support.transition){this.$element.trigger(e.support.transition.end);this.cycle(true)}this.interval=clearInterval(this.interval);return this};t.prototype.next=function(){if(this.sliding)return;return this.slide("next")};t.prototype.prev=function(){if(this.sliding)return;return this.slide("prev")};t.prototype.slide=function(t,n){var r=this.$element.find(".item.active");var i=n||r[t]();var s=this.interval;var o=t=="next"?"left":"right";var u=t=="next"?"first":"last";var a=this;if(!i.length){if(!this.options.wrap)return;i=this.$element.find(".item")[u]()}if(i.hasClass("active"))return this.sliding=false;var f=e.Event("slide.bs.carousel",{relatedTarget:i[0],direction:o});this.$element.trigger(f);if(f.isDefaultPrevented())return;this.sliding=true;s&&this.pause();if(this.$indicators.length){this.$indicators.find(".active").removeClass("active");this.$element.one("slid.bs.carousel",function(){var t=e(a.$indicators.children()[a.getActiveIndex()]);t&&t.addClass("active")})}if(e.support.transition&&this.$element.hasClass("slide")){i.addClass(t);i[0].offsetWidth;r.addClass(o);i.addClass(o);r.one(e.support.transition.end,function(){i.removeClass([t,o].join(" ")).addClass("active");r.removeClass(["active",o].join(" "));a.sliding=false;setTimeout(function(){a.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(r.css("transition-duration").slice(0,-1)*1e3)}else{r.removeClass("active");i.addClass("active");this.sliding=false;this.$element.trigger("slid.bs.carousel")}s&&this.cycle();return this};var n=e.fn.carousel;e.fn.carousel=function(n){return this.each(function(){var r=e(this);var i=r.data("bs.carousel");var s=e.extend({},t.DEFAULTS,r.data(),typeof n=="object"&&n);var o=typeof n=="string"?n:s.slide;if(!i)r.data("bs.carousel",i=new t(this,s));if(typeof n=="number")i.to(n);else if(o)i[o]();else if(s.interval)i.pause().cycle()})};e.fn.carousel.Constructor=t;e.fn.carousel.noConflict=function(){e.fn.carousel=n;return this};e(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(t){var n=e(this),r;var i=e(n.attr("data-target")||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,""));var s=e.extend({},i.data(),n.data());var o=n.attr("data-slide-to");if(o)s.interval=false;i.carousel(s);if(o=n.attr("data-slide-to")){i.data("bs.carousel").to(o)}t.preventDefault()});e(window).on("load",function(){e('[data-ride="carousel"]').each(function(){var t=e(this);t.carousel(t.data())})})}(jQuery);+function(e){"use strict";var t=function(n,r){this.$element=e(n);this.options=e.extend({},t.DEFAULTS,r);this.transitioning=null;if(this.options.parent)this.$parent=e(this.options.parent);if(this.options.toggle)this.toggle()};t.DEFAULTS={toggle:true};t.prototype.dimension=function(){var e=this.$element.hasClass("width");return e?"width":"height"};t.prototype.show=function(){if(this.transitioning||this.$element.hasClass("in"))return;var t=e.Event("show.bs.collapse");this.$element.trigger(t);if(t.isDefaultPrevented())return;var n=this.$parent&&this.$parent.find("> .panel > .in");if(n&&n.length){var r=n.data("bs.collapse");if(r&&r.transitioning)return;n.collapse("hide");r||n.data("bs.collapse",null)}var i=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[i](0);this.transitioning=1;var s=function(){this.$element.removeClass("collapsing").addClass("collapse in")[i]("auto");this.transitioning=0;this.$element.trigger("shown.bs.collapse")};if(!e.support.transition)return s.call(this);var o=e.camelCase(["scroll",i].join("-"));this.$element.one(e.support.transition.end,e.proxy(s,this)).emulateTransitionEnd(350)[i](this.$element[0][o])};t.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass("in"))return;var t=e.Event("hide.bs.collapse");this.$element.trigger(t);if(t.isDefaultPrevented())return;var n=this.dimension();this.$element[n](this.$element[n]())[0].offsetHeight;this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");this.transitioning=1;var r=function(){this.transitioning=0;this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};if(!e.support.transition)return r.call(this);this.$element[n](0).one(e.support.transition.end,e.proxy(r,this)).emulateTransitionEnd(350)};t.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var n=e.fn.collapse;e.fn.collapse=function(n){return this.each(function(){var r=e(this);var i=r.data("bs.collapse");var s=e.extend({},t.DEFAULTS,r.data(),typeof n=="object"&&n);if(!i&&s.toggle&&n=="show")n=!n;if(!i)r.data("bs.collapse",i=new t(this,s));if(typeof n=="string")i[n]()})};e.fn.collapse.Constructor=t;e.fn.collapse.noConflict=function(){e.fn.collapse=n;return this};e(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(t){var n=e(this),r;var i=n.attr("data-target")||t.preventDefault()||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"");var s=e(i);var o=s.data("bs.collapse");var u=o?"toggle":n.data();var a=n.attr("data-parent");var f=a&&e(a);if(!o||!o.transitioning){if(f)f.find('[data-toggle=collapse][data-parent="'+a+'"]').not(n).addClass("collapsed");n[s.hasClass("in")?"addClass":"removeClass"]("collapsed")}s.collapse(u)})}(jQuery);+function(e){"use strict";function i(r){e(t).remove();e(n).each(function(){var t=s(e(this));var n={relatedTarget:this};if(!t.hasClass("open"))return;t.trigger(r=e.Event("hide.bs.dropdown",n));if(r.isDefaultPrevented())return;t.removeClass("open").trigger("hidden.bs.dropdown",n)})}function s(t){var n=t.attr("data-target");if(!n){n=t.attr("href");n=n&&/#[A-Za-z]/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,"")}var r=n&&e(n);return r&&r.length?r:t.parent()}var t=".dropdown-backdrop";var n="[data-toggle=dropdown]";var r=function(t){e(t).on("click.bs.dropdown",this.toggle)};r.prototype.toggle=function(t){var n=e(this);if(n.is(".disabled, :disabled"))return;var r=s(n);var o=r.hasClass("open");i();if(!o){if("ontouchstart"in document.documentElement&&!r.closest(".navbar-nav").length){e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click",i)}var u={relatedTarget:this};r.trigger(t=e.Event("show.bs.dropdown",u));if(t.isDefaultPrevented())return;r.toggleClass("open").trigger("shown.bs.dropdown",u);n.focus()}return false};r.prototype.keydown=function(t){if(!/(38|40|27)/.test(t.keyCode))return;var r=e(this);t.preventDefault();t.stopPropagation();if(r.is(".disabled, :disabled"))return;var i=s(r);var o=i.hasClass("open");if(!o||o&&t.keyCode==27){if(t.which==27)i.find(n).focus();return r.click()}var u=" li:not(.divider):visible a";var a=i.find("[role=menu]"+u+", [role=listbox]"+u);if(!a.length)return;var f=a.index(a.filter(":focus"));if(t.keyCode==38&&f>0)f--;if(t.keyCode==40&&f<a.length-1)f++;if(!~f)f=0;a.eq(f).focus()};var o=e.fn.dropdown;e.fn.dropdown=function(t){return this.each(function(){var n=e(this);var i=n.data("bs.dropdown");if(!i)n.data("bs.dropdown",i=new r(this));if(typeof t=="string")i[t].call(n)})};e.fn.dropdown.Constructor=r;e.fn.dropdown.noConflict=function(){e.fn.dropdown=o;return this};e(document).on("click.bs.dropdown.data-api",i).on("click.bs.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.bs.dropdown.data-api",n,r.prototype.toggle).on("keydown.bs.dropdown.data-api",n+", [role=menu], [role=listbox]",r.prototype.keydown)}(jQuery);+function(e){"use strict";var t=function(t,n){this.options=n;this.$element=e(t);this.$backdrop=this.isShown=null;if(this.options.remote){this.$element.find(".modal-content").load(this.options.remote,e.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))}};t.DEFAULTS={backdrop:true,keyboard:true,show:true};t.prototype.toggle=function(e){return this[!this.isShown?"show":"hide"](e)};t.prototype.show=function(t){var n=this;var r=e.Event("show.bs.modal",{relatedTarget:t});this.$element.trigger(r);if(this.isShown||r.isDefaultPrevented())return;this.isShown=true;this.escape();this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',e.proxy(this.hide,this));this.backdrop(function(){var r=e.support.transition&&n.$element.hasClass("fade");if(!n.$element.parent().length){n.$element.appendTo(document.body)}n.$element.show().scrollTop(0);if(r){n.$element[0].offsetWidth}n.$element.addClass("in").attr("aria-hidden",false);n.enforceFocus();var i=e.Event("shown.bs.modal",{relatedTarget:t});r?n.$element.find(".modal-dialog").one(e.support.transition.end,function(){n.$element.focus().trigger(i)}).emulateTransitionEnd(300):n.$element.focus().trigger(i)})};t.prototype.hide=function(t){if(t)t.preventDefault();t=e.Event("hide.bs.modal");this.$element.trigger(t);if(!this.isShown||t.isDefaultPrevented())return;this.isShown=false;this.escape();e(document).off("focusin.bs.modal");this.$element.removeClass("in").attr("aria-hidden",true).off("click.dismiss.bs.modal");e.support.transition&&this.$element.hasClass("fade")?this.$element.one(e.support.transition.end,e.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()};t.prototype.enforceFocus=function(){e(document).off("focusin.bs.modal").on("focusin.bs.modal",e.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.focus()}},this))};t.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on("keyup.dismiss.bs.modal",e.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off("keyup.dismiss.bs.modal")}};t.prototype.hideModal=function(){var e=this;this.$element.hide();this.backdrop(function(){e.removeBackdrop();e.$element.trigger("hidden.bs.modal")})};t.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove();this.$backdrop=null};t.prototype.backdrop=function(t){var n=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var r=e.support.transition&&n;this.$backdrop=e('<div class="modal-backdrop '+n+'" />').appendTo(document.body);this.$element.on("click.dismiss.bs.modal",e.proxy(function(e){if(e.target!==e.currentTarget)return;this.options.backdrop=="static"?this.$element[0].focus.call(this.$element[0]):this.hide.call(this)},this));if(r)this.$backdrop[0].offsetWidth;this.$backdrop.addClass("in");if(!t)return;r?this.$backdrop.one(e.support.transition.end,t).emulateTransitionEnd(150):t()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,t).emulateTransitionEnd(150):t()}else if(t){t()}};var n=e.fn.modal;e.fn.modal=function(n,r){return this.each(function(){var i=e(this);var s=i.data("bs.modal");var o=e.extend({},t.DEFAULTS,i.data(),typeof n=="object"&&n);if(!s)i.data("bs.modal",s=new t(this,o));if(typeof n=="string")s[n](r);else if(o.show)s.show(r)})};e.fn.modal.Constructor=t;e.fn.modal.noConflict=function(){e.fn.modal=n;return this};e(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var n=e(this);var r=n.attr("href");var i=e(n.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,""));var s=i.data("bs.modal")?"toggle":e.extend({remote:!/#/.test(r)&&r},i.data(),n.data());if(n.is("a"))t.preventDefault();i.modal(s,this).one("hide",function(){n.is(":visible")&&n.focus()})});e(document).on("show.bs.modal",".modal",function(){e(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){e(document.body).removeClass("modal-open")})}(jQuery);+function(e){"use strict";var t=function(e,t){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null;this.init("tooltip",e,t)};t.DEFAULTS={animation:true,placement:"top",selector:false,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:false,container:false};t.prototype.init=function(t,n,r){this.enabled=true;this.type=t;this.$element=e(n);this.options=this.getOptions(r);var i=this.options.trigger.split(" ");for(var s=i.length;s--;){var o=i[s];if(o=="click"){this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this))}else if(o!="manual"){var u=o=="hover"?"mouseenter":"focusin";var a=o=="hover"?"mouseleave":"focusout";this.$element.on(u+"."+this.type,this.options.selector,e.proxy(this.enter,this));this.$element.on(a+"."+this.type,this.options.selector,e.proxy(this.leave,this))}}this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()};t.prototype.getDefaults=function(){return t.DEFAULTS};t.prototype.getOptions=function(t){t=e.extend({},this.getDefaults(),this.$element.data(),t);if(t.delay&&typeof t.delay=="number"){t.delay={show:t.delay,hide:t.delay}}return t};t.prototype.getDelegateOptions=function(){var t={};var n=this.getDefaults();this._options&&e.each(this._options,function(e,r){if(n[e]!=r)t[e]=r});return t};t.prototype.enter=function(t){var n=t instanceof this.constructor?t:e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);clearTimeout(n.timeout);n.hoverState="in";if(!n.options.delay||!n.options.delay.show)return n.show();n.timeout=setTimeout(function(){if(n.hoverState=="in")n.show()},n.options.delay.show)};t.prototype.leave=function(t){var n=t instanceof this.constructor?t:e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);clearTimeout(n.timeout);n.hoverState="out";if(!n.options.delay||!n.options.delay.hide)return n.hide();n.timeout=setTimeout(function(){if(n.hoverState=="out")n.hide()},n.options.delay.hide)};t.prototype.show=function(){var t=e.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);if(t.isDefaultPrevented())return;var n=this;var r=this.tip();this.setContent();if(this.options.animation)r.addClass("fade");var i=typeof this.options.placement=="function"?this.options.placement.call(this,r[0],this.$element[0]):this.options.placement;var s=/\s?auto?\s?/i;var o=s.test(i);if(o)i=i.replace(s,"")||"top";r.detach().css({top:0,left:0,display:"block"}).addClass(i);this.options.container?r.appendTo(this.options.container):r.insertAfter(this.$element);var u=this.getPosition();var a=r[0].offsetWidth;var f=r[0].offsetHeight;if(o){var l=this.$element.parent();var c=i;var h=document.documentElement.scrollTop||document.body.scrollTop;var p=this.options.container=="body"?window.innerWidth:l.outerWidth();var d=this.options.container=="body"?window.innerHeight:l.outerHeight();var v=this.options.container=="body"?0:l.offset().left;i=i=="bottom"&&u.top+u.height+f-h>d?"top":i=="top"&&u.top-h-f<0?"bottom":i=="right"&&u.right+a>p?"left":i=="left"&&u.left-a<v?"right":i;r.removeClass(c).addClass(i)}var m=this.getCalculatedOffset(i,u,a,f);this.applyPlacement(m,i);this.hoverState=null;var g=function(){n.$element.trigger("shown.bs."+n.type)};e.support.transition&&this.$tip.hasClass("fade")?r.one(e.support.transition.end,g).emulateTransitionEnd(150):g()}};t.prototype.applyPlacement=function(t,n){var r;var i=this.tip();var s=i[0].offsetWidth;var o=i[0].offsetHeight;var u=parseInt(i.css("margin-top"),10);var a=parseInt(i.css("margin-left"),10);if(isNaN(u))u=0;if(isNaN(a))a=0;t.top=t.top+u;t.left=t.left+a;e.offset.setOffset(i[0],e.extend({using:function(e){i.css({top:Math.round(e.top),left:Math.round(e.left)})}},t),0);i.addClass("in");var f=i[0].offsetWidth;var l=i[0].offsetHeight;if(n=="top"&&l!=o){r=true;t.top=t.top+o-l}if(/bottom|top/.test(n)){var c=0;if(t.left<0){c=t.left*-2;t.left=0;i.offset(t);f=i[0].offsetWidth;l=i[0].offsetHeight}this.replaceArrow(c-s+f,f,"left")}else{this.replaceArrow(l-o,l,"top")}if(r)i.offset(t)};t.prototype.replaceArrow=function(e,t,n){this.arrow().css(n,e?50*(1-e/t)+"%":"")};t.prototype.setContent=function(){var e=this.tip();var t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t);e.removeClass("fade in top bottom left right")};t.prototype.hide=function(){function i(){if(t.hoverState!="in")n.detach();t.$element.trigger("hidden.bs."+t.type)}var t=this;var n=this.tip();var r=e.Event("hide.bs."+this.type);this.$element.trigger(r);if(r.isDefaultPrevented())return;n.removeClass("in");e.support.transition&&this.$tip.hasClass("fade")?n.one(e.support.transition.end,i).emulateTransitionEnd(150):i();this.hoverState=null;return this};t.prototype.fixTitle=function(){var e=this.$element;if(e.attr("title")||typeof e.attr("data-original-title")!="string"){e.attr("data-original-title",e.attr("title")||"").attr("title","")}};t.prototype.hasContent=function(){return this.getTitle()};t.prototype.getPosition=function(){var t=this.$element[0];return e.extend({},typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:t.offsetWidth,height:t.offsetHeight},this.$element.offset())};t.prototype.getCalculatedOffset=function(e,t,n,r){return e=="bottom"?{top:t.top+t.height,left:t.left+t.width/2-n/2}:e=="top"?{top:t.top-r,left:t.left+t.width/2-n/2}:e=="left"?{top:t.top+t.height/2-r/2,left:t.left-n}:{top:t.top+t.height/2-r/2,left:t.left+t.width}};t.prototype.getTitle=function(){var e;var t=this.$element;var n=this.options;e=t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title);return e};t.prototype.tip=function(){return this.$tip=this.$tip||e(this.options.template)};t.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")};t.prototype.validate=function(){if(!this.$element[0].parentNode){this.hide();this.$element=null;this.options=null}};t.prototype.enable=function(){this.enabled=true};t.prototype.disable=function(){this.enabled=false};t.prototype.toggleEnabled=function(){this.enabled=!this.enabled};t.prototype.toggle=function(t){var n=t?e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;n.tip().hasClass("in")?n.leave(n):n.enter(n)};t.prototype.destroy=function(){clearTimeout(this.timeout);this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var n=e.fn.tooltip;e.fn.tooltip=function(n){return this.each(function(){var r=e(this);var i=r.data("bs.tooltip");var s=typeof n=="object"&&n;if(!i&&n=="destroy")return;if(!i)r.data("bs.tooltip",i=new t(this,s));if(typeof n=="string")i[n]()})};e.fn.tooltip.Constructor=t;e.fn.tooltip.noConflict=function(){e.fn.tooltip=n;return this}}(jQuery);+function(e){"use strict";var t=function(e,t){this.init("popover",e,t)};if(!e.fn.tooltip)throw new Error("Popover requires tooltip.js");t.DEFAULTS=e.extend({},e.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'});t.prototype=e.extend({},e.fn.tooltip.Constructor.prototype);t.prototype.constructor=t;t.prototype.getDefaults=function(){return t.DEFAULTS};t.prototype.setContent=function(){var e=this.tip();var t=this.getTitle();var n=this.getContent();e.find(".popover-title")[this.options.html?"html":"text"](t);e.find(".popover-content")[this.options.html?typeof n=="string"?"html":"append":"text"](n);e.removeClass("fade top bottom left right in");if(!e.find(".popover-title").html())e.find(".popover-title").hide()};t.prototype.hasContent=function(){return this.getTitle()||this.getContent()};t.prototype.getContent=function(){var e=this.$element;var t=this.options;return e.attr("data-content")||(typeof t.content=="function"?t.content.call(e[0]):t.content)};t.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};t.prototype.tip=function(){if(!this.$tip)this.$tip=e(this.options.template);return this.$tip};var n=e.fn.popover;e.fn.popover=function(n){return this.each(function(){var r=e(this);var i=r.data("bs.popover");var s=typeof n=="object"&&n;if(!i&&n=="destroy")return;if(!i)r.data("bs.popover",i=new t(this,s));if(typeof n=="string")i[n]()})};e.fn.popover.Constructor=t;e.fn.popover.noConflict=function(){e.fn.popover=n;return this}}(jQuery);+function(e){"use strict";function t(n,r){var i;var s=e.proxy(this.process,this);this.$element=e(n).is("body")?e(window):e(n);this.$body=e("body");this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",s);this.options=e.extend({},t.DEFAULTS,r);this.selector=(this.options.target||(i=e(n).attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a";this.offsets=e([]);this.targets=e([]);this.activeTarget=null;this.refresh();this.process()}t.DEFAULTS={offset:10};t.prototype.refresh=function(){var t=this.$element[0]==window?"offset":"position";this.offsets=e([]);this.targets=e([]);var n=this;var r=this.$body.find(this.selector).map(function(){var r=e(this);var i=r.data("target")||r.attr("href");var s=/^#./.test(i)&&e(i);return s&&s.length&&s.is(":visible")&&[[s[t]().top+(!e.isWindow(n.$scrollElement.get(0))&&n.$scrollElement.scrollTop()),i]]||null}).sort(function(e,t){return e[0]-t[0]}).each(function(){n.offsets.push(this[0]);n.targets.push(this[1])})};t.prototype.process=function(){var e=this.$scrollElement.scrollTop()+this.options.offset;var t=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight;var n=t-this.$scrollElement.height();var r=this.offsets;var i=this.targets;var s=this.activeTarget;var o;if(e>=n){return s!=(o=i.last()[0])&&this.activate(o)}if(s&&e<=r[0]){return s!=(o=i[0])&&this.activate(o)}for(o=r.length;o--;){s!=i[o]&&e>=r[o]&&(!r[o+1]||e<=r[o+1])&&this.activate(i[o])}};t.prototype.activate=function(t){this.activeTarget=t;e(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var n=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]';var r=e(n).parents("li").addClass("active");if(r.parent(".dropdown-menu").length){r=r.closest("li.dropdown").addClass("active")}r.trigger("activate.bs.scrollspy")};var n=e.fn.scrollspy;e.fn.scrollspy=function(n){return this.each(function(){var r=e(this);var i=r.data("bs.scrollspy");var s=typeof n=="object"&&n;if(!i)r.data("bs.scrollspy",i=new t(this,s));if(typeof n=="string")i[n]()})};e.fn.scrollspy.Constructor=t;e.fn.scrollspy.noConflict=function(){e.fn.scrollspy=n;return this};e(window).on("load",function(){e('[data-spy="scroll"]').each(function(){var t=e(this);t.scrollspy(t.data())})})}(jQuery);+function(e){"use strict";var t=function(t){this.element=e(t)};t.prototype.show=function(){var t=this.element;var n=t.closest("ul:not(.dropdown-menu)");var r=t.data("target");if(!r){r=t.attr("href");r=r&&r.replace(/.*(?=#[^\s]*$)/,"")}if(t.parent("li").hasClass("active"))return;var i=n.find(".active:last a")[0];var s=e.Event("show.bs.tab",{relatedTarget:i});t.trigger(s);if(s.isDefaultPrevented())return;var o=e(r);this.activate(t.parent("li"),n);this.activate(o,o.parent(),function(){t.trigger({type:"shown.bs.tab",relatedTarget:i})})};t.prototype.activate=function(t,n,r){function o(){i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");t.addClass("active");if(s){t[0].offsetWidth;t.addClass("in")}else{t.removeClass("fade")}if(t.parent(".dropdown-menu")){t.closest("li.dropdown").addClass("active")}r&&r()}var i=n.find("> .active");var s=r&&e.support.transition&&i.hasClass("fade");s?i.one(e.support.transition.end,o).emulateTransitionEnd(150):o();i.removeClass("in")};var n=e.fn.tab;e.fn.tab=function(n){return this.each(function(){var r=e(this);var i=r.data("bs.tab");if(!i)r.data("bs.tab",i=new t(this));if(typeof n=="string")i[n]()})};e.fn.tab.Constructor=t;e.fn.tab.noConflict=function(){e.fn.tab=n;return this};e(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(t){t.preventDefault();e(this).tab("show")})}(jQuery);+function(e){"use strict";var t=function(n,r){this.options=e.extend({},t.DEFAULTS,r);this.$window=e(window).on("scroll.bs.affix.data-api",e.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",e.proxy(this.checkPositionWithEventLoop,this));this.$element=e(n);this.affixed=this.unpin=this.pinnedOffset=null;this.checkPosition()};t.RESET="affix affix-top affix-bottom";t.DEFAULTS={offset:0};t.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(t.RESET).addClass("affix");var e=this.$window.scrollTop();var n=this.$element.offset();return this.pinnedOffset=n.top-e};t.prototype.checkPositionWithEventLoop=function(){setTimeout(e.proxy(this.checkPosition,this),1)};t.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var n=e(document).height();var r=this.$window.scrollTop();var i=this.$element.offset();var s=this.options.offset;var o=s.top;var u=s.bottom;if(this.affixed=="top")i.top+=r;if(typeof s!="object")u=o=s;if(typeof o=="function")o=s.top(this.$element);if(typeof u=="function")u=s.bottom(this.$element);var a=this.unpin!=null&&r+this.unpin<=i.top?false:u!=null&&i.top+this.$element.height()>=n-u?"bottom":o!=null&&r<=o?"top":false;if(this.affixed===a)return;if(this.unpin)this.$element.css("top","");var f="affix"+(a?"-"+a:"");var l=e.Event(f+".bs.affix");this.$element.trigger(l);if(l.isDefaultPrevented())return;this.affixed=a;this.unpin=a=="bottom"?this.getPinnedOffset():null;this.$element.removeClass(t.RESET).addClass(f).trigger(e.Event(f.replace("affix","affixed")));if(a=="bottom"){this.$element.offset({top:n-u-this.$element.height()})}};var n=e.fn.affix;e.fn.affix=function(n){return this.each(function(){var r=e(this);var i=r.data("bs.affix");var s=typeof n=="object"&&n;if(!i)r.data("bs.affix",i=new t(this,s));if(typeof n=="string")i[n]()})};e.fn.affix.Constructor=t;e.fn.affix.noConflict=function(){e.fn.affix=n;return this};e(window).on("load",function(){e('[data-spy="affix"]').each(function(){var t=e(this);var n=t.data();n.offset=n.offset||{};if(n.offsetBottom)n.offset.bottom=n.offsetBottom;if(n.offsetTop)n.offset.top=n.offsetTop;t.affix(n)})})}(jQuery)