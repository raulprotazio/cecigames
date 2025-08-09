import { Howl } from 'howler';

class AudioManager {
  private sounds: Map<string, Howl> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.75;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    // Using simple audio files that can be created or found online
    const soundUrls = {
      click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBjaN0e7Zji4FKXjQ9N12OgUldsLm7H9+KgUjc7jp7H9+KgUjc7jp7H9+', 
      correct: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm30IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBjaN0e7Zji4FKXjQ9N12OgUldsLm7H9+Kg==', 
      incorrect: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm30IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBziR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBjaN0e7Zji4FKXjQ9N12OgUldsLm7H9+Kg==',
      milestone: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBjaN0e7Zji4FKXjQ9N12OgUldsLm7H9+Kg=='
    };

    Object.entries(soundUrls).forEach(([key, url]) => {
      this.sounds.set(key, new Howl({
        src: [url],
        volume: this.volume,
        preload: true,
      }));
    });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(sound => {
      sound.volume(this.volume);
    });
  }

  play(soundName: string) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.play();
    }
  }

  // Convenience methods
  playClick() {
    this.play('click');
  }

  playCorrect() {
    this.play('correct');
  }

  playIncorrect() {
    this.play('incorrect');
  }

  playMilestone() {
    this.play('milestone');
  }
}

export const audioManager = new AudioManager();
