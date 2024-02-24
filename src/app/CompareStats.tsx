import { getDataForN } from './Util'; // brings in functions and files

type Stats = {
  // id: number;
  playerName: string;
  name: string;
  position: string;
  experience: number;
  visionScore: number;
  damageDealt: number;
  win: boolean;
  damageTaken: number;
  kills: number;
  deaths: number;
  assists: number;
};

function CompareStats() {
  // component name
  const myGames: any[] = getDataForN(); // logic

  console.log(myGames[2]);
  let listOfStats: Stats[] = [];

  for (let i = 0; i < myGames.length; i++) {
    const game = myGames[i];
    let aStatObject: Stats = {
      // id: i,
      playerName: game['riotIdGameName'],
      name: game['championName'],
      position: game['individualPosition'],
      experience: game['champExperience'],
      visionScore: game['visionScore'],
      damageDealt: game['totalDamageDealt'],
      win: game['win'],
      damageTaken: game['totalDamageTaken'],
      kills: game['kills'],
      deaths: game['deaths'],
      assists: game['assists'],
    };
    listOfStats.push(aStatObject);
  }
  console.table(listOfStats);

  return (
    // returns html
    <div style={{ border: '1px solid lightgray' }}>
      <div className="text-center">Compare Stats</div>
      <div>
        {listOfStats.map((stat) => (
          <div key={stat.experience} style={{ padding: '30px' }}>
            {/* <h2 style={{background: "lightgreen"}}>{stat.name}</h2> */}
            <div>{stat.playerName}</div>
            <h2 style={{ background: stat.win ? 'lightgreen' : 'pink' }}>
              {stat.name}
            </h2>
            <div>Position: {stat.position}</div>
            <div>
              KDA: {stat.kills}/{stat.deaths}/{stat.assists}
            </div>
            <div>Experience: {stat.experience}</div>
            <div>Vision Score: {stat.visionScore}</div>
            <div>Damage Dealt: {stat.damageDealt}</div>
            <div>Damage Taken: {stat.damageTaken}</div>
            {/* <div>{stat.win}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompareStats;

// 1. Compare each teams stats based on roles

// 2. Get data:
// a. KDA
// b. Kill participation
// c. Ability usage
// d. Characters
// e. Character Level

// 3. Design:
// a. Left side is team one
// b. Right side is team two
// c. Role matchup

// 5. space out stats on Compare Stats Page so that it's not too close together
// 6. add character level in aStatobject
// 7. add damage taken to show the difference between how much damage you've dealt and taken
// 8. add date
// 9. make each game its own section or separate each game
// 10. make the labels neater

// TODO: Turn stats into a graph
