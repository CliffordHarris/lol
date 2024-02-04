import { getDataForA } from "./Util";

function PurchasedItems() {
    const items = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', "item6"];
    const myGames = getDataForA();
    console.log(myGames);
    return (
        <>
            {items.map(
                (item) =>
                    <div key={item}>
                        {item}
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