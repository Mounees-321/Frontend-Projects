// DOM Elements
const elements = {
    thanosSnapButton: document.getElementById('thanosSnapButton'),
    ironmanSnapButton: document.getElementById('ironmanSnapButton'),
    avengersContainer: document.getElementById('avengersContainer'),
    statusMessage: document.getElementById('statusMessage'),
    thanosSnap: document.getElementById('thanosSnap'),
    ironmanSnap: document.getElementById('ironmanSnap'),
    thanosText: document.getElementById('thanosText'),
    ironmanText: document.getElementById('ironmanText'),
    gauntletGlow: document.getElementById('gauntletGlow'),
    ironmanGlow: document.getElementById('ironmanGlow')
};

// State management
const state = {
    dustedAvengers: [],
    thanosSnapUsed: false,
    ironmanSnapUsed: false
};

// Initialize
function init() {
    elements.thanosSnapButton.addEventListener('click', handleThanosSnap);
    elements.ironmanSnapButton.addEventListener('click', handleIronmanSnap);
    updateUI();
}

// Update UI based on state
function updateUI() {
    if (state.thanosSnapUsed) {
        elements.thanosSnapButton.disabled = true;
        elements.ironmanSnapButton.disabled = false;
    }
    
    if (state.ironmanSnapUsed) {
        elements.ironmanSnapButton.disabled = true;
    }
}

// Thanos Snap handler
function handleThanosSnap() {
    if (state.thanosSnapUsed) return;
    
    const avengers = Array.from(elements.avengersContainer.querySelectorAll('.avenger:not([data-dusted="yes"])'));
    
    if (avengers.length === 0) {
        showStatusMessage("All Avengers have already been dusted!");
        return;
    }
    
    // Disable buttons during animation
    disableButtons();
    showStatusMessage("Thanos is snapping his fingers...", true);
    
    // Show Thanos snapping fingers
    showCharacter(elements.thanosSnap, elements.thanosText);
    
    // After Thanos appears, start the snap sequence
    setTimeout(() => {
        // Activate effects
        elements.gauntletGlow.classList.add('snap-active');
        
        // Filter to only target avengers who disappeared in Infinity War
        const avengersToDust = avengers.filter(avenger => avenger.dataset.survived === 'no');
        
        // Randomly select half of these avengers to turn to dust
        state.dustedAvengers = avengersToDust
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(avengersToDust.length / 2));
        
        // Dust the avengers
        dustAvengers(state.dustedAvengers);
        
        // Hide Thanos after animation
        setTimeout(() => {
            hideCharacter(elements.thanosSnap, elements.thanosText);
            
            // Update status
            const remaining = document.querySelectorAll('.avenger:not([data-dusted="yes"])').length;
            showStatusMessage(`${state.dustedAvengers.length} Avengers dusted! ${remaining} remain.`);
            
            // Mark Thanos snap as used
            state.thanosSnapUsed = true;
            updateUI();
        }, 1000);
        
        // Remove glow after animation
        setTimeout(() => {
            elements.gauntletGlow.classList.remove('snap-active');
        }, 2000);
    }, 300);
}

// Iron Man Snap handler
function handleIronmanSnap() {
    if (state.ironmanSnapUsed || !state.thanosSnapUsed) return;
    
    if (state.dustedAvengers.length === 0) {
        showStatusMessage("No Avengers to bring back!");
        return;
    }
    
    // Disable buttons during animation
    disableButtons();
    showStatusMessage("Iron Man is snapping his fingers...", true);
    
    // Show Iron Man with gauntlet
    showCharacter(elements.ironmanSnap, elements.ironmanText);
    
    // After Iron Man appears, start the return sequence
    setTimeout(() => {
        // Activate effects
        elements.ironmanGlow.classList.add('ironman-active');
        
        // Return the avengers
        returnAvengers(state.dustedAvengers);
        
        // Hide Iron Man after animation
        setTimeout(() => {
            hideCharacter(elements.ironmanSnap, elements.ironmanText);
            
            // Update status
            showStatusMessage(`${state.dustedAvengers.length} Avengers have returned!`);
            
            // Mark Iron Man snap as used
            state.ironmanSnapUsed = true;
            updateUI();
        }, 1000);
        
        // Remove glow after animation
        setTimeout(() => {
            elements.ironmanGlow.classList.remove('ironman-active');
        }, 2000);
    }, 300);
}

