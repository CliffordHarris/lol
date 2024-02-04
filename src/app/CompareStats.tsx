import { getDataForN } from "./Util"; // brings in functions and files


function CompareStats() { // component name

const myGames = getDataForN(); // logic

console.log(myGames[2])



for (let i = 0; i < myGames.length; i++) {
  const g = myGames[i];
  let listOfStats = [];
  listOfStats.push(
    {
      name: g["championName"],
      position: g["individualPosition"],
      experience: g["champExperience"],
      visionScore: g["visionScore"],
      damageDealt: g["totalDamageDealt"]
    }
    );

  console.table(listOfStats)
}


return ( // returns html
    <div style={{background: "red"}}>
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
