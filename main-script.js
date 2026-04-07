// ======= Simple Personalization =======
const recipientEl = document.getElementById('recipient');
const senderEl    = document.getElementById('sender');
const messageEl   = document.getElementById('message');


// Optional: set these before sending
let recipientName = 'Esteemed Brother Vincent!';
let senderName    = 'Bro. Timothy';
let customMessage = messageEl.textContent.trim();

function applyText() {
  recipientEl.textContent = recipientName;
  senderEl.textContent = senderName;
  messageEl.textContent = customMessage;
}

applyText();


// Add date badge text
const dateBadge = document.getElementById('dateBadge');
const today = new Date();
const opts = { year:'numeric', month:'long', day:'numeric' };
dateBadge.textContent = '🎂 ' + today.toLocaleDateString(undefined, opts);


// ======= Fireworks =======
function fireworkAt(x, y) {
  const f = document.createElement('div');
  f.className = 'firework';
  f.style.left = x + 'px';
  f.style.top  = y + 'px';
  document.body.appendChild(f);
  setTimeout(()=> f.remove(), 950);
}

function burst(n=3) {
  const {innerWidth:w, innerHeight:h} = window;
  for(let i=0;i<n;i++){
    const x = Math.random()*w*0.9 + w*0.05;
    const y = Math.random()*h*0.5 + h*0.1;
    setTimeout(()=> fireworkAt(x,y), i*120);
  }
}

document.getElementById('burstBtn').addEventListener('click', ()=> burst(5));
document.addEventListener('click', (e)=>{
  
  // ignore button clicks (handled above) but allow background taps
  const tag = (e.target.tagName||'').toLowerCase();
  if(['button','a','input','textarea','label','svg','path'].includes(tag)) return;
  fireworkAt(e.clientX, e.clientY);
});



// ======= Balloons =======
const balloonsWrap = document.getElementById('balloons');
const colors = [
  '#ff9a9e', 
  '#fad0c4', 
  '#a18cd1', 
  '#fbc2eb', 
  '#84fab0', 
  '#8fd3f4', 
  '#ffd166', 
  '#06d6a0', 
  '#ef476f', 
  '#118ab2'
];

function createBalloon() {
  const b = document.createElement('div');
  b.className = 'balloon';
  const c = colors[Math.floor(Math.random()*colors.length)];
  b.style.background = c;
  b.style.left = (Math.random()*100) + 'vw';
  const dur = 9 + Math.random()*6; // 9-15s
  b.style.animationDuration = dur + 's';
  b.style.animationDelay = (Math.random()*3) + 's';
  b.style.transform = `translateY(${Math.random()*40}vh)`;

  const s = document.createElement('div');
  s.className = 'string';
  b.appendChild(s);

  balloonsWrap.appendChild(b);
  setTimeout(()=> b.remove(), (dur+4)*1000);
}

function releaseBalloons(count=18){
  for(let i=0;i<count;i++) setTimeout(createBalloon, i*250);
}

document.getElementById('balloonBtn').addEventListener('click', ()=> releaseBalloons(24));



// Auto trigger a gentle intro
setTimeout(()=>{ releaseBalloons(14); burst(3); }, 800);


// ======= Share helper (copy to clipboard) =======
// Long-press to copy the message text (useful for WhatsApp)
let pressTimer;
messageEl.addEventListener('mousedown', ()=> { pressTimer = setTimeout(copyMessage, 500); });
messageEl.addEventListener('mouseup', ()=> clearTimeout(pressTimer));
messageEl.addEventListener('mouseleave', ()=> clearTimeout(pressTimer));

function copyMessage() {
  const text = `Happy Birthday, ${recipientName}!\n\n${customMessage}\n\n— ${senderName}`;
  navigator.clipboard?.writeText(text).then(()=>{
    const old = messageEl.textContent;
    messageEl.textContent = '✅ Copied! Paste this into WhatsApp.';
    setTimeout(()=> messageEl.textContent = old, 1200);
  });
}

