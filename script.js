const memoInput = document.getElementById('memoInput');
const addBtn = document.getElementById('addBtn');
const memoList = document.getElementById('memoList');

function addMemo() {
  const text = memoInput.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
  li.textContent = text;

  const deleteBtn = document.createElement('deleteButton');
  deleteBtn.textContent = 'X';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(deleteBtn);
  memoList.appendChild(li);

  memoInput.value = '';
}

addBtn.addEventListener('click', addMemo);
memoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addMemo();
});
