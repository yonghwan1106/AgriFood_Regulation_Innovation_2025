// ========================================
// 공통 JavaScript (common.js)
// 네비게이션, 애니메이션, 유틸리티 함수
// ========================================

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initUtilities();
});

// 네비게이션 초기화
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggler = document.querySelector('.navbar-toggler');
    const navMenu = document.querySelector('.navbar-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 모바일 메뉴 토글
    if (navToggler && navMenu) {
        navToggler.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });
    }
    
    // 현재 페이지 활성화
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // 스크롤 시 네비게이션 스타일 변경
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 애니메이션 초기화
function initAnimations() {
    // GSAP가 로드되었는지 확인
    if (typeof gsap !== 'undefined') {
        // 페이지 로드 애니메이션
        gsap.from('.page-header', {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: 'power2.out'
        });
        
        // 네비게이션 카드 애니메이션 (강제 표시)
        const navCards = document.querySelectorAll('.nav-cards .nav-card');
        if (navCards.length > 0) {
            console.log('Found nav-cards:', navCards.length);
            
            // nav-card들을 즉시 표시하고 애니메이션 적용
            navCards.forEach((card, index) => {
                // 강제로 즉시 표시
                card.style.setProperty('opacity', '1', 'important');
                card.style.setProperty('transform', 'translateY(0)', 'important');
                card.style.setProperty('visibility', 'visible', 'important');
                card.style.setProperty('display', 'block', 'important');
                
                console.log(`Nav-card ${index + 1} forced visible`);
            });
            
            // GSAP 애니메이션 적용 (부드러운 등장 효과)
            gsap.fromTo(navCards, 
                {
                    y: 20,
                    opacity: 0.7
                },
                {
                    duration: 0.6,
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'power2.out',
                    delay: 0.2,
                    onComplete: () => {
                        // 애니메이션 완료 후 다시 한번 확실히 표시
                        navCards.forEach(card => {
                            card.style.setProperty('opacity', '1', 'important');
                            card.style.setProperty('transform', 'translateY(0)', 'important');
                        });
                        console.log('Nav-cards animation completed and visibility ensured');
                    }
                }
            );
        }
        
        // 인사이트 카드들을 즉시 표시 (강제 표시)
        const insightCards = document.querySelectorAll('.insight-card');
        if (insightCards.length > 0) {
            console.log('Found insight-cards:', insightCards.length);
            
            // insight-card들을 즉시 표시하고 애니메이션 적용
            insightCards.forEach((card, index) => {
                // 강제로 즉시 표시
                card.style.setProperty('opacity', '1', 'important');
                card.style.setProperty('transform', 'translateY(0)', 'important');
                card.style.setProperty('visibility', 'visible', 'important');
                card.style.setProperty('display', 'block', 'important');
                
                console.log(`Insight-card ${index + 1} forced visible`);
            });
            
            // GSAP 애니메이션 적용 (부드러운 등장 효과)
            gsap.fromTo(insightCards, 
                {
                    y: 20,
                    opacity: 0.7
                },
                {
                    duration: 0.8,
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    delay: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        // 애니메이션 완료 후 다시 한번 확실히 표시
                        insightCards.forEach(card => {
                            card.style.setProperty('opacity', '1', 'important');
                            card.style.setProperty('transform', 'translateY(0)', 'important');
                        });
                        console.log('Insight-cards animation completed and visibility ensured');
                    }
                }
            );
        }
        
        // 일반 카드 애니메이션 (법령 페이지 등)
        const regularCards = document.querySelectorAll('.card:not(.nav-card)');
        if (regularCards.length > 0) {
            gsap.from(regularCards, {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.3
            });
        }
        
        // 통계 숫자 애니메이션 (개선된 버전)
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        statNumbers.forEach((element, index) => {
            const target = parseFloat(element.getAttribute('data-target'));
            
            if (!isNaN(target) && target > 0) {
                // 초기값을 0으로 설정
                element.textContent = '0';
                
                // GSAP 애니메이션
                gsap.to(element, {
                    duration: 2,
                    delay: 0.5 + (index * 0.2),
                    ease: "power2.out",
                    onUpdate: function() {
                        const current = this.progress() * target;
                        if (target >= 100) {
                            element.textContent = Math.floor(current);
                        } else {
                            element.textContent = current.toFixed(1);
                        }
                    },
                    onComplete: function() {
                        // 최종값 정확히 설정
                        if (target >= 100) {
                            element.textContent = Math.floor(target);
                        } else {
                            element.textContent = target.toFixed(1);
                        }
                    }
                });
            }
        });
    }
    
    // CSS 애니메이션 트리거 (개선된 버전)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-fade-in-up');
            }
            // 중요: 요소가 뷰포트에서 나가도 사라지지 않도록 제거
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들 (nav-card와 insight-card 완전 제외)
    const baseElements = document.querySelectorAll('.stat-card, .timeline-item, .chart-container, .law-comparison');
    
    // 일반 카드들 중에서 조건에 맞는 것들만 선택 (nav-card 완전 제외)
    const generalCards = document.querySelectorAll('.card');
    const filteredCards = Array.from(generalCards).filter(card => {
        // nav-cards 컨테이너 내부가 아니고, insight-card 클래스가 없고, nav-card 클래스가 없는 경우만
        return !card.closest('.nav-cards') && 
               !card.classList.contains('insight-card') && 
               !card.classList.contains('nav-card');
    });
    
    console.log('IntersectionObserver targets - base:', baseElements.length, 'filtered cards:', filteredCards.length);
    
    // 모든 요소를 하나의 배열로 합치기
    const allElements = [...baseElements, ...filteredCards];
    
    // 각 요소에 애니메이션 스타일 적용
    allElements.forEach(el => {
        if (el && el.style) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        }
    });
}

