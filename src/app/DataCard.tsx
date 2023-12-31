import { useState, useEffect } from 'react';
import { getMatchesForUser, getMatchData } from './ApiCalls';
import { Container, Row, Col, Card, Button } from 'react-bootstrap/';
import * as status from './constants';

interface MatchDataLookup {
  [key: string]: any
}

// interface MatchData {
//   win: boolean;
//   role: string;
//   championName: string;
// }

function DataCard(props: any) {
  console.log(props.data);
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
      setAllMatches((currData: any) => [...currData, matchInfo]);
    })
  }

  const createLookup = () => {
    let dictionary: MatchDataLookup = {};
    allMatches.forEach(async (match: any) => {
      dictionary[match.metadata.matchId] = match.info;
    })
    setMatchesLookup(dictionary);
  }

  const formatDate = (date: string) => new Date(date).toLocaleString();

  return (
    <Col xs={12} md={6} className="pb-3">
      <Card>
        <Card.Header as="h5">{props.name}</Card.Header>
        <Card.Body>
          <Card.Title>Past {status.GAMES_TO_SHOW} games</Card.Title>
          <Card.Text>
            Showing game id and wins
          </Card.Text>
          {
            matches.map(x =>
              <div key={x}>
                {matchesLookup[x] ? formatDate(matchesLookup[x].gameCreation) : ''}::
                {matches.length > 0 ? x : ''}::
                {matchesLookup[x] ? matchesLookup[x].participants.filter((x: any) => x.summonerId === props.data.id)[0].win ? 'W' : 'LOSS' : ''}
              </div>)
          }
          <Button variant="primary">Get Data</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DataCard;
