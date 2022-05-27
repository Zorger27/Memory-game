const cards = document.querySelectorAll('.memory-card'); // создаём массив карточек
// Проверяем наш массив карточек
// console.log('Our cards', cards);

let hasFlippedCard = false; // есть ли у нас перевёрнутая карточка или нет
let boardLocked = false; // чтобы не было возможности кликать по другим карточкам во время Timeout
let firstCard, secondCard // сохраняем DOM-элементы для дальнейшего сравнения

// Основная функция, которая по клику ищет parentElement и сравниваем его
const flipCard = e => {
    if (boardLocked) return; // если доска закрыта для выполнения действий, то функция прекращается

    const target = e.target.parentElement;

    if (target === firstCard) return; // Чтобы нельзя было кликнуть дважды по одной и той же карточке и получить успешное сравнение!

    target.classList.add("flip"); // добавляем по клику нашей карточке class="flip" в css

    if (!hasFlippedCard){
        // Проверяем, это первая карточка для сравнения или вторая.
        hasFlippedCard = true;
        firstCard = target;
    } else {
        // Проверяем, это ли вторая карточка для сравнения.
        hasFlippedCard = false;
        secondCard = target;
        // Функция проверки на схожесть по карточкам.
        checkForMatch();
    }
};

// Функция проверки на схожесть по карточкам.
const checkForMatch = () => {
    const isEqual = firstCard.dataset.fruit === secondCard.dataset.fruit;

    // if (firstCard.dataset.fruit === secondCard.dataset.fruit){
    //     disableCards();
    // } else {
    //     unFlipCards();
    // }
    // Делаем рефакторинг с использованием тернарного оператора

    isEqual ? disableCards() : unFlipCards();
}

// Карточки совпали => перестают "играть".
const disableCards = () => {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
};

// Карточки не совпали => переворачиваются рубашкой вверх и "играют" далее.
const unFlipCards = () => {
    boardLocked = true; // чтобы не было возможности кликать по другим карточкам во время Timeout

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);
};

// Обновляем доску с карточками для продолжения игры!
const resetBoard = () => {
    // Способ № 1. Именно в этом случае SPREAD-оператор излишен => очень тяжел!
    // [hasFlippedCard, boardLocked] = [false, false];
    // [firstCard, secondCard] = [null, null];

    // Способ № 2. Этот способ (двойное присваивание) проще в этом случае!
    hasFlippedCard = boardLocked = false;
    firstCard = secondCard = null;
};

cards.forEach(card => {
    // Добавляем Event Listener к каждой карточке по клику
    card.addEventListener('click', flipCard)

    // const randomIndex = Math.floor(Math.random() * cards.length);
    // card.style.order = randomIndex;
    card.style.order = Math.floor(Math.random() * cards.length); // каждый раз создаётся новый layout (карточки в разных местах на доске)
});