import { atom } from 'jotai';

export const allMatchesAtom = atom<any[]>(JSON.parse(localStorage.getItem('names') || '[]'));
export const matchesDetailsAtom = atom<any[]>([]);
export const fullMatchesAtom = atom<any>(JSON.parse(localStorage.getItem('fullMatches') || '[]'));