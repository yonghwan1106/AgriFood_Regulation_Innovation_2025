// 청년농업인 원스톱 플랫폼 - 메인 JavaScript

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 애니메이션 초기화
    initScrollAnimations();
    
    // 네비게이션 스크롤 효과
    initNavScrollEffect();
    
    // 통계 카운터 애니메이션
    initCounterAnimations();
});

// 스크롤 애니메이션 초기화
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);

    // 관찰할 요소들
    document.querySelectorAll('.card-hover, .step-number').forEach(el => {
        observer.observe(el);
    });
}

// 네비게이션 스크롤 효과
function initNavScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('bg-white/95', 'backdrop-blur-sm');
        } else {
            header.classList.remove('bg-white/95', 'backdrop-blur-sm');
        }
        
        lastScrollY = currentScrollY;
    });
}

// 통계 카운터 애니메이션
function initCounterAnimations() {
    const counters = document.querySelectorAll('.text-3xl.font-bold');
    
    const animateCounter = (counter, target, suffix = '') => {
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    };

    // 통계 섹션이 보일 때 애니메이션 시작
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.text-3xl.font-bold');
                
                // 각 카운터에 대해 애니메이션 실행
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        if (index === 0) animateCounter(counter, 90, '%');
                        if (index === 1) animateCounter(counter, 5, '개월');
                        if (index === 2) animateCounter(counter, 1200, '명');
                    }, index * 200);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const heroSection = document.querySelector('.gradient-bg');
    if (heroSection) {
        statsObserver.observe(heroSection);
    }
}

// 로그인 모달 열기
function openLogin() {
    showModal('로그인', `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="이메일을 입력하세요">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                <input type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="비밀번호를 입력하세요">
            </div>
            <div class="flex items-center justify-between">
                <label class="flex items-center">
                    <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <span class="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
                </label>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-800">비밀번호 찾기</a>
            </div>
            <button onclick="performLogin()" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium">
                로그인
            </button>
            <div class="text-center">
                <span class="text-sm text-gray-600">계정이 없으신가요? </span>
                <button onclick="closeModal(); openSignup();" class="text-sm text-blue-600 hover:text-blue-800 font-medium">회원가입</button>
            </div>
        </div>
    `);
}

// 로그인 실행
function performLogin() {
    closeModal();
    // 로그인 성공 시뮬레이션
    setTimeout(() => {
        alert('로그인 성공! 대시보드로 이동합니다.');
        window.location.href = 'dashboard.html';
    }, 500);
}

// 회원가입 모달 열기
function openSignup() {
    showModal('회원가입', `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="이름을 입력하세요">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
                    <input type="date" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="이메일을 입력하세요">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                <input type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="010-0000-0000">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">관심 분야</label>
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">선택하세요</option>
                    <option value="smart-farm">스마트팜 (시설원예)</option>
                    <option value="livestock">스마트 축산</option>
                    <option value="field-crop">노지작물</option>
                    <option value="fruit">과수</option>
                    <option value="mushroom">버섯</option>
                </select>
            </div>
            <div>
                <label class="flex items-center">
                    <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" required>
                    <span class="ml-2 text-sm text-gray-600">개인정보 처리방침 및 이용약관에 동의합니다 <span class="text-red-500">*</span></span>
                </label>
            </div>
            <button onclick="performSignup()" class="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition font-medium">
                회원가입
            </button>
        </div>
    `);
}

// 회원가입 실행
function performSignup() {
    closeModal();
    setTimeout(() => {
        alert('회원가입이 완료되었습니다! 로그인 후 이용해주세요.');
        openLogin();
    }, 500);
}

// 원스톱 신청 시작
function startApplication() {
    // 데모 환경에서는 바로 신청 페이지로 이동
    window.location.href = 'application.html';
}

