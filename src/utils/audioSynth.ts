// Web Audio API interactive sound engine for live track previews

class AudioPreviewEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrackId: string | null = null;
  private intervalId: number | null = null;
  private step = 0;
  private tempo = 110;
  private onTimeUpdateCallback: ((time: number, isPlaying: boolean) => void) | null = null;
  private currentTime = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setTimeUpdateListener(cb: (time: number, isPlaying: boolean) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public playTrack(trackId: string, genre: string = 'afrobeat') {
    this.initContext();
    if (!this.ctx) return;

    if (this.isPlaying && this.currentTrackId === trackId) {
      this.pause();
      return;
    }

    this.stop();
    this.isPlaying = true;
    this.currentTrackId = trackId;
    this.step = 0;

    // Adjust tempo based on genre
    if (genre.toLowerCase().includes('rap') || genre.toLowerCase().includes('trap')) {
      this.tempo = 135;
    } else if (genre.toLowerCase().includes('rumba')) {
      this.tempo = 95;
    } else {
      this.tempo = 108; // Afrobeat
    }

    const stepTimeMs = (60 / this.tempo / 4) * 1000;

    this.intervalId = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying) return;
      this.playStep(this.step, genre);
      this.step = (this.step + 1) % 32;
      this.currentTime += stepTimeMs / 1000;

      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.currentTime, true);
      }
    }, stepTimeMs);
  }

  private playStep(step: number, genre: string) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Kick pattern
    if (step % 8 === 0 || (genre.includes('afro') && (step === 6 || step === 14 || step === 22 || step === 30))) {
      this.playKick(now);
    }

    // Snare / Rimshot pattern
    if (step % 8 === 4 || step === 12 || step === 28) {
      this.playSnare(now, genre.includes('afro') ? 'rim' : 'clap');
    }

    // Hi-hats
    if (step % 2 === 0) {
      this.playHiHat(now, step % 4 === 2 ? 0.05 : 0.03);
    }

    // Melodic notes / Chords
    if (step % 8 === 0 || step === 6 || step === 14 || step === 22) {
      const notes = genre.includes('rumba') 
        ? [261.63, 329.63, 392.00, 493.88] // C maj
        : genre.includes('rap')
        ? [146.83, 174.61, 220.00, 261.63] // D minor
        : [220.00, 277.18, 329.63, 440.00]; // A Afro maj
      
      const noteIdx = Math.floor(step / 8) % notes.length;
      this.playChord(now, notes[noteIdx]);
    }
  }

  private playKick(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.08);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.25);
  }

  private playSnare(time: number, type: 'rim' | 'clap') {
    if (!this.ctx) return;
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = type === 'rim' ? 'highpass' : 'bandpass';
    filter.frequency.value = type === 'rim' ? 1200 : 1800;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + 0.12);
  }

  private playHiHat(time: number, vol = 0.04) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'square';
    osc.frequency.setValueAtTime(9000, time);

    filter.type = 'highpass';
    filter.frequency.value = 7000;

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.05);
  }

  private playChord(time: number, rootFreq: number) {
    if (!this.ctx) return;
    [rootFreq, rootFreq * 1.25, rootFreq * 1.5].forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.35);
    });
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(this.currentTime, false);
    }
  }

  public stop() {
    this.pause();
    this.currentTime = 0;
    this.currentTrackId = null;
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(0, false);
    }
  }

  public getTrackState() {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
      currentTime: this.currentTime,
    };
  }
}

export const audioPreviewEngine = new AudioPreviewEngine();
