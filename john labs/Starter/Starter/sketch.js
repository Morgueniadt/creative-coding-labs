//let age = 23;
const dob="21/11/2004";
//let yobString = dob.substring(6, 8)
//let yobNum = parseInt(yobString)
let age = 2025 - parseInt(dob.substring(6, 10))
console.log
const d = new Date();
d.getFullYear();

const fruits = ["Banana", "Orange", "Apple", "Mango"];
let fLen = fruits.length


//for (let num = 0; num < fruits.length; num++) {
//    console.log(fruits[num])    
//}

fruits.splice(2, 0, "Lemon", "Kiwi");
fruits.push["lemon"]
fruits.length

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
  };

const person2 = {
firstName: "Jane",
lastName: "Doe",
age: 50,
eyeColor: "blue"
  };  

const friend = [person, person2]

function median(numbers) {
  const sorted = Array.from(numbers).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}
