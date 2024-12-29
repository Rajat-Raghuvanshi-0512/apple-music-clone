import { Audio, AVPlaybackStatus } from 'expo-av';

class AudioService {
  private sound: Audio.Sound | null = null;
  private onPlaybackStatusUpdate: ((status: AVPlaybackStatus) => void) | null =
    null;

  async loadSound(uri: string) {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        this.onPlaybackStatusUpdate ?? undefined
      );
      this.sound = sound;
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  }

  setPlaybackStatusCallback(callback: (status: AVPlaybackStatus) => void) {
    this.onPlaybackStatusUpdate = callback;
    if (this.sound) {
      this.sound.setOnPlaybackStatusUpdate(callback);
    }
  }

  async playSound() {
    try {
      if (this.sound) {
        await this.sound.playAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  async pauseSound() {
    try {
      if (this.sound) {
        await this.sound.pauseAsync();
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
    }
  }

  async unloadSound() {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }
    } catch (error) {
      console.error('Error unloading sound:', error);
    }
  }
}

export const audioService = new AudioService();
