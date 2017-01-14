// Define a class
class Animal {

  constructor(name,species){
    this.name = name;
    this._species = species;
  }

  set name(val){
    if(val.length < 3){
      throw("The name should be at least 3 chars.");
    }
    this._name = val;
  }

  get name(){
    return this._name;
  }

  sayHi(){
    return 'Hi, my name is ' + this._name +
      ' and I am a ' + this._species + '! ' +
      this._secret();
  }

  _secret(){
    return "I can do something secret.";
  }


};

// Make class members private
var classprivates = require("./classprivates");
Animal = classprivates(Animal);


// Try it out 
var fido = new Animal('Fido','dog');
console.log(fido.sayHi());

console.log('\nThese props and methods are public:');
console.log('fido.name',fido.name);
console.log('fido.sayHi',fido.sayHi);

console.log('\nThese props and methods are private');
console.log("(a thus they appear as undefined here):");
console.log('fido._name',fido._name);
console.log('fido._species',fido._species);
console.log('fido._secret',fido._secret);


// Try to fool it
// you can't - only original methods (in the class def)
// can read private variabls
fido.sneaky = function(){
  console.log(this._name); // undefined
  console.log(this.name);  // Fido
};

console.log("\nFooled?");
fido.sneaky();