// Helper functions
function disableButtons() {
    elements.thanosSnapButton.disabled = true;
    elements.ironmanSnapButton.disabled = true;
}

function showStatusMessage(message, flicker = false) {
    elements.statusMessage.textContent = message;
    if (flicker) {
        elements.statusMessage.classList.add('flicker');
        setTimeout(() => elements.statusMessage.classList.remove('flicker'), 500);
    }
}

function showCharacter(characterElement, textElement) {
    characterElement.classList.add('character-visible');
    characterElement.classList.add('character-snapping');
    textElement.classList.add('text-visible');
}

function hideCharacter(characterElement, textElement) {
    characterElement.classList.remove('character-visible');
    characterElement.classList.remove('character-snapping');
    textElement.classList.remove('text-visible');
}

function dustAvengers(avengers) {
    avengers.forEach((avenger, index) => {
        const imgContainer = avenger.querySelector('.avenger-img-container');
        const nameElement = avenger.querySelector('.avenger-name');
        
        // Mark as dusted
        avenger.dataset.dusted = "yes";
        
        // Apply dust animation
        imgContainer.style.animation = `turn-to-dust ${0.5 + Math.random() * 1.5}s ease-out forwards`;
        nameElement.style.animation = `turn-to-dust ${0.5 + Math.random() * 1.5}s ease-out forwards`;
        imgContainer.style.animationDelay = `${index * 0.1}s`;
        nameElement.style.animationDelay = `${index * 0.1}s`;
        
        // Create dust particles
        createParticles(imgContainer, index, 'purple');
    });
}

function returnAvengers(avengers) {
    avengers.forEach((avenger, index) => {
        const imgContainer = avenger.querySelector('.avenger-img-container');
        const nameElement = avenger.querySelector('.avenger-name');
        
        // Remove dusted mark
        avenger.dataset.dusted = "no";
        
        // Apply return animation
        imgContainer.style.animation = `return-from-dust ${0.5 + Math.random() * 1.5}s ease-out forwards`;
        nameElement.style.animation = `return-from-dust ${0.5 + Math.random() * 1.5}s ease-out forwards`;
        imgContainer.style.animationDelay = `${index * 0.1}s`;
        nameElement.style.animationDelay = `${index * 0.1}s`;
        
        // Create return particles
        createParticles(imgContainer, index, 'gold');
    });
    
    // Clear dusted avengers
    state.dustedAvengers = [];
}

function createParticles(element, index, color) {
    const rect = element.getBoundingClientRect();
    const particleCount = 10 + Math.floor(Math.random() * 15);
    const particleClass = color === 'purple' ? 'dust-particle' : 'return-particle';
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = particleClass;
            
            // Random size between 2px and 8px
            const size = 2 + Math.random() * 6;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Position near the element
            particle.style.left = `${rect.left + Math.random() * rect.width}px`;
            particle.style.top = `${rect.top + Math.random() * rect.height}px`;
            
            // Random animation for each particle
            const duration = 1 + Math.random() * 2;
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 70;
            const direction = color === 'purple' ? 1 : -1;
            
            particle.style.transition = `all ${duration}s ease-out`;
            document.body.appendChild(particle);
            
            // Animate particle
            setTimeout(() => {
                particle.style.opacity = '0';
                particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance * direction}px)`;
            }, 10);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }, index * 100 + Math.random() * 300);
    }
}

// Initialize the app
init();