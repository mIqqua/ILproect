
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");


let options = {
  fruits: [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
  ],
  animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
  countries: [
    "India",
    "Hungary",
    "Kyrgyzstan",
    "Switzerland",
    "Zimbabwe",
    "Dominica",
  ],
};


let winCount = 0;
let count = 0;

let chosenWord = "";


const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};


const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

 
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};


const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });


  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();


  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');


  userInputSection.innerHTML = displayItem;
};


const initializer = () => {
  winCount = 0;
  count = 0;
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";


  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    button.innerText = String.fromCharCode(i);

    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");

      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {

          if (char === button.innerText) {

            dashes[index].innerText = char;

            winCount += 1;

            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              
              blocker();
            }
          }
        });
      } else {
      
        count += 1;
     
        drawMan(count);
        
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
     
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  
  let { initialDrawing } = canvasCreator();
 
  initialDrawing();
};


const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;


  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };


  const initialDrawing = () => {
 
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
   
    drawLine(10, 130, 130, 130);
 
    drawLine(10, 10, 10, 131);
 
    drawLine(10, 10, 70, 10);
   
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};


const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};


newGameButton.addEventListener("click", initializer);
window.onload = initializer;









// Переменные и DOM-элементы
// const letterContainer = document.getElementById("letter-container");

// Получает контейнер для букв (кнопки от A до Z).
// const optionsContainer = document.getElementById("options-container");

// Получает контейнер для категорий (например, фрукты, животные, страны).
// const userInputSection = document.getElementById("user-input-section");

// Секция, где игрок видит слово с подчеркиваниями, заменяющими буквы.
// const newGameContainer = document.getElementById("new-game-container");

// Контейнер с кнопкой "Новая игра".
// const canvas = document.getElementById("canvas");

// <canvas> используется для отрисовки частей виселицы.
// const resultText = document.getElementById("result-text");

// Элемент, где отображается результат игры (победа или поражение).
// Логика игры
// Настройки игры
// options

// Категории слов, разделенные на массивы: фрукты, животные, страны.
// let winCount = 0;

// Счетчик угаданных букв.
// let count = 0;

// Счетчик ошибок, используется для отрисовки частей виселицы.
// let chosenWord = "";

// Слово, которое нужно угадать, выбирается случайным образом из выбранной категории.
// Отображение кнопок категорий
// javascript
// Copy code
// const displayOptions = () => {
//   optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
//   let buttonCon = document.createElement("div");
//   for (let value in options) {
//     buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
//   }
//   optionsContainer.appendChild(buttonCon);
// };
// Создает кнопки для категорий. При нажатии на кнопку запускается функция generateWord().
// Блокировка всех кнопок
// javascript
// Copy code
// const blocker = () => {
//   let optionsButtons = document.querySelectorAll(".options");
//   let letterButtons = document.querySelectorAll(".letters");

//   optionsButtons.forEach((button) => {
//     button.disabled = true;
//   });
//   letterButtons.forEach((button) => {
//     button.disabled.true;
//   });
//   newGameContainer.classList.remove("hide");
// };
// Блокирует все кнопки категорий и букв после завершения игры (победа или поражение).
// Отображает кнопку "Новая игра".
// Выбор случайного слова из категории
// javascript
// Copy code
// const generateWord = (optionValue) => {
//   let optionsButtons = document.querySelectorAll(".options");
//   optionsButtons.forEach((button) => {
//     if (button.innerText.toLowerCase() === optionValue) {
//       button.classList.add("active");
//     }
//     button.disabled = true;
//   });

//   letterContainer.classList.remove("hide");
//   userInputSection.innerText = "";

//   let optionArray = options[optionValue];
//   chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
//   chosenWord = chosenWord.toUpperCase();

//   let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
//   userInputSection.innerHTML = displayItem;
// };
// Выбирает случайное слово из выбранной категории и отображает его как последовательность подчеркиваний _.
// Инициализация игры
// javascript
// Copy code
// const initializer = () => {
//   winCount = 0;
//   count = 0;

//   userInputSection.innerHTML = "";
//   optionsContainer.innerHTML = "";
//   letterContainer.classList.add("hide");
//   newGameContainer.classList.add("hide");
//   letterContainer.innerHTML = "";

//   for (let i = 65; i < 91; i++) {
//     let button = document.createElement("button");
//     button.classList.add("letters");
//     button.innerText = String.fromCharCode(i);
//     button.addEventListener("click", () => {
//       let charArray = chosenWord.split("");
//       let dashes = document.getElementsByClassName("dashes");

//       if (charArray.includes(button.innerText)) {
//         charArray.forEach((char, index) => {
//           if (char === button.innerText) {
//             dashes[index].innerText = char;
//             winCount += 1;
//             if (winCount == charArray.length) {
//               resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
//               blocker();
//             }
//           }
//         });
//       } else {
//         count += 1;
//         drawMan(count);
//         if (count == 6) {
//           resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
//           blocker();
//         }
//       }
//       button.disabled = true;
//     });
//     letterContainer.append(button);
//   }

//   displayOptions();
//   let { initialDrawing } = canvasCreator();
//   initialDrawing();
// };
// Сбрасывает все параметры игры.
// Создает кнопки для букв (A-Z).
// Отображает категории.
// Отрисовывает начальную рамку виселицы на <canvas>.
// Работа с <canvas>
// Создание виселицы
// javascript
// Copy code
// const canvasCreator = () => {
//   let context = canvas.getContext("2d");
//   context.beginPath();
//   context.strokeStyle = "#000";
//   context.lineWidth = 2;

//   const drawLine = (fromX, fromY, toX, toY) => {
//     context.moveTo(fromX, fromY);
//     context.lineTo(toX, toY);
//     context.stroke();
//   };

//   const head = () => {
//     context.beginPath();
//     context.arc(70, 30, 10, 0, Math.PI * 2, true);
//     context.stroke();
//   };

//   const body = () => {
//     drawLine(70, 40, 70, 80);
//   };

//   const leftArm = () => {
//     drawLine(70, 50, 50, 70);
//   };

//   const rightArm = () => {
//     drawLine(70, 50, 90, 70);
//   };

//   const leftLeg = () => {
//     drawLine(70, 80, 50, 110);
//   };

//   const rightLeg = () => {
//     drawLine(70, 80, 90, 110);
//   };

//   const initialDrawing = () => {
//     context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//     drawLine(10, 130, 130, 130);
//     drawLine(10, 10, 10, 131);
//     drawLine(10, 10, 70, 10);
//     drawLine(70, 10, 70, 20);
//   };

//   return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
// };
// Отвечает за создание рамки виселицы, головы, тела, рук и ног.
// Использует drawLine для рисования линий и arc для головы.
// Рисование частей виселицы
// javascript
// Copy code
// const drawMan = (count) => {
//   let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
//   switch (count) {
//     case 1:
//       head();
//       break;
//     case 2:
//       body();
//       break;
//     case 3:
//       leftArm();
//       break;
//     case 4:
//       rightArm();
//       break;
//     case 5:
//       leftLeg();
//       break;
//     case 6:
//       rightLeg();
//       break;
//     default:
//       break;
//   }
// };
// Рисует части тела на <canvas> в зависимости от количества ошибок.
// Новая игра
// javascript
// Copy code
// newGameButton.addEventListener("click", initializer);
// window.onload = initializer;
// Игра автоматически запускается при загрузке страницы.
// Кнопка "Новая игра" сбрасывает параметры игры и перезапускает её.