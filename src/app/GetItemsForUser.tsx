import { data } from '../assets/item';

type ItemId = number;

export const getItemsForUser = (itemIds: ItemId[]) => {
    let dict: any = {};
    const d = data.data as any;
    itemIds.forEach(id => dict[id] = id !== 0 ? d[id].name : "");
    return dict;
}