// 유틸리티 함수들
function initUtilities() {
    // 숫자 포맷팅 함수
    window.formatNumber = function(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + '십억';
        } else if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + '억';
        } else if (num >= 10000) {
            return (num / 10000).toFixed(1) + '만';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + '천';
        }
        return num.toString();
    };
    
    // 퍼센트 포맷팅
    window.formatPercent = function(num) {
        return num.toFixed(1) + '%';
    };
    
    // 날짜 포맷팅
    window.formatDate = function(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('ko-KR', options);
    };
    
    // 부드러운 스크롤
    window.smoothScrollTo = function(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80; // 네비게이션 높이 고려
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };
    
    // 로딩 스피너 표시/숨기기
    window.showLoader = function() {
        const loader = document.createElement('div');
        loader.className = 'loader-overlay';
        loader.innerHTML = '<div class="spinner"></div>';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        document.body.appendChild(loader);
    };
    
    window.hideLoader = function() {
        const loader = document.querySelector('.loader-overlay');
        if (loader) {
            loader.remove();
        }
    };
    
    // 알림 표시
    window.showAlert = function(message, type = 'info') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        alert.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    };
    
    // 클립보드 복사
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showAlert('클립보드에 복사되었습니다', 'success');
        }).catch(() => {
            showAlert('복사에 실패했습니다', 'warning');
        });
    };
}

// 차트 공통 설정
window.chartDefaults = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    family: 'Noto Sans KR',
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#2E7D32',
            borderWidth: 1,
            cornerRadius: 8,
            font: {
                family: 'Noto Sans KR'
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(0,0,0,0.1)'
            },
            ticks: {
                font: {
                    family: 'Noto Sans KR',
                    size: 11
                }
            }
        },
        y: {
            grid: {
                color: 'rgba(0,0,0,0.1)'
            },
            ticks: {
                font: {
                    family: 'Noto Sans KR',
                    size: 11
                }
            }
        }
    }
};

// 색상 팔레트
window.colorPalette = {
    primary: '#2E7D32',
    secondary: '#FF6B35',
    accent: '#1976D2',
    success: '#4CAF50',
    warning: '#FF9800',
    gradient: {
        primary: ['#2E7D32', '#4CAF50'],
        secondary: ['#FF6B35', '#FF9800'],
        accent: ['#1976D2', '#2196F3']
    }
};

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    if (typeof showAlert !== 'undefined') {
        showAlert('일시적인 오류가 발생했습니다. 페이지를 새로고침해주세요.', 'warning');
    }
});

// CSS 애니메이션 키프레임 추가
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes fadeInUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}

.hover-lift {
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}

.hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
`;
document.head.appendChild(style);
