import { getDataForA } from "./Util";
import DataTable from './DataTable';

function UserItems() {
    const items = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', "item6"];
    const listOfItems = [];
    //const formatMinutes = (seconds: number) => (seconds/60).toFixed() + "'";
    const myGames = getDataForA();
    console.log(myGames);

    // filter

    
    for (let i = 0; i < myGames.length; i++) {
        const games = myGames[i];
        listOfItems.push(
          {
            id: i,
            championName: games["championName"],
            item0: games["item0"],
            item1: games["item1"],
            item2: games["item2"],
            item3: games["item3"],
            item4: games["item4"],
            item5: games["item5"],
            item6: games["item6"],
            controlWardsPlaced: games["challenges"]["controlWardsPlaced"],
            controlWardTimeCoverage: games["challenges"]["controlWardTimeCoverageInRiverOrEnemyHalf"],
            visionScoreAdvantage: games["challenges"]["visionScoreAdvantageLaneOpponent"],
            visionScorePerMinute: games["challenges"]["visionScorePerMinute"]
            
          }
          );
      
        console.table(listOfItems);
      }

    return (
        <>
            
            {listOfItems.map(
                (item) =>
                    <div key={item.id}>
                        <div>{item.championName} ITEMS: </div>
                            <ul>
                                <li>{item.item0}</li>
                                <li>{item.item1}</li>
                                <li>{item.item2}</li>
                                <li>{item.item3}</li>
                                <li>{item.item4}</li>
                                <li>{item.item5}</li>
                                <li>{item.item6}</li>
                                <div>
                                    Ward Info:
                                    <ul>
                                        <li>Control Wards Placed: {item.controlWardsPlaced}</li>
                                        <li>Control Ward Time Spent in Enemy Area: {item.controlWardTimeCoverage}</li>
                                        <li>Vision Score Advantage: {item.visionScoreAdvantage}</li>
                                        <li>Vision Score Per Minute: {item.visionScorePerMinute}</li>
                                    </ul>
                                </div>
                            </ul>
                        

                    </div>
            )}
        </>
    );
}

export default UserItems;

// 1. I want the id numbers of the items to show in place of "item#"
// 2. I want to show the items in the league format like > [1] [2] [3]
//                                                         [4] [5] [6]
// 3. I want to show what stats were improved by the items bought
// 4. Sight Wards bought/placed/destroyed