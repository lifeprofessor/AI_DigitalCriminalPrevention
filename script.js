// 전역 변수
let currentQuestion = 1;
let quizAnswers = {};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 스무스 스크롤 기능
    initSmoothScroll();
    
    // 퀴즈 초기화
    initQuiz();
    
    // 스크롤 시 네비게이션 하이라이트
    initScrollSpy();
    
    // 애니메이션 효과
    initAnimations();
    
    // 파티클 효과 추가
    initParticleEffects();
    
    // 동적 배경 효과
    initDynamicBackground();
    
    // 카드 호버 사운드 효과 (시뮬레이션)
    initInteractiveEffects();
    
    // 타이핑 효과
    initTypingEffect();
    
    // 카운터 애니메이션
    initCounterAnimation();
    
    // 딥페이크 체크리스트 기능 (기존 함수 비활성화)
    // initDeepfakeChecklist();
    
    // 탐지 방법 탭 기능
    const flowSteps = document.querySelectorAll('.flow-step');
    const detectionPanels = document.querySelectorAll('.detection-panel');
    
    flowSteps.forEach(step => {
        step.addEventListener('click', function() {
            const targetStep = this.dataset.step;
            
            // 모든 단계 비활성화
            flowSteps.forEach(s => s.classList.remove('active'));
            detectionPanels.forEach(p => p.classList.remove('active'));
            
            // 클릭된 단계 활성화
            this.classList.add('active');
            const targetPanel = document.getElementById(targetStep + '-panel');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
    
    // 체크리스트 기능 - 새로운 HTML 구조에 맞게 수정
    setTimeout(() => {
        // 딥페이크 체크리스트 (lesson2)
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        const suspiciousCount = document.getElementById('suspicious-count');
        const riskLevel = document.getElementById('risk-level');
        const gaugeFill = document.querySelector('.gauge-fill');
        
        // 피싱 체크리스트 (lesson4)
        const phishingCheckboxes = document.querySelectorAll('.practical-checklist .checklist-item input[type="checkbox"]');
        const phishingCount = document.getElementById('phishing-count');
        const phishingRiskLevel = document.getElementById('phishing-risk-level');
        const phishingGaugeFill = document.querySelector('.practical-checklist .gauge-fill');
        
        // 딥페이크 체크리스트 기능 (lesson2용)
        function updateDeepfakeChecklistResult() {
            const checkedCount = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
            const totalCount = checkboxes.length;
            const suspiciousItems = totalCount - checkedCount; // 체크되지 않은 항목 = 의심 항목
            const percentage = (suspiciousItems / totalCount) * 100;
            
            // 의심 항목 수 업데이트 (체크되지 않은 항목)
            suspiciousCount.textContent = suspiciousItems;
            
            // 게이지 바 업데이트
            gaugeFill.style.width = percentage + '%';
            
            // 위험도 레벨 업데이트 (의심 항목 기준)
            let riskText = '';
            let riskClass = '';
            
            if (suspiciousItems <= 2) {
                riskText = '안전';
                riskClass = 'safe';
            } else if (suspiciousItems <= 5) {
                riskText = '주의';
                riskClass = 'caution';
            } else {
                riskText = '위험';
                riskClass = 'danger';
            }
            
            riskLevel.textContent = riskText;
            riskLevel.className = riskClass;
            
            // 체크리스트 결과 컨테이너 배경색 변경
            const resultContainer = document.querySelector('.checklist-result');
            if (resultContainer) {
                // 기존 위험도 클래스 제거
                resultContainer.classList.remove('safe', 'caution', 'danger');
                // 새로운 위험도 클래스 추가
                resultContainer.classList.add(riskClass);
            }
            
            // 애니메이션 효과
            gaugeFill.style.transform = 'scaleX(0)';
            setTimeout(() => {
                gaugeFill.style.transform = 'scaleX(1)';
            }, 100);
        }
        
        // 체크박스 이벤트 리스너 추가 (이벤트 위임 방식)
        document.addEventListener('change', function(e) {
            if (e.target.matches('.checklist-item input[type="checkbox"]')) {
                updateDeepfakeChecklistResult();
            }
        });
        
        // 딥페이크 체크리스트가 있는 경우에만 실행
        if (checkboxes.length && suspiciousCount && riskLevel && gaugeFill) {
            // 개별 체크박스에도 리스너 추가 (백업용)
            checkboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', function() {
                    updateDeepfakeChecklistResult();
                });
            });
            
            // 초기 상태 설정
            updateDeepfakeChecklistResult();
        }
        
        // 피싱 체크리스트 기능 (lesson4용)
        function updatePhishingChecklistResult() {
            const checkedCount = document.querySelectorAll('.practical-checklist .checklist-item input[type="checkbox"]:checked').length;
            const totalCount = phishingCheckboxes.length;
            const suspiciousItems = checkedCount; // 체크된 항목 = 의심 항목
            const percentage = (suspiciousItems / totalCount) * 100;
            
            // 의심 항목 수 업데이트
            phishingCount.textContent = suspiciousItems;
            
            // 게이지 바 업데이트
            phishingGaugeFill.style.width = percentage + '%';
            
            // 위험도 레벨 업데이트
            let riskText = '';
            let riskClass = '';
            
            if (suspiciousItems <= 3) {
                riskText = '안전';
                riskClass = 'safe';
            } else if (suspiciousItems <= 7) {
                riskText = '주의';
                riskClass = 'caution';
            } else {
                riskText = '위험';
                riskClass = 'danger';
            }
            
            phishingRiskLevel.textContent = riskText;
            phishingRiskLevel.className = riskClass;
            
            // 체크리스트 결과 컨테이너 배경색 변경
            const resultContainer = document.querySelector('.practical-checklist .checklist-result');
            if (resultContainer) {
                // 기존 위험도 클래스 제거
                resultContainer.classList.remove('safe', 'caution', 'danger');
                // 새로운 위험도 클래스 추가
                resultContainer.classList.add(riskClass);
            }
            
            // 애니메이션 효과
            phishingGaugeFill.style.transform = 'scaleX(0)';
            setTimeout(() => {
                phishingGaugeFill.style.transform = 'scaleX(1)';
            }, 100);
        }
        
        // 피싱 체크리스트가 있는 경우에만 실행
        if (phishingCheckboxes.length && phishingCount && phishingRiskLevel && phishingGaugeFill) {
            // 체크박스 이벤트 리스너 추가
            phishingCheckboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', function() {
                    updatePhishingChecklistResult();
                });
            });
            
            // 초기 상태 설정
            updatePhishingChecklistResult();
        }
    }, 1000); // 1초 후에 실행하여 모든 요소가 로드된 후 실행

    // 3. 기술적 탐지 도구 - 탭 기능
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contentPanels = document.querySelectorAll('.content-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.dataset.category;
            
            // 모든 탭 비활성화
            tabButtons.forEach(btn => btn.classList.remove('active'));
            contentPanels.forEach(panel => panel.classList.remove('active'));
            
            // 클릭된 탭 활성화
            this.classList.add('active');
            const targetPanel = document.getElementById(targetCategory);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 4. 딥페이크 범죄 대응 방안 - 시나리오 탭 기능
    const scenarioTabs = document.querySelectorAll('.scenario-tab');
    const scenarioPanels = document.querySelectorAll('.scenario-panel');
    
    scenarioTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetScenario = this.dataset.scenario;
            
            // 모든 탭 비활성화
            scenarioTabs.forEach(t => t.classList.remove('active'));
            scenarioPanels.forEach(panel => panel.classList.remove('active'));
            
            // 클릭된 탭 활성화
            this.classList.add('active');
            const targetPanel = document.getElementById(targetScenario + '-scenario');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
    
    // 원형 진행 바 애니메이션
    const circleProgresses = document.querySelectorAll('.circle-progress');
    
    function animateCircleProgress() {
        circleProgresses.forEach(circle => {
            const percent = parseInt(circle.dataset.percent);
            const degrees = (percent / 100) * 360;
            circle.style.setProperty('--percent', degrees + 'deg');
        });
    }
    
    // 스크롤 시 애니메이션 실행
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCircleProgress();
            }
        });
    });
    
    circleProgresses.forEach(circle => {
        observer.observe(circle);
    });
    
    // 진행 바 애니메이션
    const progressBars = document.querySelectorAll('.perf-fill, .effectiveness-fill, .progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
});

