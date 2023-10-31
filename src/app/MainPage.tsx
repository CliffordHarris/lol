import "./main-page.css";
import LineChart from "./line-chart";
import { useEffect, useState, useMemo } from "react";
import { getPlayerInfo } from './ApiCalls';
import * as status from './constants';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Container, Row, Col, Button } from 'react-bootstrap/';
import { atom, useAtom } from 'jotai'
import DataBox from "./DataBox";
import Header from "./header";
import { GetAllData } from './ApiCalls';



export const hasChanges = atom(false);

function MainPage() {
  const namesObj = atom(JSON.parse(import.meta.env.VITE_USERS));
  const [names] = useAtom(
    useMemo(() => atom((get) => get(namesObj)), [])
  );
  const [, setNames] = useState<string[]>([]);
  const [userName] = useState<string>();
  const [showAlert, setShowAlert] = useState(false);
  const [hasChanged] = useAtom(hasChanges);

  GetAllData();
  // useEffect(() => {
  //   console.log('inside');
  //   GetAllData();
  // }, []);

  return (
    <>
      <ToastContainer position="top-center" className="p-3">
        <Toast onClose={() => setShowAlert(false)} show={showAlert} delay={7000} bg="info" autohide>
          <Toast.Body>There was an error getting data</Toast.Body>
        </Toast>
      </ToastContainer>

      <Container fluid="lg" className="mt-4 pt-4">
        <Header></Header>
        {/* {Object.keys(userData).map((name: any) => (
              // <DataCard name={name} key={name} data={userData[name]}></DataCard>
              <DataBox playerName={name}></DataBox>
          ))} */}
        {names.map((name: any) => (
          // <>
          //   <DataBox playerName={name} key={name}></DataBox>
          //   {/* <LineChart></LineChart> */}
          // </>
          <DataBox playerName={name} key={name}></DataBox>
          // <div key={name}>hi</div>
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
      </Container>
    </>
  );
}

export default MainPage;
