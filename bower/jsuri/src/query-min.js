var Query=function(j){var d;var b=j,j=[],k,f;if(!("undefined"===typeof b||null===b||""===b)){0===b.indexOf("?")&&(b=b.substring(1));k=b.toString().split(/[&;]/);for(b=0;b<k.length;b++)f=k[b],f=f.split("="),j.push([f[0],f[1]])}d=j;var g=function(a){a=decodeURIComponent(a);return a=a.replace("+"," ")},l=function(a,h){var c=[],i,e,b,f;for(i=0;i<d.length;i++)e=d[i],b=g(e[0])===g(a),f=g(e[1])===g(h),(1===arguments.length&&!b||2===arguments.length&&!b&&!f)&&c.push(e);d=c;return this},m=function(a,h,c){3===
arguments.length&&-1!==c?(c=Math.min(c,d.length),d.splice(c,0,[a,h])):0<arguments.length&&d.push([a,h]);return this};return{getParamValue:function(a){var h,c;for(c=0;c<d.length;c++)if(h=d[c],g(a)===g(h[0]))return h[1]},getParamValues:function(a){var h=[],c,b;for(c=0;c<d.length;c++)b=d[c],g(a)===g(b[0])&&h.push(b[1]);return h},deleteParam:l,addParam:m,replaceParam:function(a,b,c){var i=-1,e,f;if(3===arguments.length){for(e=0;e<d.length;e++)if(f=d[e],g(f[0])===g(a)&&decodeURIComponent(f[1])===g(c)){i=
e;break}l(a,c).addParam(a,b,i)}else{for(e=0;e<d.length;e++)if(f=d[e],g(f[0])===g(a)){i=e;break}l(a);m(a,b,i)}return this},toString:function(){var a="",b,c;for(b=0;b<d.length;b++)c=d[b],0<a.length&&(a+="&"),a+=c.join("=");return 0<a.length?"?"+a:a}}};