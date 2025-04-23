    // Authentication
    const USERNAME = "student";
    const PASSWORD = "tracker2025";
    
    document.getElementById('login-button').addEventListener('click', function() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      if (username === USERNAME && password === PASSWORD) {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        
        // Load saved data if available
        loadSavedProgress();
      } else {
        document.getElementById('error-message').classList.remove('hidden');
        setTimeout(() => {
          document.getElementById('error-message').classList.add('hidden');
        }, 3000);
      }
    });
    
    // Allow login with Enter key
    document.getElementById('password').addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        document.getElementById('login-button').click();
      }
    });
    
    // Tab navigation
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to current tab and content
        this.classList.add('active');
        document.getElementById(this.getAttribute('data-tab') + '-tab').classList.add('active');
      });
    });

    // Progress tracking functions
    function updateProgress(counterId, total) {
      const counterElement = document.getElementById(counterId);
      const currentValue = parseInt(counterElement.textContent);
      
      // Update progress percentage
      const progressItemElement = counterElement.closest('.progress-item');
      const percentageElement = progressItemElement.querySelector('.progress-stats');
      const progressFillElement = progressItemElement.querySelector('.progress-fill');
      
      const percentage = Math.round((currentValue / total) * 100);
      percentageElement.textContent = `${currentValue}/${total} (${percentage}%)`;
      progressFillElement.style.width = `${percentage}%`;
      
      // Save progress data
      saveProgress();
    }
    
    function increment(counterId, total) {
      const counterElement = document.getElementById(counterId);
      let currentValue = parseInt(counterElement.textContent);
      
      if (currentValue < total) {
        currentValue++;
        counterElement.textContent = currentValue;
        updateProgress(counterId, total);
      }
    }
    
    function decrement(counterId, total) {
      const counterElement = document.getElementById(counterId);
      let currentValue = parseInt(counterElement.textContent);
      
      if (currentValue > 0) {
        currentValue--;
        counterElement.textContent = currentValue;
        updateProgress(counterId, total);
      }
    }
    
    // Save and load progress data
    function saveProgress() {
      const progressData = {
        // Lectures data
        gk5: document.getElementById('gk5-counter').textContent,
        english: document.getElementById('english-counter').textContent,
        gk4: document.getElementById('gk4-counter').textContent,
        mock: document.getElementById('mock-counter').textContent,
        
        // Notes data
        notesGk5: document.getElementById('notes-gk5-counter').textContent,
        notesEnglish: document.getElementById('notes-english-counter').textContent,
        notesGk4: document.getElementById('notes-gk4-counter').textContent,
        revision: document.getElementById('revision-counter').textContent
      };
      
      localStorage.setItem('studyProgressData', JSON.stringify(progressData));
    }
    
    function loadSavedProgress() {
      const savedData = localStorage.getItem('studyProgressData');
      
      if (savedData) {
        const progressData = JSON.parse(savedData);
        
        // Set lecture counters to saved values
        document.getElementById('gk5-counter').textContent = progressData.gk5 || 17;
        document.getElementById('english-counter').textContent = progressData.english || 6;
        document.getElementById('gk4-counter').textContent = progressData.gk4 || 12;
        document.getElementById('mock-counter').textContent = progressData.mock || 0;
        
        // Set notes counters to saved values
        document.getElementById('notes-gk5-counter').textContent = progressData.notesGk5 || 8;
        document.getElementById('notes-english-counter').textContent = progressData.notesEnglish || 5;
        document.getElementById('notes-gk4-counter').textContent = progressData.notesGk4 || 10;
        document.getElementById('revision-counter').textContent = progressData.revision || 0;
        
        // Update progress bars for lectures
        updateProgress('gk5-counter', 30);
        updateProgress('english-counter', 30);
        updateProgress('gk4-counter', 30);
        updateProgress('mock-counter', 27);
        
        // Update progress bars for notes
        updateProgress('notes-gk5-counter', 30);
        updateProgress('notes-english-counter', 30);
        updateProgress('notes-gk4-counter', 30);
        updateProgress('revision-counter', 15);
      }
    }