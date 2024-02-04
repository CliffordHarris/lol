import { getDataForN } from "./Util"; // brings in functions and files

type Stats = {
  name: string;
  position: string;
  experience: number;
  visionScore: number;
  damageDealt: number;
  win: string;
}

function CompareStats() { // component name
  const myGames: any[] = getDataForN(); // logic
  
  console.log(myGames[2]);

  let listOfStats: Stats[] = [];

  for (let i = 0; i < myGames.length; i++) {
    const game = myGames[i];
    let aStatObject = {
      name: game["championName"],
      position: game["individualPosition"],
      experience: game["champExperience"],
      visionScore: game["visionScore"],
      damageDealt: game["totalDamageDealt"],
      win: game["win"] ? "win" : "lose"
    };
    listOfStats.push(aStatObject);

  }
  console.table(listOfStats)

  return ( // returns html
    <div style={{ background: "lightgray"}}>
      <div className="text-center">
        Compare Stats
      </div>
      <div>
        Nat
      </div>
      <div>
        {listOfStats.map(stat => (
          <div>
            <h2>{stat.name}</h2>
            <div>{stat.position}</div>
            <div>{stat.experience}</div>
            <div>{stat.visionScore}</div>
            <div>{stat.damageDealt}</div>
            <div>{stat.win}</div>
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
