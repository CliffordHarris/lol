import "./main-page.css";
import Box from "./box";
import LineChart from "./line-chart";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getPlayerInfo } from './api-calls';
import * as status from './constants';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Container, Row, Col } from 'react-bootstrap/';
import DataCard from "./DataCard";

function MainPage() {
  const [names, setNames] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>();
  const [dataArr, setDataArr] = useState<any>([]);
  const [userData, setUserData] = useState<{ [key: string]: any }>({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getUsernames();
  }, []);
  useEffect(() => {
    getPlayerInfoByName();
  }, [names]);
  useEffect(() => {
    let dictionary: { [key: string]: any } = {};
    dataArr.forEach((userData: any) => {
      dictionary[userData.name] = userData;
    })
    setUserData(dictionary);
  }, [dataArr])

  const getUsernames = () => {
    const vals = import.meta.env.VITE_USERS;
    if (!!vals) {
      const arr = JSON.parse(vals);
      setNames(arr);
    }
  }

  const getUser = () => {
    if(userName) setNames([userName]);
  }

  const getPlayerInfoByName = () => {
    if (names.length === 0) return;
    names.forEach(async (n: string) => {
      let data = await getPlayerInfo(n);
      if (data === status.CANT_FIND) {
        setDataArr([]);
        setShowAlert(true);
        return;
      }

      setDataArr((currData: any) => [...currData, data]);
    });
  }

  return (
    <>
      {/* <div className="d-flex justify-content-center align-items-center p-3" data-bs-autohide="true">
        <div className={`toast align-items-center text-white bg-danger border-0 ${showAlert ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              There was an error getting data
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div> */}
      <ToastContainer position="top-center" className="p-3">
        <Toast onClose={() => setShowAlert(false)} show={showAlert} delay={7000} bg="info" autohide>
          <Toast.Body>There was an error getting data</Toast.Body>
        </Toast>
      </ToastContainer>

      <Container>
        {/* 
        2. create file to for dan to paste
          a. api key
          b. our user names
        3. get data
        4. 
      */}
        {Object.keys(userData).length === 0
          ?
          <>
            <div>Please enter your username</div>
            <input
              value={userName}
              onChange={(e: any) => setUserName(e.target.value)}
            />
            <Button variant="primary" onClick={getUser}>Find User</Button>
          </>
          :
          <Row>
            {Object.keys(userData).map((name: any) => (
              <div key={name} className="col-3">
                {/* <Box name={name} key={name} data={userData[name]}></Box> */}
                <DataCard name={name} key={name} data={userData[name]}></DataCard>
                {/* <LineChart></LineChart> */}
              </div>
            ))}
          </Row>
        }

      </Container>
    </>
  );
}

export default MainPage;