// 스무스 스크롤 초기화
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    // 부드러운 스크롤 효과 추가
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 클릭 시 파장 효과
                    createRippleEffect(e);
                }
            }
        });
    });
}

// 파장 효과 생성
function createRippleEffect(e) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'rippleEffect 0.6s linear';
    ripple.style.left = (e.clientX - e.target.offsetLeft - 25) + 'px';
    ripple.style.top = (e.clientY - e.target.offsetTop - 25) + 'px';
    ripple.style.width = '50px';
    ripple.style.height = '50px';
    ripple.style.pointerEvents = 'none';
    
    e.target.style.position = 'relative';
    e.target.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 파티클 효과 초기화
function initParticleEffects() {
    // 헤더에 떠다니는 파티클 생성 (개수를 줄임)
    const header = document.querySelector('.intro-section');
    if (header) {
        for (let i = 0; i < 10; i++) {
            createFloatingParticle(header, i);
        }
    }
}

// 떠다니는 파티클 생성
function createFloatingParticle(container, index) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: ${['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f093fb'][Math.floor(Math.random() * 5)]};
        border-radius: 50%;
        pointer-events: none;
        opacity: ${Math.random() * 0.8 + 0.2};
        animation: floatParticle ${Math.random() * 10 + 15}s infinite linear;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 0;
    `;
    
    container.appendChild(particle);
    
    // 애니메이션 키프레임 동적 생성
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.innerHTML = `
            @keyframes floatParticle {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 파티클 재생성
    setTimeout(() => {
        particle.remove();
        createFloatingParticle(container, index);
    }, (Math.random() * 10 + 15) * 1000);
}

