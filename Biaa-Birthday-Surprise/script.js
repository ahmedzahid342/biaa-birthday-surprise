const screens=[...document.querySelectorAll('.screen')];
const questions=[
 {title:'Ready for a little surprise?',hint:'Be honest, Biaa…',answers:['Absolutely! ✨','I was born ready 💅','Okay, you have my attention 👀'],reply:'Hehe, that’s the spirit! 💜'},
 {title:'What makes a day feel special?',hint:'There are no wrong answers here.',answers:['Little thoughtful gestures 💌','Laughing until my cheeks hurt 🌸','A surprise I never expected 🎁'],reply:'That sounds like a little bit of magic. ✨'},
 {title:'One last question, birthday girl…',hint:'Are you ready for your birthday wish?',answers:['Open my surprise! 💖','I’m ready, let’s go! 🎂','YES YES YES!! 🥹'],reply:'Then this little surprise is all yours, Biaa! 💗'}
];
const memories=[
 {title:'A little moment, a lot of meaning',text:'Some moments are beautiful on their own. Some become even more special because they remind me of you.'},
 {title:'Your smile, your magic',text:'I hope life gives you a million reasons to smile — and that you never forget how special your smile is.'},
 {title:'If I could make one wish',text:'I would wish for your heart to feel light, your dreams to feel close, and your days to be kinder than you imagined.'},
 {title:'A page in our story',text:'Every beautiful story is made of little moments. Here is to more laughter, more memories, and more reasons to be grateful.'},
 {title:'A birthday promise',text:'No matter how quickly time moves, I hope you always make room for wonder, kindness, and the things that make you feel alive.'}
];
let questionIndex=0, photoIndex=0;
function show(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'});}
function renderQuestion(){
 const q=questions[questionIndex];document.getElementById('question-title').textContent=q.title;document.getElementById('question-hint').textContent=q.hint;
 document.getElementById('counter').textContent=`QUESTION 0${questionIndex+1} / 03`;document.getElementById('progress').style.width=`${((questionIndex+1)/questions.length)*100}%`;document.getElementById('feedback').textContent='';
 const box=document.getElementById('answers');box.innerHTML='';
 q.answers.forEach(answer=>{const b=document.createElement('button');b.className='answer';b.textContent=answer;b.addEventListener('click',()=>{document.getElementById('feedback').textContent=q.reply;[...box.children].forEach(x=>x.disabled=true);setTimeout(()=>{questionIndex++;if(questionIndex<questions.length)renderQuestion();else{show('memories');renderMemory(0);}},850);});box.appendChild(b);});
}
function renderMemory(index, direction=1){
 photoIndex=(index+memories.length)%memories.length;const data=memories[photoIndex],img=document.getElementById('memory-photo'),placeholder=document.getElementById('photo-placeholder');
 img.classList.remove('loaded');img.alt=`Biaa memory photo ${photoIndex+1}`;img.src=`photos/photo${photoIndex+1}.jpg`;
 document.getElementById('photo-count').textContent=`MEMORY 0${photoIndex+1} / 05`;document.getElementById('memory-title').textContent=data.title;document.getElementById('memory-text').textContent=data.text;
 const dots=document.getElementById('photo-dots');dots.innerHTML='';
 for(let i=0;i<5;i++){const d=document.createElement('button');d.className='dot'+(i===photoIndex?' active':'');d.setAttribute('aria-label',`Show memory ${i+1}`);d.addEventListener('click',()=>renderMemory(i,i>photoIndex?1:-1));dots.appendChild(d);}
 placeholder.classList.remove('hidden');
 img.onload=()=>{img.classList.add('loaded');placeholder.classList.add('hidden');};
 img.onerror=()=>{img.classList.remove('loaded');placeholder.classList.remove('hidden');};
}
document.getElementById('start').addEventListener('click',()=>{questionIndex=0;renderQuestion();show('questions');});
document.getElementById('previous-photo').addEventListener('click',()=>renderMemory(photoIndex-1,-1));
document.getElementById('next-photo').addEventListener('click',()=>renderMemory(photoIndex+1,1));
document.getElementById('celebrate').addEventListener('click',()=>{show('birthday');launchConfetti();});
document.getElementById('replay').addEventListener('click',()=>{document.getElementById('birthday-song').pause();document.getElementById('music-toggle').textContent='Play music ♫';questionIndex=0;show('welcome');});
function launchConfetti(){const holder=document.getElementById('confetti');holder.innerHTML='';const colors=['#ff9bd2','#c5aaff','#f6d6a8','#fff','#d88cff'];for(let i=0;i<90;i++){const p=document.createElement('i');p.className='confetti-piece';p.style.left=`${Math.random()*100}%`;p.style.background=colors[i%colors.length];p.style.animationDuration=`${3+Math.random()*4}s`;p.style.animationDelay=`${Math.random()*1.5}s`;holder.appendChild(p);}setTimeout(()=>holder.innerHTML='',8000);}
const song=document.getElementById('birthday-song'),musicButton=document.getElementById('music-toggle');
musicButton.addEventListener('click',async()=>{if(song.paused){try{await song.play();musicButton.textContent='Pause music ♫';}catch(e){musicButton.textContent='Add music.mp3 first';}}else{song.pause();musicButton.textContent='Play music ♫';}});
renderMemory(0);
