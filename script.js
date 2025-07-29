document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.team-carousel');
    const cards = document.querySelectorAll('.team-member');
    const prevBtn = document.querySelector('.l');
    const nextBtn = document.querySelector('.r');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 100;
    const visibleCards = 3; // Number of cards visible at once
    
    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.remove('center');
            
            // Calculate the centered position
            const centerPos = Math.floor(visibleCards / 2);
            if (index === currentIndex + centerPos) {
                card.classList.add('center');
            }
        });
    }
    
    function moveCarousel() {
        carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        updateCards();
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > -1) {
            currentIndex--;
            moveCarousel();
        }
        console.log(currentIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        // let visibleCards=2;
        if (currentIndex < cards.length - 2) {
            currentIndex++;
            moveCarousel();
        }
        if(currentIndex==5){
            currentIndex=0;
            moveCarousel()
        }
        console.log(currentIndex);
    });
    
    carousel.style.transition = 'transform 0.5s ease-in-out';
    updateCards(); // Initialize centered card
});




const carousel = document.querySelector('.team-carousel');
        const pauseBtn = document.getElementById('pause');
        const resumeBtn = document.getElementById('resume');
        let isPlaying = true;
        
        pauseBtn.addEventListener('click', () => {
            carousel.style.animationPlayState = 'paused';
            isPlaying = false;
        });
        
        resumeBtn.addEventListener('click', () => {
            carousel.style.animationPlayState = 'running';
            isPlaying = true;
        });
        
        // Добавляем возможность вращения мышью
        let isDragging = false;
        let startX, startY;
        let rotateY = 0;
        let rotateX = 0;
        
        document.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            carousel.style.animation = 'none';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            rotateY += deltaX * 0.5;
            rotateX -= deltaY * 0.2;
            
            carousel.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            
            startX = e.clientX;
            startY = e.clientY;
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            if (!isPlaying) return;
            
            // Возвращаем автоматическое вращение после задержки
            setTimeout(() => {
                if (!isDragging && isPlaying) {
                    carousel.style.animation = 'rotate 20s infinite linear';
                    carousel.style.transform = '';
                }
            }, 2000);
        });

// Projects Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.projects-carousel');
    const projects = document.querySelectorAll('.project');
    const prevBtn = document.querySelector('.project-prev');
    const nextBtn = document.querySelector('.project-next');
    
    let currentIndex = 0;
    let projectWidth = projects[0].offsetWidth + 40; // width + margin
    
    function moveCarousel() {
        carousel.style.transform = `translateX(${-currentIndex * projectWidth}px)`;
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            moveCarousel();
        }
        if(currentIndex==0){
            currentIndex+=4
        }
    });
    
    nextBtn.addEventListener('click', function() {
        console.log(projects.length);
        console.log(currentIndex);
        
        if (currentIndex < projects.length - 3) {
            currentIndex++;
            moveCarousel();
        }
        if(currentIndex>2){
            moveCarousel()
            currentIndex-=4;
        }
    });
    
    // Initialize
    carousel.style.transition = 'transform 0.5s ease-in-out';
});
ing = false;
    document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('partnerTrack');
    const container = document.querySelector('.partners-container');
    const logos = track.querySelectorAll('img');
    
    // Clone logos for seamless looping
    const cloneCount = Math.ceil(container.offsetWidth / (track.offsetWidth / logos.length)) + 1;
    
    for (let i = 0; i < cloneCount; i++) {
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            track.appendChild(clone);
        });
    }
    
    // Animation variables
    let speed = 1;
    let position = 0;
    let animationId;
    let lastTime;
    
    function animate(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        
        position -= speed * (deltaTime / 16); // Normalize speed
        const trackWidth = track.offsetWidth / 2;
        
        // Reset position when we've scrolled one full track width
        if (-position >= trackWidth) {
            position = 0;
        }
        
        track.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animationId = requestAnimationFrame(animate);
    
    // Adjust speed based on container width
    function adjustSpeed() {
        speed = container.offsetWidth * 0.002; // Adjust multiplier to change base speed
    }
    
    window.addEventListener('resize', adjustSpeed);
    adjustSpeed();
});



// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
    document.body.appendChild(menuToggle);
    
    const nav = document.querySelector('.ul');
    const lang = document.querySelector('.lang');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        lang.style.display = nav.classList.contains('active') ? 'none' : 'inline-block';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.li a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            lang.style.display = 'inline-block';
        });
    });
    
    // Adjust team carousel for mobile
    if (window.innerWidth < 768) {
        document.querySelectorAll('.team-member').forEach((member, index) => {
            const angle = (index * 120) * (Math.PI / 180);
            const radius = 180; // Smaller radius for mobile
            member.style.transform = `rotateY(${index * 120}deg) translateZ(${radius}px)`;
        });
    }
});