// 동적 배경 효과
function initDynamicBackground() {
    // 마우스 움직임에 따른 그라데이션 변화 (더 부드럽게)
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        // 기존 배경 유지하면서 더 미묘한 효과 적용
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.backgroundPosition = `${mouseX * 100}% ${mouseY * 100}%`;
    });
}

// 인터랙티브 효과 초기화
function initInteractiveEffects() {
    // 카드 호버 시 3D 효과
    const cards = document.querySelectorAll('.lesson-card, .crime-card, .stat-card, .quick-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateY(10deg) rotateX(5deg) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
            
            // 반짝이는 효과 추가
            createSparkleEffect(card);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
        
        // 마우스 움직임에 따른 카드 기울기 효과
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
    });
}

// 반짝이는 효과 생성
function createSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ffd700;
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkleAnimation 0.8s ease-out forwards;
                z-index: 10;
            `;
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 800);
        }, i * 100);
    }
    
    // 스파클 애니메이션 키프레임
    if (!document.getElementById('sparkle-styles')) {
        const style = document.createElement('style');
        style.id = 'sparkle-styles';
        style.innerHTML = `
            @keyframes sparkleAnimation {
                0% { transform: scale(0) rotate(0deg); opacity: 1; }
                50% { transform: scale(1) rotate(180deg); opacity: 1; }
                100% { transform: scale(0) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// 타이핑 효과 초기화
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // 타이핑 완료 후 커서 깜빡임 효과
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                heroTitle.appendChild(cursor);
            }
        };
        
        // 페이지 로드 후 1초 뒤에 타이핑 시작
        setTimeout(typeWriter, 1000);
    }
    
    // 커서 깜빡임 애니메이션
    if (!document.getElementById('cursor-styles')) {
        const style = document.createElement('style');
        style.id = 'cursor-styles';
        style.innerHTML = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// 카운터 애니메이션 초기화
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[0-9,]+/, target.toLocaleString());
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/[0-9,]+/, Math.floor(current).toLocaleString());
            }
        }, 30);
    };
    
    // Intersection Observer로 화면에 보일 때 애니메이션 시작
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// 퀴즈 초기화
function initQuiz() {
    // 퀴즈 요소가 있는지 확인
    const quizElement = document.getElementById('quiz');
    if (quizElement) {
        updateQuizNavigation();
    }
}

