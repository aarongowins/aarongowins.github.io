(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],c):c(CodeMirror)})(function(c){function e(b){b.state.selectionPointer.rects=null;f(b)}function f(b){b.state.selectionPointer.willUpdate||(b.state.selectionPointer.willUpdate=!0,setTimeout(function(){var a=b.state.selectionPointer;if(a){if(null==a.rects&&null!=a.mouseX&&(a.rects=[],b.somethingSelected()))for(var d=b.display.selectionDiv.firstChild;d;d=
d.nextSibling)a.rects.push(d.getBoundingClientRect());d=!1;if(null!=a.mouseX)for(var g=0;g<a.rects.length;g++){var c=a.rects[g];c.left<=a.mouseX&&(c.right>=a.mouseX&&c.top<=a.mouseY&&c.bottom>=a.mouseY)&&(d=!0)}a=d?a.value:"";b.display.lineDiv.style.cursor!=a&&(b.display.lineDiv.style.cursor=a)}b.state.selectionPointer.willUpdate=!1},50))}c.defineOption("selectionPointer",!1,function(b,a){var d=b.state.selectionPointer;if(d){c.off(b.getWrapperElement(),"mousemove",d.mousemove);c.off(b.getWrapperElement(),
"mouseout",d.mouseout);b.off("cursorActivity",e);b.off("scroll",e);b.state.selectionPointer=null;b.display.lineDiv.style.cursor=""}if(a){d=b.state.selectionPointer={value:typeof a=="string"?a:"default",mousemove:function(a){var c=b.state.selectionPointer;if(a.buttons==null?a.which:a.buttons)c.mouseX=c.mouseY=null;else{c.mouseX=a.clientX;c.mouseY=a.clientY}f(b)},mouseout:function(a){if(!b.getWrapperElement().contains(a.relatedTarget)){a=b.state.selectionPointer;a.mouseX=a.mouseY=null;f(b)}},rects:null,
mouseX:null,mouseY:null,willUpdate:false};c.on(b.getWrapperElement(),"mousemove",d.mousemove);c.on(b.getWrapperElement(),"mouseout",d.mouseout);b.on("cursorActivity",e);b.on("scroll",e)}})});