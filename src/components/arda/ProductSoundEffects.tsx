import { useEffect, useRef } from 'react';

export const playMushroomGrowSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Simple growing sound
    const growOsc = audioContext.createOscillator();
    growOsc.frequency.setValueAtTime(130, audioContext.currentTime); // C3
    growOsc.type = 'sine';
    
    const growGain = audioContext.createGain();
    growOsc.connect(growGain);
    growGain.connect(audioContext.destination);
    
    // Simple envelope
    growGain.gain.setValueAtTime(0, audioContext.currentTime);
    growGain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.1);
    
    // Gentle frequency rise
    growOsc.frequency.linearRampToValueAtTime(260, audioContext.currentTime + 1); // C4
    
    // Fade out
    growGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.5);
    
    growOsc.start();
    setTimeout(() => growOsc.stop(), 1500);
  } catch (error) {
    console.log('Audio context not available');
  }
};

export const playDyeDropSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Simple water drop sound
    const dropOsc = audioContext.createOscillator();
    dropOsc.frequency.setValueAtTime(600, audioContext.currentTime); // water-like
    dropOsc.type = 'sine';
    
    const dropGain = audioContext.createGain();
    dropOsc.connect(dropGain);
    dropGain.connect(audioContext.destination);
    
    // Quick drop sound
    dropGain.gain.setValueAtTime(0, audioContext.currentTime);
    dropGain.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 0.01);
    dropGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    
    dropOsc.start();
    setTimeout(() => dropOsc.stop(), 300);
  } catch (error) {
    console.log('Audio context not available');
  }
};

// Hook for product sound effects
export const useProductSounds = () => {
  const lastMushroomHover = useRef(0);
  const lastDyeHover = useRef(0);
  
  const onMushroomHover = () => {
    const now = Date.now();
    if (now - lastMushroomHover.current > 1000) { // Throttle to once per second
      playMushroomGrowSound();
      lastMushroomHover.current = now;
    }
  };
  
  const onDyeHover = () => {
    const now = Date.now();
    if (now - lastDyeHover.current > 800) { // Throttle to once per 0.8 seconds
      playDyeDropSound();
      lastDyeHover.current = now;
    }
  };
  
  return { onMushroomHover, onDyeHover };
};