// 퀴즈 문제 변경
function changeQuestion(direction) {
    const questions = document.querySelectorAll('.question');
    const totalQuestions = questions.length;
    
    // 퀴즈 요소가 없으면 함수 종료
    if (totalQuestions === 0) {
        return;
    }
    
    // 현재 문제 숨기기
    questions[currentQuestion - 1].classList.remove('active');
    
    // 다음/이전 문제로 이동
    currentQuestion += direction;
    
    // 범위 체크
    if (currentQuestion < 1) currentQuestion = 1;
    if (currentQuestion > totalQuestions) currentQuestion = totalQuestions;
    
    // 새 문제 보이기 (페이드 인 효과)
    const newQuestion = questions[currentQuestion - 1];
    newQuestion.style.opacity = '0';
    newQuestion.classList.add('active');
    
    setTimeout(() => {
        newQuestion.style.transition = 'opacity 0.5s ease';
        newQuestion.style.opacity = '1';
    }, 50);
    
    // 네비게이션 업데이트
    updateQuizNavigation();
}

// 퀴즈 네비게이션 업데이트
function updateQuizNavigation() {
    const totalQuestions = document.querySelectorAll('.question').length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const indicator = document.querySelector('.question-indicator');
    
    // 필수 요소들이 존재하는지 확인
    if (!prevBtn || !nextBtn || !submitBtn || !indicator || totalQuestions === 0) {
        return; // 퀴즈 요소가 없으면 함수 종료
    }
    
    // 이전 버튼 상태
    prevBtn.disabled = currentQuestion === 1;
    
    // 다음/제출 버튼 상태
    if (currentQuestion === totalQuestions) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
    
    // 문제 번호 표시
    indicator.textContent = `${currentQuestion} / ${totalQuestions}`;
}

// 퀴즈 제출 및 결과 표시
function submitQuiz() {
    // 답안 수집
    const questions = document.querySelectorAll('.question');
    let score = 0;
    const totalQuestions = questions.length;
    
    // 퀴즈 요소가 없으면 함수 종료
    if (totalQuestions === 0) {
        return;
    }
    
    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            quizAnswers[`q${index + 1}`] = selectedOption.value;
            
            // 정답 체크 (모든 정답은 'b')
            if (selectedOption.value === 'b') {
                score++;
            }
        }
    });
    
    // 결과 표시 (폭죽 효과와 함께)
    showQuizResult(score, totalQuestions);
    createFireworksEffect();
}