// 더 많은 성공사례 보기
function showMoreStories() {
    showModal('성공사례 더보기', `
        <div class="space-y-6 max-h-96 overflow-y-auto">
            <div class="border-b border-gray-200 pb-6">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">최</div>
                    <div class="ml-3">
                        <h4 class="font-semibold">최◇◇님 (30세)</h4>
                        <p class="text-sm text-gray-600">前 금융회사 → 블루베리 농장</p>
                    </div>
                </div>
                <div class="text-sm space-y-1">
                    <div>📍 강원 춘천 (1.2ha) | 💰 연 5.1억원</div>
                    <div>🏆 6차 산업 우수농가 선정 | 🌟 직접판매 70% 달성</div>
                </div>
                <p class="text-sm text-gray-700 mt-3 italic">
                    "도시 직장인에서 농업인으로 전환했지만, 체계적인 교육과 멘토링으로 
                    성공적으로 정착할 수 있었습니다."
                </p>
            </div>
            
            <div class="border-b border-gray-200 pb-6">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">정</div>
                    <div class="ml-3">
                        <h4 class="font-semibold">정☆☆님 (28세)</h4>
                        <p class="text-sm text-gray-600">前 디자이너 → 허브 스마트팜</p>
                    </div>
                </div>
                <div class="text-sm space-y-1">
                    <div>📍 제주 서귀포 (0.4ha) | 💰 연 2.3억원</div>
                    <div>🌿 유기농 인증 획득 | 🎨 브랜딩 전문성 활용</div>
                </div>
                <p class="text-sm text-gray-700 mt-3 italic">
                    "디자인 경험을 농업에 접목해 차별화된 브랜드를 만들 수 있었어요. 
                    원스톱 플랫폼 덕분에 빠르게 시작할 수 있었습니다."
                </p>
            </div>
            
            <div>
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">한</div>
                    <div class="ml-3">
                        <h4 class="font-semibold">한※※님 (33세)</h4>
                        <p class="text-sm text-gray-600">前 공무원 → 멜론 수경재배</p>
                    </div>
                </div>
                <div class="text-sm space-y-1">
                    <div>📍 경북 성주 (0.6ha) | 💰 연 3.8억원</div>
                    <div>🥇 품질인증 1등급 | 📈 온라인 직판 확대</div>
                </div>
                <p class="text-sm text-gray-700 mt-3 italic">
                    "안정적인 공무원 생활을 포기하고 농업에 도전했는데, 
                    지금은 더 많은 소득과 보람을 얻고 있습니다."
                </p>
            </div>
        </div>
        
        <div class="mt-6 text-center">
            <button onclick="startApplication()" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                나도 도전해보기 🚀
            </button>
        </div>
    `);
}

// 페이지 네비게이션 함수들
function goToApplication() {
    window.location.href = 'application.html';
}

function goToEducation() {
    window.location.href = 'education.html';
}

function goToFarmSearch() {
    window.location.href = 'farm-search.html';
}

function goToFundingCalculator() {
    window.location.href = 'funding-calculator.html';
}

function goToCommunity() {
    alert('커뮤니티 페이지는 현재 개발 중입니다.\n\n🔮 예정 기능:\n- 청년농업인 네트워킹\n- 성공사례 공유\n- Q&A 게시판\n- 전문가 상담\n- 지역별 모임');
}

// 모달 표시 함수
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };

    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 max-w-md w-full max-h-screen overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-900">${title}</h3>
                <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            ${content}
        </div>
    `;

    document.body.appendChild(modal);
    modal.id = 'currentModal';
    
    // 애니메이션 효과
    requestAnimationFrame(() => {
        modal.querySelector('.bg-white').classList.add('animate-scaleIn');
    });
}

// 모달 닫기 함수
function closeModal() {
    const modal = document.getElementById('currentModal');
    if (modal) {
        modal.remove();
    }
}

// 부드러운 스크롤 효과
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 추가 CSS 애니메이션 클래스 (동적 추가)
const style = document.createElement('style');
style.textContent = `
    .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .animate-scaleIn {
        animation: scaleIn 0.3s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);