/* ==========================================================================
   ULTIMATE BIRTHDAY EXPERIENCE - JAVASCRIPT LOGIC
   Microphone Blow Detection, 3D Polaroids, Canvas Scratchers, Multi-Tab Studio,
   Customizable Birthday Wishes & Scratch Passes, LZ-String URL Compression
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- DEFAULT ASSETS & CONFIGURATION ---
    const defaultPhotos = [
        {
            img: 'assets/photo1.jpg',
            caption: "Golden Hour Beach '23 ✨",
            note: '"That evening we ran toward the waves with sparklers in our hands, laughing so hard our ribs ached. Always keep that radiant laughter alive!"'
        },
        {
            img: 'assets/photo2.jpg',
            caption: "Celebrate & Joy ☕🧁",
            note: '"Our endless cafe conversations over iced matcha and cupcakes. Thank you for always being my safe space and biggest cheerleader."'
        },
        {
            img: 'assets/photo3.jpg',
            caption: "Pure Chaos & Confetti 🥳",
            note: '"Party hats, confetti in our hair, and zero regrets! No one brings energy and pure fun into a room like you do."'
        },
        {
            img: 'assets/photo4.jpg',
            caption: "Summer Days & Daisies 🌼",
            note: '"Under the warm sun with pastel balloons and wild daisies. Grateful for every single season of life spent together."'
        }
    ];

    const defaultCoupons = [
        {
            emoji: '🫂',
            code: 'CODE: BESTIE-FOR-LIFE',
            title: 'Unlimited Free Hugs',
            desc: 'Valid 24/7 for whenever you need a listening ear or comforting warm hug!'
        },
        {
            emoji: '☕🍰',
            code: 'CODE: TREAT-ON-ME',
            title: 'Midnight Food & Cafe Date',
            desc: 'All coffee, pastries & late night street food on me, anywhere you choose!'
        },
        {
            emoji: '🧞‍♂️✨',
            code: 'CODE: WISH-GRANTED-100',
            title: 'The Universal Wish Pass',
            desc: 'Ask me for anything — a roadtrip, a movie binge, or a secret favor — no questions asked!'
        }
    ];

    // Presets for Scratch Coupons
    const couponPresets = {
        couple: [
            { emoji: '❤️', code: 'CODE: FOREVER-YOURS', title: '1000 Kisses & Cozy Cuddles', desc: 'Redeemable anytime you need warmth, romantic cuddles, and tight embraces!' },
            { emoji: '🍕🎬', code: 'CODE: DATE-NIGHT', title: 'Candlelight Dinner & Movie Night', desc: 'Your choice of favorite food, dessert & romantic movie, completely on me!' },
            { emoji: '🌟💍', code: 'CODE: SOULMATE-WISH', title: '1 Dream Vacation / Special Wish', desc: 'Ask me for any surprise dream or weekend getaway — I promise to make it happen!' }
        ],
        bestie: [
            { emoji: '📞😂', code: 'CODE: 2AM-CALL', title: '2 AM Gossip & Late Night Call', desc: 'Guaranteed to pick up anytime you have tea to spill or need to rant!' },
            { emoji: '🍟🥤', code: 'CODE: FREE-TREAT', title: 'Unlimited Fast Food & Momos Treat', desc: 'Burgers, fries, pizza or street food on me whenever your cravings strike!' },
            { emoji: '🚗🗺️', code: 'CODE: ROADTRIP', title: 'Impulsive Road Trip Adventure', desc: 'No excuses, we just get in the car and drive with our favorite playlist on blast!' }
        ],
        sweet: [
            { emoji: '☕📚', code: 'CODE: COZY-VIBE', title: 'Peaceful Cafe & Coffee Date', desc: 'A slow relaxing afternoon with iced matcha, pastries, and peaceful conversation.' },
            { emoji: '🎁✨', code: 'CODE: SURPRISE-GIFT', title: 'A Mystery Surprise Gift', desc: 'A thoughtfully chosen present delivered straight to your doorstep!' },
            { emoji: '🌈💫', code: 'CODE: WISH-MAGIC', title: 'The Golden Wish Pass', desc: '1 unconditional favor or wish granted anytime with zero questions asked!' }
        ]
    };

    const state = {
        recipientName: 'Ananya',
        milestone: 'Level 21',
        birthdate: '',
        senderName: 'Your Best Friend 💛',
        heroWish: 'May your day be filled with endless magic, radiant smiles, and unforgettable moments!',
        coupons: JSON.parse(JSON.stringify(defaultCoupons)),
        letterText: `Happy Birthday to one of the most wonderfully authentic and radiant souls I know! 🌟

Looking back at all the laughter we've shared, the late-night talks, and the quiet moments where no words were needed, I'm reminded of just how blessed everyone in your orbit is to have you. You bring warmth into rooms just by stepping into them.

May this new chapter bring you boundless joy, wild adventures, big dreams fulfilled, and the deep peace of knowing how truly cherished you are. Don't ever dim your spark for anyone.

Keep shining, keep dreaming, and never stop being your amazing, hilarious, kind self!`,
        currentTheme: 'theme-rosegold',
        photos: JSON.parse(JSON.stringify(defaultPhotos)),
        isMusicPlaying: false,
        isCandleBlown: false,
        isCakeCut: false,
        micActive: false,
        poppedBalloons: 0
    };

    // Default birthday to 7 days from now if empty
    const upcomingDate = new Date();
    upcomingDate.setDate(upcomingDate.getDate() + 7);
    state.birthdate = upcomingDate.toISOString().split('T')[0];

    // --- DOM REFERENCES ---
    const body = document.getElementById('main-body');
    const surpriseGate = document.getElementById('surprise-gate-screen');
    const envelope = document.getElementById('envelope-interactive');
    const waxSealBtn = document.getElementById('wax-seal-button');
    const openSurpriseBtn = document.getElementById('open-surprise-btn');
    const mainFlow = document.getElementById('main-content-flow');

    // Music & Theme
    const vinylDisc = document.getElementById('vinyl-disc');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const audioEqualizer = document.getElementById('audio-equalizer');
    const themeMenuBtn = document.getElementById('theme-menu-btn');
    const themeDropdown = document.getElementById('theme-dropdown-menu');
    const currentThemeLabel = document.getElementById('current-theme-name');
    const openCustomizerBtn = document.getElementById('open-customizer-btn');

    // Cake & Candle
    const candleElement = document.getElementById('cake-candle');
    const flameElement = document.getElementById('flame-element');
    const smokeElement = document.getElementById('smoke-element');
    const blowCandleBtn = document.getElementById('blow-candle-btn');
    const cutCakeBtn = document.getElementById('cut-cake-btn');
    const cakeSliceDisplay = document.getElementById('cake-slice-display');
    const wishBanner = document.getElementById('wish-banner');
    const toggleMicBtn = document.getElementById('toggle-mic-btn');
    const micMeterWrapper = document.getElementById('mic-meter-wrapper');
    const micMeterFill = document.getElementById('mic-meter-fill');

    // Letter
    const parchmentLetter = document.getElementById('parchment-letter');
    const openLetterBtn = document.getElementById('open-letter-button');

    // Finale & Balloons
    const balloonSky = document.getElementById('balloon-sky-container');
    const poppedCountDisplay = document.getElementById('popped-count');
    const releaseLanternBtn = document.getElementById('release-lantern-btn');
    const lanternModal = document.getElementById('lantern-wish-modal');
    const sendLanternBtn = document.getElementById('send-lantern-btn');
    const cancelLanternBtn = document.getElementById('cancel-lantern-btn');
    const lanternWishInput = document.getElementById('lantern-wish-input');

    // Studio Modal & Tabs
    const customizerModal = document.getElementById('customizer-modal');
    const closeCustomizerBtn = document.getElementById('close-customizer-btn');
    const studioTabBtns = document.querySelectorAll('.studio-tab-btn');
    const studioTabPanes = document.querySelectorAll('.studio-tab-pane');
    const tabNextBtns = document.querySelectorAll('.tab-next-btn');

    // Studio Inputs
    const inputRecipient = document.getElementById('input-recipient-name');
    const inputMilestone = document.getElementById('input-milestone');
    const inputBirthdate = document.getElementById('input-birthdate');
    const inputSender = document.getElementById('input-sender-name');
    const inputHeroWishes = document.getElementById('input-hero-wishes');
    const inputLetterMsg = document.getElementById('input-letter-msg');

    // Sharing Actions
    const applyChangesBtn = document.getElementById('apply-changes-btn');
    const copyShareLinkBtn = document.getElementById('copy-share-link-btn');
    const shareWhatsappBtn = document.getElementById('share-whatsapp-btn');
    const downloadHtmlBtn = document.getElementById('download-html-btn');
    const shareLinkBox = document.getElementById('share-link-box');
    const shareUrlInput = document.getElementById('share-url-input');
    const copySuccessMsg = document.getElementById('copy-success-msg');

    // Countdown Display
    const unitDays = document.getElementById('unit-days').querySelector('strong');
    const unitHours = document.getElementById('unit-hours').querySelector('strong');
    const unitMins = document.getElementById('unit-mins').querySelector('strong');
    const unitSecs = document.getElementById('unit-secs').querySelector('strong');
    const countdownStatusNote = document.getElementById('countdown-status-note');
    const countdownWrapper = document.getElementById('bday-countdown-widget');
    const bdayFormattedDate = document.getElementById('bday-formatted-date');
    const gateBdayTag = document.getElementById('gate-bday-tag');

    // Canvases
    const ambientCanvas = document.getElementById('ambient-canvas');
    const celebrationCanvas = document.getElementById('celebration-canvas');
    const ambientCtx = ambientCanvas.getContext('2d');
    const celCtx = celebrationCanvas.getContext('2d');

    // ==========================================
    // 1. CANVASES RESIZING & AMBIENT STAR PARTICLES
    // ==========================================
    function resizeCanvases() {
        ambientCanvas.width = window.innerWidth;
        ambientCanvas.height = window.innerHeight;
        celebrationCanvas.width = window.innerWidth;
        celebrationCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvases);
    resizeCanvases();

    const ambientParticles = [];
    for (let i = 0; i < 55; i++) {
        ambientParticles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 2 + 0.6,
            color: Math.random() > 0.4 ? 'rgba(255, 230, 180,' : 'rgba(255, 182, 193,',
            alpha: Math.random() * 0.7 + 0.2,
            speedY: Math.random() * 0.3 + 0.1,
            speedX: (Math.random() - 0.5) * 0.2,
            pulseSpeed: Math.random() * 0.02 + 0.01
        });
    }

    function renderAmbientParticles() {
        ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
        ambientParticles.forEach(p => {
            p.y -= p.speedY;
            p.x += p.speedX;
            p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.05) * 0.005;

            if (p.y < -10) p.y = ambientCanvas.height + 10;
            if (p.x < -10) p.x = ambientCanvas.width + 10;
            if (p.x > ambientCanvas.width + 10) p.x = -10;

            ambientCtx.beginPath();
            ambientCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ambientCtx.fillStyle = `${p.color}${Math.max(0.1, Math.min(0.9, p.alpha))})`;
            ambientCtx.shadowBlur = 8;
            ambientCtx.shadowColor = 'rgba(255, 230, 180, 0.4)';
            ambientCtx.fill();
        });
        requestAnimationFrame(renderAmbientParticles);
    }
    renderAmbientParticles();

    // ==========================================
    // 2. CELEBRATION CONFETTI ENGINE
    // ==========================================
    let confettiList = [];
    const confettiColors = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#facc15', '#ffffff'];

    function createConfettiBurst(count = 80, originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
        if (window.birthdayAudio) window.birthdayAudio.playChime();
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 12 + 4;
            confettiList.push({
                x: originX,
                y: originY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - 3,
                size: Math.random() * 9 + 5,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 15,
                gravity: 0.25,
                drag: 0.96,
                shape: Math.random() > 0.4 ? 'rect' : 'circle',
                alpha: 1,
                decay: Math.random() * 0.012 + 0.008
            });
        }
    }

    function renderCelebration() {
        celCtx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
        for (let i = confettiList.length - 1; i >= 0; i--) {
            const c = confettiList[i];
            c.x += c.vx;
            c.y += c.vy;
            c.vy += c.gravity;
            c.vx *= c.drag;
            c.vy *= c.drag;
            c.rotation += c.rotationSpeed;
            c.alpha -= c.decay;

            if (c.alpha <= 0 || c.y > celebrationCanvas.height + 20) {
                confettiList.splice(i, 1);
                continue;
            }

            celCtx.save();
            celCtx.translate(c.x, c.y);
            celCtx.rotate((c.rotation * Math.PI) / 180);
            celCtx.globalAlpha = Math.max(0, c.alpha);
            celCtx.fillStyle = c.color;

            if (c.shape === 'rect') {
                celCtx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
            } else {
                celCtx.beginPath();
                celCtx.arc(0, 0, c.size / 2.5, 0, Math.PI * 2);
                celCtx.fill();
            }
            celCtx.restore();
        }
        requestAnimationFrame(renderCelebration);
    }
    renderCelebration();

    // ==========================================
    // 3. AUDIO CONTROLS
    // ==========================================
    function setMusicState(playing) {
        state.isMusicPlaying = playing;
        if (playing) {
            vinylDisc.classList.add('spinning');
            audioEqualizer.classList.add('active');
            playIcon.textContent = '⏸';
        } else {
            vinylDisc.classList.remove('spinning');
            audioEqualizer.classList.remove('active');
            playIcon.textContent = '▶';
        }
    }

    function toggleBackgroundMusic() {
        if (!window.birthdayAudio) return;
        const nowPlaying = window.birthdayAudio.toggleMusic();
        setMusicState(nowPlaying);
    }

    vinylDisc.addEventListener('click', toggleBackgroundMusic);
    playPauseBtn.addEventListener('click', toggleBackgroundMusic);

    // ==========================================
    // 4. SCENE 0: UNWRAPPING THE MYSTERY ENVELOPE
    // ==========================================
    function unwrapSurprise() {
        waxSealBtn.classList.add('broken');
        envelope.classList.add('open-anim');

        if (window.birthdayAudio) {
            window.birthdayAudio.playChime();
            window.birthdayAudio.startMusic();
            setMusicState(true);
        }

        createConfettiBurst(120, window.innerWidth / 2, window.innerHeight / 2);

        setTimeout(() => {
            surpriseGate.classList.add('fade-out');
            mainFlow.classList.remove('hidden');

            setTimeout(() => {
                surpriseGate.classList.add('hidden');
                createConfettiBurst(80, window.innerWidth * 0.3, window.innerHeight * 0.4);
                createConfettiBurst(80, window.innerWidth * 0.7, window.innerHeight * 0.4);
            }, 800);
        }, 900);
    }

    waxSealBtn.addEventListener('click', unwrapSurprise);
    openSurpriseBtn.addEventListener('click', unwrapSurprise);

    // ==========================================
    // 5. BIRTHDAY DATE & LIVE COUNTDOWN TIMER
    // ==========================================
    let countdownInterval = null;

    function startBirthdayCountdown() {
        if (countdownInterval) clearInterval(countdownInterval);

        function updateTimer() {
            if (!state.birthdate) return;
            const now = new Date();
            const bdayParts = state.birthdate.split('-');
            const targetYear = now.getFullYear();

            let target = new Date(targetYear, parseInt(bdayParts[1]) - 1, parseInt(bdayParts[2]), 0, 0, 0);

            const diffFromToday = now - target;
            if (diffFromToday > 24 * 60 * 60 * 1000) {
                target = new Date(targetYear + 1, parseInt(bdayParts[1]) - 1, parseInt(bdayParts[2]), 0, 0, 0);
            }

            const options = { month: 'long', day: 'numeric' };
            const prettyDate = target.toLocaleDateString(undefined, options);
            if (bdayFormattedDate) bdayFormattedDate.textContent = `Birthday: ${prettyDate}`;
            if (gateBdayTag) gateBdayTag.textContent = `🎂 Celebration: ${prettyDate}`;

            const isToday = (now.getDate() === target.getDate() && now.getMonth() === target.getMonth());

            if (isToday) {
                countdownWrapper.classList.add('its-birthday-today');
                unitDays.textContent = '🎉';
                unitHours.textContent = 'IT\'S';
                unitMins.textContent = 'YOUR';
                unitSecs.textContent = 'DAY!';
                countdownStatusNote.textContent = '✨ TODAY IS THE BIG DAY! HAPPY BIRTHDAY! 🎂';
                return;
            }

            countdownWrapper.classList.remove('its-birthday-today');
            const diff = target - now;
            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const mins = Math.floor((diff / (1000 * 60)) % 60);
                const secs = Math.floor((diff / 1000) % 60);

                unitDays.textContent = days;
                unitHours.textContent = hours;
                unitMins.textContent = mins;
                unitSecs.textContent = secs;
                countdownStatusNote.textContent = `⏳ ${days} days until your midnight celebration! ✨`;
            }
        }

        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    }

    // ==========================================
    // 6. CAKE & CANDLE BLOWING
    // ==========================================
    function blowOutCandle() {
        if (state.isCandleBlown) return;
        state.isCandleBlown = true;

        flameElement.style.opacity = '0';
        smokeElement.classList.remove('hidden');

        if (window.birthdayAudio) window.birthdayAudio.playCandleBlow();

        const rect = candleElement.getBoundingClientRect();
        createConfettiBurst(100, rect.left + rect.width / 2, rect.top);

        blowCandleBtn.classList.add('hidden');
        cutCakeBtn.classList.remove('hidden');
        wishBanner.classList.remove('hidden');

        stopMicDetection();
    }

    flameElement.addEventListener('click', blowOutCandle);
    candleElement.addEventListener('click', blowOutCandle);
    blowCandleBtn.addEventListener('click', blowOutCandle);

    cutCakeBtn.addEventListener('click', () => {
        if (state.isCakeCut) return;
        state.isCakeCut = true;

        if (window.birthdayAudio) window.birthdayAudio.playCakeCut();

        cakeSliceDisplay.classList.remove('hidden');
        createConfettiBurst(90, window.innerWidth / 2, window.innerHeight * 0.6);
        cutCakeBtn.textContent = '🎉 Cake Enjoyed!';
        cutCakeBtn.style.background = 'rgba(255,255,255,0.15)';
        cutCakeBtn.style.color = '#fff';
    });

    // ==========================================
    // 7. MICROPHONE BLOW DETECTION
    // ==========================================
    let audioStream = null;
    let micAudioContext = null;
    let analyserNode = null;
    let micCheckTimer = null;

    async function startMicDetection() {
        try {
            audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            micAudioContext = new AudioContextClass();
            const source = micAudioContext.createMediaStreamSource(audioStream);
            
            analyserNode = micAudioContext.createAnalyser();
            analyserNode.fftSize = 512;
            source.connect(analyserNode);

            state.micActive = true;
            toggleMicBtn.classList.add('active');
            document.getElementById('mic-label').textContent = 'Listening for your blow...';
            micMeterWrapper.classList.remove('hidden');

            const bufferLength = analyserNode.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            let blowConsecutiveFrames = 0;

            function checkBlow() {
                if (!state.micActive) return;
                analyserNode.getByteFrequencyData(dataArray);

                let sum = 0;
                for (let i = 8; i < bufferLength; i++) sum += dataArray[i];
                const averageVolume = sum / (bufferLength - 8);
                const percent = Math.min(100, (averageVolume / 75) * 100);
                micMeterFill.style.width = `${percent}%`;

                if (averageVolume > 48) {
                    blowConsecutiveFrames++;
                    if (blowConsecutiveFrames > 4) {
                        blowOutCandle();
                        return;
                    }
                } else {
                    blowConsecutiveFrames = Math.max(0, blowConsecutiveFrames - 1);
                }

                micCheckTimer = requestAnimationFrame(checkBlow);
            }
            checkBlow();

        } catch (err) {
            console.warn('Microphone access unavailable or denied:', err);
            alert('Microphone access was denied or is not supported. You can tap the candle or button to blow it out!');
            stopMicDetection();
        }
    }

    function stopMicDetection() {
        state.micActive = false;
        if (micCheckTimer) cancelAnimationFrame(micCheckTimer);
        if (audioStream) {
            audioStream.getTracks().forEach(track => track.stop());
            audioStream = null;
        }
        if (micAudioContext) {
            micAudioContext.close();
            micAudioContext = null;
        }
        toggleMicBtn.classList.remove('active');
        document.getElementById('mic-label').textContent = 'Enable Mic to Blow';
        micMeterWrapper.classList.add('hidden');
    }

    toggleMicBtn.addEventListener('click', () => {
        if (state.micActive) stopMicDetection();
        else startMicDetection();
    });

    // ==========================================
    // 8. 21ST.DEV STYLE POLAROID 3D TILT & FLIP
    // ==========================================
    const polaroidCards = document.querySelectorAll('.polaroid-card');

    polaroidCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
            if (window.birthdayAudio) window.birthdayAudio.playChime();
        });

        card.addEventListener('mousemove', (e) => {
            if (card.classList.contains('is-flipped')) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotX = -(y / rect.height) * 18;
            const rotY = (x / rect.width) * 18;
            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04, 1.04, 1.04)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ==========================================
    // 9. INTERACTIVE CANVAS SCRATCH CARDS
    // ==========================================
    function setupScratchCard(canvasId, statusId, isGolden = false) {
        const canvas = document.getElementById(canvasId);
        const status = document.getElementById(statusId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        let isScratchedCompleted = false;
        let isDrawing = false;

        function drawFoil() {
            ctx.globalCompositeOperation = 'source-over';
            const grad = ctx.createLinearGradient(0, 0, width, height);
            if (isGolden) {
                grad.addColorStop(0, '#fef08a');
                grad.addColorStop(0.5, '#d97706');
                grad.addColorStop(1, '#b45309');
            } else {
                grad.addColorStop(0, '#e2e8f0');
                grad.addColorStop(0.5, '#94a3b8');
                grad.addColorStop(1, '#475569');
            }
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < 40; i++) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 1, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.fillStyle = isGolden ? '#451a03' : '#1e293b';
            ctx.font = 'bold 15px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('✨ SCRATCH WITH MOUSE / FINGER ✨', width / 2, height / 2 + 5);
        }

        drawFoil();

        function scratch(x, y) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 22, 0, Math.PI * 2);
            ctx.fill();

            if (window.birthdayAudio) window.birthdayAudio.playScratch();
            checkPercent();
        }

        function checkPercent() {
            if (isScratchedCompleted) return;
            const imageData = ctx.getImageData(0, 0, width, height);
            const pixels = imageData.data;
            let transparentCount = 0;

            for (let i = 3; i < pixels.length; i += 16) {
                if (pixels[i] === 0) transparentCount++;
            }

            const totalSampled = pixels.length / 16;
            const percent = Math.round((transparentCount / totalSampled) * 100);

            if (percent > 45 && !isScratchedCompleted) {
                isScratchedCompleted = true;
                ctx.clearRect(0, 0, width, height);
                canvas.style.pointerEvents = 'none';
                status.textContent = '🎉 Pass Unlocked! Congratulations!';
                status.style.color = '#4ade80';

                const rect = canvas.getBoundingClientRect();
                createConfettiBurst(50, rect.left + rect.width / 2, rect.top + rect.height / 2);
                if (window.birthdayAudio) window.birthdayAudio.playChime();
            } else if (!isScratchedCompleted) {
                status.textContent = `${percent}% Revealed... keep scratching!`;
            }
        }

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const r = canvas.getBoundingClientRect();
            scratch((e.clientX - r.left) * (canvas.width / r.width), (e.clientY - r.top) * (canvas.height / r.height));
        });

        window.addEventListener('mouseup', () => { isDrawing = false; });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            const r = canvas.getBoundingClientRect();
            scratch((e.clientX - r.left) * (canvas.width / r.width), (e.clientY - r.top) * (canvas.height / r.height));
        });

        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            const t = e.touches[0];
            const r = canvas.getBoundingClientRect();
            scratch((t.clientX - r.left) * (canvas.width / r.width), (t.clientY - r.top) * (canvas.height / r.height));
            e.preventDefault();
        }, { passive: false });

        canvas.addEventListener('touchmove', (e) => {
            if (!isDrawing) return;
            const t = e.touches[0];
            const r = canvas.getBoundingClientRect();
            scratch((t.clientX - r.left) * (canvas.width / r.width), (t.clientY - r.top) * (canvas.height / r.height));
            e.preventDefault();
        }, { passive: false });

        canvas.addEventListener('touchend', () => { isDrawing = false; });
    }

    setupScratchCard('scratch-canvas-1', 'scratch-status-1', false);
    setupScratchCard('scratch-canvas-2', 'scratch-status-2', false);
    setupScratchCard('scratch-canvas-3', 'scratch-status-3', true);

    // ==========================================
    // 10. HEARTFELT UNFOLDING LETTER
    // ==========================================
    function unfoldLetter() {
        if (parchmentLetter.classList.contains('folded')) {
            parchmentLetter.classList.remove('folded');
            if (window.birthdayAudio) window.birthdayAudio.playChime();
            createConfettiBurst(60, window.innerWidth / 2, window.innerHeight * 0.7);
        }
    }

    openLetterBtn.addEventListener('click', unfoldLetter);
    parchmentLetter.addEventListener('click', () => {
        if (parchmentLetter.classList.contains('folded')) unfoldLetter();
    });

    // ==========================================
    // 11. BALLOON POPPING & FINALE
    // ==========================================
    const balloonColors = [
        'linear-gradient(135deg, #f43f5e, #fda4af)',
        'linear-gradient(135deg, #a855f7, #d8b4fe)',
        'linear-gradient(135deg, #38bdf8, #bae6fd)',
        'linear-gradient(135deg, #fb923c, #fed7aa)',
        'linear-gradient(135deg, #34d399, #a7f3d0)',
        'linear-gradient(135deg, #facc15, #fef08a)'
    ];

    function spawnBalloon() {
        if (!balloonSky) return;
        const balloon = document.createElement('div');
        balloon.className = 'interactive-balloon';
        balloon.style.left = `${Math.random() * 85 + 5}%`;
        balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.setProperty('--duration', `${Math.random() * 4 + 7}s`);

        balloon.addEventListener('click', () => {
            state.poppedBalloons++;
            poppedCountDisplay.textContent = state.poppedBalloons;
            if (window.birthdayAudio) window.birthdayAudio.playBalloonPop();

            const rect = balloon.getBoundingClientRect();
            createConfettiBurst(25, rect.left + rect.width / 2, rect.top + rect.height / 2);
            balloon.remove();
        });

        balloonSky.appendChild(balloon);

        setTimeout(() => {
            if (balloon.parentNode) balloon.remove();
        }, 12000);
    }

    setInterval(spawnBalloon, 1800);
    for (let i = 0; i < 4; i++) spawnBalloon();

    releaseLanternBtn.addEventListener('click', () => lanternModal.classList.remove('hidden'));
    cancelLanternBtn.addEventListener('click', () => lanternModal.classList.add('hidden'));

    sendLanternBtn.addEventListener('click', () => {
        lanternModal.classList.add('hidden');
        const wishText = lanternWishInput.value.trim() || 'A beautiful birthday wish';

        const lantern = document.createElement('div');
        lantern.className = 'sky-lantern-item';
        lantern.style.left = `${Math.random() * 60 + 20}%`;
        balloonSky.appendChild(lantern);

        if (window.birthdayAudio) window.birthdayAudio.playChime();
        createConfettiBurst(70, window.innerWidth / 2, window.innerHeight * 0.5);

        alert(`✨ Your wish "${wishText}" is now floating among the stars! May it all come true! ✨`);
        lanternWishInput.value = '';

        setTimeout(() => {
            if (lantern.parentNode) lantern.remove();
        }, 15000);
    });

    // ==========================================
    // 12. THEME SWITCHER
    // ==========================================
    themeMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => themeDropdown.classList.add('hidden'));

    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const chosenTheme = opt.getAttribute('data-theme');
            applyTheme(chosenTheme);
        });
    });

    function applyTheme(themeClass) {
        body.classList.remove('theme-rosegold', 'theme-midnight', 'theme-sunset', 'theme-matcha');
        body.classList.add(themeClass);
        state.currentTheme = themeClass;

        themeOptions.forEach(o => {
            o.classList.toggle('active', o.getAttribute('data-theme') === themeClass);
        });

        const nameMap = {
            'theme-rosegold': 'Rose Gold',
            'theme-midnight': 'Midnight',
            'theme-sunset': 'Sunset Gold',
            'theme-matcha': 'Matcha Sage'
        };
        currentThemeLabel.textContent = nameMap[themeClass] || 'Theme';

        const radio = document.querySelector(`input[name="modal-theme"][value="${themeClass}"]`);
        if (radio) radio.checked = true;
    }

    // ==========================================
    // 13. STUDIO TABS SWITCHING
    // ==========================================
    function switchStudioTab(targetTabId) {
        studioTabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === targetTabId);
        });
        studioTabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === targetTabId);
        });
    }

    studioTabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchStudioTab(btn.getAttribute('data-tab')));
    });

    tabNextBtns.forEach(btn => {
        btn.addEventListener('click', () => switchStudioTab(btn.getAttribute('data-next')));
    });

    // ==========================================
    // 14. IMAGE COMPRESSION & UPLOAD FOR POLAROIDS
    // ==========================================
    function compressImageFile(file, maxWidth = 320, maxHeight = 320, quality = 0.65) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', quality));
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    }

    const photoFileInputs = document.querySelectorAll('.photo-file-input');
    photoFileInputs.forEach(input => {
        input.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const idx = parseInt(input.getAttribute('data-idx')) - 1;
            try {
                const compressedDataUrl = await compressImageFile(file);
                state.photos[idx].img = compressedDataUrl;

                const thumb = document.getElementById(`thumb-prev-${idx + 1}`);
                if (thumb) thumb.src = compressedDataUrl;

                const liveImg = document.getElementById(`polaroid-img-${idx + 1}`);
                if (liveImg) liveImg.src = compressedDataUrl;

                if (window.birthdayAudio) window.birthdayAudio.playChime();
            } catch (err) {
                console.error('Image compression error:', err);
                alert('Could not process this image. Please try another photo.');
            }
        });
    });

    // Real-time caption & note updates from studio
    for (let i = 1; i <= 4; i++) {
        const capInput = document.getElementById(`input-caption-${i}`);
        const noteInput = document.getElementById(`input-note-${i}`);

        if (capInput) {
            capInput.addEventListener('input', () => {
                state.photos[i - 1].caption = capInput.value;
                const liveCap = document.getElementById(`caption-${i}`);
                if (liveCap) liveCap.textContent = capInput.value;
            });
        }

        if (noteInput) {
            noteInput.addEventListener('input', () => {
                state.photos[i - 1].note = noteInput.value;
                const liveNote = document.getElementById(`note-${i}`);
                if (liveNote) liveNote.textContent = noteInput.value;
            });
        }
    }

    // ==========================================
    // 15. SCRATCH COUPONS PRESETS & EDITOR LOGIC
    // ==========================================
    function applyCouponPreset(presetKey) {
        const preset = couponPresets[presetKey];
        if (!preset) return;

        state.coupons = JSON.parse(JSON.stringify(preset));

        // Sync inputs in modal
        for (let i = 1; i <= 3; i++) {
            const c = state.coupons[i - 1];
            const emojiInp = document.getElementById(`input-coupon-emoji-${i}`);
            const codeInp = document.getElementById(`input-coupon-code-${i}`);
            const titleInp = document.getElementById(`input-coupon-title-${i}`);
            const descInp = document.getElementById(`input-coupon-desc-${i}`);

            if (emojiInp) emojiInp.value = c.emoji;
            if (codeInp) codeInp.value = c.code;
            if (titleInp) titleInp.value = c.title;
            if (descInp) descInp.value = c.desc;
        }

        renderCouponsInDOM();
        if (window.birthdayAudio) window.birthdayAudio.playChime();
    }

    const presetCoupleBtn = document.getElementById('preset-couple-btn');
    const presetBestieBtn = document.getElementById('preset-bestie-btn');
    const presetSweetBtn = document.getElementById('preset-sweet-btn');

    if (presetCoupleBtn) presetCoupleBtn.addEventListener('click', () => applyCouponPreset('couple'));
    if (presetBestieBtn) presetBestieBtn.addEventListener('click', () => applyCouponPreset('bestie'));
    if (presetSweetBtn) presetSweetBtn.addEventListener('click', () => applyCouponPreset('sweet'));

    function renderCouponsInDOM() {
        for (let i = 1; i <= 3; i++) {
            const c = state.coupons[i - 1];
            const emojiEl = document.getElementById(`coupon-emoji-${i}`);
            const codeEl = document.getElementById(`coupon-code-${i}`);
            const titleEl = document.getElementById(`coupon-title-${i}`);
            const descEl = document.getElementById(`coupon-desc-${i}`);

            if (emojiEl) emojiEl.textContent = c.emoji;
            if (codeEl) codeEl.textContent = c.code;
            if (titleEl) titleEl.textContent = c.title;
            if (descEl) descEl.textContent = c.desc;
        }
    }

    // Real-time coupon inputs
    for (let i = 1; i <= 3; i++) {
        const emojiInp = document.getElementById(`input-coupon-emoji-${i}`);
        const codeInp = document.getElementById(`input-coupon-code-${i}`);
        const titleInp = document.getElementById(`input-coupon-title-${i}`);
        const descInp = document.getElementById(`input-coupon-desc-${i}`);

        if (emojiInp) {
            emojiInp.addEventListener('input', () => {
                state.coupons[i - 1].emoji = emojiInp.value;
                const el = document.getElementById(`coupon-emoji-${i}`);
                if (el) el.textContent = emojiInp.value;
            });
        }
        if (codeInp) {
            codeInp.addEventListener('input', () => {
                state.coupons[i - 1].code = codeInp.value;
                const el = document.getElementById(`coupon-code-${i}`);
                if (el) el.textContent = codeInp.value;
            });
        }
        if (titleInp) {
            titleInp.addEventListener('input', () => {
                state.coupons[i - 1].title = titleInp.value;
                const el = document.getElementById(`coupon-title-${i}`);
                if (el) el.textContent = titleInp.value;
            });
        }
        if (descInp) {
            descInp.addEventListener('input', () => {
                state.coupons[i - 1].desc = descInp.value;
                const el = document.getElementById(`coupon-desc-${i}`);
                if (el) el.textContent = descInp.value;
            });
        }
    }

    // ==========================================
    // 16. APPLY ALL CUSTOMIZATIONS TO DOM
    // ==========================================
    function applyCustomizations() {
        state.recipientName = inputRecipient.value.trim() || 'Bestie';
        state.milestone = inputMilestone.value.trim() || 'Level 21';
        state.birthdate = inputBirthdate.value || state.birthdate;
        state.senderName = inputSender.value.trim() || 'Your Friend';

        const customHeroWish = inputHeroWishes.value.trim();
        if (customHeroWish) {
            state.heroWish = customHeroWish;
            const heroSubtitle = document.getElementById('hero-tagline-text');
            if (heroSubtitle) heroSubtitle.textContent = customHeroWish;
        }

        const customLetter = inputLetterMsg.value.trim();
        if (customLetter) {
            state.letterText = customLetter;
            document.getElementById('typed-letter-content').innerHTML = `<p>${customLetter.replace(/\n/g, '<br>')}</p>`;
        }

        // Recipient Name in DOM
        document.querySelectorAll('.recipient-name-display').forEach(el => {
            el.textContent = state.recipientName;
        });

        // Wax Seal Initial
        const firstLetter = state.recipientName.charAt(0).toUpperCase() || 'A';
        document.getElementById('seal-letter-text').textContent = firstLetter;

        // Milestone badge
        document.getElementById('milestone-badge-text').textContent = `Celebrating ${state.milestone}`;

        // Sender name
        document.getElementById('letter-sender-name').textContent = state.senderName;

        // Polaroids in DOM
        for (let i = 0; i < 4; i++) {
            const p = state.photos[i];
            const imgEl = document.getElementById(`polaroid-img-${i + 1}`);
            const capEl = document.getElementById(`caption-${i + 1}`);
            const noteEl = document.getElementById(`note-${i + 1}`);

            if (imgEl && p.img) imgEl.src = p.img;
            if (capEl && p.caption) capEl.textContent = p.caption;
            if (noteEl && p.note) noteEl.textContent = p.note;
        }

        // Scratch Coupons in DOM
        renderCouponsInDOM();

        // Theme
        const checkedRadio = document.querySelector('input[name="modal-theme"]:checked');
        if (checkedRadio) applyTheme(checkedRadio.value);

        // Restart countdown with new birthdate
        startBirthdayCountdown();

        createConfettiBurst(80, window.innerWidth / 2, window.innerHeight / 2);
    }

    openCustomizerBtn.addEventListener('click', () => {
        inputRecipient.value = state.recipientName;
        inputMilestone.value = state.milestone;
        inputBirthdate.value = state.birthdate;
        inputSender.value = state.senderName;
        inputHeroWishes.value = state.heroWish;
        inputLetterMsg.value = state.letterText;

        // Sync coupons inputs
        for (let i = 1; i <= 3; i++) {
            const c = state.coupons[i - 1];
            const emojiInp = document.getElementById(`input-coupon-emoji-${i}`);
            const codeInp = document.getElementById(`input-coupon-code-${i}`);
            const titleInp = document.getElementById(`input-coupon-title-${i}`);
            const descInp = document.getElementById(`input-coupon-desc-${i}`);

            if (emojiInp) emojiInp.value = c.emoji;
            if (codeInp) codeInp.value = c.code;
            if (titleInp) titleInp.value = c.title;
            if (descInp) descInp.value = c.desc;
        }

        customizerModal.classList.remove('hidden');
    });

    closeCustomizerBtn.addEventListener('click', () => customizerModal.classList.add('hidden'));

    customizerModal.addEventListener('click', (e) => {
        if (e.target === customizerModal) customizerModal.classList.add('hidden');
    });

    applyChangesBtn.addEventListener('click', () => {
        applyCustomizations();
        customizerModal.classList.add('hidden');
    });

    // ==========================================
    // 17. LZ-STRING COMPRESSED SHARING URL
    // ==========================================
    function generateShareUrl() {
        applyCustomizations();

        const payload = {
            name: state.recipientName,
            milestone: state.milestone,
            bday: state.birthdate,
            from: state.senderName,
            theme: state.currentTheme,
            heroWish: state.heroWish,
            coupons: state.coupons,
            letter: state.letterText,
            photos: state.photos.map(p => ({
                img: p.img,
                cap: p.caption,
                not: p.note
            }))
        };

        const jsonStr = JSON.stringify(payload);
        let compressed = '';

        if (window.LZString) {
            compressed = window.LZString.compressToEncodedURIComponent(jsonStr);
        } else {
            compressed = encodeURIComponent(btoa(unescape(encodeURIComponent(jsonStr))));
        }

        const baseUrl = window.location.href.split('#')[0].split('?')[0];
        return `${baseUrl}#d=${compressed}`;
    }

    copyShareLinkBtn.addEventListener('click', () => {
        const shareUrl = generateShareUrl();
        shareUrlInput.value = shareUrl;
        shareLinkBox.classList.remove('hidden');

        navigator.clipboard.writeText(shareUrl).then(() => {
            copySuccessMsg.classList.remove('hidden');
            setTimeout(() => copySuccessMsg.classList.add('hidden'), 3500);
        }).catch(() => {
            shareUrlInput.select();
            document.execCommand('copy');
        });
    });

    shareWhatsappBtn.addEventListener('click', () => {
        const shareUrl = generateShareUrl();
        const msg = `🎂 Hey ${state.recipientName}! I created a special birthday surprise website for you with our photos, cake & secret scratch passes! Open your surprise here: ${shareUrl}`;
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
    });

    // ==========================================
    // 18. DOWNLOAD STANDALONE HTML FILE
    // ==========================================
    downloadHtmlBtn.addEventListener('click', () => {
        applyCustomizations();

        let fullHtml = document.documentElement.outerHTML;

        const stateInjection = `
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(state)};
        </script>
        `;
        fullHtml = fullHtml.replace('</head>', `${stateInjection}\n</head>`);

        const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${state.recipientName.replace(/\s+/g, '_')}_Birthday_Surprise.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);

        alert(`✨ ${state.recipientName}'s Birthday Website has been downloaded as a standalone HTML file! You can directly send this file to them on WhatsApp! ✨`);
    });

    // ==========================================
    // 19. UNPACK SHARED URL DATA ON LOAD
    // ==========================================
    function unpackSharedData() {
        if (window.__INITIAL_STATE__) {
            Object.assign(state, window.__INITIAL_STATE__);
            applyCustomizations();
            return;
        }

        const hash = window.location.hash;
        if (hash && hash.startsWith('#d=')) {
            const compressed = hash.substring(3);
            try {
                let jsonStr = '';
                if (window.LZString) {
                    jsonStr = window.LZString.decompressFromEncodedURIComponent(compressed);
                } else {
                    jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(compressed))));
                }

                if (jsonStr) {
                    const data = JSON.parse(jsonStr);
                    if (data.name) state.recipientName = data.name;
                    if (data.milestone) state.milestone = data.milestone;
                    if (data.bday) state.birthdate = data.bday;
                    if (data.from) state.senderName = data.from;
                    if (data.theme) state.currentTheme = data.theme;
                    if (data.heroWish) state.heroWish = data.heroWish;
                    if (data.letter) state.letterText = data.letter;

                    if (data.coupons && Array.isArray(data.coupons)) {
                        state.coupons = data.coupons;
                    }

                    if (data.photos && Array.isArray(data.photos)) {
                        data.photos.forEach((p, idx) => {
                            if (idx < 4) {
                                state.photos[idx] = {
                                    img: p.img || state.photos[idx].img,
                                    caption: p.cap || state.photos[idx].caption,
                                    note: p.not || state.photos[idx].note
                                };
                            }
                        });
                    }

                    applyCustomizations();
                    return;
                }
            } catch (err) {
                console.warn('Failed to decompress shared hash data:', err);
            }
        }

        // Fallback: URL Search Params
        const params = new URLSearchParams(window.location.search);
        if (params.has('name')) state.recipientName = params.get('name');
        if (params.has('milestone')) state.milestone = params.get('milestone');
        if (params.has('bday')) state.birthdate = params.get('bday');
        if (params.has('from')) state.senderName = params.get('from');
        if (params.has('theme')) state.currentTheme = params.get('theme');
        if (params.has('wish')) state.heroWish = params.get('wish');
        if (params.has('msg')) {
            try { state.letterText = decodeURIComponent(params.get('msg')); }
            catch (e) { state.letterText = params.get('msg'); }
        }

        applyCustomizations();
    }

    unpackSharedData();
    startBirthdayCountdown();
});
