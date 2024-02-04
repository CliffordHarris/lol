import { getDataForA } from "./Util";

function PurchasedItems() {
    const items = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', "item6"];
    const listOfItems = [];
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
          }
          );
      
        console.table(listOfItems);
      }

    return (
        <>
            
            {listOfItems.map(
                (item) =>
                    <div key={item.id}>
                        <div>{item.championName}</div>
                            <ul>
                                <li>{item.item0}</li>
                                <li>{item.item1}</li>
                                <li>{item.item2}</li>
                                <li>{item.item3}</li>
                                <li>{item.item4}</li>
                                <li>{item.item5}</li>
                                <li>{item.item6}</li>
                            </ul>
                        

                    </div>
            )}
        </>
    );
}

export default PurchasedItems;

// 1. I want the id numbers of the items to show in place of "item#"
// 2. I want to show the items in the league format like > [1] [2] [3]
//                                                         [4] [5] [6]
// 3. I want to show the chronilogical order the items were bought
// 4. I want to show what stats were improved by the items bought