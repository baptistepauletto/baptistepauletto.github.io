// Add some interactive terminal-like behavior
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    const body = document.body;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        if (theme === 'light') {
            body.setAttribute('data-theme', 'light');
            themeIcon.textContent = '☀️';
            themeText.textContent = 'light';
        } else {
            body.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            themeText.textContent = 'shades';
        }
    }

    // Simple typing effect for the cursor
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    // Enhanced skill card interactions
    const skillCards = document.querySelectorAll('.skill-category');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });

        card.addEventListener('mouseleave', function() {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });

    // Enhanced experience card interactions (same as skills)
    const experienceCards = document.querySelectorAll('.experience-item');
    
    experienceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });

        card.addEventListener('mouseleave', function() {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });

    // Experience expand functionality
    const expandBtn = document.getElementById('experienceExpandBtn');
    const olderExperience = document.getElementById('experienceOlder');
    
    if (expandBtn && olderExperience) {
        expandBtn.addEventListener('click', function() {
            const expandText = this.querySelector('.expand-text');
            const expandIndicator = this.querySelector('.expand-indicator');
            
            if (olderExperience.classList.contains('expanded')) {
                // Collapse
                olderExperience.classList.remove('expanded');
                this.classList.remove('expanded');
                expandText.textContent = 'Show more experience';
                expandIndicator.textContent = '[+]';
                setTimeout(() => {
                    olderExperience.style.display = 'none';
                }, 400);
            } else {
                // Expand
                olderExperience.style.display = 'block';
                setTimeout(() => {
                    olderExperience.classList.add('expanded');
                    this.classList.add('expanded');
                    expandText.textContent = 'Show less experience';
                    expandIndicator.textContent = '[-]';
                }, 10);
            }
        });
    }

    // Terminal simulator functionality
    const terminalInput = document.querySelector('.terminal-input');
    const terminalOutput = document.getElementById('terminalOutput');
    
    if (terminalInput && terminalOutput) {
        const commands = {
            help: 'Available commands: help, skills, projects, contact, clear, whoami, date, pwd',
            skills: 'Python, Machine Learning, JavaScript, Data Science, Cloud Platforms, NLP, SQL',
            projects: 'Les Pomponnettes - Necklace Personalization Extension\nSecret Initiative - Coming soon...',
            contact: 'Email: lemaildebaptistepauletto@gmail.com\nGitHub: github.com/baptistepauletto\nLinkedIn: linkedin.com/in/baptiste-pauletto',
            whoami: 'Baptiste Pauletto - Data Scientist & Software Engineer',
            date: new Date().toLocaleString(),
            pwd: '/home/baptistepauletto',
            clear: 'CLEAR_TERMINAL'
        };

        terminalInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-output-line command';
                commandLine.textContent = `bpauletto@dev:~$ ${this.value}`;
                terminalOutput.appendChild(commandLine);

                if (commands[command]) {
                    if (commands[command] === 'CLEAR_TERMINAL') {
                        terminalOutput.innerHTML = '';
                    } else {
                        const outputLine = document.createElement('div');
                        outputLine.className = 'terminal-output-line';
                        outputLine.innerHTML = commands[command].replace(/\n/g, '<br>');
                        terminalOutput.appendChild(outputLine);
                    }
                } else if (command) {
                    const errorLine = document.createElement('div');
                    errorLine.className = 'terminal-output-line error';
                    errorLine.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
                    terminalOutput.appendChild(errorLine);
                }

                this.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }

    // Scramble text effect
    const scrambleElements = document.querySelectorAll('.scramble-text');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    scrambleElements.forEach(element => {
        let originalText = element.innerHTML;
        let isScrambling = false;
        
        element.addEventListener('mouseenter', function() {
            if (isScrambling) return;
            isScrambling = true;
            
            let iterations = 0;
            const maxIterations = 10;
            
            const scrambleInterval = setInterval(() => {
                let scrambledText = '';
                const textContent = originalText.replace(/<[^>]*>/g, ''); // Remove HTML tags for scrambling
                
                for (let i = 0; i < textContent.length; i++) {
                    if (textContent[i] === ' ') {
                        scrambledText += ' ';
                    } else if (iterations < maxIterations && Math.random() < 0.7) {
                        scrambledText += characters[Math.floor(Math.random() * characters.length)];
                    } else {
                        scrambledText += textContent[i];
                    }
                }
                
                // Preserve HTML structure (like cursor span)
                if (originalText.includes('<span')) {
                    element.innerHTML = originalText.replace(textContent, scrambledText);
                } else {
                    element.innerHTML = scrambledText;
                }
                
                iterations++;
                
                if (iterations >= maxIterations + 5) {
                    element.innerHTML = originalText;
                    clearInterval(scrambleInterval);
                    isScrambling = false;
                }
            }, 50);
        });
    });
}); 