// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NxWelcome from './nx-welcome';
import Box from './box';
import MainPage from './MainPage';
import { atom } from 'jotai';

export const allMatchesAtom = atom<any[]>([]);
export const matchesDetailsAtom = atom<any[]>([]);
export const fullMatchesAtom = atom<any>(JSON.parse(localStorage.getItem('fullMatches') || '[]'));

export function App() {
  // const [matchesForAllUsers, setMatchesForAllUsers] = useAtom(allMatchesAtom);
  return (
    <div>
      {/* <NxWelcome title="league-app" /> */}
      <MainPage></MainPage>
    </div>
  );
}

export default App;
