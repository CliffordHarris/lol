// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import NxWelcome from './nx-welcome';
import MainPage from './MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NxWelcome from './nx-welcome';
import Layout from './Layout';

export function App() {
  return (
    // <>
    //   {/* <NxWelcome title="league-app" /> */}
    //   <MainPage></MainPage>
    // </>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="abc" element={<NxWelcome title={'Hola'} />} />
        <Route path="*" element={<MainPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
