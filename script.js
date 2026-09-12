const memoInput = document.getElementById('memoInput');
const addBtn = document.getElementById('addBtn');
const memoList = document.getElementById('memoList');
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

function addMemo() {
  const text = memoInput.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
  li.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-btn';
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

if (langBtn && langDropdown) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    langDropdown.classList.add('hidden');
  });

  document.querySelectorAll('.lang-dropdown li').forEach(item => {
    item.addEventListener('click', (e) => {
      const selectedLang = e.target.getAttribute('data-lang');
      langBtn.textContent = selectedLang.toUpperCase();
      langDropdown.classList.add('hidden');
    });
  });
}
