import $ from 'jquery';

/**
 * @param {String} element ID
 * Create a empty div and append it to body
 *
 * Dependancy - materialzie css
 *            - LayerLoader.css
 */

export default function LayerLoader(element){
  if(!this instanceof LayerLoader){
    return new LayerLoader();
  }


  this.elementId = element;
  this.layer = $("<div class='animated fadeInHalf' id="+this.elementId+"></div>");
  this.loader = null;
  this.loaderContainerID = "loaderContainer";
  this.MaterializeLoader = $('<div class="preloader-wrapper big active">'+
    '<div class="spinner-layer spinner-blue-only">'+
      '<div class="circle-clipper left">'+
        '<div class="circle"></div>'+
      '</div><div class="gap-patch">'+
        '<div class="circle"></div>'+
      '</div><div class="circle-clipper right">'+
        '<div class="circle"></div>'+
      '</div>'+
    '</div>'+
  '</div>');
}

LayerLoader.prototype.attachLoader = function(){
    this.loader = $("<div id="+this.loaderContainerID+"></div>").append(this.MaterializeLoader);
    $(document.body).append(this.loader);
      return this;
}

LayerLoader.prototype.bindEvent = function(event,method,target,fn){
  this.layer.on(event,function(){
     switch(method){
       case "removeLayer":
         this.removeLayer(target,fn);
         break;
     }
  }.bind(this));
  return this;
}

/**
 * @param {Object} event
 * event.type
 * event.callback -> callback name
 * event.target -> target div to be hide (optional)
 * event.fn -> user callback function (optional)
 * If event passed, attach this event to the layer, it will off at layer removal
 */

LayerLoader.prototype.show = function(event){
   if(!!!$(document.body).find("#"+this.elementId).length){
     $(document.body).append(this.layer);
     if(!!event){ this.bindEvent(event.type,event.callback,event.target,event.fn); }
   }
     return this;
}

LayerLoader.prototype.removeLoader = function(){
  if(!!$(document.body).find("#"+this.loaderContainerID).length){
     this.loader.remove();
  }
  return this;
}

/**
 * @param {String} target optional
 * @param {Function} callback optional
 * It removes the layer
 * Optionally removes element which is passed via target
 * Optionally invoke callback function
 */

LayerLoader.prototype.removeLayer = function(target,fn){
   if(!!$(document.body).find("#"+this.elementId).length){
      this.layer.remove();
      this.layer.off();
   }

   if(target && (!!$(document.body).find("#"+target).length)){
      $("#"+target).hide();
   }

   this.removeLoader();
   if(fn){
     fn();
   }
   return this;

}
