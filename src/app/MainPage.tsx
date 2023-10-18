import "./main-page.css";
import LineChart from "./line-chart";
import { useEffect, useState, useMemo } from "react";
import { getPlayerInfo } from './api-calls';
import * as status from './constants';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Container, Row, Col, Button } from 'react-bootstrap/';
import { atom, useAtom } from 'jotai'
import DataBox from "./DataBox";
import Header from "./header";

export const hasChanges = atom(false);

function MainPage() {
  const namesObj = atom(JSON.parse(import.meta.env.VITE_USERS));
  const [names] = useAtom(
    useMemo(() => atom((get) => get(namesObj)), [])
  );
  const [, setNames] = useState<string[]>([]);
  const [userName] = useState<string>();
  const [dataArr, setDataArr] = useState<any>([]);
  const [userData, setUserData] = useState<{ [key: string]: any }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [hasChanged] = useAtom(hasChanges);

  // useEffect(() => {
  //   getUsernames();
  // }, []);

  // useEffect(() => {
  //   getPlayerInfoByName();
  // }, [names]);

  // useEffect(() => {
  //   let dictionary: { [key: string]: any } = {};
  //   dataArr.forEach((userData: any) => {
  //     dictionary[userData.name] = userData;
  //   })
  //   setUserData(dictionary);
  // }, [dataArr])

  // const getUsernames = () => {
  //   const vals = import.meta.env.VITE_USERS;
  //   if (!!vals) {
  //     const arr = JSON.parse(vals);
  //     setNames(names);
  //   }
  // }

  // const getUser = () => {
  //   if (userName) setNames([userName]);
  // }

  // const getPlayerInfoByName = () => {
  //   if (names.length === 0) return;
    
  //   names.forEach(async (n: string) => {
  //     let data = await getPlayerInfo(n);
  //     if (data === status.CANT_FIND) {
  //       setDataArr([]);
  //       setShowAlert(true);
  //       return;
  //     }

  //     setDataArr((currData: any) => [...currData, data]);
  //   });
  // }

  return (
    <>
      <ToastContainer position="top-center" className="p-3">
        <Toast onClose={() => setShowAlert(false)} show={showAlert} delay={7000} bg="info" autohide>
          <Toast.Body>There was an error getting data</Toast.Body>
        </Toast>
        <Toast onClose={() => setShowAlert(false)} show={hasChanged} delay={3000} bg="success" color="white" autohide>
          <Toast.Body>New Update!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Container fluid="lg" className="mt-4 pt-4">
      <Header></Header>
        <Row>
          {/* {Object.keys(userData).map((name: any) => (
              // <DataCard name={name} key={name} data={userData[name]}></DataCard>
              <DataBox playerName={name}></DataBox>
          ))} */}
          {names.map((name: any) => (
            <DataBox playerName={name} key={name}></DataBox>
            // <LineChart></LineChart>
            
          ))}
{/* 
          <Row>
            <div>Please enter your username</div>
            <input
              value={userName}
              onChange={(e: any) => setUserName(e.target.value)}
            />
            <Button variant="primary" onClick={getUser}>Find User</Button>
          </Row> */}
        </Row>
      </Container>
    </>
  );
}

export default MainPage;
