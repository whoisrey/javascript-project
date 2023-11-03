let array = [];
let question = prompt("what would you like to do?");

const input = ["new", "list", "delete", "quit"];

while (question !== input) {
  if (question === "new") {
    question = prompt("Enter new todo.");
    array.push(question);
    console.log(`${question} added to list.`);
  } else if (question === "delete") {
    question = parseInt(prompt("Enter index of todo to delete."));
    // array.splice(question, 1);
    // console.log("Todo Removed.");
    question <= array.length
      ? array.splice(question, 1)
      : console.log("Let me do it again.");
  } else if (question === "quit") {
    console.log("OK, YOU QUIT THE APP.");
    break;
  } else {
    question = prompt("what would you like to do?");
    if (question === "list") {
      console.log("***********");
      for (let i = 0; i < array.length; i++) {
        console.log(`${i} : ${array[i]}`);
      }
      console.log("***********");
    }
  }
}

// for (let i = 0; i < input.length; i++) {
//   if (question === "new") {
//     question = prompt("Enter new todo.");
//     array.push(question);
//     console.log(`${question} added to do list.`);
//   } else if (question === "list") {
//     console.log(array);
//   } else if (question === "delete") {
//     question = prompt("what would you like to do delete to do?");
//     array.pop(question);
//   } else if (question === "quit") {
//     console.log("Bye~");
//   } else {
//     question = prompt("please");
//   }
// }
