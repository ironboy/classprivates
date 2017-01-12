module.exports = function getMethodNames(obj) {
  var keys = Reflect.ownKeys(obj);
  return keys;
};
