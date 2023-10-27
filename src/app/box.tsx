import { useState, useEffect } from 'react';
import './box.css';
import { getMatchesForUser, getMatchData } from './ApiCalls';
import { Container, Row, Col, Card, Button } from 'react-bootstrap/';

interface MatchDataLookup {
  // [key: string]: MatchData 
  [key: string]: any
}

interface MatchData {
  win: boolean;
  role: string;
  championName: string;
}

function Box(props: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [matches, setMatches] = useState([]);
  const [matchInfo, setMatchInfo] = useState({}); // maybe delete
  const [matchesLookup, setMatchesLookup] = useState<MatchDataLookup>({});
  const [allMatches, setAllMatches] = useState<any>([]);

  useEffect(() => {
    clickHandlerExpander()
  }, []);
  
  useEffect(() => {
    getAllMatches()
  }, [matches]);

  useEffect(() => {
    createLookup();
    // let dictionary: MatchDataLookup = {};
    // matches.forEach(async (matchId: string) => {
    //   let matchInfo = await getMatchData(matchId);
    //   console.log(matchInfo, matchInfo.info.participants.filter((x: any) => x.summonerId === props.data.id)[0].win);
    //   dictionary[matchId] = matchInfo.info;
    // })
    // setMatchesLookup(dictionary);
  }, [allMatches])

  const clickHandlerExpander = () => {
    let newState = !isExpanded;
    setIsExpanded(newState);
    if (newState) getMatches(props.data.puuid);
  }

  const getMatches = async (userId: any) => {
    let matchesForUser = await getMatchesForUser(userId);
    setMatches(matchesForUser);
  }

  const getAllMatches = async () => {
    matches.forEach(async (matchId: string) => {
      let matchInfo = await getMatchData(matchId);
      console.log(matchInfo, matchInfo.info.participants.filter((x: any) => x.summonerId === props.data.id)[0].win);
      setAllMatches((currData: any) => [...currData, matchInfo]);
    })
  }

  const createLookup = () => {
    let dictionary: MatchDataLookup = {};
    allMatches.forEach(async (match: any) => {
      console.log(match.info.participants.filter((x: any) => x.summonerId === props.data.id)[0].win);
      dictionary[match.metadata.matchId] = match.info;
    })
    setMatchesLookup(dictionary);
  }

  return (
    <>
      <div className="shadowy">
        <h1 className="d-flex justify-content-between">
          <span className=''>{props.name}</span>
          <span className=''>{props.data.summonerLevel}</span>
          </h1>
        {
        <>
             {/* <Col>
               <Card>
                 <Card.Header as="h5">{props.name}</Card.Header>
                 <Card.Body>
                   <Card.Title>Special title treatment</Card.Title>
                   <Card.Text>
                     With supporting text below as a natural lead-in to additional content.
                   </Card.Text>
                   <Button variant="primary">Go somewhere</Button>
                 </Card.Body>
               </Card>
             </Col> */}
            <div className='container'>
              <div className='col'>
                {matches.map(x => <div key={x}>{matches.length > 0 ? x : ''}</div>)}
              </div>
              <div className='col'>
                {
                  Object.keys(matchesLookup).length > 0 && matches.length > 0
                    ?
                    matches.map((x: string) =>
                      <div key={x}>
                        {/* {matchesLookup[x] ? 'min: ' + matchesLookup[x].gameDuration/60 : ''} */}
                        {matchesLookup[x] ? matchesLookup[x].participants.filter((x: any) => x.summonerId === props.data.id)[0].win ? 'W' : '' : ''}
                        {/* {Object.keys(matchesLookup).length} */}
                      </div>)
                    :
                    ''
                }
                {/* {matchInfo.info.participants.filter(x => x.summonerId === props.data.id)[0].win} */}
              </div>
            </div>
        </>

        }
      </div>
    </>
  );
}

export default Box;
