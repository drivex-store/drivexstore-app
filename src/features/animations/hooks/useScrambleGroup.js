"use client";
import { useContext } from 'react'; 
import { ScrambleContext } from '@animations/contexts/ScrambleContext';

export function useScrambleGroup() {
  return useContext(ScrambleContext);
}