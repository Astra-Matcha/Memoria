const memoInput = document.getElementById('memoInput');
const addBtn = document.getElementById('addBtn');
const memoList = document.getElementById('memoList');
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

// 언어 별 번역
const translations = {
  ko: {
    input: {
      placeholder: "메모를 입력하세요...",
      add: "추가"
    }
  },
  en: {
    input: {
      placeholder: "Enter a memo...",
      add: "Add"
    }
  },
  ja: {
    input: {
      placeholder: "メモを入力してください...",
      add: "追加"
    }
  },
  zh: {
    input: {
      placeholder: "请输入备忘录...",
      add: "添加"
    }
  }
}; // 👈 여기서 정확히 닫아주어야 합니다!

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
