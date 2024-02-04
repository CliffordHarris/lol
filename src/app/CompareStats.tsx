import { getDataForN } from "./Util"; // brings in functions and files

type Stats = {
  name: string;
  position: string;
  experience: number;
  visionScore: number;
  damageDealt: number;
}

function CompareStats() { // component name
  const myGames: any[] = getDataForN(); // logic
  
  console.log(myGames[2]);

  for (let i = 0; i < myGames.length; i++) {
    const game = myGames[i];
    let listOfStats: Stats[] = [];
    let aStatObject = {
      name: game["championName"],
      position: game["individualPosition"],
      experience: game["champExperience"],
      visionScore: game["visionScore"],
      damageDealt: game["totalDamageDealt"],
    };
    listOfStats.push(aStatObject);

    console.table(listOfStats)
  }

  return ( // returns html
    <div style={{ background: "red" }}>
      <div className="text-center">
        Compare Stats
      </div>
      <div>
        Team 1
      </div>
      <div className="text-end">
        Team 2
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
