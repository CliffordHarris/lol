import { getDataForN } from "./Util"; // brings in functions and files

type Stats = {
  // id: number;
  name: string;
  position: string;
  experience: number;
  visionScore: number;
  damageDealt: number;
  win: boolean;
}

function CompareStats() { // component name
  const myGames: any[] = getDataForN(); // logic
  
  console.log(myGames[2]);
  let listOfStats: Stats[] = [];

  for (let i = 0; i < myGames.length; i++) {
    const game = myGames[i];
    let aStatObject: Stats = {
      // id: i,
      name: game["championName"],
      position: game["individualPosition"],
      experience: game["champExperience"],
      visionScore: game["visionScore"],
      damageDealt: game["totalDamageDealt"],
      win: game["win"]
    };
    listOfStats.push(aStatObject);

  }
  console.table(listOfStats)

  return ( // returns html
    <div style={{ border: "1px solid lightgray"}}>
      <div className="text-center">
        Compare Stats
      </div>
      <div>
        Nat
      </div>
      <div style={{padding:"30px"}}>
        {listOfStats.map(stat => (
          <div key={stat.experience}>
            {/* <h2 style={{background: "lightgreen"}}>{stat.name}</h2> */}
            <h2 style={{background: stat.win ? "lightgreen" : "pink"}}>{stat.name}</h2>
            <div>Position: {stat.position}</div>
            <div>Experience: {stat.experience}</div>
            <div>Vision Score: {stat.visionScore}</div>
            <div>Damage Dealt: {stat.damageDealt}</div>
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
// d. Winning side green

// 5. space out stats on Compare Stats Page so that it's not too close together
// 6. add character level in aStatobject