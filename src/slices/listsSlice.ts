// src/slices/listsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lists {
	id: string;
	title: string;
	cardIds: string[];
}

export interface ListsState {
	lists: Lists[];
}

interface MoveCardPayload {
    activeListId: string;
    overListId: string;
    activeIndex: number;
    overIndex: number;
    cardId: string;
}

const initialState: ListsState = {
    lists: [
        { id: "list1", title: "To Do", cardIds: [] },
        { id: "list2", title: "In Progress", cardIds: [] },
        { id: "list3", title: "Done", cardIds: [] },
    ],
};


const listsSlice = createSlice({
	name: 'lists',
	initialState,
	reducers: {
    addList: (state, action: PayloadAction<{ id: string; title: string }>) => {
			state.lists.push({
				id: action.payload.id,
				title: action.payload.title,
				cardIds: [],
			});
		},
		deleteList: (state, action: PayloadAction<string>) => {
			state.lists = state.lists.filter((list) => list.id !== action.payload);
		},
		addCardToList: (state, action: PayloadAction<{ listId: string; cardId: string }>) => {
			const list = state.lists.find((list) => list.id === action.payload.listId);
			if (list) {
				list.cardIds.push(action.payload.cardId);
			}
		},
		clearBoard: (state) => {
			state.lists = [];
			state.lists = [{ id: 'placeholder-list', title: 'Add a list...', cardIds: [] }]
		},
		removeCardFromList: (state, action: PayloadAction<{ listId: string; cardId: string }>) => {
			const list = state.lists.find(list => list.id === action.payload.listId);
			if (list) {
				list.cardIds = list.cardIds.filter(id => id !== action.payload.cardId);
			}
		},
		moveCard: (state, action: PayloadAction<MoveCardPayload>) => {
            const { activeListId, overListId, activeIndex, overIndex, cardId } = action.payload;

            const activeListIndex = state.lists.findIndex((list) => list.id === activeListId);
            const overListIndex = state.lists.findIndex((list) => list.id === overListId);

            if (activeListIndex!== -1 && overListIndex!== -1) {
                const activeList = state.lists[activeListIndex];
                const overList = state.lists[overListIndex];

                activeList.cardIds.splice(activeIndex, 1);

                overList.cardIds.splice(overIndex, 0, cardId);

                state.lists[activeListIndex] = {...activeList};
                state.lists[overListIndex] = {...overList};

            }
        },
	},
});

export const { addList, deleteList, addCardToList, clearBoard, removeCardFromList, moveCard } = listsSlice.actions; 
export default listsSlice.reducer;