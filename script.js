 // Create animated flowers with realistic structure
    function createSunflower(x, y, delay) {
      const flower = document.createElement('div');
      flower.className = 'flower flower-bloom';
      flower.style.left = x + '%';
      flower.style.bottom = y + '%';
      flower.style.animationDelay = delay + 's';
      
      flower.innerHTML = `
        <div class="sunflower-head">🌻</div>
        
          <div class="sunflower-leaf left">🍃</div>
          <div class="sunflower-leaf right">🍃</div>
        
      `;
      
      document.body.appendChild(flower);
    }
    
    function createTulip(x, y, delay, color) {
      const tulipColors = ['🌷', '🌷'];
      const flower = document.createElement('div');
      flower.className = 'flower flower-bloom';
      flower.style.left = x + '%';
      flower.style.bottom = y + '%';
      flower.style.animationDelay = delay + 's';
      
      flower.innerHTML = `
        <div class="tulip-head">${color === 'red' ? '🌷' : '🌷'}</div>
        
          <div class="tulip-leaf left">🍃</div>
          <div class="tulip-leaf right">🍃</div>
        
      `;
      
      document.body.appendChild(flower);
    }
    
    function createFlowers() {
      let delay = 0;
      
      // Create sunflowers rapidly
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const x = Math.random() * 90 + 5;
          const y = Math.random() * 25 + 58;
          createSunflower(x, y, 0);
        }, delay * 150);
        delay++;
      }
      
      // Create tulips rapidly
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const x = Math.random() * 90 + 5;
          const y = Math.random() * 25 + 58;
          const color = Math.random() > 0.5 ? 'red' : 'pink';
          createTulip(x, y, 0, color);
        }, delay * 150);
        delay++;
      }
      
      // Continue adding flowers periodically
      setInterval(() => {
        if (Math.random() > 0.7) {
          const x = Math.random() * 90 + 5;
          const y = Math.random() * 20 + 60;
          if (Math.random() > 0.4) {
            createSunflower(x, y, 0);
          } else {
            createTulip(x, y, 0, Math.random() > 0.5 ? 'red' : 'pink');
          }
        }
      }, 3000);
    }
    
    // Initialize flowers on page load
    window.addEventListener('load', createFlowers);

    const colors = [
      ['#ff0000', '#ff6b6b', '#ff9999'],
      ['#00ff00', '#66ff66', '#99ff99'],
      ['#0080ff', '#66b3ff', '#99ccff'],
      ['#ffff00', '#ffff66', '#ffff99'],
      ['#ff00ff', '#ff66ff', '#ff99ff'],
      ['#00ffff', '#66ffff', '#99ffff'],
      ['#ff6600', '#ff9933', '#ffb366'],
      ['#ff0080', '#ff66b3', '#ff99cc']
    ];

    let musicPlaying = false;
    let fireworksInterval = null;

    function playMusic() {
      const audio = document.getElementById("music");
      const button = event.target;
      
      if (!musicPlaying) {
        audio.play().then(() => {
          console.log("Music playing!");
          musicPlaying = true;
          button.textContent = "⏸️ Pause Music";
         
        }).catch(error => {
          console.error("Audio play failed:", error);
          alert("🎵 Please click again to play music. (Browser autoplay restriction)");
        });
      } else {
        audio.pause();
        musicPlaying = false;
        button.textContent = "🎵 Play Music";
        
      }
    }

    function showSurprise() {
      const button = event.target;
      
      if (!button.classList.contains('active')) {
        alert("🎂 Make a wish! Your future is incredibly bright ✨");
        button.classList.add('active');
        button.textContent = "🎉 Surprise";
        launchFireworks();
      } else {
        button.classList.remove('active');
        button.textContent = "🎂 Surprise";
        stopFireworks();
      }
    }

    function revealSecret() {
      const secretMsg = document.getElementById("secretMsg");
      const button = event.target;
      
      if (secretMsg.style.display !== "block") {
        secretMsg.style.display = "block";
        button.textContent = "💌 Hide Secret";
        
        setTimeout(() => {
          secretMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        launchFireworks();
      } else {
        secretMsg.style.display = "none";
        button.textContent = "💌 Secret";
        stopFireworks();
      }
    }

    function stopFireworks() {
      if (fireworksInterval) {
        clearInterval(fireworksInterval);
        fireworksInterval = null;
      }
    }

    function launchFireworks() {
      stopFireworks(); // Clear any existing interval
      
      const fireworkCount = 12;
      let count = 0;

      // Launch initial batch
      for (let i = 0; i < fireworkCount; i++) {
        setTimeout(createFirework, i * 600);
      }

      // Continue launching fireworks
      fireworksInterval = setInterval(() => {
        createFirework();
      }, 2000);
    }

    function createFirework() {
      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight;
      const endX = startX + (Math.random() - 0.5) * 200;
      const endY = Math.random() * (window.innerHeight * 0.4) + 50;

      launchRocket(startX, startY, endX, endY);
    }

    function launchRocket(startX, startY, endX, endY) {
      const rocket = document.createElement('div');
      rocket.className = 'rocket';
      rocket.style.left = startX + 'px';
      rocket.style.top = startY + 'px';
      document.body.appendChild(rocket);

      const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      const duration = distance / 400;

      let currentY = startY;
      let currentX = startX;
      const startTime = Date.now();

      const trailInterval = setInterval(() => {
        const trail = document.createElement('div');
        trail.className = 'trail';
        trail.style.left = currentX + 'px';
        trail.style.top = currentY + 'px';
        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 500);
      }, 30);

      const animateRocket = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);

        currentX = startX + (endX - startX) * progress;
        currentY = startY + (endY - startY) * progress;

        rocket.style.left = currentX + 'px';
        rocket.style.top = currentY + 'px';

        if (progress < 1) {
          requestAnimationFrame(animateRocket);
        } else {
          clearInterval(trailInterval);
          rocket.remove();
          explode(endX, endY);
        }
      };

      requestAnimationFrame(animateRocket);
    }

    function explode(x, y) {
      const colorSet = colors[Math.floor(Math.random() * colors.length)];
      const particles = Math.random() * 50 + 80;

      const flash = document.createElement('div');
      flash.className = 'flash';
      flash.style.left = (x - 50) + 'px';
      flash.style.top = (y - 50) + 'px';
      flash.style.background = `radial-gradient(circle, ${colorSet[0]}, transparent)`;
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 400);

      for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';

        const angle = (Math.PI * 2 * i) / particles + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 1.5 + 0.8;
        const color = colorSet[Math.floor(Math.random() * colorSet.length)];

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        particle.style.setProperty('--dx', Math.cos(angle) * speed);
        particle.style.setProperty('--dy', Math.sin(angle) * speed);
        particle.style.animation = `explode ${Math.random() * 0.5 + 1}s ease-out forwards`;

        document.body.appendChild(particle);

        if (Math.random() > 0.7) {
          setTimeout(() => createSpark(particle, color), Math.random() * 300);
        }

        setTimeout(() => particle.remove(), 1500);
      }
    }

    function createSpark(parent, color) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      spark.style.left = parent.style.left;
      spark.style.top = parent.style.top;
      spark.style.background = color;
      spark.style.color = color;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 200);
    }