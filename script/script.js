// favicon
var faviconRoute = '/img/';
var faviconNames = ['f2.ico', 'f1.ico', 'f0.ico'];

var idx = 0;

setInterval(func, 600);

function func() {
  document.querySelector("#favicon").setAttribute('href', faviconRoute + faviconNames[idx++]);
  idx %= faviconNames.length;
}


const mouseCursor = document.getElementById('mouse_cursor');

document.addEventListener('mousemove', (e) => {
  mouseCursor.style.left = e.clientX + 'px';
  mouseCursor.style.top = e.clientY + 'px';

  const element = document.elementFromPoint(e.clientX, e.clientY);

  const greenAreas = [
    '.identity_container',
    '.about_container',
    '.skill_container',
    '.plan_container',
    '.contact_container',
    '.fixed_nav',
    '.modal'
  ];

  const whiteAreas = [
    '.main_container',
    '.ani_text_container',
    '.archive_container'
  ];

  if (greenAreas.some(cls => element.closest(cls))) {
    mouseCursor.style.backgroundColor = '#85FF3A';
  } else if (whiteAreas.some(cls => element.closest(cls))) {
    mouseCursor.style.backgroundColor = 'white';
  } else {
    mouseCursor.style.backgroundColor = 'gray';
  }


  // 네모로 바꾸고 싶은 클래스들
  const squareCursorZones = ['.fixed_menu_box>li', '.menu_box', '.bottom_text_box>a', '.scroll_button', '.socials', '.footer_menu', '.footer_socials', '.footer_left_box>a', 'button', '.btn'];

  // 지정 클래스에 마우스 호버 시 커서 네모
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


// 우측 메뉴탭
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".fixed_nav .menu_btn");
const nav = document.querySelector(".fixed_nav");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  if (current === "home" || current === "identity" || current === "contact") {
    nav.style.opacity = "0";
    nav.style.pointerEvents = "none";
  } else {
    nav.style.opacity = "1";
    nav.style.pointerEvents = "auto";
  }

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
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
const hero = document.querySelector('.main_container');
let currentY = 0;
let targetY = 0;
const ease = 0.05;

function animate() {
  targetY = window.scrollY * 0.8;
  currentY += (targetY - currentY) * ease;

  hero.style.transform = `translateY(-${currentY}px)`;

  requestAnimationFrame(animate);
}

animate();


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

    await typeLine(line, div);

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

  if (rectT < winH && rectB > 0) {
    window.removeEventListener('scroll', checkScroll);
    typeAllLines();
  }
}

window.addEventListener('scroll', checkScroll);


// 모달
const siteBtns = document.querySelectorAll('.site_btn');
const pdfBtns = document.querySelectorAll('.pdf_btn');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalMessage = document.getElementById('modalMessage');

function openModal(message) {
  modalMessage.textContent = message;
  modal.style.display = 'flex';
}

// 사이트
siteBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const href = btn.getAttribute('href');
    if (!href || href === "#") {
      e.preventDefault();
      openModal("사이트가 없는 프로젝트입니다. PDF를 확인해주세요.");
    }
  });
});

// PDF
pdfBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const href = btn.getAttribute('href');
    if (!href || href === "#") {
      e.preventDefault();
      openModal("PDF 파일이 준비되지 않았습니다.");
    }
  });
});

// 모달 닫기
modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

// 배경 클릭 시 닫기
modal.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});