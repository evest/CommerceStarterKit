//>>built
define("dgrid/OnDemandList",["./List","./_StoreMixin","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/on","./util/misc","put-selector/put"],function(_1,_2,_3,_4,_5,_6,_7,_8){return _3([_1,_2],{minRowsPerPage:25,maxRowsPerPage:250,maxEmptySpace:Infinity,bufferRows:10,farOffRemoval:2000,queryRowsOverlap:1,pagingMethod:"debounce",pagingDelay:_7.defaultDelay,keepScrollPosition:false,rowHeight:22,postCreate:function(){this.inherited(arguments);var _9=this;_6(this.bodyNode,"scroll",_7[this.pagingMethod](function(_a){_9._processScroll(_a);},null,this.pagingDelay));},renderQuery:function(_b,_c,_d){var _e=this,_f={query:_b,count:0,node:_c,options:_d},_10=this.preload,_11;if(!_c){var _12={node:_8(this.contentNode,"div.dgrid-preload",{rowIndex:0}),count:0,query:_b,next:_f,options:_d};_12.node.style.height="0";_f.node=_c=_8(this.contentNode,"div.dgrid-preload");_f.previous=_12;}_c.rowIndex=this.minRowsPerPage;if(_10){if((_f.next=_10.next)&&this.bodyNode.scrollTop>=_10.node.offsetTop){_f.previous=_10;}else{_f.next=_10;_f.previous=_10.previous;}_f.previous.next=_f;_f.next.previous=_f;}else{this.preload=_f;}var _13=_8(_c,"-div.dgrid-loading"),_14=_8(_13,"div.dgrid-below");_14.innerHTML=this.loadingMessage;function _15(err){_8(_13,"!");if(err){if(_e._refreshDeferred){_e._refreshDeferred.reject(err);delete _e._refreshDeferred;}throw err;}};_d=_4.mixin(this.get("queryOptions"),_d,{start:0,count:this.minRowsPerPage,query:_b});this._trackError(function(){return _11=_b(_d);});if(typeof _11==="undefined"){_15();return;}_5.when(_e.renderArray(_11,_c,_d),function(trs){var _16=typeof _11.total==="undefined"?_11.length:_11.total;return _5.when(_16,function(_17){var _18=trs.length,_19=_c.parentNode,_1a=_e.noDataNode;_8(_13,"!");_e._total=_17;if(_17===0){if(_1a){_8(_1a,"!");delete _e.noDataNode;}_e.noDataNode=_1a=_8("div.dgrid-no-data");_19.insertBefore(_1a,_e._getFirstRowSibling(_19));_1a.innerHTML=_e.noDataMessage;}var _1b=0;for(var i=0;i<_18;i++){_1b+=_e._calcRowHeight(trs[i]);}if(_18&&_1b){_e.rowHeight=_1b/_18;}_17-=_18;_f.count=_17;_c.rowIndex=_18;if(_17){_c.style.height=Math.min(_17*_e.rowHeight,_e.maxEmptySpace)+"px";}else{_c.style.display="none";}if(_e._previousScrollPosition){_e.scrollTo(_e._previousScrollPosition);delete _e._previousScrollPosition;}_e._processScroll();if(_e._refreshDeferred){_e._refreshDeferred.resolve(_11);delete _e._refreshDeferred;}return trs;},_15);},_15);return _11;},refresh:function(_1c){var _1d=this,_1e=(_1c&&_1c.keepScrollPosition),dfd,_1f;if(typeof _1e==="undefined"){_1e=this.keepScrollPosition;}if(_1e){this._previousScrollPosition=this.getScrollPosition();}this.inherited(arguments);if(this.store){dfd=this._refreshDeferred=new _5();_1f=_1d.renderQuery(function(_20){return _1d.store.query(_1d.query,_20);});if(typeof _1f==="undefined"){dfd.reject();}return dfd.then(function(_21){setTimeout(function(){_6.emit(_1d.domNode,"dgrid-refresh-complete",{bubbles:true,cancelable:false,grid:_1d,results:_21});},0);delete _1d._refreshDeferred;return _21;},function(err){delete _1d._refreshDeferred;throw err;});}},resize:function(){this.inherited(arguments);this._processScroll();},_getFirstRowSibling:function(_22){return _22.lastChild;},_calcRowHeight:function(_23){var _24=_23.previousSibling;return _24&&_24.offsetTop!=_23.offsetTop?_23.offsetHeight:0;},lastScrollTop:0,_processScroll:function(evt){var _25=this,_26=_25.bodyNode,_27=(evt&&evt.scrollTop)||this.getScrollPosition().y,_28=_26.offsetHeight+_27,_29,_2a,_2b=_25.preload,_2c=_25.lastScrollTop,_2d=_25.bufferRows*_25.rowHeight,_2e=_2d-_25.rowHeight,_2f,_30,_31,_32=true;var _33=1;_25.lastScrollTop=_27;function _34(_35,_36,_37,_38){var _39=_25.farOffRemoval,_2a=_35.node;if(_36>2*_39){var row,_3a=_2a[_37];var _3b=0;var _3c=0;var _3d=[];while((row=_3a)){var _3e=_25._calcRowHeight(row);if(_3b+_3e+_39>_36||(_3a.className.indexOf("dgrid-row")<0&&_3a.className.indexOf("dgrid-loading")<0)){break;}var _3a=row[_37];_3b+=_3e;_3c+=row.count||1;_25.removeRow(row,true);_3d.push(row);}_35.count+=_3c;if(_38){_2a.rowIndex-=_3c;_3f(_35);}else{_2a.style.height=(_2a.offsetHeight+_3b)+"px";}var _40=_8("div",_3d);setTimeout(function(){_8(_40,"!");},1);}};function _3f(_41,_42){_41.node.style.height=Math.min(_41.count*_25.rowHeight,_42?Infinity:_25.maxEmptySpace)+"px";};function _43(_44,_45){do{_44=_45?_44.next:_44.previous;}while(_44&&!_44.node.offsetWidth);return _44;};while(_2b&&!_2b.node.offsetWidth){_2b=_2b.previous;}while(_2b&&_2b!=_29){_29=_25.preload;_25.preload=_2b;_2a=_2b.node;var _46=_2a.offsetTop;var _47;if(_28+_33+_2e<_46){_2b=_43(_2b,(_32=false));}else{if(_27-_33-_2e>(_46+(_47=_2a.offsetHeight))){_2b=_43(_2b,(_32=true));}else{var _48=((_2a.rowIndex?_27-_2d:_28)-_46)/_25.rowHeight;var _49=(_28-_27+2*_2d)/_25.rowHeight;var _4a=Math.max(Math.min((_27-_2c)*_25.rowHeight,_25.maxRowsPerPage/2),_25.maxRowsPerPage/-2);_49+=Math.min(Math.abs(_4a),10);if(_2a.rowIndex==0){_48-=_49;}_48=Math.max(_48,0);if(_48<10&&_48>0&&_49+_48<_25.maxRowsPerPage){_49+=Math.max(0,_48);_48=0;}_49=Math.min(Math.max(_49,_25.minRowsPerPage),_25.maxRowsPerPage,_2b.count);if(_49==0){_2b=_43(_2b,_32);continue;}_49=Math.ceil(_49);_48=Math.min(Math.floor(_48),_2b.count-_49);var _4b=_4.mixin(_25.get("queryOptions"),_2b.options);_2b.count-=_49;var _4c=_2a,_4d,_4e=_25.queryRowsOverlap,_4f=_2a.rowIndex>0&&_2b;if(_4f){var _50=_2b.previous;if(_50){_34(_50,_27-(_50.node.offsetTop+_50.node.offsetHeight),"nextSibling");if(_48>0&&_50.node==_2a.previousSibling){_48=Math.min(_2b.count,_48);_2b.previous.count+=_48;_3f(_2b.previous,true);_2a.rowIndex+=_48;_4e=0;}else{_49+=_48;}_2b.count-=_48;}_4b.start=_2a.rowIndex-_4e;_4b.count=Math.min(_49+_4e,_25.maxRowsPerPage);_2a.rowIndex=_4b.start+_4b.count;}else{if(_2b.next){_34(_2b.next,_2b.next.node.offsetTop-_28,"previousSibling",true);var _4c=_2a.nextSibling;if(_4c==_2b.next.node){_2b.next.count+=_2b.count-_48;_2b.next.node.rowIndex=_48+_49;_3f(_2b.next);_2b.count=_48;_4e=0;}else{_4d=true;}}_4b.start=_2b.count;_4b.count=Math.min(_49+_4e,_25.maxRowsPerPage);}if(_4d&&_4c&&_4c.offsetWidth){_4d=_4c.offsetTop;}_3f(_2b);var _51=_8(_4c,"-div.dgrid-loading[style=height:"+_49*_25.rowHeight+"px]"),_52=_8(_51,"div.dgrid-"+(_4f?"below":"above"));_52.innerHTML=_25.loadingMessage;_51.count=_49;_4b.query=_2b.query;if(_4b.start>_25._total||_4b.count<0){continue;}var _53=_2b.query(_4b),_54=_25._trackError(function(){return _53;});if(_54===undefined){_8(_51,"!");return;}(function(_55,_56,_57,_58,_59){_31=_5.when(_25.renderArray(_59,_55,_4b),function(_5a){_30=_59;_4c=_55.nextSibling;_8(_55,"!");if(_58&&_4c&&_4c.offsetWidth){var pos=_25.getScrollPosition();_25.scrollTo({x:pos.x,y:pos.y+_4c.offsetTop-_58,preserveMomentum:true});}_5.when(_59.total||_59.length,function(_5b){_25._total=_5b;if(_57){_57.count=_5b-_57.node.rowIndex;_3f(_57);}});_25._processScroll();return _5a;},function(e){_8(_55,"!");throw e;});}).call(this,_51,_26,_4f,_4d,_53);_2b=_2b.previous;}}}if(_31&&(_2f=this._refreshDeferred)){delete this._refreshDeferred;_5.when(_31,function(){_2f.resolve(_30);});}},removeRow:function(_5c,_5d){function _5e(_5f,_60){return _5f!=null?_5f:_60;};if(_5c){var _61=_5c.previousSibling,_62=_5c.nextSibling,_63=_61&&_5e(_61.observerIndex,_61.previousObserverIndex),_64=_62&&_5e(_62.observerIndex,_62.nextObserverIndex),_65=_5c.observerIndex;_5c.observerIndex=undefined;if(_5d){_5c.nextObserverIndex=_64;_5c.previousObserverIndex=_63;}if(_65>-1&&_65!==_63&&_65!==_64){var _66=this.observers;var _67=_66[_65];if(_67){_67.cancel();this._numObservers--;_66[_65]=0;}}}this.inherited(arguments);}});});