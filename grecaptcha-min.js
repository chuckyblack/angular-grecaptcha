"use strict";angular.module("grecaptcha",[]).provider("grecaptcha",function(){var e,t={},r=this,a="onRecaptchaScriptLoaded";this.setParameters=function(e){t=e},this.setLanguage=function(t){e=t},this._createScript=function(t){var r=t.createElement("script");r.type="text/javascript",r.async=!0,r.defer=!0,r.src="//www.google.com/recaptcha/api.js?onload="+a+"&render=explicit"+(e?"&hl="+e:"");var c=t.getElementsByTagName("body")[0];c.appendChild(r)},this.$get=["$q","$window","$document","$rootScope",function(c,n,i,o){return{init:function(){if(n.grecaptcha)return c.when();var e=c.defer();return n[a]=function(){e.resolve()},r._createScript(i[0]),e.promise},setLanguage:function(t){e!==t&&(e=t,delete n.grecaptcha)},updateParameters:function(e){angular.extend(t,e)},create:function(e,r,a){function c(e){o.$apply(function(){r.$setViewValue(e)})}if(a=angular.extend({},t,a),!a.sitekey)throw new Error("Please provide your sitekey via setParameters");t.callback=c,t["expired-callback"]=c,n.grecaptcha.render(e,a)},reset:function(){n.grecaptcha.reset()}}}]}).directive("grecaptcha",["grecaptcha",function(e){return{restrict:"A",require:"ngModel",scope:{ngModel:"=",params:"=?grecaptchaParams"},link:function(t,r,a,c){e.init().then(function(){e.create(r[0],c,t.params),t.$on("$destroy",e.reset)})}}}]);