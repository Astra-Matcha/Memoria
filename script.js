const memoInput = document.getElementById('memoInput');
const addBtn = document.getElementById('addBtn');
const memoList = document.getElementById('memoList');
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

// 언어별 번역 데이터
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
};

// 메모 추가 함수
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

// 1. 메모 추가 이벤트 리스너
if (addBtn && memoInput) {
  addBtn.addEventListener('click', addMemo);
  memoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addMemo();
  });
}

// 2. 언어 드롭다운 토글 이벤트 (null 방지 안전장치 추가)
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
        
        // 텍스트 및 placeholder 변경
        memoInput.placeholder = translations[selectedLang].input.placeholder;
        addBtn.textContent = translations[selectedLang].input.add;
        
        // HTML lang 속성 변경 (font.css의 :lang() 셀렉터와 연동되어 Galmuri11 적용)
        document.documentElement.lang = selectedLang;
      }
    });
  });
}
