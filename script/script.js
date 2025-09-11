const mouseCursor = document.getElementById('mouse_cursor');

// 네모로 바꾸고 싶은 클래스들
const squareCursorZones = ['.menu_box', '.bottom_text_box>a', '.scroll_button', '.socials', '.footer_menu', '.footer_socials', '.footer_left_box>a', 'button'];

document.addEventListener('mousemove', (e) => {
  mouseCursor.style.left = e.clientX + 'px';
  mouseCursor.style.top = e.clientY + 'px';

  const element = document.elementFromPoint(e.clientX, e.clientY);

  // 커서 색상 변경
  if (element.closest('.main_container')) {
    mouseCursor.style.backgroundColor = 'white';
  } else if (element.closest('.identity_container')) {
    mouseCursor.style.backgroundColor = '#85FF3A';
  } else if (element.closest('.ani_text_container')) {
    mouseCursor.style.backgroundColor = 'white';
  } else if (element.closest('.about_container')) {
    mouseCursor.style.backgroundColor = '#85FF3A';
  } else if (element.closest('.skill_container')) {
    mouseCursor.style.backgroundColor = '#85FF3A';
  } else if (element.closest('.archive_container')) {
    mouseCursor.style.backgroundColor = 'white';
  } else if (element.closest('.plan_container')) {
    mouseCursor.style.backgroundColor = '#85FF3A';
  } else if (element.closest('.contact_container')) {
    mouseCursor.style.backgroundColor = '#85FF3A';
  } else {
    mouseCursor.style.backgroundColor = 'gray';
  }

  // 지정 클래스에 마우스 올라간 경우 커서 네모로
  const isInSquareZone = squareCursorZones.some(className => element.closest(className));
  mouseCursor.style.borderRadius = isInSquareZone ? '0' : '50%';
});

// 클릭 시 커서 크기 키우기
document.addEventListener('mousedown', () => {
  mouseCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
});

document.addEventListener('mouseup', () => {
  mouseCursor.style.transform = 'translate(-50%, -50%) scale(1)';
});



// 헤더 상단 현재 시간
const time = document.getElementById("time");
function getTime() {
  const date = new Date();
  const hour = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  time.innerText = `${hour} : ${minutes} : ${second}`;
}
getTime();
setInterval(getTime, 1000);

// 페럴렉스
const hero = document.querySelector('.main_container'); // hero 섹션 가져오기
let currentY = 0; // 현재 위치
let targetY = 0;  // 목표 위치
const ease = 0.05; // 부드럽게 이동할 비율

function animate() {
  targetY = window.scrollY * 0.8; // 스크롤의 절반만 움직이게 만듦
  currentY += (targetY - currentY) * ease; // 부드럽게 이동 (가속도처럼)

  hero.style.transform = `translateY(-${currentY}px)`; // 화면 위로 살짝 이동

  requestAnimationFrame(animate); // 계속해서 부드럽게 반복
}

animate(); // 실행 시작

// plan 타이핑
const lines = [
  '<span class="deepblue">const</span> <span class="blue">publisher</span> <span class="white">=</span> <span class="yellow">{</span>',
  '    <span class="lightblue">currentRole:</span> <span class="orange ko">"웹을 디자인하고 구조화하는 퍼블리셔"</span><span class="white">,</span>',
  '    <span class="lightblue">growthPath:</span> <span class="orange ko">"프론트엔드 개발까지 배우며 확장할 것"</span><span class="white">,</span>',
  '    <span class="lightblue">focus:</span> <span class="pink">{</span>',
  '         <span class="lightblue">detail:</span> <span class="deepblue">true</span><span class="white">,</span>',
  '         <span class="lightblue">userExperience:</span> <span class="deepblue">true</span>',
  '    <span class="pink">}</span><span class="white">,</span>',
  '    <span class="lightblue">goal:</span> <span class="orange ko">"기술을 넘어서, 경험을 설계하는 사람으로 성장하는 것"</span>',
  '  <span class="yellow">}</span><span class="white">;</span>',
  '',
  '  <span class="mint">Object</span><span class="white">.</span><span class="lemon">defineProperty</span><span class="yellow">(</span><span class="blue">publisher</span><span class="white">,</span> <span class="orange">\'goal\'</span><span class="white">,</span> <span class="pink">{</span>',
  '    <span class="lightblue">writable:</span> <span class="deepblue">false</span><span class="white">,</span>',
  '    <span class="lightblue">configurable:</span> <span class="deepblue">false</span><span class="white">,</span>',
  '    <span class="lightblue">enumerable:</span> <span class="deepblue">true</span>',
  '  <span class="pink">}</span><span class="yellow">)</span><span class="white">;</span>'
];

const container = document.getElementById('typewriter_container');
const cursor = document.getElementById('cursor');

async function typeLine(text, parent) {
  const temp = document.createElement('div');
  temp.innerHTML = text;

  for (const node of temp.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      await typeChars(node.textContent, parent);
    } else {
      const span = document.createElement(node.nodeName);
      span.className = node.className;
      parent.appendChild(span);
      await typeChars(node.textContent, span);
    }
  }
}

async function typeChars(text, parent) {
  let textNode = document.createTextNode('');
  parent.appendChild(textNode);

  // 커서를 먼저 parent 안에 넣음
  parent.appendChild(cursor);

  for (const char of text) {
    textNode.textContent += char;
    await new Promise(r => setTimeout(r, 35));
  }
}

async function typeAllLines() {
  for (const line of lines) {
    const div = document.createElement('div');
    div.className = 'line';
    container.appendChild(div);

    // typeChars 내부에서 커서가 이 줄로 append됨
    await typeLine(line, div);

    // 줄 타이핑 끝났으면 커서를 이 div 바깥으로 빼기
    container.appendChild(cursor);

    await new Promise(r => setTimeout(r, 150));
  }
}

// window.onload = typeAllLines;

function checkScroll() {
  const winH = window.innerHeight;
  const planContainer = document.querySelector('.plan_container');
  const rectT = planContainer.getBoundingClientRect().top;
  const rectB = planContainer.getBoundingClientRect().bottom;

  // plan_container가 뷰포트 안에 들어왔을 때
  if (rectT < winH && rectB > 0) {
    window.removeEventListener('scroll', checkScroll);
    typeAllLines();
  }
}

window.addEventListener('scroll', checkScroll);


