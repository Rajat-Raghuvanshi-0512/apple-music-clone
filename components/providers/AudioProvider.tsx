import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { initializeAudioPlayback } from '@/store/slices/musicSlice';
import { Audio } from 'expo-av';

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function setupAudio() {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
      dispatch(initializeAudioPlayback());
    }

    setupAudio();
  }, [dispatch]);

  return <>{children}</>;
};
