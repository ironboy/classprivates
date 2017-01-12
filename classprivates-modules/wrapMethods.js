var descProps = ["get","set","value"];

module.exports = function wrapMethods(classDef,privMemberPrefix){
  privMemberPrefix = privMemberPrefix || '_';
  var getPrivObj = this.getPrivObj;
  var getMethodNames = this.getMethodNames;
  var proto = classDef.prototype;
  var mnames = getMethodNames(proto);
  mnames.forEach(function(mname){
    var desc = Object.getOwnPropertyDescriptor(proto,mname);
    descProps.forEach(function(descProp){
      if(typeof desc[descProp] == "function"){
        (function(){
          var org = desc[descProp];
          desc[descProp] = function(){
            var o = getPrivObj(this);
            if(!o.__hasProtos__){
              var p = this, po;
              while(p && p !== Object){
                p = Object.getPrototypeOf(p);
                po = getPrivObj(p);
                for(let i in po){
                  o[i] = po[i];
                }
              }
              o.__hasProtos__ = true;
            }
            for(var i in o){
              if(i == '__hasProtos__'){ continue; }
              Object.defineProperty(this,i,o[i]);
            }
            var r = org.apply(this,arguments);
            for(i in this){
              if(i.indexOf(privMemberPrefix) === 0){
                o[i] = Object.getOwnPropertyDescriptor(this,i);
                delete this[i];
              }
            }
            for(i in o){
              delete this[i];
            }
            return r;
          };
          desc[descProp].toString = function(){
            return org + '';
          };
        })();
      }
    });
    Object.defineProperty(proto,mname,desc);
    if(mname.indexOf(privMemberPrefix) === 0){
      var o = getPrivObj(proto);
      o[mname] = desc;
      delete proto[mname];
    }
  });
};
