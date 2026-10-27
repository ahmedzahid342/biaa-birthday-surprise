const screens = [...document.querySelectorAll('.screen')];

const questions = [
  {
    title: 'Ready for a little surprise?',
    hint: 'Be honest, Biaa…',
    answers: ['Absolutely! ✨', 'I was born ready 💅', 'Okay, you have my attention 👀'],
    reply: 'Hehe, that’s the spirit! 💜'
  },
  {
    title: 'What makes a day feel special?',
    hint: 'There are no wrong answers here.',
    answers: ['Little thoughtful gestures 💌', 'Laughing until my cheeks hurt 🌸', 'A surprise I never expected 🎁'],
    reply: 'That sounds like a little bit of magic. ✨'
  },
  {
    title: 'One last question, birthday girl…',
    hint: 'Are you ready for your birthday wish?',
    answers: ['Open my surprise! 💖', 'I’m ready, let’s go! 🎂', 'YES YES YES!! 🥹'],
    reply: 'Then this little surprise is all yours, Biaa! 💗'
  }
];

const memories = [
  { title: 'A little moment, a lot of meaning', text: 'Some moments are beautiful on their own. Some become even more special because they remind me of you.' },
  { title: 'Your smile, your magic', text: 'I hope life gives you a million reasons to smile — and that you never forget how special your smile is.' },
  { title: 'If I could make one wish', text: 'I would wish for your heart to feel light, your dreams to feel close, and your days to be kinder than you imagined.' },
  { title: 'A page in our story', text: 'Every beautiful story is made of little moments. Here is to more laughter, more memories, and more reasons to be grateful.' },
  { title: 'A birthday promise', text: 'No matter how quickly time moves, I hope you always make room for wonder, kindness, and the things that make you feel alive.' }
];

let questionIndex = 0;
let photoIndex = 0;

function show(id) {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion() {
  const q = questions[questionIndex];
  document.getElementById('question-title').textContent = q.title;
  document.getElementById('question-hint').textContent = q.hint;
  document.getElementById('counter').textContent = `QUESTION 0${questionIndex + 1} / 03`;
  document.getElementById('progress').style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  document.getElementById('feedback').textContent = '';

  const box = document.getElementById('answers');
  box.innerHTML = '';

  q.answers.forEach(answer => {
    const button = document.createElement('button');
    button.className = 'answer';
    button.textContent = answer;
    button.addEventListener('click', () => {
      document.getElementById('feedback').textContent = q.reply;
      [...box.children].forEach(item => item.disabled = true);
      setTimeout(() => {
        questionIndex++;
        if (questionIndex < questions.length) {
          renderQuestion();
        } else {
          show('memories');
          renderMemory(0);
        }
      }, 850);
    });
    box.appendChild(button);
  });
}

function renderMemory(index) {
  photoIndex = (index + memories.length) % memories.length;
  const data = memories[photoIndex];
  const img = document.getElementById('memory-photo');
  const placeholder = document.getElementById('photo-placeholder');

  placeholder.classList.remove('hidden');
  img.classList.remove('loaded');
  img.onload = () => {
    img.classList.add('loaded');
    placeholder.classList.add('hidden');
  };
  img.onerror = () => {
    img.classList.remove('loaded');
    placeholder.classList.remove('hidden');
  };
  img.alt = `Biaa memory photo ${photoIndex + 1}`;
  img.src = `photos/photo${photoIndex + 1}.jpg`;

  document.getElementById('photo-count').textContent = `MEMORY 0${photoIndex + 1} / 05`;
  document.getElementById('memory-title').textContent = data.title;
  document.getElementById('memory-text').textContent = data.text;

  const dots = document.getElementById('photo-dots');
  dots.innerHTML = '';
  for (let i = 0; i < memories.length; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === photoIndex ? ' active' : '');
    dot.setAttribute('aria-label', `Show memory ${i + 1}`);
    dot.addEventListener('click', () => renderMemory(i));
    dots.appendChild(dot);
  }
}

document.getElementById('start').addEventListener('click', () => {
  questionIndex = 0;
  renderQuestion();
  show('questions');
});
document.getElementById('previous-photo').addEventListener('click', () => renderMemory(photoIndex - 1));
document.getElementById('next-photo').addEventListener('click', () => renderMemory(photoIndex + 1));
document.getElementById('celebrate').addEventListener('click', () => {
  show('birthday');
  launchConfetti();
});
document.getElementById('replay').addEventListener('click', () => {
  questionIndex = 0;
  show('welcome');
});

function launchConfetti() {
  const holder = document.getElementById('confetti');
  holder.innerHTML = '';
  const colors = ['#ff9bd2', '#c5aaff', '#f6d6a8', '#fff', '#d88cff'];
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement('i');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${3 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random() * 1.5}s`;
    holder.appendChild(piece);
  }
  setTimeout(() => holder.innerHTML = '', 8000);
}

renderMemory(0);
