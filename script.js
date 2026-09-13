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

  const memoTextSpan = document.createElement('span');
  memoTextSpan.textContent = text;
  memoTextSpan.className = 'memo-text';

  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.className = 'edit-btn';
  editBtn.addEventListener('click', () => {
    
    if (newText !== null && newText.trim() !== '') {
      memoTextSpan.textContent = newText.trim();
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(deleteBtn);
  memoList.appendChild(li);

  memoInput.value = '';

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(memoTextSpan);
  li.appendChild(btnGroup);

  memoList.appendChild(li);

  memoInput.value = '';
}

// 이벤트 리스너 등록 (요소 존재 여부 체크)
if (addBtn && memoInput) {
  addBtn.addEventListener('click', addMemo);
  memoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addMemo();
  });
}

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
      
      if (selectedLang && translations[selectedLang]) {
        langBtn.textContent = selectedLang.toUpperCase();
        langDropdown.classList.add('hidden');
        
        memoInput.placeholder = translations[selectedLang].input.placeholder;
        addBtn.textContent = translations[selectedLang].input.add;
        document.documentElement.lang = selectedLang;
      }
    });
  });
}
