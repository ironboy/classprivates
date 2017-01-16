/*
  classprivates

  © Ironboy 2017, MIT licensed
  
  Makes all class members (properties, methods, getters and setters)
  with a certain prefix (default is "_") private

  Firstly define a class
  class ClassName(){
    // whatever methods, setters and getters
  }

  // Then to make members private
  var classprivates = require('classprivates');
  ClassName = classprivates(ClassName,[prefixString]);

  And lastly (and optionally, just if you
  are making a module from your class):

  module.exports = ClassName;

*/

function construct(_class,prefix){
  prefix = prefix || '_';
  var constr = function(){
    var instance = Reflect.construct(_class,arguments);
    var p = new Proxy(instance,{
      get: _get,
      set: _set,
      deleteProperty: _deleteProperty,
      _prefix: prefix,
    });
    p.constructor = constr;
    return p;
  };
  constr.prototype = _class.prototype;
  return constr;
}

function _ok(property,trapName,prefix){
  var ok = property.constructor !== String ||
    property.indexOf(prefix) !== 0;
  //if(!ok){
  //  console.warn('Could not ' + trapName + ' ' + property);
  //}
  return ok;
}

function _get(target, property, receiver){
  var ok = _ok(property,'get',this._prefix);
  if(ok){
    if(
      typeof target[property] == "function" &&
      !Reflect.getOwnPropertyDescriptor(target,property)
    ){
      var f = function(){
        return Reflect.apply(target[property],target,arguments);
      };
      f.toString = function(){ return target[property] + ''; };
      return f;
    }
    return Reflect.get(target, property, target);
  }
  return undefined;
}

function _set(target, property, val, receiver){
  var ok = _ok(property,'set',this._prefix);
  if(ok){
    return Reflect.set(target,property,val,target);
  }
  return ok;
}

function _deleteProperty(target, property){
  var ok = _ok(property,'set',this._prefix);
  if(ok){
    return Reflect.deleteProperty(target, property);
  }
  return ok;
}

module.exports = construct;
