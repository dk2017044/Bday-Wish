/* ==========================================================================
   ULTIMATE BIRTHDAY EXPERIENCE - JAVASCRIPT LOGIC
   Microphone Blow Detection, 3D Polaroids, Canvas Scratchers, Multi-Tab Studio,
   Customizable Birthday Wishes & Scratch Passes, Gemini AI Text Enhancer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- DEFAULT ASSETS & CONFIGURATION ---
    const defaultPhotos = [
        {
            img: 'assets/IMG_1.jpeg',
            caption: 'Golden Hour Thoughts 🌅',
            note: '"Standing by the quiet waters as dusk settles, lost in thoughts and quiet dreams. You have a calmness in your eyes that makes the world feel peaceful."'
        },
        {
            img: 'assets/IMG_2.jpeg',
            caption: 'Classy Smiles & Pure Charm 🖤',
            note: '"Dressed in black with that effortless radiant smile that can light up any room. Keep smiling always, your happiness means everything to me."'
        },
        {
            img: 'assets/IMG_3.jpeg',
            caption: 'Chasing Blue Skies & Big Dreams 🕶️✨',
            note: '"Sun-drenched, stylish, and looking up at endless horizons. Never stop aiming high and conquering every ambition you set your heart on."'
        },
        {
            img: 'assets/IMG_4.jpeg',
            caption: 'Riverside Glow & Sweet Moments 🌸',
            note: '"Candid smiles by the riverside, gentle breeze and soft sunlight. These simple, pure moments with you are my absolute favorites."'
        }
    ];

    const defaultCoupons = [
        {
            emoji: '🫂❤️',
            code: 'CODE: FOREVER-YOURS',
            title: 'Unlimited Warm Hugs & Cuddles',
            desc: 'Valid 24/7 whenever you feel tired, low, or just need a tight, comforting warm embrace!'
        },
        {
            emoji: '🚗🌙',
            code: 'CODE: MIDNIGHT-RIDE',
            title: 'Late Night Long Drive & Stargazing',
            desc: 'Midnight breeze, our favorite songs playing on loop, and endless talks under the starry sky!'
        },
        {
            emoji: '🧞‍♂️✨',
            code: 'CODE: SOULMATE-WISH',
            title: 'The Golden Secret Wish Pass',
            desc: '1 unconditional wish or favor granted anytime — ask for literally anything, zero questions asked!'
        }
    ];

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

    const defaultBirthdate = '2007-10-19';

    const DEFAULT_STATE = {
        recipientName: 'Ananya',
        milestone: 'Chapter 18',
        birthdate: '2007-10-19',
        senderName: 'Yours, Mine ❤️',
        heroWish: 'May your 18th chapter bring you endless laughter, wildest dreams come true, and all the love you deserve!',
        coupons: JSON.parse(JSON.stringify(defaultCoupons)),
        letterText: `Happy 18th Birthday to the most special person in my universe! 🌟

Turning 18 is the start of an extraordinary new chapter. Looking back at all our unforgettable moments, late-night conversations, and quiet shared glances, I'm constantly reminded of how incredibly lucky I am to have you in my life.

You carry a rare kind of warmth, effortless charm, and genuine goodness that makes everyone around you smile brighter. As you step into adulthood today, promise me you'll never lose that playful spark in your eyes, that infectious laugh, and the big, bold dreams in your heart.

May this year be filled with thrilling adventures, triumphs, good health, and the constant reassurance that no matter where life takes you, I will always be right here cheering for you.

Happy 18th Birthday, handsome! Keep shining brighter every single day.`,
        currentTheme: 'theme-rosegold',
        photos: JSON.parse(JSON.stringify(defaultPhotos)),
        isMusicPlaying: false,
        isCandleBlown: false,
        isCakeCut: false,
        micActive: false,
        poppedBalloons: 0
    };

    const state = JSON.parse(JSON.stringify(DEFAULT_STATE));

    // --- DOM REFERENCES ---
    const body = document.getElementById('main-body');
    const surpriseGate = document.getElementById('surprise-gate-screen');
    const envelope = document.getElementById('envelope-interactive');
    const waxSealBtn = document.getElementById('wax-seal-button');
    const openSurpriseBtn = document.getElementById('open-surprise-btn');
    const openSurpriseBtnText = document.getElementById('open-surprise-btn-text');
    const mainFlow = document.getElementById('main-content-flow');

    // Scene 0 Advance Lock & Countdown Elements
    const gateFloatingBadge = document.getElementById('gate-floating-badge');
    const sealLockIndicator = document.getElementById('seal-lock-indicator');
    const gateAdvancePill = document.getElementById('gate-advance-pill');
    const gateEnvelopeTagline = document.getElementById('gate-envelope-tagline');
    const gateAdvanceChip = document.getElementById('gate-advance-chip');
    const gateAdvanceTimerText = document.getElementById('gate-advance-timer-text');
    const gateInstructionText = document.getElementById('gate-instruction-text');

    // 5-Second Midnight Countdown Overlay Elements
    const countdownOverlay = document.getElementById('midnight-countdown-overlay');
    const countdownOverlayNum = document.getElementById('countdown-overlay-number');
    const countdownOverlayTagline = document.getElementById('countdown-overlay-tagline');

    // Studio Testing Buttons
    const btnPreview5sec = document.getElementById('btn-preview-5sec');
    const btnPreviewAdvance = document.getElementById('btn-preview-advance');
    const btnPreviewAdvanceLabel = document.getElementById('btn-preview-advance-label');

    // Music & Theme
    const vinylDisc = document.getElementById('vinyl-disc');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const audioEqualizer = document.getElementById('audio-equalizer');
    const themeMenuBtn = document.getElementById('theme-menu-btn');
    const themeDropdown = document.getElementById('theme-dropdown-menu');
    const currentThemeLabel = document.getElementById('current-theme-name');
    const openCustomizerBtn = document.getElementById('open-customizer-btn');
    const resealEnvelopeBtn = document.getElementById('reseal-envelope-btn');
    const gateOpenStudioBtn = document.getElementById('gate-open-studio-btn');
    const gateCreatorBadgeBtn = document.getElementById('gate-creator-badge-btn');
    const saveSealGateBtn = document.getElementById('save-seal-gate-btn');
    const btnStudioReset = document.getElementById('btn-studio-reset');
    const btnTab5Reset = document.getElementById('btn-tab5-reset');
    const btnStartFresh = document.getElementById('btn-start-fresh');

    // Cake & Candle
    const candleElement = document.getElementById('cake-candle');
    const flameElement = document.getElementById('flame-element');
    const smokeElement = document.getElementById('smoke-element');
    const blowCandleBtn = document.getElementById('blow-candle-btn');
    const cutCakeBtn = document.getElementById('cut-cake-btn');
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
    // 1. CANVASES RESIZING & AMBIENT PARTICLES
    // ==========================================
    function resizeCanvases() {
        ambientCanvas.width = window.innerWidth;
        ambientCanvas.height = window.innerHeight;
        celebrationCanvas.width = window.innerWidth;
        celebrationCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvases);
    resizeCanvases();

    const isMobileDevice = window.innerWidth < 768;
    const ambientParticles = [];
    const ambientCount = isMobileDevice ? 28 : 50;
    for (let i = 0; i < ambientCount; i++) {
        const isHeart = Math.random() < 0.28;
        ambientParticles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: isHeart ? (Math.random() * 2 + 1.8) : (Math.random() * 2 + 0.6),
            color: Math.random() > 0.4 ? 'rgba(255, 182, 193,' : 'rgba(255, 105, 180,',
            alpha: Math.random() * 0.7 + 0.2,
            speedY: Math.random() * 0.35 + 0.12,
            speedX: (Math.random() - 0.5) * 0.25,
            pulseSpeed: Math.random() * 0.02 + 0.01,
            isHeart
        });
    }

    function renderAmbientParticles() {
        ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
        ambientParticles.forEach(p => {
            p.y -= p.speedY;
            p.x += p.speedX;
            p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.05) * 0.005;

            if (p.y < -15) p.y = ambientCanvas.height + 15;
            if (p.x < -15) p.x = ambientCanvas.width + 15;
            if (p.x > ambientCanvas.width + 15) p.x = -15;

            if (p.isHeart) {
                ambientCtx.save();
                ambientCtx.font = `${Math.round(p.radius * 4.2)}px sans-serif`;
                ambientCtx.textAlign = 'center';
                ambientCtx.textBaseline = 'middle';
                ambientCtx.fillStyle = `rgba(255, 120, 170, ${Math.max(0.15, Math.min(0.85, p.alpha))})`;
                ambientCtx.shadowBlur = 8;
                ambientCtx.shadowColor = 'rgba(255, 77, 141, 0.4)';
                ambientCtx.fillText('♥', p.x, p.y);
                ambientCtx.restore();
            } else {
                ambientCtx.beginPath();
                ambientCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ambientCtx.fillStyle = `${p.color}${Math.max(0.1, Math.min(0.9, p.alpha))})`;
                ambientCtx.fill();
            }
        });
        requestAnimationFrame(renderAmbientParticles);
    }
    renderAmbientParticles();

    // ==========================================
    // 2. CELEBRATION CONFETTI ENGINE (HIGH FPS / SLEEPING LOOP)
    // ==========================================
    let confettiList = [];
    let isCelebrationLoopActive = false;
    const confettiColors = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#facc15', '#ffffff'];

    function startCelebrationLoop() {
        if (!isCelebrationLoopActive) {
            isCelebrationLoopActive = true;
            requestAnimationFrame(renderCelebration);
        }
    }

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
        startCelebrationLoop();
    }

    function renderCelebration() {
        if (confettiList.length === 0) {
            celCtx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
            isCelebrationLoopActive = false;
            return;
        }

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
    // 4. SCENE 0: UNWRAPPING THE MYSTERY ENVELOPE (ADVANCE LOCKED VS READY TO OPEN)
    // ==========================================
    let isAdvanceLocked = false;
    let forcedAdvanceMode = null; // null = dynamic by clock, true/false = manual testing mode
    let isFinal5SecCountdownRunning = false;

    function setGateAdvanceLockState(locked, timeString = '') {
        isAdvanceLocked = locked;
        if (locked) {
            if (sealLockIndicator) sealLockIndicator.classList.remove('hidden');
            if (gateAdvancePill) gateAdvancePill.classList.remove('hidden');
            if (gateAdvanceChip) gateAdvanceChip.classList.remove('hidden');
            if (gateAdvanceTimerText && timeString) gateAdvanceTimerText.textContent = timeString;
            if (waxSealBtn) waxSealBtn.classList.add('is-locked');
            if (openSurpriseBtn) openSurpriseBtn.classList.add('is-locked');
            if (openSurpriseBtnText) openSurpriseBtnText.textContent = '🔒 Locked Until 12:00 AM';
            if (gateFloatingBadge) gateFloatingBadge.textContent = '⏳ Happy Birthday in Advance!';
            if (gateEnvelopeTagline) gateEnvelopeTagline.textContent = 'Surprise locked with love until 12:00:00 AM Midnight! 🕛';
            if (gateInstructionText) {
                gateInstructionText.innerHTML = '🔒 <strong>Happy Birthday in Advance!</strong> Unlocks automatically at 12:00 AM Midnight 🕛';
            }
        } else {
            if (sealLockIndicator) sealLockIndicator.classList.add('hidden');
            if (gateAdvancePill) gateAdvancePill.classList.add('hidden');
            if (gateAdvanceChip) gateAdvanceChip.classList.add('hidden');
            if (waxSealBtn) waxSealBtn.classList.remove('is-locked');
            if (openSurpriseBtn) openSurpriseBtn.classList.remove('is-locked');
            if (openSurpriseBtnText) openSurpriseBtnText.textContent = 'Unwrap My Surprise 🎁';
            if (gateFloatingBadge) gateFloatingBadge.textContent = '💌 Special Delivery for You';
            if (gateEnvelopeTagline) gateEnvelopeTagline.textContent = 'A universe of our favorite memories awaits...';
            if (gateInstructionText) {
                gateInstructionText.innerHTML = '<span class="sparkle-pulse">✨</span> <strong>Tap the Golden Wax Seal</strong> to unwrap your surprise <span class="sparkle-pulse">✨</span>';
            }
        }
    }

    function tryUnwrapSurprise(e) {
        if (e) e.preventDefault();
        unwrapSurprise();
    }

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
            document.body.classList.add('gate-unwrapped');
            if (surpriseGate) {
                surpriseGate.classList.add('fade-out');
                surpriseGate.style.pointerEvents = 'none';
            }
            if (mainFlow) {
                mainFlow.classList.remove('hidden');
                mainFlow.style.display = 'block';
                mainFlow.style.pointerEvents = 'auto';
            }

            setTimeout(() => {
                if (surpriseGate) {
                    surpriseGate.classList.add('hidden');
                    surpriseGate.style.display = 'none';
                    surpriseGate.style.pointerEvents = 'none';
                    surpriseGate.style.visibility = 'hidden';
                    surpriseGate.style.zIndex = '-99999';
                }
                createConfettiBurst(80, window.innerWidth * 0.3, window.innerHeight * 0.4);
                createConfettiBurst(80, window.innerWidth * 0.7, window.innerHeight * 0.4);
            }, 800);
        }, 900);
    }

    function resealEnvelope() {
        document.body.classList.remove('gate-unwrapped');
        if (waxSealBtn) waxSealBtn.classList.remove('broken');
        if (envelope) envelope.classList.remove('open-anim');
        if (surpriseGate) {
            surpriseGate.classList.remove('hidden', 'fade-out');
        }
        if (mainFlow) {
            mainFlow.classList.add('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    waxSealBtn.addEventListener('click', tryUnwrapSurprise);
    openSurpriseBtn.addEventListener('click', tryUnwrapSurprise);
    if (resealEnvelopeBtn) {
        resealEnvelopeBtn.addEventListener('click', resealEnvelope);
    }

    // ==========================================
    // 5. BIRTHDAY DATE & LIVE COUNTDOWN TIMER + 12:00 AM MIDNIGHT AUTO-WISH
    // ==========================================
    let countdownInterval = null;
    let wasCheckedBeforeMidnight = false;
    let hasTriggeredMidnightCelebration = false;

    function showMidnightNotification() {
        let toast = document.getElementById('midnight-toast-banner');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'midnight-toast-banner';
            toast.className = 'midnight-toast-banner';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `
            <div class="midnight-toast-content">
                <span class="midnight-toast-icon">🕛✨🎂</span>
                <div class="midnight-toast-text">
                    <strong>MIDNIGHT 12:00 AM! HAPPY BIRTHDAY!</strong>
                    <span>The wait is over! Today is your special day, may all your wishes come true! 💖</span>
                </div>
                <button class="midnight-toast-close" onclick="this.parentElement.parentElement.classList.remove('show')">✕</button>
            </div>
        `;
        toast.classList.add('show');
        setTimeout(() => { if (toast) toast.classList.remove('show'); }, 14000);
    }

    // Dramatic 5-Second Cinematic Tick-Tick Countdown Overlay
    function trigger5SecondCountdown(onComplete) {
        if (isFinal5SecCountdownRunning) return;
        isFinal5SecCountdownRunning = true;

        if (countdownOverlay) {
            countdownOverlay.classList.remove('hidden');
        }

        let count = 5;
        function tick() {
            if (countdownOverlayNum) {
                countdownOverlayNum.textContent = count;
                countdownOverlayNum.classList.remove('impact-tick');
                void countdownOverlayNum.offsetWidth;
                countdownOverlayNum.classList.add('impact-tick');
            }
            if (countdownOverlayTagline) {
                const taglines = {
                    5: 'Hold your breath... The magic begins in seconds! 💫',
                    4: 'Almost midnight... Get ready! ✨',
                    3: 'Making a birthday wish... 🌟',
                    2: 'Unwrapping your universe... 💌',
                    1: '🕛 12:00 AM IS HERE! 🎂'
                };
                countdownOverlayTagline.textContent = taglines[count] || 'Countdown...';
            }

            if (window.birthdayAudio) {
                try {
                    window.birthdayAudio.playCountdownTick(count);
                } catch (err) {}
            }

            count--;
            if (count >= 1) {
                setTimeout(tick, 1000);
            } else {
                setTimeout(() => {
                    if (countdownOverlayNum) countdownOverlayNum.textContent = '🎉';
                    if (countdownOverlayTagline) countdownOverlayTagline.textContent = '✨ HAPPY BIRTHDAY! 💖';
                    setTimeout(() => {
                        if (countdownOverlay) countdownOverlay.classList.add('hidden');
                        isFinal5SecCountdownRunning = false;
                        setGateAdvanceLockState(false);
                        if (typeof onComplete === 'function') onComplete();
                    }, 800);
                }, 1000);
            }
        }
        tick();
    }

    function triggerMidnightCelebration() {
        // Unlock gate immediately
        setGateAdvanceLockState(false);

        // 1. Audio celebration
        if (window.birthdayAudio) {
            try {
                if (typeof window.birthdayAudio.playCelebrationMelody === 'function') {
                    window.birthdayAudio.playCelebrationMelody();
                } else {
                    window.birthdayAudio.playChime();
                    window.birthdayAudio.startMusic();
                }
                setMusicState(true);
            } catch (e) {
                console.log('Audio autoplay note:', e);
            }
        }

        // 2. Pulse countdown widget with golden midnight glow
        if (countdownWrapper) {
            countdownWrapper.classList.add('midnight-strike');
            countdownWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // 3. Auto-unseal envelope if gate is still active
        if (!document.body.classList.contains('gate-unwrapped')) {
            unwrapSurprise();
        }

        // 4. Sequential celebratory confetti bursts across viewport
        const w = window.innerWidth;
        const h = window.innerHeight;
        createConfettiBurst(120, w * 0.5, h * 0.4);
        setTimeout(() => createConfettiBurst(80, w * 0.2, h * 0.5), 400);
        setTimeout(() => createConfettiBurst(80, w * 0.8, h * 0.5), 800);
        setTimeout(() => createConfettiBurst(100, w * 0.5, h * 0.3), 1300);
        setTimeout(() => createConfettiBurst(70, w * 0.35, h * 0.6), 1800);
        setTimeout(() => createConfettiBurst(70, w * 0.65, h * 0.6), 2300);

        // 5. Grand floating notification
        showMidnightNotification();

        // 6. Reveal Happy Birthday celebration modal
        setTimeout(() => {
            const modal = document.getElementById('birthday-celebration-modal');
            if (modal && modal.classList.contains('hidden')) {
                modal.classList.remove('hidden');
                document.body.classList.add('modal-open');
                createConfettiBurst(90, w * 0.5, h * 0.4);
            }
        }, 1200);
    }

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

            const diff = target.getTime() - now.getTime();

            const totalSecs = Math.max(0, Math.floor(diff / 1000));
            const days = Math.floor(totalSecs / (3600 * 24));
            const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
            const mins = Math.floor((totalSecs % 3600) / 60);
            const secs = totalSecs % 60;

            if (unitDays) unitDays.textContent = days;
            if (unitHours) unitHours.textContent = hours;
            if (unitMins) unitMins.textContent = mins;
            if (unitSecs) unitSecs.textContent = secs;
            if (countdownStatusNote) countdownStatusNote.textContent = days > 0 ? `⏳ ${days} days until birthday celebration! ✨` : '✨ Countdown to midnight celebration! ✨';

            // On the main web app: Keep gate unlocked so creator can test & unwrap anytime!
            setGateAdvanceLockState(false);

            // Final 5-second countdown detection (diff <= 5000 && diff > 0)
            if (diff <= 5000 && diff > 0 && forcedAdvanceMode === null) {
                wasCheckedBeforeMidnight = true;
                if (!isFinal5SecCountdownRunning && !hasTriggeredMidnightCelebration) {
                    trigger5SecondCountdown(() => {
                        hasTriggeredMidnightCelebration = true;
                        triggerMidnightCelebration();
                    });
                }
                return;
            }

            // Unlocked: Midnight has struck or it is birthday daytime
            setGateAdvanceLockState(false);
            countdownWrapper.classList.add('its-birthday-today');
            unitDays.textContent = '🎉';
            unitHours.textContent = 'IT\'S';
            unitMins.textContent = 'YOUR';
            unitSecs.textContent = 'DAY!';
            countdownStatusNote.textContent = '✨ TODAY IS THE BIG DAY! HAPPY BIRTHDAY! 🎂';

            // Situation 1: Person was waiting on the page before midnight -> Auto-celebrate!
            if (!hasTriggeredMidnightCelebration && wasCheckedBeforeMidnight && !isFinal5SecCountdownRunning) {
                hasTriggeredMidnightCelebration = true;
                triggerMidnightCelebration();
            }
            // Situation 2: Person arrived after 12:00 AM -> Gate is unlocked for them to unwrap manually!
        }

        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    }

    // Connect Surprise Studio testing buttons
    if (btnPreview5sec) {
        btnPreview5sec.addEventListener('click', () => {
            trigger5SecondCountdown(() => {
                triggerMidnightCelebration();
            });
            showStatusFeedback('⏳ Playing dramatic 5-second countdown & 12 AM auto-open!', 'success');
        });
    }

    if (btnPreviewAdvance) {
        btnPreviewAdvance.addEventListener('click', () => {
            if (forcedAdvanceMode === null) {
                forcedAdvanceMode = !isAdvanceLocked;
            } else {
                forcedAdvanceMode = !forcedAdvanceMode;
            }
            setGateAdvanceLockState(forcedAdvanceMode, '02h 15m 30s');
            if (btnPreviewAdvanceLabel) {
                btnPreviewAdvanceLabel.textContent = forcedAdvanceMode ? '🔓 Switch to Unlocked' : '🔒 Switch to Advance Lock';
            }
            showStatusFeedback(forcedAdvanceMode ? '🔒 Mode: Advance Locked (Before 12 AM)' : '🔓 Mode: Birthday Unlocked (After 12 AM)', 'info');
        });
    }

    if (btnPreviewMidnight) {
        btnPreviewMidnight.addEventListener('click', () => {
            triggerMidnightCelebration();
            showStatusFeedback('🕛 Simulating 12:00 AM Midnight Celebration Wish!', 'success');
        });
    }

    // Birthdate input is handled via real-time studio sync below

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

        stopMicDetection();
        showToast('🎂 Candle blown! Now slice the birthday cake! 🔪');
    }

    flameElement.addEventListener('click', blowOutCandle);
    candleElement.addEventListener('click', blowOutCandle);
    blowCandleBtn.addEventListener('click', blowOutCandle);

    cutCakeBtn.addEventListener('click', () => {
        state.isCakeCut = true;

        if (window.birthdayAudio) window.birthdayAudio.playCakeCut();

        createConfettiBurst(120, window.innerWidth / 2, window.innerHeight * 0.5);
        cutCakeBtn.textContent = '🎂 Cake Celebrated! 🎉';
        cutCakeBtn.style.background = 'rgba(255,255,255,0.15)';
        cutCakeBtn.style.color = '#fff';

        // Trigger the cinematic Happy Birthday celebration modal
        setTimeout(openCelebrationModal, 350);
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
            showToast('🎙️ Mic access not available. Tap candle to blow it out! 💨');
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
        let lastX = 0;
        let lastY = 0;
        let lastSoundTime = 0;
        let pointsDrawnSinceCheck = 0;

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
            ctx.font = 'bold 14px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('✨ SCRATCH WITH MOUSE / FINGER ✨', width / 2, height / 2 + 5);
        }

        drawFoil();

        function getPos(e) {
            const r = canvas.getBoundingClientRect();
            const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
            const clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : e.clientY;
            const scaleX = width / (r.width || width);
            const scaleY = height / (r.height || height);
            return {
                x: (clientX - r.left) * scaleX,
                y: (clientY - r.top) * scaleY
            };
        }

        function playScratchSfx() {
            const now = Date.now();
            if (now - lastSoundTime > 130) {
                lastSoundTime = now;
                try {
                    if (window.birthdayAudio && typeof window.birthdayAudio.playScratch === 'function') {
                        window.birthdayAudio.playScratch();
                    }
                } catch (err) {}
            }
        }

        function erasePoint(x, y) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 22, 0, Math.PI * 2);
            ctx.fill();
            playScratchSfx();
            pointsDrawnSinceCheck++;
            if (pointsDrawnSinceCheck > 10) {
                pointsDrawnSinceCheck = 0;
                checkPercent();
            }
        }

        function eraseLine(x1, y1, x2, y2) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 44;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            playScratchSfx();
            pointsDrawnSinceCheck += 2;
            if (pointsDrawnSinceCheck > 10) {
                pointsDrawnSinceCheck = 0;
                checkPercent();
            }
        }

        function checkPercent() {
            if (isScratchedCompleted) return;
            try {
                const imageData = ctx.getImageData(0, 0, width, height);
                const pixels = imageData.data;
                let transparentCount = 0;

                for (let i = 3; i < pixels.length; i += 16) {
                    if (pixels[i] === 0) transparentCount++;
                }

                const totalSampled = pixels.length / 16;
                const percent = Math.round((transparentCount / totalSampled) * 100);

                if (percent > 40 && !isScratchedCompleted) {
                    isScratchedCompleted = true;
                    ctx.clearRect(0, 0, width, height);
                    canvas.style.pointerEvents = 'none';
                    if (status) {
                        status.classList.add('unlocked');
                        status.textContent = '🎉 Pass Unlocked! Congratulations!';
                        status.style.color = '#4ade80';
                    }

                    const rect = canvas.getBoundingClientRect();
                    createConfettiBurst(50, rect.left + rect.width / 2, rect.top + rect.height / 2);
                    try {
                        if (window.birthdayAudio && typeof window.birthdayAudio.playChime === 'function') {
                            window.birthdayAudio.playChime();
                        }
                    } catch (e) {}
                } else if (!isScratchedCompleted && status) {
                    status.classList.remove('unlocked');
                    status.textContent = `${percent}% Revealed... keep scratching!`;
                }
            } catch (err) {}
        }

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const pos = getPos(e);
            lastX = pos.x;
            lastY = pos.y;
            erasePoint(pos.x, pos.y);
        });

        window.addEventListener('mouseup', () => {
            if (isDrawing) {
                isDrawing = false;
                checkPercent();
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            const pos = getPos(e);
            eraseLine(lastX, lastY, pos.x, pos.y);
            lastX = pos.x;
            lastY = pos.y;
        });

        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            const pos = getPos(e);
            lastX = pos.x;
            lastY = pos.y;
            erasePoint(pos.x, pos.y);
            if (e.cancelable) e.preventDefault();
        }, { passive: false });

        canvas.addEventListener('touchmove', (e) => {
            if (!isDrawing) return;
            const pos = getPos(e);
            eraseLine(lastX, lastY, pos.x, pos.y);
            lastX = pos.x;
            lastY = pos.y;
            if (e.cancelable) e.preventDefault();
        }, { passive: false });

        canvas.addEventListener('touchend', () => {
            if (isDrawing) {
                isDrawing = false;
                checkPercent();
            }
        });
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

        const popBalloon = (e) => {
            if (e && e.cancelable && e.type !== 'click') e.preventDefault();
            state.poppedBalloons++;
            poppedCountDisplay.textContent = state.poppedBalloons;
            if (window.birthdayAudio) window.birthdayAudio.playBalloonPop();

            const rect = balloon.getBoundingClientRect();
            createConfettiBurst(25, rect.left + rect.width / 2, rect.top + rect.height / 2);
            balloon.remove();
        };

        balloon.addEventListener('pointerdown', popBalloon);

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

        showToast(`🏮 Your wish "${wishText}" is floating among the stars! May it all come true! ✨`, 4500);
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
            'theme-rosegold': 'Cupid Pink 💖',
            'theme-midnight': 'Midnight 🌙',
            'theme-sunset': 'Sunset Gold 🌅',
            'theme-matcha': 'Matcha Sage 🍵'
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

                saveStateToLocalStorage();
                if (window.birthdayAudio) window.birthdayAudio.playChime();
            } catch (err) {
                console.error('Image compression error:', err);
                showToast('⚠️ Could not process this image. Please try another photo.');
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
                saveStateToLocalStorage();
            });
        }

        if (noteInput) {
            noteInput.addEventListener('input', () => {
                state.photos[i - 1].note = noteInput.value;
                const liveNote = document.getElementById(`note-${i}`);
                if (liveNote) liveNote.textContent = noteInput.value;
                saveStateToLocalStorage();
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

        for (let i = 1; i <= 3; i++) {
            const c = state.coupons[i - 1];
            const emojiInp = document.getElementById(`input-coupon-emoji-${i}`);
            const glyphEl = document.getElementById(`coupon-icon-glyph-${i}`);
            const codeInp = document.getElementById(`input-coupon-code-${i}`);
            const titleInp = document.getElementById(`input-coupon-title-${i}`);
            const descInp = document.getElementById(`input-coupon-desc-${i}`);

            if (emojiInp) emojiInp.value = c.emoji;
            if (glyphEl) glyphEl.textContent = c.emoji;
            if (codeInp) codeInp.value = c.code;
            if (titleInp) titleInp.value = c.title;
            if (descInp) descInp.value = c.desc;
        }

        renderCouponsInDOM();
        saveStateToLocalStorage();
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

    // ==========================================
    // AUTOMATIC INTERNAL AI ICON MATCHING ENGINE
    // Automatically detects and updates the icon internally as the user types
    // No manual popover, clicks, or buttons needed from the user
    // ==========================================
    const couponTitleDebounce = {};

    function setCouponEmoji(idx, emojiVal, animate = true) {
        if (!emojiVal) return;
        state.coupons[idx - 1].emoji = emojiVal;

        const emojiInp = document.getElementById(`input-coupon-emoji-${idx}`);
        const glyphEl = document.getElementById(`coupon-icon-glyph-${idx}`);
        const liveEmoji = document.getElementById(`coupon-emoji-${idx}`);
        const badgeBox = document.getElementById(`coupon-icon-btn-${idx}`);

        if (emojiInp) emojiInp.value = emojiVal;
        if (glyphEl) glyphEl.textContent = emojiVal;
        if (liveEmoji) liveEmoji.textContent = emojiVal;

        if (animate && badgeBox) {
            badgeBox.classList.remove('ai-pop');
            void badgeBox.offsetWidth; // re-trigger animation
            badgeBox.classList.add('ai-pop');
        }

        saveStateToLocalStorage();
    }

    async function autoMatchCouponIconInternally(idx, titleText) {
        if (!titleText || !titleText.trim()) {
            setCouponEmoji(idx, '🎟️', false);
            return;
        }

        const trimmed = titleText.trim();

        // 1. Instant 0ms Semantic & Keyword Match (Immediate responsive feedback)
        let matchedEmoji = '🎟️';
        if (window.geminiAssistant && typeof window.geminiAssistant.matchEmojiSemantically === 'function') {
            matchedEmoji = window.geminiAssistant.matchEmojiSemantically(trimmed);
            if (matchedEmoji && matchedEmoji !== '🎟️✨') {
                setCouponEmoji(idx, matchedEmoji, true);
            }
        }

        // 2. Intelligent Gemini AI in the background for deeper context-aware matching
        if (window.geminiAssistant && typeof window.geminiAssistant.suggestEmojiForTitle === 'function' && trimmed.length >= 3) {
            try {
                const aiEmoji = await window.geminiAssistant.suggestEmojiForTitle(trimmed);
                if (aiEmoji && aiEmoji !== matchedEmoji) {
                    setCouponEmoji(idx, aiEmoji, true);
                }
            } catch (err) {
                // Silently keep the semantic match
            }
        }
    }

    // Setup automatic inputs for each coupon (1 to 3)
    for (let i = 1; i <= 3; i++) {
        const emojiInp = document.getElementById(`input-coupon-emoji-${i}`);
        const codeInp = document.getElementById(`input-coupon-code-${i}`);
        const titleInp = document.getElementById(`input-coupon-title-${i}`);
        const descInp = document.getElementById(`input-coupon-desc-${i}`);

        // Hidden input event listener (for presets/compatibility)
        if (emojiInp) {
            emojiInp.addEventListener('input', () => {
                setCouponEmoji(i, emojiInp.value, false);
            });
        }

        // Code input listener
        if (codeInp) {
            codeInp.addEventListener('input', () => {
                state.coupons[i - 1].code = codeInp.value;
                const el = document.getElementById(`coupon-code-${i}`);
                if (el) el.textContent = codeInp.value;
                saveStateToLocalStorage();
            });
        }

        // Title input with 100% automatic internal AI icon matching
        if (titleInp) {
            titleInp.addEventListener('input', () => {
                state.coupons[i - 1].title = titleInp.value;
                const el = document.getElementById(`coupon-title-${i}`);
                if (el) el.textContent = titleInp.value;
                saveStateToLocalStorage();

                // Automatically match icon internally in real time (debounced 350ms)
                clearTimeout(couponTitleDebounce[i]);
                couponTitleDebounce[i] = setTimeout(() => {
                    autoMatchCouponIconInternally(i, titleInp.value);
                }, 350);
            });

            titleInp.addEventListener('change', () => {
                autoMatchCouponIconInternally(i, titleInp.value);
            });

            titleInp.addEventListener('blur', () => {
                autoMatchCouponIconInternally(i, titleInp.value);
            });
        }

        // Description input listener
        if (descInp) {
            descInp.addEventListener('input', () => {
                state.coupons[i - 1].desc = descInp.value;
                const el = document.getElementById(`coupon-desc-${i}`);
                if (el) el.textContent = descInp.value;
                saveStateToLocalStorage();
            });
        }
    }

    // ==========================================
    // 16. GEMINI AI TEXT ENHANCEMENT ACTION HANDLERS
    // ==========================================
    const toneChips = document.querySelectorAll('.tone-chip');
    toneChips.forEach(chip => {
        chip.addEventListener('click', () => {
            toneChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const chosenTone = chip.getAttribute('data-tone');
            if (window.geminiAssistant) {
                window.geminiAssistant.setTone(chosenTone);
            }
        });
    });

    async function triggerAiPolish(button) {
        const targetId = button.getAttribute('data-target');
        const contextType = button.getAttribute('data-context') || 'Birthday Wish';
        const targetElement = document.getElementById(targetId);

        if (!targetElement) return;
        const currentText = targetElement.value || targetElement.textContent || '';

        if (button.classList.contains('loading')) return;

        if (!currentText.trim()) {
            showToast('✏️ Please type some text first so AI can polish it! ✨');
            return;
        }

        const originalBtnHtml = button.innerHTML;
        button.classList.add('loading');
        button.innerHTML = '<span>⏳ Polishing with Gemini AI...</span>';

        const safetyTimer = setTimeout(() => {
            if (button.classList.contains('loading')) {
                button.innerHTML = originalBtnHtml;
                button.classList.remove('loading');
                showToast('⚠️ AI request timed out. Please try again.');
            }
        }, 8000);

        try {
            const polished = await window.geminiAssistant.enhanceText(currentText, contextType);
            clearTimeout(safetyTimer);
            targetElement.value = polished;

            // Trigger input event to update live preview immediately
            targetElement.dispatchEvent(new Event('input', { bubbles: true }));

            button.innerHTML = '<span>🎉 Polished & Emojis Added!</span>';
            if (window.birthdayAudio) window.birthdayAudio.playChime();
            createConfettiBurst(40, window.innerWidth / 2, window.innerHeight / 2);

            setTimeout(() => {
                button.innerHTML = originalBtnHtml;
                button.classList.remove('loading');
            }, 3000);
        } catch (err) {
            clearTimeout(safetyTimer);
            console.error('Gemini Polish Error:', err);
            showToast('⚠️ Could not connect to AI. Please try again.');
            button.innerHTML = originalBtnHtml;
            button.classList.remove('loading');
        }
    }

    // Bind text-only AI polish buttons
    document.querySelectorAll('.btn-ai-polish, .mini-ai-btn').forEach(btn => {
        btn.addEventListener('click', () => triggerAiPolish(btn));
    });

    // ==========================================
    // 16B. FULL PASS AUTO-GENERATION ENGINE (TITLE -> ICON + REWARD + CODE)
    // ==========================================
    async function autoGeneratePassWithAi(idx, button) {
        const titleInp = document.getElementById(`input-coupon-title-${idx}`);
        const descInp = document.getElementById(`input-coupon-desc-${idx}`);
        const codeInp = document.getElementById(`input-coupon-code-${idx}`);

        let currentTitle = titleInp ? titleInp.value.trim() : '';
        if (!currentTitle) {
            const defaultTitles = [
                'Midnight Long Drive & Chai',
                'Cozy Cafe Coffee & Dessert Date',
                'The Universal Golden Wish Pass'
            ];
            currentTitle = defaultTitles[idx - 1] || 'Special Surprise Date';
            if (titleInp) {
                titleInp.value = currentTitle;
                state.coupons[idx - 1].title = currentTitle;
                const liveTitle = document.getElementById(`coupon-title-${idx}`);
                if (liveTitle) liveTitle.textContent = currentTitle;
            }
        }

        if (button.classList.contains('loading')) return;

        const originalBtnHtml = button.innerHTML;
        button.classList.add('loading');
        button.innerHTML = '<span>⏳ Generating Pass...</span>';

        const safetyTimer = setTimeout(() => {
            if (button.classList.contains('loading')) {
                button.innerHTML = originalBtnHtml;
                button.classList.remove('loading');
                showToast('⚠️ AI response timed out. Using smart local template! ✨');
            }
        }, 7000);

        try {
            let generated = null;
            if (window.geminiAssistant && typeof window.geminiAssistant.generateCompletePass === 'function') {
                generated = await window.geminiAssistant.generateCompletePass(currentTitle);
            } else {
                generated = {
                    emoji: '🎟️✨',
                    desc: `Valid 24/7! One unconditional pass for ${currentTitle} whenever you want! No excuses allowed! 💕`,
                    code: `CODE: ${currentTitle.toUpperCase().replace(/[^A-Z0-9]/g, '-').slice(0, 12)}-VIP`
                };
            }

            clearTimeout(safetyTimer);

            if (generated) {
                // 1. Matching Icon / Emoji
                if (generated.emoji) {
                    setCouponEmoji(idx, generated.emoji, true);
                }

                // 2. Secret Reward Message
                if (generated.desc && descInp) {
                    descInp.value = generated.desc;
                    state.coupons[idx - 1].desc = generated.desc;
                    const liveDesc = document.getElementById(`coupon-desc-${idx}`);
                    if (liveDesc) liveDesc.textContent = generated.desc;
                }

                // 3. Secret Code
                if (generated.code && codeInp) {
                    codeInp.value = generated.code;
                    state.coupons[idx - 1].code = generated.code;
                    const liveCode = document.getElementById(`coupon-code-${idx}`);
                    if (liveCode) liveCode.textContent = generated.code;
                }

                saveStateToLocalStorage();
                if (window.birthdayAudio) window.birthdayAudio.playChime();
                createConfettiBurst(40, window.innerWidth / 2, window.innerHeight / 2);
                showToast(`✨ Pass #${idx} icon, secret reward & code generated! 🎉`);

                button.innerHTML = '<span>✅ Pass Generated!</span>';
                setTimeout(() => {
                    button.innerHTML = originalBtnHtml;
                    button.classList.remove('loading');
                }, 2500);
            }
        } catch (err) {
            clearTimeout(safetyTimer);
            console.error('Pass generation error:', err);
            button.innerHTML = originalBtnHtml;
            button.classList.remove('loading');
            showToast('⚠️ Could not generate pass. Please try again.');
        }
    }

    // Bind all Scratch Pass Auto-Generate buttons
    document.querySelectorAll('.btn-coupon-ai').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'), 10) || 1;
            autoGeneratePassWithAi(idx, btn);
        });
    });

    // ==========================================
    // 17. PERSISTENCE ENGINE & AUTO-SAVE (LOCALSTORAGE)
    // ==========================================
    const STORAGE_KEY = 'birthday_surprise_custom_data_v1';
    const GATE_KEY = 'birthday_surprise_gate_opened_v1';

    let autoSaveDebounceTimer = null;
    function saveStateToLocalStorage() {
        clearTimeout(autoSaveDebounceTimer);
        autoSaveDebounceTimer = setTimeout(() => {
            try {
                const payload = {
                    recipientName: state.recipientName,
                    milestone: state.milestone,
                    birthdate: state.birthdate,
                    senderName: state.senderName,
                    heroWish: state.heroWish,
                    letterText: state.letterText,
                    currentTheme: state.currentTheme,
                    coupons: state.coupons,
                    photos: state.photos
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
            } catch (e) {
                console.warn('LocalStorage save failed:', e);
            }
        }, 150);
    }

    function loadStateFromLocalStorage() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return false;
            const data = JSON.parse(raw);
            if (data) {
                if (data.recipientName) state.recipientName = data.recipientName;
                if (data.milestone) state.milestone = data.milestone;
                if (data.birthdate) state.birthdate = data.birthdate;
                if (data.senderName) state.senderName = data.senderName;
                if (data.heroWish) state.heroWish = data.heroWish;
                if (data.letterText) state.letterText = data.letterText;
                if (data.currentTheme) state.currentTheme = data.currentTheme;
                if (Array.isArray(data.coupons)) state.coupons = data.coupons;
                if (Array.isArray(data.photos)) {
                    data.photos.forEach((p, idx) => {
                        if (idx < 4 && state.photos[idx]) {
                            state.photos[idx] = {
                                img: p.img || state.photos[idx].img,
                                caption: p.caption || state.photos[idx].caption,
                                note: p.note || state.photos[idx].note
                            };
                        }
                    });
                }
                return true;
            }
        } catch (e) {
            console.warn('LocalStorage load failed:', e);
        }
        return false;
    }

    function resetToOriginalTemplate(showToastMsg = true) {
        try {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(GATE_KEY);
        } catch (e) {}

        Object.assign(state, JSON.parse(JSON.stringify(DEFAULT_STATE)));
        syncInputsFromState();
        applyCustomizations(false, false);
        resealEnvelope();

        if (showToastMsg) {
            showToast('🔄 Reset to original template! Fresh start ready ✨');
            createConfettiBurst(60, window.innerWidth / 2, window.innerHeight * 0.4);
        }
    }

    function startFreshForNewPerson() {
        state.recipientName = '';
        state.milestone = 'Birthday';
        state.senderName = '';
        state.heroWish = 'Wishing you a magical birthday filled with radiant smiles, endless laughter, and sweet surprises! ✨';
        state.letterText = `Dearest,\n\nHappy Birthday! May this special chapter bring you boundless joy, exciting adventures, and all the happiness in the world.\n\nWith all my love,\n`;

        inputRecipient.value = '';
        inputMilestone.value = 'Birthday';
        inputSender.value = '';
        inputHeroWishes.value = state.heroWish;
        inputLetterMsg.value = state.letterText;

        applyCustomizations(false, false);
        showToast('✨ Cleared demo details! Type your partner\'s name above 💖');
        inputRecipient.focus();
    }

    function syncInputsFromState() {
        inputRecipient.value = state.recipientName;
        inputMilestone.value = state.milestone;
        inputBirthdate.value = state.birthdate || '';
        inputSender.value = state.senderName;
        inputHeroWishes.value = state.heroWish;
        inputLetterMsg.value = state.letterText;

        for (let i = 1; i <= 3; i++) {
            const c = state.coupons[i - 1];
            const emojiInp = document.getElementById(`input-coupon-emoji-${i}`);
            const glyphEl = document.getElementById(`coupon-icon-glyph-${i}`);
            const codeInp = document.getElementById(`input-coupon-code-${i}`);
            const titleInp = document.getElementById(`input-coupon-title-${i}`);
            const descInp = document.getElementById(`input-coupon-desc-${i}`);

            if (emojiInp && c) emojiInp.value = c.emoji;
            if (glyphEl && c) glyphEl.textContent = c.emoji;
            if (codeInp && c) codeInp.value = c.code;
            if (titleInp && c) titleInp.value = c.title;
            if (descInp && c) descInp.value = c.desc;
        }

        for (let i = 1; i <= 4; i++) {
            const p = state.photos[i - 1];
            const capInput = document.getElementById(`input-caption-${i}`);
            const noteInput = document.getElementById(`input-note-${i}`);
            const thumb = document.getElementById(`thumb-prev-${i}`);
            if (capInput && p) capInput.value = p.caption;
            if (noteInput && p) noteInput.value = p.note;
            if (thumb && p && p.img) thumb.src = p.img;
        }

        const radio = document.querySelector(`input[name="modal-theme"][value="${state.currentTheme}"]`);
        if (radio) radio.checked = true;
    }

    // Real-time two-way input synchronization
    inputRecipient.addEventListener('input', () => {
        state.recipientName = inputRecipient.value.trim() || 'Bestie';
        document.querySelectorAll('.recipient-name-display').forEach(el => el.textContent = state.recipientName);
        const firstLetter = state.recipientName.charAt(0).toUpperCase() || 'A';
        const seal = document.getElementById('seal-letter-text');
        if (seal) seal.textContent = firstLetter;
        saveStateToLocalStorage();
    });

    inputMilestone.addEventListener('input', () => {
        state.milestone = inputMilestone.value.trim() || 'Level 21';
        const badge = document.getElementById('milestone-badge-text');
        if (badge) badge.textContent = `Celebrating ${state.milestone}`;
        saveStateToLocalStorage();
    });

    inputBirthdate.addEventListener('input', () => {
        state.birthdate = inputBirthdate.value;
        startBirthdayCountdown();
        saveStateToLocalStorage();
    });

    inputSender.addEventListener('input', () => {
        state.senderName = inputSender.value.trim() || 'Your Friend';
        const sender = document.getElementById('letter-sender-name');
        if (sender) sender.textContent = state.senderName;
        saveStateToLocalStorage();
    });

    inputHeroWishes.addEventListener('input', () => {
        state.heroWish = inputHeroWishes.value.trim();
        const heroSubtitle = document.getElementById('hero-tagline-text');
        if (heroSubtitle) heroSubtitle.textContent = state.heroWish;
        saveStateToLocalStorage();
    });

    inputLetterMsg.addEventListener('input', () => {
        state.letterText = inputLetterMsg.value.trim();
        const letter = document.getElementById('typed-letter-content');
        if (letter) letter.innerHTML = `<p>${state.letterText.replace(/\n/g, '<br>')}</p>`;
        saveStateToLocalStorage();
    });

    document.querySelectorAll('input[name="modal-theme"]').forEach(radio => {
        radio.addEventListener('change', () => {
            applyTheme(radio.value);
            saveStateToLocalStorage();
        });
    });

    // Prevent Enter key from triggering accidental submission
    document.querySelectorAll('#customizer-modal input[type="text"]').forEach(inp => {
        inp.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') e.preventDefault();
        });
    });

    // ==========================================
    // 18. APPLY ALL CUSTOMIZATIONS TO DOM
    // ==========================================
    function applyCustomizations(triggerConfetti = false, persist = false) {
        // Fallbacks from inputs if present
        if (inputRecipient.value.trim()) state.recipientName = inputRecipient.value.trim();
        if (inputMilestone.value.trim()) state.milestone = inputMilestone.value.trim();
        if (inputBirthdate.value) state.birthdate = inputBirthdate.value;
        if (inputSender.value.trim()) state.senderName = inputSender.value.trim();
        if (inputHeroWishes.value.trim()) state.heroWish = inputHeroWishes.value.trim();
        if (inputLetterMsg.value.trim()) state.letterText = inputLetterMsg.value.trim();

        // Update DOM elements
        document.querySelectorAll('.recipient-name-display').forEach(el => {
            el.textContent = state.recipientName;
        });

        const firstLetter = state.recipientName.charAt(0).toUpperCase() || 'A';
        const sealEl = document.getElementById('seal-letter-text');
        if (sealEl) sealEl.textContent = firstLetter;

        const gateBdayTag = document.getElementById('gate-bday-tag');
        if (gateBdayTag && state.birthdate) {
            try {
                const parts = state.birthdate.split('-');
                if (parts.length === 3) {
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const mName = months[parseInt(parts[1], 10) - 1] || '';
                    gateBdayTag.textContent = `🎂 Special Celebration Day • ${parseInt(parts[2], 10)} ${mName}`;
                }
            } catch (e) {}
        }

        const badgeEl = document.getElementById('milestone-badge-text');
        if (badgeEl) badgeEl.textContent = `Celebrating ${state.milestone}`;

        const senderEl = document.getElementById('letter-sender-name');
        if (senderEl) senderEl.textContent = state.senderName;

        const heroSubtitle = document.getElementById('hero-tagline-text');
        if (heroSubtitle) heroSubtitle.textContent = state.heroWish;

        const letterEl = document.getElementById('typed-letter-content');
        if (letterEl) letterEl.innerHTML = `<p>${state.letterText.replace(/\n/g, '<br>')}</p>`;

        for (let i = 0; i < 4; i++) {
            const p = state.photos[i];
            const imgEl = document.getElementById(`polaroid-img-${i + 1}`);
            const capEl = document.getElementById(`caption-${i + 1}`);
            const noteEl = document.getElementById(`note-${i + 1}`);

            if (imgEl && p.img) imgEl.src = p.img;
            if (capEl && p.caption) capEl.textContent = p.caption;
            if (noteEl && p.note) noteEl.textContent = p.note;
        }

        renderCouponsInDOM();
        applyTheme(state.currentTheme);
        startBirthdayCountdown();

        // Only persist to localStorage when explicitly instructed by user action
        if (persist) {
            saveStateToLocalStorage();
        }

        if (triggerConfetti) {
            createConfettiBurst(80, window.innerWidth / 2, window.innerHeight / 2);
        }
    }

    function openCustomizerModal() {
        syncInputsFromState();
        customizerModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    }

    if (openCustomizerBtn) openCustomizerBtn.addEventListener('click', openCustomizerModal);
    if (gateOpenStudioBtn) gateOpenStudioBtn.addEventListener('click', openCustomizerModal);
    if (gateCreatorBadgeBtn) gateCreatorBadgeBtn.addEventListener('click', openCustomizerModal);

    if (btnStudioReset) btnStudioReset.addEventListener('click', () => resetToOriginalTemplate());
    if (btnTab5Reset) btnTab5Reset.addEventListener('click', () => resetToOriginalTemplate());
    if (btnStartFresh) btnStartFresh.addEventListener('click', () => startFreshForNewPerson());

    function closeCustomizer() {
        applyCustomizations(false, false);
        customizerModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }

    closeCustomizerBtn.addEventListener('click', closeCustomizer);

    customizerModal.addEventListener('click', (e) => {
        if (e.target === customizerModal) closeCustomizer();
    });

    applyChangesBtn.addEventListener('click', () => {
        applyCustomizations(true, true);
        customizerModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        // If gate screen is currently active, unwrap it smoothly to preview on home screen
        if (surpriseGate && !surpriseGate.classList.contains('hidden')) {
            unwrapSurprise();
        }
    });

    if (saveSealGateBtn) {
        saveSealGateBtn.addEventListener('click', () => {
            applyCustomizations(false, true);
            customizerModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
            resealEnvelope();
            createConfettiBurst(50, window.innerWidth / 2, window.innerHeight * 0.4);
        });
    }

    // ==========================================
    // CINEMATIC HAPPY BIRTHDAY CELEBRATION POPUP MODAL
    // ==========================================
    const celebrationModal = document.getElementById('birthday-celebration-modal');
    const celebrationWishText = document.getElementById('celebration-modal-wish');
    const closeCelebrationBtn = document.getElementById('close-celebration-btn');
    const claimCelebrationBtn = document.getElementById('claim-celebration-btn');

    function openCelebrationModal() {
        if (!celebrationModal) return;
        if (celebrationWishText) celebrationWishText.textContent = state.heroWish;
        celebrationModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        createConfettiBurst(120, window.innerWidth / 2, window.innerHeight * 0.45);
        if (window.birthdayAudio) window.birthdayAudio.playChime();
    }

    function closeCelebrationModal() {
        if (!celebrationModal) return;
        celebrationModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }

    if (closeCelebrationBtn) closeCelebrationBtn.addEventListener('click', closeCelebrationModal);
    if (claimCelebrationBtn) {
        claimCelebrationBtn.addEventListener('click', () => {
            closeCelebrationModal();
            const polaroids = document.getElementById('polaroid-gallery-section');
            if (polaroids) polaroids.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (celebrationModal) {
        celebrationModal.addEventListener('click', (e) => {
            if (e.target === celebrationModal) closeCelebrationModal();
        });
    }

    // Luxury Toast Notification Engine
    function showToast(message, duration = 3500) {
        const container = document.getElementById('luxury-toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'luxury-toast';
        toast.innerHTML = `<span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 15);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, duration);
    }

    // ==========================================
    // 19. LZ-STRING COMPRESSED SHARING URL
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
    // 19. DOWNLOAD 100% SELF-CONTAINED STANDALONE SURPRISE HTML BUNDLE
    // Zero external dependencies - all CSS, Audio Synth, and Recipient Scripts fully embedded!
    // Opens directly at Scene 0 (The Mystery Wax-Sealed Envelope Gate) for the recipient!
    // ==========================================
    async function generateStandaloneSurpriseBundle() {
        // 1. Synchronize latest values to state and DOM
        applyCustomizations(false, false);

        // 2. Load embedded CSS and Audio
        let cssText = (window.__STANDALONE_CSS__ || '').trim();
        let audioText = (window.__STANDALONE_AUDIO__ || '').trim();

        try {
            if (!cssText) {
                const r = await fetch('style.css');
                if (r.ok) cssText = await r.text();
            }
            if (!audioText) {
                const r = await fetch('audio.js');
                if (r.ok) audioText = await r.text();
            }
        } catch (e) {
            console.warn('Fetch fallback to embedded assets:', e);
        }

        // 3. Clone document to prepare pristine recipient view
        const cloneDoc = document.documentElement.cloneNode(true);

        // Strip external css link tags
        cloneDoc.querySelectorAll('link[rel="stylesheet"][href="style.css"], link[href*="style.css"]').forEach(el => el.remove());

        // Inject inlined stylesheet
        const inlinedStyle = document.createElement('style');
        inlinedStyle.id = 'standalone-surprise-styles';
        inlinedStyle.textContent = cssText + `
        /* Standalone Recipient Mode Polish */
        body.standalone-recipient-view .gate-creator-badge,
        body.standalone-recipient-view .gate-studio-btn,
        body.standalone-recipient-view #open-customizer-btn,
        body.standalone-recipient-view #reseal-envelope-btn,
        body.standalone-recipient-view #customizer-modal,
        body.standalone-recipient-view .floating-edit-btn,
        body.standalone-recipient-view .btn-coupon-ai,
        body.standalone-recipient-view .mini-ai-btn,
        body.standalone-recipient-view .creator-credit {
            display: none !important;
        }
        /* Completely hide top header on mobile & desktop until recipient unseals the envelope */
        body.standalone-recipient-view:not(.gate-unwrapped) .floating-header,
        body.standalone-recipient-view:has(#surprise-gate-screen:not(.hidden):not(.fade-out)) .floating-header {
            display: none !important;
        }
        body.standalone-recipient-view #surprise-gate-screen {
            display: flex !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            z-index: 9999 !important;
        }
        body.standalone-recipient-view #surprise-gate-screen.fade-out {
            opacity: 0 !important;
            pointer-events: none !important;
            transition: opacity 0.8s ease-out !important;
        }
        body.standalone-recipient-view.gate-unwrapped #surprise-gate-screen,
        body.standalone-recipient-view #surprise-gate-screen.hidden,
        body.standalone-recipient-view .gate-overlay.hidden {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            z-index: -99999 !important;
        }
        body.standalone-recipient-view #main-content-flow.hidden {
            display: none !important;
        }
        body.standalone-recipient-view.gate-unwrapped #main-content-flow {
            display: block !important;
            pointer-events: auto !important;
            touch-action: pan-y !important;
            -webkit-overflow-scrolling: touch !important;
            overflow: visible !important;
        }
        /* Mobile Viewport Smooth Touch Scrolling Guarantee for iPhone and Android */
        html {
            overflow-x: hidden !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            overscroll-behavior-y: auto !important;
            height: auto !important;
            min-height: 100% !important;
        }
        body.standalone-recipient-view {
            overflow-x: hidden !important;
            overflow-x: clip !important;
            overflow-y: visible !important;
            -webkit-overflow-scrolling: touch !important;
            touch-action: pan-y !important;
            min-height: 100% !important;
            height: auto !important;
            overscroll-behavior-y: auto !important;
        }
        body.standalone-recipient-view:not(.modal-open) {
            overflow-y: visible !important;
            touch-action: pan-y !important;
        }
        `;
        cloneDoc.querySelector('head').appendChild(inlinedStyle);

        // Prepare body in pristine recipient mode
        const cloneBody = cloneDoc.querySelector('body');
        cloneBody.classList.remove('modal-open');
        cloneBody.className = `${state.currentTheme || 'theme-rosegold'} standalone-recipient-view`;

        // Ensure Surprise Gate screen is active and pristine
        const gateScreen = cloneDoc.querySelector('#surprise-gate-screen');
        if (gateScreen) {
            gateScreen.classList.remove('hidden', 'fade-out');
            gateScreen.removeAttribute('style');
        }

        const envelopeEl = cloneDoc.querySelector('#envelope-interactive');
        if (envelopeEl) envelopeEl.classList.remove('open-anim');

        const waxSealEl = cloneDoc.querySelector('#wax-seal-button');
        if (waxSealEl) waxSealEl.classList.remove('broken');

        // Hide main content until envelope is unsealed
        const mainFlowEl = cloneDoc.querySelector('#main-content-flow');
        if (mainFlowEl) mainFlowEl.classList.add('hidden');

        // Remove studio editor modal so recipient has clean gift experience
        const customizerModalEl = cloneDoc.querySelector('#customizer-modal');
        if (customizerModalEl) customizerModalEl.remove();

        const celebModalEl = cloneDoc.querySelector('#birthday-celebration-modal');
        if (celebModalEl) celebModalEl.classList.add('hidden');

        const lanternModalEl = cloneDoc.querySelector('#lantern-wish-modal');
        if (lanternModalEl) lanternModalEl.classList.add('hidden');

        // Reset candle to lit state
        const flameEl = cloneDoc.querySelector('#flame-element');
        if (flameEl) flameEl.style.opacity = '1';
        const smokeEl = cloneDoc.querySelector('#smoke-element');
        if (smokeEl) smokeEl.classList.add('hidden');
        const cutBtnEl = cloneDoc.querySelector('#cut-cake-btn');
        if (cutBtnEl) cutBtnEl.classList.add('hidden');
        const blowBtnEl = cloneDoc.querySelector('#blow-candle-btn');
        if (blowBtnEl) blowBtnEl.classList.remove('hidden');

        // Reset letter to folded
        const letterEl = cloneDoc.querySelector('#parchment-letter');
        if (letterEl) letterEl.classList.add('folded');

        // Reset scratch statuses
        for (let s = 1; s <= 3; s++) {
            const stEl = cloneDoc.querySelector(`#scratch-status-${s}`);
            if (stEl) {
                stEl.textContent = '✦ Scratch with mouse or finger ✦';
                stEl.style.color = '';
            }
        }

        // Remove old external scripts
        cloneDoc.querySelectorAll('script').forEach(s => s.remove());

        // Build self-contained recipient interactive runtime script
        const sanitizedStateJson = JSON.stringify(state).replace(/<\/script>/gi, '<\\/script>');
        const sanitizedAudioText = audioText.replace(/<\/script>/gi, '<\\/script>');

        const standaloneJs = `
        // 1. EMBEDDED WEB AUDIO API SYNTH ENGINE
        ${sanitizedAudioText}

        // 2. STANDALONE RECIPIENT SURPRISE RUNTIME
        (function() {
            const state = ${sanitizedStateJson};
            let audioEngine = null;
            try {
                audioEngine = new BirthdayAudioEngine();
                window.birthdayAudio = audioEngine;
            } catch (e) {
                console.warn('AudioEngine init error:', e);
            }

            const body = document.getElementById('main-body');
            const surpriseGate = document.getElementById('surprise-gate-screen');
            const envelope = document.getElementById('envelope-interactive');
            const waxSealBtn = document.getElementById('wax-seal-button');
            const openSurpriseBtn = document.getElementById('open-surprise-btn');
            const mainFlow = document.getElementById('main-content-flow');
            const vinylDisc = document.getElementById('vinyl-disc');
            const playPauseBtn = document.getElementById('play-pause-btn');
            const playIcon = document.getElementById('play-icon');
            const audioEqualizer = document.getElementById('audio-equalizer');

            // Canvases
            const ambientCanvas = document.getElementById('ambient-canvas');
            const celebrationCanvas = document.getElementById('celebration-canvas');
            const ambientCtx = ambientCanvas ? ambientCanvas.getContext('2d') : null;
            const celCtx = celebrationCanvas ? celebrationCanvas.getContext('2d') : null;

            function resizeCanvases() {
                if (ambientCanvas) {
                    ambientCanvas.width = window.innerWidth;
                    ambientCanvas.height = window.innerHeight;
                }
                if (celebrationCanvas) {
                    celebrationCanvas.width = window.innerWidth;
                    celebrationCanvas.height = window.innerHeight;
                }
            }
            window.addEventListener('resize', resizeCanvases);
            resizeCanvases();

            // Ambient shimmering particles & romantic floating hearts
            const ambientParticles = [];
            if (ambientCanvas) {
                for (let i = 0; i < 55; i++) {
                    const isHeart = Math.random() < 0.28;
                    ambientParticles.push({
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        radius: isHeart ? (Math.random() * 2 + 1.8) : (Math.random() * 2 + 0.6),
                        color: Math.random() > 0.4 ? 'rgba(255, 182, 193,' : 'rgba(255, 105, 180,',
                        alpha: Math.random() * 0.7 + 0.2,
                        speedY: Math.random() * 0.35 + 0.12,
                        speedX: (Math.random() - 0.5) * 0.25,
                        pulseSpeed: Math.random() * 0.02 + 0.01,
                        isHeart
                    });
                }
                function renderAmbient() {
                    ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
                    ambientParticles.forEach(p => {
                        p.y -= p.speedY;
                        p.x += p.speedX;
                        p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.05) * 0.005;
                        if (p.y < -15) p.y = ambientCanvas.height + 15;
                        if (p.x < -15) p.x = ambientCanvas.width + 15;
                        if (p.x > ambientCanvas.width + 15) p.x = -15;

                        if (p.isHeart) {
                            ambientCtx.save();
                            ambientCtx.font = Math.round(p.radius * 4.2) + 'px sans-serif';
                            ambientCtx.textAlign = 'center';
                            ambientCtx.textBaseline = 'middle';
                            ambientCtx.fillStyle = 'rgba(255, 120, 170, ' + Math.max(0.15, Math.min(0.85, p.alpha)) + ')';
                            ambientCtx.shadowBlur = 10;
                            ambientCtx.shadowColor = 'rgba(255, 77, 141, 0.5)';
                            ambientCtx.fillText('♥', p.x, p.y);
                            ambientCtx.restore();
                        } else {
                            ambientCtx.beginPath();
                            ambientCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                            ambientCtx.fillStyle = p.color + Math.max(0.1, Math.min(0.9, p.alpha)) + ')';
                            ambientCtx.shadowBlur = 8;
                            ambientCtx.shadowColor = 'rgba(255, 230, 180, 0.4)';
                            ambientCtx.fill();
                        }
                    });
                    requestAnimationFrame(renderAmbient);
                }
                renderAmbient();
            }

            // Celebration Confetti (High Performance Sleeping Loop)
            let confettiList = [];
            let isCelebrationLoopActive = false;
            const confettiColors = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#facc15', '#ffffff'];

            function startCelebrationLoop() {
                if (!isCelebrationLoopActive) {
                    isCelebrationLoopActive = true;
                    requestAnimationFrame(renderCelebration);
                }
            }

            function createConfettiBurst(count, originX, originY) {
                count = count || 80;
                originX = originX !== undefined ? originX : window.innerWidth / 2;
                originY = originY !== undefined ? originY : window.innerHeight / 2;
                if (audioEngine) audioEngine.playChime();
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
                startCelebrationLoop();
            }

            function renderCelebration() {
                if (!celCtx) return;
                if (confettiList.length === 0) {
                    celCtx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
                    isCelebrationLoopActive = false;
                    return;
                }
                celCtx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
                for (let i = confettiList.length - 1; i >= 0; i--) {
                    const c = confettiList[i];
                    c.x += c.vx; c.y += c.vy; c.vy += c.gravity; c.vx *= c.drag; c.vy *= c.drag;
                    c.rotation += c.rotationSpeed; c.alpha -= c.decay;
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

            // Music controls
            let isMusicPlaying = false;
            function setMusicState(playing) {
                isMusicPlaying = playing;
                if (vinylDisc) vinylDisc.classList.toggle('spinning', playing);
                if (audioEqualizer) audioEqualizer.classList.toggle('active', playing);
                if (playIcon) playIcon.textContent = playing ? '⏸' : '▶';
            }
            function toggleMusic() {
                if (!audioEngine) return;
                const nowPlaying = audioEngine.toggleMusic();
                setMusicState(nowPlaying);
            }
            if (vinylDisc) vinylDisc.addEventListener('click', toggleMusic);
            if (playPauseBtn) playPauseBtn.addEventListener('click', toggleMusic);

            // Scene 0 Advance Lock & Countdown Elements
            const gateFloatingBadge = document.getElementById('gate-floating-badge');
            const sealLockIndicator = document.getElementById('seal-lock-indicator');
            const gateAdvancePill = document.getElementById('gate-advance-pill');
            const gateEnvelopeTagline = document.getElementById('gate-envelope-tagline');
            const gateAdvanceChip = document.getElementById('gate-advance-chip');
            const gateAdvanceTimerText = document.getElementById('gate-advance-timer-text');
            const gateInstructionText = document.getElementById('gate-instruction-text');
            const openSurpriseBtnText = document.getElementById('open-surprise-btn-text');
            const countdownOverlay = document.getElementById('midnight-countdown-overlay');
            const countdownOverlayNum = document.getElementById('countdown-overlay-number');
            const countdownOverlayTagline = document.getElementById('countdown-overlay-tagline');

            let isAdvanceLocked = false;
            let isFinal5SecCountdownRunning = false;

            function setGateAdvanceLockState(locked, timeString) {
                timeString = timeString || '';
                isAdvanceLocked = locked;
                if (locked) {
                    if (sealLockIndicator) sealLockIndicator.classList.remove('hidden');
                    if (gateAdvancePill) gateAdvancePill.classList.remove('hidden');
                    if (gateAdvanceChip) gateAdvanceChip.classList.remove('hidden');
                    if (gateAdvanceTimerText && timeString) gateAdvanceTimerText.textContent = timeString;
                    if (waxSealBtn) waxSealBtn.classList.add('is-locked');
                    if (openSurpriseBtn) openSurpriseBtn.classList.add('is-locked');
                    if (openSurpriseBtnText) openSurpriseBtnText.textContent = '🔒 Locked Until 12:00 AM';
                    if (gateFloatingBadge) gateFloatingBadge.textContent = '⏳ Happy Birthday in Advance!';
                    if (gateEnvelopeTagline) gateEnvelopeTagline.textContent = 'Surprise locked with love until 12:00:00 AM Midnight! 🕛';
                    if (gateInstructionText) {
                        gateInstructionText.innerHTML = '🔒 <strong>Happy Birthday in Advance!</strong> Unlocks automatically at 12:00 AM Midnight 🕛';
                    }
                } else {
                    if (sealLockIndicator) sealLockIndicator.classList.add('hidden');
                    if (gateAdvancePill) gateAdvancePill.classList.add('hidden');
                    if (gateAdvanceChip) gateAdvanceChip.classList.add('hidden');
                    if (waxSealBtn) waxSealBtn.classList.remove('is-locked');
                    if (openSurpriseBtn) openSurpriseBtn.classList.remove('is-locked');
                    if (openSurpriseBtnText) openSurpriseBtnText.textContent = 'Unwrap My Surprise 🎁';
                    if (gateFloatingBadge) gateFloatingBadge.textContent = '💌 Special Delivery for You';
                    if (gateEnvelopeTagline) gateEnvelopeTagline.textContent = 'A universe of our favorite memories awaits...';
                    if (gateInstructionText) {
                        gateInstructionText.innerHTML = '<span class="sparkle-pulse">✨</span> <strong>Tap the Golden Wax Seal</strong> to unwrap your surprise <span class="sparkle-pulse">✨</span>';
                    }
                }
            }

            function tryUnwrapSurprise(e) {
                if (isAdvanceLocked) {
                    if (e && e.preventDefault) e.preventDefault();
                    if (waxSealBtn) {
                        waxSealBtn.classList.remove('shake-lock');
                        void waxSealBtn.offsetWidth;
                        waxSealBtn.classList.add('shake-lock');
                    }
                    if (audioEngine) audioEngine.playLocked();
                    return;
                }
                unwrapSurprise();
            }

            // Envelope unwrapping
            function unwrapSurprise() {
                if (waxSealBtn) waxSealBtn.classList.add('broken');
                if (envelope) envelope.classList.add('open-anim');
                if (audioEngine) {
                    audioEngine.playChime();
                    audioEngine.startMusic();
                    setMusicState(true);
                }
                createConfettiBurst(120, window.innerWidth / 2, window.innerHeight / 2);

                setTimeout(() => {
                    document.body.classList.add('gate-unwrapped');
                    if (surpriseGate) {
                        surpriseGate.classList.add('fade-out');
                        surpriseGate.style.pointerEvents = 'none';
                    }
                    if (mainFlow) {
                        mainFlow.classList.remove('hidden');
                        mainFlow.style.display = 'block';
                        mainFlow.style.pointerEvents = 'auto';
                    }

                    setTimeout(() => {
                        if (surpriseGate) {
                            surpriseGate.classList.add('hidden');
                            surpriseGate.style.display = 'none';
                            surpriseGate.style.pointerEvents = 'none';
                            surpriseGate.style.visibility = 'hidden';
                            surpriseGate.style.zIndex = '-99999';
                        }
                        createConfettiBurst(80, window.innerWidth * 0.3, window.innerHeight * 0.4);
                        createConfettiBurst(80, window.innerWidth * 0.7, window.innerHeight * 0.4);
                    }, 800);
                }, 650);
            }
            if (waxSealBtn) waxSealBtn.addEventListener('click', tryUnwrapSurprise);
            if (openSurpriseBtn) openSurpriseBtn.addEventListener('click', tryUnwrapSurprise);

            // Cake & Candle
            const flame = document.getElementById('flame-element');
            const candle = document.getElementById('cake-candle');
            const smoke = document.getElementById('smoke-element');
            const blowBtn = document.getElementById('blow-candle-btn');
            const cutBtn = document.getElementById('cut-cake-btn');
            const celebrationModal = document.getElementById('birthday-celebration-modal');

            function blowCandle() {
                if (flame) flame.style.opacity = '0';
                if (smoke) smoke.classList.remove('hidden');
                if (blowBtn) blowBtn.classList.add('hidden');
                if (cutBtn) cutBtn.classList.remove('hidden');
                if (audioEngine) audioEngine.playCandleBlow();
                createConfettiBurst(80, window.innerWidth / 2, window.innerHeight * 0.45);
            }
            if (flame) flame.addEventListener('click', blowCandle);
            if (candle) candle.addEventListener('click', blowCandle);
            if (blowBtn) blowBtn.addEventListener('click', blowCandle);

            if (cutBtn) {
                cutBtn.addEventListener('click', () => {
                    if (audioEngine) audioEngine.playCakeCut();
                    createConfettiBurst(120, window.innerWidth / 2, window.innerHeight * 0.5);
                    cutBtn.textContent = '🎂 Cake Celebrated! 🎉';
                    cutBtn.style.background = 'rgba(255,255,255,0.2)';
                    if (celebrationModal) {
                        setTimeout(() => {
                            celebrationModal.classList.remove('hidden');
                            document.body.classList.add('modal-open');
                            createConfettiBurst(100, window.innerWidth / 2, window.innerHeight * 0.4);
                        }, 400);
                    }
                });
            }
            const closeCelebBtn = document.getElementById('close-celebration-btn');
            const claimCelebBtn = document.getElementById('claim-celebration-btn');
            function closeCeleb() {
                if (celebrationModal) celebrationModal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            }
            if (closeCelebBtn) closeCelebBtn.addEventListener('click', closeCeleb);
            if (claimCelebBtn) {
                claimCelebBtn.addEventListener('click', () => {
                    closeCeleb();
                    const polaroids = document.getElementById('polaroid-gallery-section');
                    if (polaroids) polaroids.scrollIntoView({ behavior: 'smooth' });
                });
            }
            if (celebrationModal) {
                celebrationModal.addEventListener('click', (e) => {
                    if (e.target === celebrationModal) closeCeleb();
                });
            }

            // Polaroid 3D Tilt & Flip
            document.querySelectorAll('.polaroid-card').forEach(card => {
                card.addEventListener('click', () => {
                    card.classList.toggle('is-flipped');
                    if (audioEngine) audioEngine.playChime();
                });
                card.addEventListener('mousemove', (e) => {
                    if (card.classList.contains('is-flipped')) return;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    card.style.transform = 'perspective(1000px) rotateX(' + (-(y / rect.height) * 18) + 'deg) rotateY(' + ((x / rect.width) * 18) + 'deg) scale3d(1.04, 1.04, 1.04)';
                });
                card.addEventListener('mouseleave', () => { card.style.transform = ''; });
            });

            // Scratch cards
            function initScratch(canvasId, statusId, isGolden) {
                const canvas = document.getElementById(canvasId);
                const status = document.getElementById(statusId);
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                const w = canvas.width;
                const h = canvas.height;
                let finished = false;
                let drawing = false;
                let lastX = 0;
                let lastY = 0;
                let lastSound = 0;
                let pointsCount = 0;

                const grad = ctx.createLinearGradient(0, 0, w, h);
                if (isGolden) {
                    grad.addColorStop(0, '#fef08a'); grad.addColorStop(0.5, '#d97706'); grad.addColorStop(1, '#b45309');
                } else {
                    grad.addColorStop(0, '#e2e8f0'); grad.addColorStop(0.5, '#94a3b8'); grad.addColorStop(1, '#475569');
                }
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = isGolden ? '#451a03' : '#1e293b';
                ctx.font = 'bold 14px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('✨ SCRATCH WITH MOUSE / FINGER ✨', w / 2, h / 2 + 5);

                function getCoords(e) {
                    const r = canvas.getBoundingClientRect();
                    const cx = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
                    const cy = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : e.clientY;
                    return {
                        x: (cx - r.left) * (w / (r.width || w)),
                        y: (cy - r.top) * (h / (r.height || h))
                    };
                }

                function playSound() {
                    const now = Date.now();
                    if (now - lastSound > 130) {
                        lastSound = now;
                        try { if (audioEngine) audioEngine.playScratch(); } catch(e) {}
                    }
                }

                function erasePoint(x, y) {
                    ctx.globalCompositeOperation = 'destination-out';
                    ctx.beginPath();
                    ctx.arc(x, y, 22, 0, Math.PI * 2);
                    ctx.fill();
                    playSound();
                    pointsCount++;
                    if (pointsCount > 10) { pointsCount = 0; checkDone(); }
                }

                function eraseLine(x1, y1, x2, y2) {
                    ctx.globalCompositeOperation = 'destination-out';
                    ctx.lineWidth = 44;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                    playSound();
                    pointsCount += 2;
                    if (pointsCount > 10) { pointsCount = 0; checkDone(); }
                }

                function checkDone() {
                    if (finished) return;
                    try {
                        const data = ctx.getImageData(0, 0, w, h).data;
                        let cleared = 0;
                        for (let i = 3; i < data.length; i += 16) {
                            if (data[i] === 0) cleared++;
                        }
                        const pct = cleared / (data.length / 16);
                        if (pct > 0.40) {
                            finished = true;
                            ctx.clearRect(0, 0, w, h);
                            canvas.style.pointerEvents = 'none';
                            if (status) {
                                status.classList.add('unlocked');
                                status.textContent = '🎉 Pass Unlocked! Congratulations!';
                                status.style.color = '#4ade80';
                            }
                            if (audioEngine) audioEngine.playChime();
                            createConfettiBurst(50, window.innerWidth / 2, window.innerHeight * 0.6);
                        } else if (status) {
                            status.classList.remove('unlocked');
                            status.textContent = Math.round(pct * 100) + '% Revealed... keep scratching!';
                        }
                    } catch(err) {}
                }

                canvas.addEventListener('mousedown', (e) => {
                    drawing = true;
                    const p = getCoords(e);
                    lastX = p.x; lastY = p.y;
                    erasePoint(p.x, p.y);
                });
                canvas.addEventListener('mousemove', (e) => {
                    if (!drawing) return;
                    const p = getCoords(e);
                    eraseLine(lastX, lastY, p.x, p.y);
                    lastX = p.x; lastY = p.y;
                });
                window.addEventListener('mouseup', () => {
                    if (drawing) { drawing = false; checkDone(); }
                });

                canvas.addEventListener('touchstart', (e) => {
                    drawing = true;
                    const p = getCoords(e);
                    lastX = p.x; lastY = p.y;
                    erasePoint(p.x, p.y);
                    if (e.cancelable) e.preventDefault();
                }, { passive: false });
                canvas.addEventListener('touchmove', (e) => {
                    if (!drawing) return;
                    const p = getCoords(e);
                    eraseLine(lastX, lastY, p.x, p.y);
                    lastX = p.x; lastY = p.y;
                    if (e.cancelable) e.preventDefault();
                }, { passive: false });
                canvas.addEventListener('touchend', () => {
                    if (drawing) { drawing = false; checkDone(); }
                });
            }
            initScratch('scratch-canvas-1', 'scratch-status-1', false);
            initScratch('scratch-canvas-2', 'scratch-status-2', false);
            initScratch('scratch-canvas-3', 'scratch-status-3', true);

            // Letter unfolding
            const letter = document.getElementById('parchment-letter');
            const openLetterBtn = document.getElementById('open-letter-button');
            function unfoldLetter() {
                if (letter && letter.classList.contains('folded')) {
                    letter.classList.remove('folded');
                    if (audioEngine) audioEngine.playChime();
                    createConfettiBurst(60, window.innerWidth / 2, window.innerHeight * 0.7);
                }
            }
            if (openLetterBtn) openLetterBtn.addEventListener('click', unfoldLetter);
            if (letter) letter.addEventListener('click', () => { if (letter.classList.contains('folded')) unfoldLetter(); });

            // Balloons
            const balloonSky = document.getElementById('balloon-sky-container');
            const poppedDisplay = document.getElementById('popped-count');
            let popped = 0;
            const bColors = ['linear-gradient(135deg, #f43f5e, #fda4af)', 'linear-gradient(135deg, #a855f7, #d8b4fe)', 'linear-gradient(135deg, #38bdf8, #bae6fd)', 'linear-gradient(135deg, #fb923c, #fed7aa)', 'linear-gradient(135deg, #34d399, #a7f3d0)'];
            function spawnBalloon() {
                if (!balloonSky) return;
                const b = document.createElement('div');
                b.className = 'interactive-balloon';
                b.style.left = (Math.random() * 85 + 5) + '%';
                b.style.background = bColors[Math.floor(Math.random() * bColors.length)];
                b.style.setProperty('--duration', (Math.random() * 4 + 7) + 's');
                b.addEventListener('pointerdown', (e) => {
                    if (e && e.cancelable && e.type !== 'click') e.preventDefault();
                    popped++;
                    if (poppedDisplay) poppedDisplay.textContent = popped;
                    if (audioEngine) audioEngine.playBalloonPop();
                    const rect = b.getBoundingClientRect();
                    createConfettiBurst(25, rect.left + rect.width / 2, rect.top + rect.height / 2);
                    b.remove();
                });
                balloonSky.appendChild(b);
                setTimeout(() => { if (b.parentNode) b.remove(); }, 12000);
            }
            setInterval(spawnBalloon, 2000);
            for (let i = 0; i < 4; i++) spawnBalloon();

            // Sky Lantern
            const releaseLanternBtn = document.getElementById('release-lantern-btn');
            const lanternModal = document.getElementById('lantern-wish-modal');
            const sendLanternBtn = document.getElementById('send-lantern-btn');
            const cancelLanternBtn = document.getElementById('cancel-lantern-btn');
            const lanternWishInput = document.getElementById('lantern-wish-input');
            if (releaseLanternBtn) releaseLanternBtn.addEventListener('click', () => {
                lanternModal.classList.remove('hidden');
                document.body.classList.add('modal-open');
            });
            function closeLanternModal() {
                lanternModal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            }
            if (cancelLanternBtn) cancelLanternBtn.addEventListener('click', closeLanternModal);
            if (lanternModal) {
                lanternModal.addEventListener('click', (e) => {
                    if (e.target === lanternModal) closeLanternModal();
                });
            }
            if (sendLanternBtn) {
                sendLanternBtn.addEventListener('click', () => {
                    closeLanternModal();
                    const wishText = lanternWishInput.value.trim() || 'A beautiful birthday wish';
                    const lantern = document.createElement('div');
                    lantern.className = 'sky-lantern-item';
                    lantern.style.left = (Math.random() * 60 + 20) + '%';
                    if (balloonSky) balloonSky.appendChild(lantern);
                    if (audioEngine) audioEngine.playChime();
                    createConfettiBurst(70, window.innerWidth / 2, window.innerHeight * 0.5);
                    lanternWishInput.value = '';
                    setTimeout(() => { if (lantern.parentNode) lantern.remove(); }, 15000);
                });
            }

            // Theme Switcher
            const themeBtn = document.getElementById('theme-menu-btn');
            const themeDropdown = document.getElementById('theme-dropdown-menu');
            const themeLabel = document.getElementById('current-theme-name');
            if (themeBtn && themeDropdown) {
                themeBtn.addEventListener('click', (e) => { e.stopPropagation(); themeDropdown.classList.toggle('hidden'); });
                document.addEventListener('click', () => themeDropdown.classList.add('hidden'));
                document.querySelectorAll('.theme-option').forEach(opt => {
                    opt.addEventListener('click', () => {
                        const chosen = opt.getAttribute('data-theme');
                        document.body.className = chosen + ' standalone-recipient-view';
                        document.querySelectorAll('.theme-option').forEach(o => o.classList.toggle('active', o.getAttribute('data-theme') === chosen));
                        const map = { 'theme-rosegold': 'Cupid Pink 💖', 'theme-midnight': 'Midnight 🌙', 'theme-sunset': 'Sunset Gold 🌅', 'theme-matcha': 'Matcha Sage 🍵' };
                        if (themeLabel) themeLabel.textContent = map[chosen] || 'Theme';
                    });
                });
            }

            // 12:00 AM Midnight Celebration Auto-Wish System
            let wasCheckedBeforeMidnight = false;
            let hasTriggeredMidnightCelebration = false;

            function showMidnightNotification() {
                let toast = document.getElementById('midnight-toast-banner');
                if (!toast) {
                    toast = document.createElement('div');
                    toast.id = 'midnight-toast-banner';
                    toast.className = 'midnight-toast-banner';
                    document.body.appendChild(toast);
                }
                toast.innerHTML = '<div class="midnight-toast-content">' +
                    '<span class="midnight-toast-icon">🕛✨🎂</span>' +
                    '<div class="midnight-toast-text">' +
                        '<strong>MIDNIGHT 12:00 AM! HAPPY BIRTHDAY!</strong>' +
                        '<span>The wait is over! Today is your special day, may all your wishes come true! 💖</span>' +
                    '</div>' +
                    '<button class="midnight-toast-close" onclick="this.parentElement.parentElement.classList.remove(\\'show\\')">✕</button>' +
                '</div>';
                toast.classList.add('show');
                setTimeout(() => { if (toast) toast.classList.remove('show'); }, 14000);
            }

            function triggerMidnightCelebration() {
                if (audioEngine) {
                    try {
                        if (typeof audioEngine.playCelebrationMelody === 'function') {
                            audioEngine.playCelebrationMelody();
                        } else {
                            audioEngine.playChime();
                            audioEngine.startMusic();
                        }
                        setMusicState(true);
                    } catch (e) {
                        console.log('Audio autoplay note:', e);
                    }
                }

                const wrapper = document.getElementById('bday-countdown-widget');
                if (wrapper) {
                    wrapper.classList.add('midnight-strike');
                    wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                // If envelope is still sealed, pop it open automatically
                if (!document.body.classList.contains('gate-unwrapped')) {
                    unwrapSurprise();
                }

                const w = window.innerWidth;
                const h = window.innerHeight;
                createConfettiBurst(120, w * 0.5, h * 0.4);
                setTimeout(() => createConfettiBurst(80, w * 0.2, h * 0.5), 400);
                setTimeout(() => createConfettiBurst(80, w * 0.8, h * 0.5), 800);
                setTimeout(() => createConfettiBurst(100, w * 0.5, h * 0.3), 1300);
                setTimeout(() => createConfettiBurst(70, w * 0.35, h * 0.6), 1800);
                setTimeout(() => createConfettiBurst(70, w * 0.65, h * 0.6), 2300);

                showMidnightNotification();

                setTimeout(() => {
                    const celebModal = document.getElementById('birthday-celebration-modal');
                    if (celebModal && celebModal.classList.contains('hidden')) {
                        celebModal.classList.remove('hidden');
                        document.body.classList.add('modal-open');
                        createConfettiBurst(90, w * 0.5, h * 0.4);
                    }
                }, 1200);
            }

            // 5-Second Cinematic Tick-Tick Countdown Overlay in Standalone
            function trigger5SecondCountdown(onComplete) {
                if (isFinal5SecCountdownRunning) return;
                isFinal5SecCountdownRunning = true;
                if (countdownOverlay) countdownOverlay.classList.remove('hidden');

                let count = 5;
                function tick() {
                    if (countdownOverlayNum) {
                        countdownOverlayNum.textContent = count;
                        countdownOverlayNum.classList.remove('impact-tick');
                        void countdownOverlayNum.offsetWidth;
                        countdownOverlayNum.classList.add('impact-tick');
                    }
                    if (countdownOverlayTagline) {
                        const taglines = {
                            5: 'Hold your breath... The magic begins in seconds! 💫',
                            4: 'Almost midnight... Get ready! ✨',
                            3: 'Making a birthday wish... 🌟',
                            2: 'Unwrapping your universe... 💌',
                            1: '🕛 12:00 AM IS HERE! 🎂'
                        };
                        countdownOverlayTagline.textContent = taglines[count] || 'Countdown...';
                    }
                    if (audioEngine) {
                        try { audioEngine.playCountdownTick(count); } catch (e) {}
                    }
                    count--;
                    if (count >= 1) {
                        setTimeout(tick, 1000);
                    } else {
                        setTimeout(() => {
                            if (countdownOverlayNum) countdownOverlayNum.textContent = '🎉';
                            if (countdownOverlayTagline) countdownOverlayTagline.textContent = '✨ HAPPY BIRTHDAY! 💖';
                            setTimeout(() => {
                                if (countdownOverlay) countdownOverlay.classList.add('hidden');
                                isFinal5SecCountdownRunning = false;
                                setGateAdvanceLockState(false);
                                if (typeof onComplete === 'function') onComplete();
                            }, 800);
                        }, 1000);
                    }
                }
                tick();
            }

            // Countdown timer
            function updateCountdown() {
                const bdate = state.birthdate;
                if (!bdate) return;
                const now = new Date();
                const parts = bdate.split('-');
                if (parts.length !== 3) return;
                const bYear = now.getFullYear();
                let target = new Date(bYear, parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 0, 0, 0);
                if (now.getTime() > target.getTime() + (24 * 60 * 60 * 1000)) {
                    target = new Date(bYear + 1, parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 0, 0, 0);
                }
                const wrapper = document.getElementById('bday-countdown-widget');
                const dEl = document.querySelector('#unit-days strong');
                const hEl = document.querySelector('#unit-hours strong');
                const mEl = document.querySelector('#unit-mins strong');
                const sEl = document.querySelector('#unit-secs strong');
                const noteEl = document.getElementById('countdown-status-note');

                const diff = target.getTime() - now.getTime();

                // Advance Locked before midnight (> 5s)
                if (diff > 5000) {
                    wasCheckedBeforeMidnight = true;
                    const totalSecs = Math.max(0, Math.floor(diff / 1000));
                    const days = Math.floor(totalSecs / (3600 * 24));
                    const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
                    const mins = Math.floor((totalSecs % 3600) / 60);
                    const secs = totalSecs % 60;
                    const pad = function(n) { return (n < 10 ? '0' : '') + n; };
                    const timeStr = (days > 0 ? days + 'd ' : '') + pad(hours) + 'h ' + pad(mins) + 'm ' + pad(secs) + 's';

                    setGateAdvanceLockState(true, timeStr);

                    if (wrapper) wrapper.classList.remove('its-birthday-today');
                    if (wrapper) wrapper.classList.remove('midnight-strike');
                    if (dEl) dEl.textContent = days;
                    if (hEl) hEl.textContent = hours;
                    if (mEl) mEl.textContent = mins;
                    if (sEl) sEl.textContent = secs;
                    if (noteEl) noteEl.textContent = '⏳ ' + days + ' days until your midnight celebration! ✨';
                    return;
                }

                // Final 5-second countdown
                if (diff <= 5000 && diff > 0) {
                    wasCheckedBeforeMidnight = true;
                    if (!isFinal5SecCountdownRunning && !hasTriggeredMidnightCelebration) {
                        trigger5SecondCountdown(function() {
                            hasTriggeredMidnightCelebration = true;
                            triggerMidnightCelebration();
                        });
                    }
                    return;
                }

                // Unlocked state (midnight or after)
                setGateAdvanceLockState(false);
                if (wrapper) wrapper.classList.add('its-birthday-today');
                if (dEl) dEl.textContent = '🎉';
                if (hEl) hEl.textContent = "IT'S";
                if (mEl) mEl.textContent = 'YOUR';
                if (sEl) sEl.textContent = 'DAY!';
                if (noteEl) noteEl.textContent = '✨ TODAY IS THE BIG DAY! HAPPY BIRTHDAY! 🎂';

                // Situation 1: Person was waiting before midnight -> Auto celebrate!
                if (!hasTriggeredMidnightCelebration && wasCheckedBeforeMidnight && !isFinal5SecCountdownRunning) {
                    hasTriggeredMidnightCelebration = true;
                    triggerMidnightCelebration();
                }
                // Situation 2: Person arrived after 12:00 AM -> Gate is unlocked for them to unwrap manually!
            }
            updateCountdown();
            setInterval(updateCountdown, 1000);
        })();
        `;

        const scriptTag = document.createElement('script');
        scriptTag.id = 'standalone-surprise-runtime';
        scriptTag.textContent = standaloneJs;
        cloneBody.appendChild(scriptTag);

        return '<!DOCTYPE html>\n' + cloneDoc.outerHTML;
    }

    downloadHtmlBtn.addEventListener('click', async () => {
        const originalBtnHtml = downloadHtmlBtn.innerHTML;
        downloadHtmlBtn.innerHTML = '<span>⏳ Packaging Offline Surprise...</span>';
        downloadHtmlBtn.disabled = true;

        try {
            const standaloneHtml = await generateStandaloneSurpriseBundle();
            const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${state.recipientName.replace(/\s+/g, '_')}_Birthday_Surprise.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);

            downloadHtmlBtn.innerHTML = '<span>✅ Surprise Downloaded!</span>';
            showToast(`💌 ${state.recipientName}'s standalone surprise downloaded! When they open it, it begins directly at the sealed wax envelope with full music & animations! ✨`, 5500);

            setTimeout(() => {
                downloadHtmlBtn.innerHTML = originalBtnHtml;
                downloadHtmlBtn.disabled = false;
            }, 3000);
        } catch (err) {
            console.error('Download HTML error:', err);
            downloadHtmlBtn.innerHTML = originalBtnHtml;
            downloadHtmlBtn.disabled = false;
            showToast('⚠️ Could not bundle surprise file. Please try again.');
        }
    });

    // ==========================================
    // 21. UNPACK SHARED URL DATA OR RESTORE LOCALSTORAGE ON LOAD
    // ==========================================
    function unpackSharedData() {
        if (window.__INITIAL_STATE__) {
            Object.assign(state, window.__INITIAL_STATE__);
            syncInputsFromState();
            applyCustomizations(false);
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

                    syncInputsFromState();
                    applyCustomizations(false, false);
                    return;
                }
            } catch (err) {
                console.warn('Failed to decompress shared hash data:', err);
            }
        }

        const params = new URLSearchParams(window.location.search);
        let hasQueryParams = false;
        if (params.has('name')) { state.recipientName = params.get('name'); hasQueryParams = true; }
        if (params.has('milestone')) { state.milestone = params.get('milestone'); hasQueryParams = true; }
        if (params.has('bday')) { state.birthdate = params.get('bday'); hasQueryParams = true; }
        if (params.has('from')) { state.senderName = params.get('from'); hasQueryParams = true; }
        if (params.has('theme')) { state.currentTheme = params.get('theme'); hasQueryParams = true; }
        if (params.has('wish')) { state.heroWish = params.get('wish'); hasQueryParams = true; }
        if (params.has('msg')) {
            hasQueryParams = true;
            try { state.letterText = decodeURIComponent(params.get('msg')); }
            catch (e) { state.letterText = params.get('msg'); }
        }

        if (hasQueryParams) {
            // View-only shared surprise: do NOT pollute visitor's localStorage!
            syncInputsFromState();
            applyCustomizations(false, false);
            return;
        }

        // Restore from LocalStorage ONLY if user previously customized
        loadStateFromLocalStorage();
        syncInputsFromState();
        applyCustomizations(false, false);
    }

    // Handle reset / fresh URL parameter (?reset=1 or ?fresh=1 or ?clear=1)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('reset') || urlParams.has('clear') || urlParams.has('fresh')) {
        try {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(GATE_KEY);
        } catch (e) {}
        Object.assign(state, JSON.parse(JSON.stringify(DEFAULT_STATE)));
    }

    // Clean old bypass flag from localStorage so visits always start at Envelope
    try {
        localStorage.removeItem('birthday_surprise_gate_opened_v1');
    } catch (e) {}

    // Respect explicit direct view parameter if provided (?view=home)
    if (urlParams.get('view') === 'home') {
        if (surpriseGate) surpriseGate.classList.add('hidden');
        if (mainFlow) mainFlow.classList.remove('hidden');
    } else {
        if (surpriseGate) surpriseGate.classList.remove('hidden', 'fade-out');
        if (mainFlow) mainFlow.classList.add('hidden');
    }

    // Auto-open Surprise Studio if creator requested via URL (?studio=1 or ?edit=1)
    if (urlParams.has('studio') || urlParams.has('edit')) {
        setTimeout(() => {
            openCustomizerModal();
        }, 300);
    }

    unpackSharedData();
    startBirthdayCountdown();
});
