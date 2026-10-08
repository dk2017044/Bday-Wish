// Modern Web Audio API Synth & Sound FX Engine for Birthday Website
// Zero external file dependencies - 100% reliable offline & instant load!

class BirthdayAudioEngine {
    constructor() {
        this.ctx = null;
        this.isPlayingMusic = false;
        this.currentTrack = 'lofi'; // 'lofi', 'acoustic', 'musicbox'
        this.musicGain = null;
        this.sfxGain = null;
        this.musicTimer = null;
        this.tempo = 72; // BPM
        this.isMuted = false;
        this.step = 0;
        
        // Happy birthday melody notes & chords
        // Frequencies for Happy Birthday in C major / F major:
        // C4, D4, E4, F4, G4, A4, Bb4, B4, C5, D5, E5, F5
        this.notes = {
            'C3': 130.81, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
            'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16,
            'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00
        };

        // Happy Birthday Melody [note, duration (in beats)]
        this.birthdayMelody = [
            { note: 'C4', dur: 0.75 }, { note: 'C4', dur: 0.25 }, { note: 'D4', dur: 1 }, { note: 'C4', dur: 1 }, { note: 'F4', dur: 1 }, { note: 'E4', dur: 2 },
            { note: 'C4', dur: 0.75 }, { note: 'C4', dur: 0.25 }, { note: 'D4', dur: 1 }, { note: 'C4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'F4', dur: 2 },
            { note: 'C4', dur: 0.75 }, { note: 'C4', dur: 0.25 }, { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'F4', dur: 1 }, { note: 'E4', dur: 1 }, { note: 'D4', dur: 2 },
            { note: 'Bb4', dur: 0.75 }, { note: 'Bb4', dur: 0.25 }, { note: 'A4', dur: 1 }, { note: 'F4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'F4', dur: 2.5 },
            { note: null, dur: 1 } // rest
        ];

        // Lofi Chords progression
        this.chords = [
            ['F3', 'A3', 'C4', 'E4'], // Fmaj7
            ['D3', 'F3', 'A3', 'C4'], // Dm7
            ['G3', 'Bb3', 'D4', 'F4'], // Gm7
            ['C3', 'E3', 'G3', 'Bb3']  // C7
        ];
    }

    init() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContextClass();
            
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);

            this.musicGain = this.ctx.createGain();
            this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
            this.musicGain.connect(this.masterGain);

            this.sfxGain = this.ctx.createGain();
            this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
            this.sfxGain.connect(this.masterGain);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Play a single soft synthetic bell or piano tone
    playTone(freq, time, duration = 1.0, type = 'sine', gainVal = 0.25) {
        if (!this.ctx || !freq) return;
        const osc = this.ctx.createOscillator();
        const toneGain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);

        // Gentle envelope
        toneGain.gain.setValueAtTime(0.0001, time);
        toneGain.gain.linearRampToValueAtTime(gainVal, time + 0.05);
        toneGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(toneGain);
        toneGain.connect(this.musicGain);

        osc.start(time);
        osc.stop(time + duration);
    }

    // Play lofi chord
    playChord(notesArr, time, duration = 2.5) {
        if (!this.ctx) return;
        notesArr.forEach(n => {
            const freq = this.notes[n];
            if (freq) {
                // Main warm triangle oscillator
                this.playTone(freq, time, duration, 'triangle', 0.12);
                // Subtle octave sine shimmer
                this.playTone(freq * 2, time + 0.02, duration * 0.8, 'sine', 0.04);
            }
        });
    }

    // Schedule background melody loop
    startMusic() {
        this.init();
        if (this.isPlayingMusic) return;
        this.isPlayingMusic = true;

        let noteIdx = 0;
        let chordIdx = 0;
        let nextNoteTime = this.ctx.currentTime + 0.1;
        const beatSec = 60 / this.tempo;

        const scheduleLoop = () => {
            if (!this.isPlayingMusic) return;

            while (nextNoteTime < this.ctx.currentTime + 2.0) {
                const item = this.birthdayMelody[noteIdx];
                const dur = item.dur * beatSec;

                if (item.note && this.notes[item.note]) {
                    const freq = this.notes[item.note];
                    // Play melody note
                    this.playTone(freq, nextNoteTime, dur * 1.2, 'sine', 0.22);
                    // Add warm harmonics for lofi vibe
                    this.playTone(freq * 0.5, nextNoteTime, dur * 0.9, 'triangle', 0.08);
                }

                // Chords rhythmically every 2 beats
                if (noteIdx % 3 === 0) {
                    const chord = this.chords[chordIdx % this.chords.length];
                    this.playChord(chord, nextNoteTime, beatSec * 2.5);
                    chordIdx++;
                }

                nextNoteTime += dur;
                noteIdx = (noteIdx + 1) % this.birthdayMelody.length;
            }

            this.musicTimer = setTimeout(scheduleLoop, 400);
        };

        scheduleLoop();
    }

    stopMusic() {
        this.isPlayingMusic = false;
        if (this.musicTimer) {
            clearTimeout(this.musicTimer);
            this.musicTimer = null;
        }
    }

    toggleMusic() {
        if (this.isPlayingMusic) {
            this.stopMusic();
            return false;
        } else {
            this.startMusic();
            return true;
        }
    }

    // --- Sound Effects ---

    // Candle blow-out puff sound
    playCandleBlow() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.8;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1; // White noise
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(120, now + 0.7);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        noise.start(now);
        noise.stop(now + 0.8);
    }

    // Cake slice cut sound
    playCakeCut() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.25);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.25);

        // Add celebratory chime after 200ms
        setTimeout(() => this.playChime(), 200);
    }

    // Balloon pop sound
    playBalloonPop() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        
        // Quick noise transient
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.12);
    }

    // Celebration Chime / Sparkle
    playChime() {
        this.init();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major arpeggio sparkle
        const now = this.ctx.currentTime;

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const startTime = now + idx * 0.07;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0.001, startTime);
            gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

            osc.connect(gain);
            gain.connect(this.sfxGain);

            osc.start(startTime);
            osc.stop(startTime + 0.65);
        });
    }

    // Scratch Card scratch sound
    playScratch() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.04;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.2;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        noise.connect(gain);
        gain.connect(this.sfxGain);

        noise.start(now);
    }
}

window.birthdayAudio = new BirthdayAudioEngine();
