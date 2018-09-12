// CS 336 lab02
// Derek Fisher
// September 12, 2018

// Function creates a person class.
function Person(name, birthDate, friendsList) {
	this.name = name;
	this.birthDate = birthDate;
	this.friendsList = friendsList;
}

// Function changes the name of a person object.
Person.prototype.changeName = function(newName) {
	this.name = newName;
};

// Function computes the age of a person object. 
// Code from: http://jsfiddle.net/codeandcloud/n33RJ/
Person.prototype.getAge = function(birthDate) {
	var today = new Date();
    var birth = new Date(birthDate);
    var age = today.getFullYear() - birth.getFullYear();
    var m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// Function adds people from the person class' friends list.
Person.prototype.addFriend = function(friend) {
	this.friendsList.push(friend);
}

// Function gives the person object the ability to print a greeting.
//Person.prototype.printGreeting = function(greeting) {
//	return 
//}


var p1 = new Person("Bob", "1990/11/11", ["Billy"]);

console.log(p1);

p1.changeName("Matt");

console.log(p1);


console.log(p1.getAge());


