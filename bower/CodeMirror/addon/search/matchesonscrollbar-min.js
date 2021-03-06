(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror"),require("./searchcursor"),require("../scroll/annotatescrollbar")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./searchcursor","../scroll/annotatescrollbar"],d):d(CodeMirror)})(function(d){function e(a,c,b,d){this.cm=a;this.annotation=a.annotateScrollbar(d||"CodeMirror-search-match");this.query=c;this.caseFold=b;this.gap={from:a.firstLine(),to:a.lastLine()+1};this.matches=[];this.update=
null;this.findMatches();this.annotation.update(this.matches);var f=this;a.on("change",this.changeHandler=function(a,b){f.onChange(b)})}d.defineExtension("showMatchesOnScrollbar",function(a,c,b){return new e(this,a,c,b)});e.prototype.findMatches=function(){if(this.gap){for(var a=0;a<this.matches.length;a++){var c=this.matches[a];if(c.from.line>=this.gap.to)break;c.to.line>=this.gap.from&&this.matches.splice(a--,1)}for(var b=this.cm.getSearchCursor(this.query,d.Pos(this.gap.from,0),this.caseFold);b.findNext();){c=
{from:b.from(),to:b.to()};if(c.from.line>=this.gap.to)break;this.matches.splice(a++,0,c);if(1E3<this.matches.length)break}this.gap=null}};e.prototype.onChange=function(a){var c=a.from.line,b=d.changeEnd(a).line,e=b-a.to.line;this.gap?(this.gap.from=Math.min(this.gap.from<=c?this.gap.from:Math.max(c,this.gap.from+e),a.from.line),this.gap.to=Math.max(this.gap.to<=c?this.gap.to:Math.max(c,this.gap.to+e),a.from.line)):this.gap={from:a.from.line,to:b+1};if(e)for(a=0;a<this.matches.length;a++){var b=this.matches[a],
f=b.from.line<=c?b.from.line:Math.max(c,b.from.line+e);f!=b.from.line&&(b.from=d.Pos(f,b.from.ch));f=b.to.line<=c?b.to.line:Math.max(c,b.to.line+e);f!=b.to.line&&(b.to=d.Pos(f,b.to.ch))}clearTimeout(this.update);var g=this;this.update=setTimeout(function(){g.updateAfterChange()},250)};e.prototype.updateAfterChange=function(){this.findMatches();this.annotation.update(this.matches)};e.prototype.clear=function(){this.cm.off("change",this.changeHandler);this.annotation.clear()}});