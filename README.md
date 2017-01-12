# classprivates

© Ironboy 2017, MIT licensed

## What does it do?
Makes all class members (properties, methods, getters and setters)
with a certain prefix (default is "_") private.

## How?

### Firstly define a class

```javascript
class ClassName(){
  // whatever methods, setters and getters
}
```

### Then make members private

```javascript
require('classprivates')(ClassName,[prefixString]);
```

This makes all properties, methods, getters and setters with a certain prefix (default is "_") private - that is non-reachable from outside the code in the class.

### Lastly (and optionally)
Just if you are making a module from your class):

```javascript
module.exports = ClassName;
```
