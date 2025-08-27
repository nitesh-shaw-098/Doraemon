// Doraemon Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const doraemon = document.querySelector('.doraemon-container');
    const speechBubble = document.querySelector('.speech-bubble');
    const greeting = document.querySelector('.greeting');
    
    // Array of greetings in different languages
    const greetings = [
        'こんにちは! 👋',
        'Hello! 👋',
        'Hola! 👋',
        'Bonjour! 👋',
        '안녕하세요! 👋',
        'Ciao! 👋'
    ];
    
    let currentGreetingIndex = 0;
    
    // Change greeting every 4 seconds
    function changeGreeting() {
        currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
        greeting.textContent = greetings[currentGreetingIndex];
        
        // Add a little animation to the speech bubble
        speechBubble.style.transform = 'translateX(-50%) scale(1.1)';
        setTimeout(() => {
            speechBubble.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
    }
    
    // Start greeting rotation
    setInterval(changeGreeting, 4000);
    
    // Click interaction - make Doraemon excited
    doraemon.addEventListener('click', function() {
        // Temporarily speed up animations
        doraemon.style.animationDuration = '1s';
        const wavingArm = document.querySelector('.waving-arm');
        wavingArm.style.animationDuration = '0.5s';
        
        // Change to excited greeting
        greeting.textContent = 'やあ! 🎉';
        greeting.style.color = '#ff4444';
        
        // Reset after 2 seconds
        setTimeout(() => {
            doraemon.style.animationDuration = '4s';
            wavingArm.style.animationDuration = '1.8s';
            greeting.style.color = '#666666';
            greeting.textContent = greetings[currentGreetingIndex];
        }, 2000);
    });
    
    // Add sparkle effect on hover
    doraemon.addEventListener('mouseenter', function() {
        createSparkles();
    });
    
    function createSparkles() {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.fontSize = '1.5rem';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '5';
                
                // Random position around Doraemon
                const x = Math.random() * 300 - 150;
                const y = Math.random() * 300 - 150;
                sparkle.style.left = '50%';
                sparkle.style.top = '50%';
                sparkle.style.transform = `translate(${x}px, ${y}px)`;
                
                // Animation
                sparkle.style.animation = 'sparkleFloat 1.5s ease-out forwards';
                
                doraemon.appendChild(sparkle);
                
                // Remove sparkle after animation
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1500);
            }, i * 100);
        }
    }
    
    // Add sparkle animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translate(var(--x, 0), var(--y, 0)) scale(0);
            }
            50% {
                opacity: 1;
                transform: translate(var(--x, 0), var(--y, 0)) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--x, 0), var(--y, 0)) scale(0) translateY(-50px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add some random eye movements
    function moveEyes() {
        const pupils = document.querySelectorAll('.pupil');
        const directions = ['translateX(-50%) translateY(-2px)', 'translateX(-50%) translateY(2px)', 'translateX(-45%) translateY(0)', 'translateX(-55%) translateY(0)'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        
        pupils.forEach(pupil => {
            pupil.style.transform = randomDirection;
        });
        
        // Reset to center after a moment
        setTimeout(() => {
            pupils.forEach(pupil => {
                pupil.style.transform = 'translateX(-50%)';
            });
        }, 1000);
    }
    
    // Random eye movement every 5-8 seconds
    function scheduleEyeMovement() {
        const delay = Math.random() * 3000 + 5000; // 5-8 seconds
        setTimeout(() => {
            moveEyes();
            scheduleEyeMovement();
        }, delay);
    }
    
    scheduleEyeMovement();
    
    // Add keyboard interaction
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            doraemon.click(); // Trigger the click effect
        }
    });
    
    console.log('🤖 Doraemon is ready! Click on him or press spacebar for a surprise!');
});

const container = document.getElementById('container');
    const numImages = 30; // Number of Doraemons to float

    // Array of 15 Doraemon images
    const imgSources = [
      "assets/doraemon1.png", "assets/doraemon2.png", "assets/doraemon3.png", "assets/doraemon4.png", "assets/doraemon5.png",
      "assets/doraemon6.png", "assets/doraemon7.png", "assets/doraemon8.png", "assets/doraemon9.png", "assets/doraemon10.png",
      "assets/doraemon11.png", "assets/doraemon12.png", "assets/doraemon13.png", "assets/doraemon14.png", "assets/doraemon15.png"
    ];

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < numImages; i++) {
      const img = document.createElement("img");
      img.src = imgSources[Math.floor(Math.random() * imgSources.length)];
      img.className = "doraemon";
      img.style.left = random(0, window.innerWidth - 100) + "px";
      img.style.top = random(0, window.innerHeight - 100) + "px";
      img.style.width = random(60, 140) + "px";
      container.appendChild(img);

      animate(img);
    }

    function animate(element) {
      let x = parseFloat(element.style.left);
      let y = parseFloat(element.style.top);
      let dx = random(-0.5, 0.5);
      let dy = random(-0.5, 0.5);

      function move() {
        x += dx;
        y += dy;

        if (x <= 0 || x >= window.innerWidth - element.width) dx *= -1;
        if (y <= 0 || y >= window.innerHeight - element.height) dy *= -1;

        element.style.left = x + "px";
        element.style.top = y + "px";

        requestAnimationFrame(move);
      }
      move();
    }