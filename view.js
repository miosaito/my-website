const viewportMeta = document.querySelector('meta[name="viewport"]');
const savedViewMode = localStorage.getItem('viewMode');

let isMobileView = false;

// 状態判定
if (savedViewMode === 'mobile') {
  isMobileView = true;
} else if (savedViewMode === 'desktop') {
  isMobileView = false;
} else {
  isMobileView = window.innerWidth <= 768;
}

// 適用関数
function applyViewMode() {
  if (isMobileView) {
    document.body.classList.add('force-mobile-view');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
  } else {
    document.body.classList.remove('force-mobile-view');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=1024');
    }
  }
}

console.log("view.js loaded");
console.log("saved:", savedViewMode);

// 実行
applyViewMode();