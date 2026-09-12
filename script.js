const memoInput = document.getElementById('memoInput');
const addBtn = document.getElementById('addBtn');
const memoList = document.getElementById('memoList');

// 메모 추가 함수
function addMemo() {
  const text = memoInput.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
  li.textContent = text;
  memoList.appendChild(li);

  memoInput.value = '';
}

// 버튼 클릭 및 엔터 키 입력 이벤트
addBtn.addEventListener('click', addMemo);
memoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addMemo();
});
