const memoInput = document.getElementById('memoInput');
const addBtn = document.getElementById('addBtn');
const memoList = document.getElementById('memoList');
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

function addMemo() {
  const text = memoInput.value.trim();
  if (text === '') return;

  const li = document.createElement('li');

  // 1. 메모 텍스트 표시 요소 (span)
  const memoTextSpan = document.createElement('span');
  memoTextSpan.textContent = text;
  memoTextSpan.className = 'memo-text';

  // 2. 버튼 컨테이너
  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';

  // 3. 수정 버튼
  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.className = 'edit-btn';

  // 4. 삭제 버튼
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-btn';

  // --- Inline Edit (인라인 수정) 로직 ---
  let isEditing = false;

  const startEditing = () => {
    if (isEditing) return;
    isEditing = true;

    const currentText = memoTextSpan.textContent;

    // span 대신 들어갈 input 생성
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    editInput.className = 'edit-input';

    // 저장 처리 함수
    const saveEdit = () => {
      const newText = editInput.value.trim();
      if (newText !== '') {
        memoTextSpan.textContent = newText;
      }
      // input을 다시 원래 span으로 교체
      if (li.contains(editInput)) {
        li.replaceChild(memoTextSpan, editInput);
      }
      editBtn.textContent = '✏️';
      isEditing = false;
    };

    // 키 입력 처리 (Enter: 저장, ESC: 취소)
    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveEdit();
      } else if (e.key === 'Escape') {
        if (li.contains(editInput)) {
          li.replaceChild(memoTextSpan, editInput);
        }
        editBtn.textContent = '✏️';
        isEditing = false;
      }
    });

    // 포커스를 잃었을 때 자동 저장
    editInput.addEventListener('blur', () => {
      saveEdit();
    });

    // span을 input으로 교체 후 포커스 이동
    li.replaceChild(editInput, memoTextSpan);
    editInput.focus();
    editBtn.textContent = '💾'; // 수정 중임을 나타내는 완료 아이콘
  };

  // 수정 버튼 클릭 또는 텍스트 클릭 시 인라인 수정 시작
  editBtn.addEventListener('click', () => {
    if (isEditing) {
      // 💾 상태일 때 클릭 시 저장
      const editInput = li.querySelector('.edit-input');
      if (editInput) editInput.blur();
    } else {
      startEditing();
    }
  });

  // 메모 텍스트 직접 클릭 시에도 수정 가능
  memoTextSpan.addEventListener('click', startEditing);

  // 삭제 버튼 로직
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  // 순서대로 조립
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
