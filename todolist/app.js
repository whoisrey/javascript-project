let input = prompt("명령어를 입력하시오.");
const todo = [];

while (input !== "quit" && input !== "q") {
  if (input === "list") {
    console.log("*************");
    for (let i = 0; i < todo.length; i++) {
      console.log(`${i} : ${todo[i]}`);
    }
    console.log("*************");
  } else if (input === "new") {
    const add = prompt("추가할 일을 입력하시오.");
    todo.push(add);
    console.log(`${add}를 추가했습니다.`);
  } else if (input === "delete") {
    const index = parseInt(prompt("삭제할 일의 번호를 입력하시오."));
    if (!Number.isNaN(index) && index <= parseInt(todo.length - 1)) {
      const deleted = todo.splice(index, 1);
      console.log(`${index}번째 할 일을 삭제했습니다.`);
    } else {
      console.log("올바른 숫자를 입력하시오.");
    }
  }
  input = prompt("명령어를 입력하시오.");
}

console.log("프로그램을 종료하겠습니다.");

// let input = prompt("what would you like to do?");
// const array = [];

// while (input !== "quit" && input !== "q") {
//   input = prompt("what would you like to do?");
//   if (input === "new") {
//     input = prompt("Enter new todo.");
//     array.push(input);
//     console.log(`${input} added to do list.`);
//   } else if (input === "delete") {
//     const index = parseInt(prompt("Enter index of todo to delete."));
//     if (index <= array.length) {
//       const deleted = array.splice(input, 1);
//       console.log(`${deleted} removed.`);
//     } else {
//       console.log("Do it again..");
//     }
//   } else if (input === "list") {
//     console.log("************");
//     for (let i = 0; i < array.length; i++) {
//       console.log(`${i} : ${array[i]}`);
//     }
//     console.log("************");
//   }
// }

// console.log("OK, YOU QUIT THIS APP.");
