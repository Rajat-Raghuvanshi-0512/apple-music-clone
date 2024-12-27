import { Audio } from 'expo-av';

class AudioService {
  private sound: Audio.Sound | null = null;

  async loadSound(uri: string) {
    try {
      // Unload previous sound if exists
      if (this.sound) {
        await this.sound.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false }
      );
      this.sound = sound;
    } catch (error) {
      console.error('Error loading sound:', error);
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
