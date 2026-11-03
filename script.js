const scrollButtons = document.querySelectorAll('[data-scroll]');
scrollButtons.forEach(button => button.addEventListener('click', () => {
  document.querySelector(button.dataset.scroll)?.scrollIntoView({behavior:'smooth'});
}));

// Локальный предпросмотр фотографий
document.querySelectorAll('.photo-card input').forEach(input => {
  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (!file) return;
    const card = input.closest('.photo-card');
    let image = card.querySelector('img');
    if (!image) {
      image = document.createElement('img');
      card.appendChild(image);
    }
    image.src = URL.createObjectURL(file);
    card.querySelector('.photo-placeholder').textContent = 'ФОТО ДОБАВЛЕНО';
  });
});

// Шуточный расклад таро
const tarotMeanings = {
  love: 'ЗВЕЗДА. Впереди - период повышенного внимания. Вероятность встретить интересного человека высока, но мы рекомендуем проверять не только знак зодиака, но и поступки. Кандидаты с разницей в возрасте на двадцать лет картой не одобрены.\n\nМИНИМАЛЬНЫЕ ТРЕБОВАНИЯ.\nВозраст: желательно без разницы в +20 лет. Уровень адекватности: выше среднего. Умение писать первым и не исчезать: обязательно.\n\nПРОВЕРКА КАНДИДАТА.\nНе считает уважение подвигом. Не путает отношения с квестом «угадай, что я имел в виду». Слово «потом» умеет превращать в конкретный план.\n\nАВТОМАТИЧЕСКИЙ ОТКАЗ.\n«Я не такой, как все», «бывшая просто подруга», «телефон сел на три дня». Спасибо, следующий!',
  strength: 'СИЛА. Год внутреннего апгрейда. В зале - новые рекорды, в жизни - твёрдые границы, в спорных ситуациях - спокойное «нет». Карта советует не тратить энергию на тех, кто не прошёл даже базовую проверку адекватности.',
  luck: 'СОЛНЦЕ. Деньги, поездки, хорошие новости и поводы наряжаться без особой причины. Вселенная обещает удачные совпадения. Особенно если не игнорировать здравый смысл и собственную интуицию.'
};
document.querySelectorAll('.tarot-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.tarot-card').forEach(item => item.classList.remove('chosen'));
    card.classList.add('chosen');
    document.getElementById('tarotResult').textContent = tarotMeanings[card.dataset.card];
  });
});

// Интерактивный тест
const quiz = [
  {q:'Что является самым ценным приобретением за 22 года?',a:['Новая спортивная форма','Люди, воспоминания и собственный опыт','Абонемент без ограничений'],correct:1,ok:'Верно. Это то, что с годами становится только дороже.'},
  {q:'Какой навык особенно пригодится в новом году жизни?',a:['Умение отличать достойных людей от сомнительных','Умение делать вид, что не заметила сообщение','Способность отменять тренировку за пять минут'],correct:0,ok:'Совершенно верно. Интуиция и стандарты должны работать без выходных.'},
  {q:'Что Викуша и Настюша официально желают Полине?',a:['Стабильности, радости и ярких событий','Три загадочных бывших','Мужчину с разницей в возрасте двадцать лет'],correct:0,ok:'Именно так. Пусть сбывается лучшее, а сомнительное проходит мимо.'}
];
let quizIndex = 0;
let answered = false;
const questionEl = document.getElementById('quizQuestion');
const answersEl = document.getElementById('quizAnswers');
const feedbackEl = document.getElementById('quizFeedback');
const nextEl = document.getElementById('quizNext');
function renderQuestion(){
  const item = quiz[quizIndex];
  document.getElementById('quizMeta').textContent = `ВОПРОС ${String(quizIndex+1).padStart(2,'0')} / 03`;
  document.getElementById('quizTrack').style.width = `${quizIndex/quiz.length*100}%`;
  questionEl.textContent = item.q;
  feedbackEl.textContent = '';
  nextEl.hidden = true;
  answered = false;
  answersEl.innerHTML = '';
  item.a.forEach((answer,index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.addEventListener('click', () => {
      if(answered) return;
      answered = true;
      [...answersEl.children].forEach((el,i) => {
        el.disabled = true;
        if(i === item.correct) el.style.borderColor = '#91403f';
      });
      feedbackEl.textContent = index === item.correct ? item.ok : 'Ответ принят, но комиссия соседок рекомендует ещё раз подумать. Правильный вариант подсвечен.';
      nextEl.hidden = false;
      nextEl.textContent = quizIndex === quiz.length-1 ? 'ЗАВЕРШИТЬ ПРОВЕРКУ' : 'СЛЕДУЮЩИЙ ВОПРОС →';
    });
    answersEl.appendChild(button);
  });
}
nextEl.addEventListener('click', () => {
  quizIndex++;
  if(quizIndex >= quiz.length){
    document.querySelector('.quiz-box').hidden = true;
    document.getElementById('quizFinish').hidden = false;
    return;
  }
  renderQuestion();
});
renderQuestion();

// Финальное письмо
document.getElementById('letterTrigger').addEventListener('click', () => {
  const letter = document.getElementById('letterContent');
  letter.hidden = !letter.hidden;
  document.getElementById('letterTrigger').querySelector('b').textContent = letter.hidden ? 'ОТКРЫТЬ ПИСЬМО' : 'ЗАКРЫТЬ ПИСЬМО';
});
