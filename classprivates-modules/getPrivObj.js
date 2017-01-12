var instances = [], mems = [];

module.exports = function getPrivObj(instance){
  var index = instances.indexOf(instance);
  if(index < 0){
    instances.push(instance);
    mems.push({});
    index = mems.length - 1;
  }
  return mems[index];
};
