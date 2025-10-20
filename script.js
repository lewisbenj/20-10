 document.addEventListener('DOMContentLoaded', () => {

    const namePrompt = document.getElementById('name-prompt');
            const greetingContent = document.getElementById('greeting-content');
            const nameInput = document.getElementById('name-input');
            const submitBtn = document.getElementById('submit-name-btn');
            const mainTitle = document.getElementById('main-title');
            const message = document.getElementById('message');

            function animateText(element, text) {
                element.innerHTML = '';
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    if (char === ' ') {
                        span.style.marginLeft = '0.25em'; 
                    } else {
                        span.className = 'animated-letter';
                        span.style.animationDelay = `${index * 0.05}s`;
                    }
                    element.appendChild(span);
                });
            }

            submitBtn.addEventListener('click', () => {
                const userName = nameInput.value.trim();
                if (userName === '') {
                    nameInput.classList.add('shake');
                    setTimeout(() => {
                        nameInput.classList.remove('shake');
                    }, 500);
                    return;
                }

                namePrompt.classList.add('opacity-0');
                setTimeout(() => {
                    namePrompt.classList.add('hidden');
                    greetingContent.classList.remove('hidden');
                    greetingContent.classList.add('opacity-0');
                    
                    const titleText = "Ngày 20 Tháng 10";
                    const messageText = `Thân gửi ${userName}, nhân ngày Phụ nữ Việt Nam, tôi xin phép gửi những lời chúc nồng thắm nhất đến bạn. Xin được chúc bạn ${userName} luôn xinh đẹp, rạng rỡ, hạnh phúc và luôn thành công trong cuộc sống!`;

                    animateText(mainTitle, titleText);
                    setTimeout(() => {
                        animateText(message, messageText);
                        greetingContent.classList.remove('opacity-0');
                    }, titleText.length * 50 + 500);

                }, 500); 
            });

            const heartsContainer = document.getElementById('hearts-container');
            const heartsCount = 20;
            for (let i = 0; i < heartsCount; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.style.left = `${Math.random() * 100}vw`;
                heart.style.animationDelay = `${Math.random() * 5}s`;
                heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                heartsContainer.appendChild(heart);
            }
            
            const canvas = document.getElementById('hoa-roi-canvas');
            const ctx = canvas.getContext('2d');
            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;

            window.addEventListener('resize', () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            });

            const petals = [];
            const numPetals = 50;

            function createPetalImage() {
                const petalCanvas = document.createElement('canvas');
                const petalCtx = petalCanvas.getContext('2d');
                petalCanvas.width = 20; petalCanvas.height = 20;
                petalCtx.beginPath();
                petalCtx.moveTo(10, 0);
                petalCtx.bezierCurveTo(0, 5, 0, 15, 10, 20);
                petalCtx.bezierCurveTo(20, 15, 20, 5, 10, 0);
                const gradient = petalCtx.createRadialGradient(10, 10, 2, 10, 10, 10);
                gradient.addColorStop(0, 'rgba(255, 183, 197, 1)');
                gradient.addColorStop(1, 'rgba(251, 117, 142, 0.7)');
                petalCtx.fillStyle = gradient;
                petalCtx.fill();
                return petalCanvas;
            }
            const petalImage = createPetalImage();

            class Petal {
                constructor() {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height * 2 - height;
                    this.w = 15 + Math.random() * 10;
                    this.h = 10 + Math.random() * 5;
                    this.opacity = this.w / 25;
                    this.xSpeed = 1 + Math.random();
                    this.ySpeed = 1 + Math.random();
                    this.rotation = Math.random() * Math.PI * 2;
                    this.rotationSpeed = Math.random() * 0.02 - 0.01;
                }
                draw() {
                    if (this.y > height || this.x > width) {
                        this.x = -petalImage.width;
                        this.y = Math.random() * height * 2 - height;
                        this.xSpeed = 1 + Math.random();
                        this.ySpeed = 1 + Math.random();
                    }
                    ctx.save();
                    ctx.globalAlpha = this.opacity;
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.rotation);
                    ctx.drawImage(petalImage, -this.w / 2, -this.h / 2, this.w, this.h);
                    ctx.restore();
                }
                animate() {
                    this.x += this.xSpeed;
                    this.y += this.ySpeed;
                    this.rotation += this.rotationSpeed;
                    this.draw();
                }
            }
            for (let i = 0; i < numPetals; i++) petals.push(new Petal());
            function animateLoop() {
                ctx.clearRect(0, 0, width, height);
                petals.forEach(petal => petal.animate());
                requestAnimationFrame(animateLoop);
            }
            animateLoop();
        });

        // Có những thằng lồn ở FPTU ghét tao :)