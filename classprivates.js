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
  require('classprivates')(ClassName,[prefixString]);

  And lastly (and optionally, just if you
  are making a module from your class):

  module.exports = ClassName;

*/

(function(){
  var path = __dirname + '/classprivates-modules/', obj = {}, m;
  require('fs').readdirSync(path).forEach(function(x){
    m = require(path + x);
    obj[m.name] = m;
  },obj);
  module.exports = function(){
    return obj.wrapMethods.apply(obj,arguments);
  };
})();
