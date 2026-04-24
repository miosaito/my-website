// ===== city.js =====

function initCity() {
    if (typeof memories === 'undefined') {
        console.error('【エラー】写真のデータ(memories)が見つかりません。HTML内でcity.jsより前に書かれているか確認してください。');
        alert('写真データが読み込めませんでした。');
        return;
    }

    const spawnBtn = document.getElementById('spawn-btn');
    const btnFill = document.getElementById('btn-fill');
    const resetBtn = document.getElementById('reset-btn');
    const backMapBtn = document.getElementById('back-map-btn');

    if (!spawnBtn || !resetBtn || !backMapBtn) {
        console.error('【エラー】ボタンが見つかりません。HTMLのid名が正しいか確認してください。');
        return;
    }

    let pressCount = 0;
    const maxPress = memories.length;

    // 🌟 ランダムな順番を記憶する配列
    let randomOrder = [];

    // 🌟 0 から maxPress-1 までの数字をシャッフルする関数
    function shuffleOrder() {
        let arr = Array.from({length: maxPress}, (_, i) => i);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // 初回読み込み時にシャッフルを実行
    randomOrder = shuffleOrder();

    // --- 🔙 戻るボタン処理 ---
    backMapBtn.addEventListener('click', (e) => {
        e.preventDefault();
        backMapBtn.style.transform = 'translateX(-150%)';
        backMapBtn.style.opacity = '0';
        setTimeout(() => { window.location.href = 'travel.html'; }, 300);
    });

    // --- 🔄 吸い込まれるリセット処理 ---
    resetBtn.addEventListener('click', () => {
        if (pressCount === 0) return; 

        const photos = document.querySelectorAll('.photo-card');
        const btnRect = spawnBtn.getBoundingClientRect();
        
        const targetX = btnRect.left + window.scrollX + (btnRect.width / 2) - 80; 
        const targetY = btnRect.top + window.scrollY + (btnRect.height / 2) - 90; 

        photos.forEach((photo, index) => {
            const currentX = parseFloat(photo.style.left);
            const currentY = parseFloat(photo.style.top);
            const rot = parseFloat(photo.dataset.rot) || 0; 
            
            const deltaX = targetX - currentX;
            const deltaY = targetY - currentY;

            setTimeout(() => {
                const anim = photo.animate([
                    { transform: `translate(0px, 0px) scale(1) rotate(${rot}deg)`, opacity: 1 },
                    { transform: `translate(${deltaX}px, ${deltaY}px) scale(0) rotate(0deg)`, opacity: 0 }
                ], {
                    duration: 500,
                    easing: 'cubic-bezier(0.5, 0, 0.75, 0)', 
                    fill: 'forwards'
                });

                anim.onfinish = () => photo.remove();
            }, index * 50); 
        });

        // 🌟 リセットするたびに、飛んでいく順番を新しくシャッフルし直す
        randomOrder = shuffleOrder();
        pressCount = 0;
        btnFill.style.transform = `translate(-50%, -50%) scale(0)`;
        spawnBtn.style.cursor = 'pointer';
        spawnBtn.style.opacity = '1';
    });

    // --- 📸 写真生成処理 ---
    spawnBtn.addEventListener('click', () => {
        if (pressCount >= maxPress) return;
        
        // 写真のデータはリストの上から順に取り出す
        const data = memories[pressCount];
        // 飛んでいく「場所（インデックス）」はシャッフルされた配列から選ぶ
        const gridIndex = randomOrder[pressCount];
        
        pressCount++;

        const scaleValue = pressCount / maxPress;
        btnFill.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;

        // 場所のデータを一緒に渡す
        createAndAnimatePhoto(data, gridIndex);

        if (pressCount === maxPress) {
            spawnBtn.style.cursor = 'default';
            spawnBtn.style.opacity = '0.8';
        }
    });

    // --- 🌟 規則的な配置とアニメーション ---
    function createAndAnimatePhoto(data, gridIndex) {
        const photo = document.createElement('div');
        photo.className = 'photo-card';
        photo.innerHTML = `
            <img src="${data.imgSrc}" alt="Memory">
            <div class="bubble">${data.text}</div>
        `;

        photo.addEventListener('click', () => {
            document.querySelectorAll('.photo-card.active').forEach(p => {
                if (p !== photo) p.classList.remove('active');
            });
            photo.classList.toggle('active');
            document.querySelectorAll('.photo-card').forEach(p => p.style.zIndex = '50');
            photo.style.zIndex = '60'; 
        });

        document.body.appendChild(photo);

        const screenW = window.innerWidth;
        
        // 🌟 ランダムに選ばれた gridIndex をもとに場所を計算
        const row = Math.floor(gridIndex / 5); 
        const col = gridIndex % 5;             

        const centerX = screenW * (0.15 + col * 0.175);
        const finalX = centerX - 80;
        const finalY = 250 + (row * 300);

        let rotation;
        if (col < 2) {
            rotation = -(5 + Math.random() * 10); 
        } else if (col > 2) {
            rotation = (5 + Math.random() * 10);  
        } else {
            rotation = (Math.random() - 0.5) * 8; 
        }
        photo.dataset.rot = rotation; 

        const btnRect = spawnBtn.getBoundingClientRect();
        const startX = btnRect.left + window.scrollX + (btnRect.width / 2) - 80; 
        const startY = btnRect.top + window.scrollY + (btnRect.height / 2) - 90; 

        photo.style.left = `${finalX}px`;
        photo.style.top = `${finalY}px`;
        photo.style.transform = `rotate(${rotation}deg) scale(0)`;
        photo.style.opacity = '0';

        const deltaX = startX - finalX;
        const deltaY = startY - finalY;

        photo.animate([
            { transform: `translate(${deltaX}px, ${deltaY}px) scale(0) rotate(0deg)`, opacity: 0 },
            { transform: `translate(${deltaX * 0.3}px, ${deltaY * 0.3 - 250}px) scale(1.3) rotate(${rotation / 2}deg)`, opacity: 1 },
            { transform: `translate(0px, 0px) scale(1) rotate(${rotation}deg)`, opacity: 1 }
        ], {
            duration: 700 + Math.random() * 100, 
            easing: 'cubic-bezier(0.25, 1, 0.5, 1.1)', 
            fill: 'forwards'
        });

        window.scrollTo({ top: finalY - window.innerHeight / 2 + 100, behavior: 'smooth' });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCity);
} else {
    initCity();
}