// 폭죽 효과 생성
function createFireworksEffect() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 50 + 25}%;
                width: 10px;
                height: 10px;
                background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd700', '#f093fb'][Math.floor(Math.random() * 5)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: fireworkAnimation 2s ease-out forwards;
            `;
            
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 2000);
        }, i * 200);
    }
    
    // 폭죽 애니메이션
    if (!document.getElementById('firework-styles')) {
        const style = document.createElement('style');
        style.id = 'firework-styles';
        style.innerHTML = `
            @keyframes fireworkAnimation {
                0% { transform: scale(0); opacity: 1; }
                50% { transform: scale(3); opacity: 1; }
                100% { transform: scale(5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// 퀴즈 결과 표시
function showQuizResult(score, total) {
    const quizContainer = document.querySelector('.quiz-questions');
    const quizNavigation = document.querySelector('.quiz-navigation');
    const resultDiv = document.getElementById('quizResult');
    const resultContent = document.getElementById('resultContent');
    
    // 퀴즈 요소가 없으면 함수 종료
    if (!quizContainer || !quizNavigation || !resultDiv || !resultContent) {
        return;
    }
    
    // 퀴즈 숨기기
    quizContainer.style.display = 'none';
    quizNavigation.style.display = 'none';
    
    // 결과 내용 생성
    let resultHTML = '';
    let resultClass = '';
    let resultMessage = '';
    
    const percentage = Math.round((score / total) * 100);
    
    if (percentage >= 80) {
        resultClass = 'excellent';
        resultMessage = '🎉 훌륭합니다! 디지털 범죄 예방에 대한 이해도가 매우 높습니다! 🎉';
    } else if (percentage >= 60) {
        resultClass = 'good';
        resultMessage = '👍 좋습니다! 기본적인 예방 지식을 잘 알고 계시네요! 👍';
    } else {
        resultClass = 'need-improvement';
        resultMessage = '📚 조금 더 학습이 필요합니다. 교육 내용을 다시 한 번 확인해보세요! 📚';
    }
    
    resultHTML = `
        <div class="score-display ${resultClass}">
            <div class="score-circle">
                <span class="score-number">${score}</span>
                <span class="score-total">/ ${total}</span>
            </div>
            <div class="score-percentage">${percentage}%</div>
        </div>
        <p class="result-message">${resultMessage}</p>
        <div class="correct-answers">
            <h4>✨ 정답 해설 ✨</h4>
            <div class="answer-explanation">
                <p><strong>🏛️ 문제 1:</strong> 은행 사칭 전화 → <strong>전화를 끊고 은행에 직접 전화해서 확인</strong></p>
                <p><strong>📦 문제 2:</strong> 의심스러운 택배 문자 → <strong>링크를 클릭하지 말고 택배 회사에 직접 전화</strong></p>
                <p><strong>👨‍👩‍👧‍👦 문제 3:</strong> 자녀 사칭 메시지 → <strong>기존 번호로 직접 전화해서 확인</strong></p>
            </div>
        </div>
    `;
    
    resultContent.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
    
    // 결과 섹션으로 스크롤
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 퀴즈 재시작
function restartQuiz() {
    // 퀴즈 요소가 있는지 확인
    const quizElement = document.getElementById('quiz');
    if (!quizElement) {
        return;
    }
    
    // 초기화
    currentQuestion = 1;
    quizAnswers = {};
    
    // 모든 라디오 버튼 해제
    const radioButtons = document.querySelectorAll('.question input[type="radio"]');
    radioButtons.forEach(radio => radio.checked = false);
    
    // 첫 번째 문제로 이동
    const questions = document.querySelectorAll('.question');
    questions.forEach((question, index) => {
        if (index === 0) {
            question.classList.add('active');
        } else {
            question.classList.remove('active');
        }
    });
    
    // UI 복원
    const quizContainer = document.querySelector('.quiz-questions');
    const quizNavigation = document.querySelector('.quiz-navigation');
    const resultDiv = document.getElementById('quizResult');
    
    if (quizContainer) quizContainer.style.display = 'block';
    if (quizNavigation) quizNavigation.style.display = 'flex';
    if (resultDiv) resultDiv.style.display = 'none';
    
    // 네비게이션 업데이트
    updateQuizNavigation();
    
    // 퀴즈 시작 부분으로 스크롤
    quizElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 스크롤 스파이 기능
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// 애니메이션 효과 초기화
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // 연속적인 애니메이션 효과
                setTimeout(() => {
                    entry.target.style.animation = 'bounceIn 0.8s ease-out';
                }, Math.random() * 300);
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.crime-card, .lesson-card, .tip-card, .practice-item, .summary-item, .stat-card, .quick-card');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// 인쇄 기능
function printPage() {
    // 인쇄 전 스타일 조정
    const printStyles = `
        <style>
            @media print {
                .header, .footer, .quiz-container, .final-cta { display: none !important; }
                .section { page-break-inside: avoid; padding: 1rem 0; }
                .crime-card, .lesson-card, .tip-card { page-break-inside: avoid; margin-bottom: 1rem; }
                body { font-size: 12pt; line-height: 1.4; }
                h1, h2, h3 { color: black !important; }
                .container { max-width: none; padding: 0; }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', printStyles);
    
    // 인쇄 실행
    window.print();
}

// 추가 애니메이션 스타일 주입
const enhancedAnimationStyles = `
    <style>
        .crime-card, .lesson-card, .tip-card, .practice-item, .summary-item, .stat-card, .quick-card {
            opacity: 1;
            transform: translateY(0px) scale(1);
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .crime-card.animate-in, .lesson-card.animate-in, .tip-card.animate-in, 
        .practice-item.animate-in, .summary-item.animate-in, .stat-card.animate-in, .quick-card.animate-in {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        
        .nav-link.active {
            background: rgba(255,255,255,0.3);
            color: white;
            transform: scale(1.05);
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
            50% { transform: scale(1.1) rotate(5deg); opacity: 0.8; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes rippleEffect {
            to { transform: scale(4); opacity: 0; }
        }
        
        .score-display {
            text-align: center;
            margin-bottom: 2rem;
            animation: scoreReveal 1s ease-out;
        }
        
        @keyframes scoreReveal {
            0% { transform: scale(0) rotate(180deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(90deg); opacity: 0.8; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        .score-circle {
            display: inline-block;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .excellent .score-circle {
            background: linear-gradient(135deg, #28a745, #20c997, #17a2b8);
            color: white;
            animation: excellentGlow 2s ease-in-out infinite alternate;
        }
        
        @keyframes excellentGlow {
            0% { box-shadow: 0 10px 30px rgba(40, 167, 69, 0.5); }
            100% { box-shadow: 0 15px 40px rgba(40, 167, 69, 0.8); }
        }
        
        .good .score-circle {
            background: linear-gradient(135deg, #007bff, #0056b3, #004085);
            color: white;
            animation: goodPulse 1.5s ease-in-out infinite;
        }
        
        @keyframes goodPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .need-improvement .score-circle {
            background: linear-gradient(135deg, #ffc107, #e67e22, #d35400);
            color: white;
            animation: improvementShake 0.5s ease-in-out 3;
        }
        
        @keyframes improvementShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .score-number {
            font-size: 3rem;
            font-weight: 900;
            line-height: 1;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .score-total {
            font-size: 1.5rem;
            opacity: 0.9;
        }
        
        .score-percentage {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: none;
        }
        
        .result-message {
            font-size: 1.4rem;
            margin-bottom: 2rem;
            color: #2c3e50;
            font-weight: 600;
            animation: messageSlide 1s ease-out 0.5s both;
        }
        
        @keyframes messageSlide {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .correct-answers {
            background: linear-gradient(135deg, rgba(248, 249, 250, 0.9), rgba(255, 255, 255, 0.9));
            padding: 2rem;
            border-radius: 20px;
            text-align: left;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            animation: answersReveal 1s ease-out 1s both;
        }
        
        @keyframes answersReveal {
            from { opacity: 0; transform: translateY(50px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .correct-answers h4 {
            color: #2c3e50;
            margin-bottom: 1.5rem;
            text-align: center;
            font-size: 1.5rem;
        }
        
        .answer-explanation p {
            margin-bottom: 1.2rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 15px;
            border-left: 5px solid #28a745;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }
        
        .answer-explanation p:hover {
            transform: translateX(10px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .answer-explanation strong {
            color: #007bff;
            font-size: 1.1rem;
        }
    </style>
`;

// 스타일 주입
document.head.insertAdjacentHTML('beforeend', enhancedAnimationStyles);

// 딥페이크 체크리스트 기능 초기화 (사용 안함 - 새로운 함수로 대체됨)
/*
function initDeepfakeChecklist() {
    const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const resultElement = document.querySelector('.checklist-result p');
    
    if (checklistItems.length === 0 || !resultElement) return;
    
    checklistItems.forEach(checkbox => {
        checkbox.addEventListener('change', updateChecklistResult);
    });
    
    // 초기 결과 업데이트
    updateChecklistResult();
}

// 체크리스트 결과 업데이트 (사용 안함 - 새로운 함수로 대체됨)
function updateChecklistResult() {
    const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const resultElement = document.querySelector('.checklist-result p');
    const resultContainer = document.querySelector('.checklist-result');
    
    if (!resultElement || !resultContainer) return;
    
    const checkedCount = Array.from(checklistItems).filter(checkbox => checkbox.checked).length;
    const totalCount = checklistItems.length;
    const uncheckedCount = totalCount - checkedCount;
    
    let message = '';
    let bgClass = '';
    
    if (uncheckedCount === 0) {
        message = '<strong>✅ 모든 항목이 정상입니다!</strong> 이 콘텐츠는 진짜일 가능성이 높습니다.';
        bgClass = 'safe';
    } else if (uncheckedCount === 1) {
        message = '<strong>⚠️ 주의가 필요합니다!</strong> 1개 항목이 의심스럽습니다. 추가 확인을 권장합니다.';
        bgClass = 'warning';
    } else if (uncheckedCount >= 2) {
        message = '<strong>🚨 딥페이크일 가능성이 높습니다!</strong> ' + uncheckedCount + '개 항목이 의심스럽습니다. 이 콘텐츠를 신뢰하지 마세요!';
        bgClass = 'danger';
    }
    
    resultElement.innerHTML = message;
    
    // 배경색 변경을 위한 CSS 클래스 추가
    resultContainer.className = 'checklist-result ' + bgClass;
    
    // 애니메이션 효과
    resultContainer.style.transform = 'scale(0.95)';
    setTimeout(() => {
        resultContainer.style.transform = 'scale(1)';
    }, 150);
}
*/

// 전역 함수로 내보내기 (HTML에서 직접 호출을 위해)
window.changeQuestion = changeQuestion;
window.submitQuiz = submitQuiz;
window.restartQuiz = restartQuiz;
window.printPage = printPage; 

// 체크리스트 기능
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    const progressCount = document.getElementById('progress-count');
    const checklistResult = document.getElementById('checklist-result');
    const resultExcellent = document.getElementById('result-excellent');
    const resultGood = document.getElementById('result-good');
    const resultImprovement = document.getElementById('result-improvement');

    // 로컬 스토리지에서 체크 상태 로드
    function loadChecklistState() {
        checkboxes.forEach(checkbox => {
            const itemId = checkbox.getAttribute('data-item');
            const isChecked = localStorage.getItem(`checklist-${itemId}`) === 'true';
            checkbox.checked = isChecked;
        });
        updateProgress();
    }

    // 로컬 스토리지에 체크 상태 저장
    function saveChecklistState(itemId, isChecked) {
        localStorage.setItem(`checklist-${itemId}`, isChecked);
    }

    // 진행률 업데이트
    function updateProgress() {
        const totalItems = checkboxes.length;
        const checkedItems = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = Math.round((checkedItems / totalItems) * 100);

        // 진행률 바 업데이트
        progressFill.style.width = percentage + '%';
        progressPercentage.textContent = percentage;
        progressCount.textContent = `${checkedItems}/${totalItems}`;

        // 결과 메시지 표시
        showResult(percentage);
    }

    // 결과 메시지 표시
    function showResult(percentage) {
        // 모든 결과 숨기기
        resultExcellent.style.display = 'none';
        resultGood.style.display = 'none';
        resultImprovement.style.display = 'none';

        if (percentage === 100) {
            // 모든 항목 완료
            checklistResult.style.display = 'block';
            resultExcellent.style.display = 'block';
        } else if (percentage >= 70) {
            // 70% 이상 완료
            checklistResult.style.display = 'block';
            resultGood.style.display = 'block';
        } else if (percentage > 0) {
            // 일부 완료
            checklistResult.style.display = 'block';
            resultImprovement.style.display = 'block';
        } else {
            // 아무것도 체크 안 함
            checklistResult.style.display = 'none';
        }
    }

    // 체크박스 이벤트 리스너 추가
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const itemId = this.getAttribute('data-item');
            const isChecked = this.checked;
            
            // 로컬 스토리지에 저장
            saveChecklistState(itemId, isChecked);
            
            // 진행률 업데이트
            updateProgress();
            
            // 체크 시 애니메이션 효과
            if (isChecked) {
                this.parentElement.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.parentElement.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });

    // 체크리스트 리셋 함수 (개발자 도구에서 사용 가능)
    window.resetChecklist = function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            const itemId = checkbox.getAttribute('data-item');
            localStorage.removeItem(`checklist-${itemId}`);
        });
        updateProgress();
        console.log('체크리스트가 초기화되었습니다.');
    };

    // 페이지 로드 시 상태 복원
    loadChecklistState();

    // 체크리스트 섹션으로 스크롤 함수
    window.scrollToChecklist = function() {
        document.getElementById('security-rules').scrollIntoView({ 
            behavior: 'smooth' 
        });
    };
}); 