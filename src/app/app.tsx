// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NxWelcome from './nx-welcome';
import Box from './box';
import MainPage from './main-page';

export function App() {

  return (
    <div>
      {/* <NxWelcome title="league-app" /> */}
      <MainPage></MainPage>
    </div>
  );
}

export default App;
