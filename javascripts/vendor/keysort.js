/**
 * keysort
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2013 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/keysort/master/LICENSE>
 * @link http://avoidwork.github.io/keysort/
 * @module keysort
 * @version 0.1.1
 */
(function(e){"use strict";function t(e,t){var n=e.length,r;for(r=0;r<n;r++)if(t.call(e,e[r],r)===!1)break;return e}function n(e,t){return t=t||",",e.replace(/^(\s+|\t+)|(\s+|\t+)$/g,"").split(new RegExp("\\s*"+t+"\\s*"))}function r(e,r,i){r=r.replace(/\s*asc/ig,"").replace(/\s*desc/ig," desc");var s=n(r).map(function(e){return e.split(" ")}),o=[];return i&&i!==""?i="."+i:i="",t(s,function(e){var t=e[1]==="desc";t?(o.push("if ( a"+i+'["'+e[0]+'"] < b'+i+'["'+e[0]+'"] ) return 1;'),o.push("if ( a"+i+'["'+e[0]+'"] > b'+i+'["'+e[0]+'"] ) return -1;')):(o.push("if ( a"+i+'["'+e[0]+'"] < b'+i+'["'+e[0]+'"] ) return -1;'),o.push("if ( a"+i+'["'+e[0]+'"] > b'+i+'["'+e[0]+'"] ) return 1;'))}),o.push("else return 0;"),e.sort(new Function("a","b",o.join("\n")))}typeof exports!="undefined"?module.exports=r:typeof define=="function"?define(function(){return r}):e.keysort=r})(this);