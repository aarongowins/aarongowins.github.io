define("internal/util/navigator",["exports"],function(b){function e(a){return"object"!==typeof a?void 0:Object.keys(a).filter(function(b){return a[b]})[0]}function f(){var a;a=n;a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)(?:.*version\/)([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||0>a.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];"mozilla"===b[1]&&/\btrident\b/.test(a)&&(b[1]=
"msie");a=b[1]||"";b=b[2]||"0";c="chrome"===a;g="msie"===a;h="mozilla"===a;i=(o=c||"webkit"===a)&&!c;j="opera"===a;p=e({Chrome:c,Firefox:h,IE:g,Safari:i,Opera:j});q=parseInt(b,10);k=-1!==d.indexOf("Linux");l=-1!==d.indexOf("Mac");m=-1!==d.indexOf("Win");r=e({Win:m,Mac:l,Linux:k})}var n=window.navigator.userAgent,d=window.navigator.platform,c=!1,g=!1,h=!1,i=!1,o=!1,j=!1,p,q=NaN,k=!1,l=!1,m=!1,r;b.isChrome=function(){return c};b.isIE=function(){return g};b.isMozilla=function(){return h};b.isSafari=
function(){return i};b.isWebkit=function(){return o};b.isOpera=function(){return j};b.shortBrowser=function(){return p};b.majorVersion=function(){return q};b.isLinux=function(){return k};b.isMac=function(){return l};b.isWin=function(){return m};b.shortPlatform=function(){return r};b._setUserAgent=function(a){n=a;f()};b._setPlatform=function(a){d=a;f()};b._getFirstTruthyPropKey=e;f()});