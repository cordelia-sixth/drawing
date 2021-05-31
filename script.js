// 要素を取得
const canvasElm = document.getElementById('canvas');
const displayElm = document.getElementById('display');

// コンテキストを取得
const conavasCtx = canvasElm.getContext('2d');
const displayCtx = displayElm.getContext('2d');

// 下地のcanvasサイズ
const canvasOffset = canvasElm.getBoundingClientRect();
const offsetX = canvasOffset.left;
const offsetY = canvasOffset.top;
const canvasX = canvasElm.clientWidth;
const canvasY = canvasElm.clientHeight;

// ドラッグ開始座標
let startX = 0;
let startY = 0;

// 現在のマウス座標
let currentX = 0;
let currentY = 0;

// 矩形の大きさ
let width = 0;
let height = 0;

// ドラッグ判定フラグ
let isDown = false;

const handleMounseDown = (e) => {
  e.preventDefault();
  e.stopPropagation();

  console.log('mouse down');

  // クリックした座標
  startX = parseInt(e.clientX - offsetX);
  startY = parseInt(e.clientY - offsetY);

  isDown = true;
}

const handleMouseMove = (e) => {

  if (!isDown) return;
  
  // 現在のマウス座標を取得
  currentX = parseInt(e.clientX - offsetX);
  currentY = parseInt(e.clientY - offsetY);

  // 直前に描画した図形を消去
  conavasCtx.clearRect(0, 0, canvasElm.width, canvasElm.height);

  // 矩形の長さ
  width = currentX - startX;
  height = currentY - startY;

  // 矩形を描画する
  conavasCtx.strokeRect(startX, startY, width, height);
}

const handleMounseUp = () => {
  conavasCtx.clearRect(0, 0, canvasElm.width, canvasElm.height);
  displayCtx.strokeRect(startX, startY, width, height);
  isDown = false;
}

canvasElm.addEventListener('mousedown', handleMounseDown, false);
canvasElm.addEventListener('mousemove', handleMouseMove, false);
canvasElm.addEventListener('mouseup', handleMounseUp, false);