import { getDataForA } from "./Util";
import DataTable from './DataTable';
import { getItemDictionaryForItemIds } from "./ApiCalls";

function UserItems() {
    const itemStringList = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', "item6"];
    const listOfItems = [];
    //const formatMinutes = (seconds: number) => (seconds/60).toFixed() + "'";
    const myGames = getDataForA();
    console.log(getItemDictionaryForItemIds([1052, 3020])); // Amplifying Tome item id


    // filter
    for (let i = 0; i < myGames.length; i++) {
        const games = myGames[i];
    
        // DRY - Don't Repeat Yourself
    
        const itemIds: number[] = itemStringList.map(s => games[s]);
        const itemDict = getItemDictionaryForItemIds(itemIds); // Amplifying Tome item id

        listOfItems.push(
          {
            id: i,
            championName: games["championName"],
            item0: itemDict[games["item0"]],
            item1: itemDict[games["item1"]],
            item2: itemDict[games["item2"]],
            item3: itemDict[games["item3"]],
            item4: itemDict[games["item4"]],
            item5: itemDict[games["item5"]],
            item6: itemDict[games["item6"]],
            controlWardsPlaced: games["challenges"]["controlWardsPlaced"],
            controlWardTimeCoverage: games["challenges"]["controlWardTimeCoverageInRiverOrEnemyHalf"],
            visionScoreAdvantage: games["challenges"]["visionScoreAdvantageLaneOpponent"],
            visionScorePerMinute: games["challenges"]["visionScorePerMinute"]
            
          }
          );
      
        console.table(listOfItems);
      }

      // This code renders html
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