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

const initialState: ListsState = {
	lists: [
		{ id: "list1", title: "To Do", cardIds: ["card1", "card2", "card3"] },
		{ id: "list2", title: "In Progress", cardIds: ["card1", "card2", "card3"] },
		{ id: "list3", title: "Done", cardIds: ["card1", "card2", "card3"] },
		{ id: 'placeholder-list', title: 'Add a list...', cardIds: [] }
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
		}
	},
});

export const { addList, deleteList, addCardToList, clearBoard, removeCardFromList } = listsSlice.actions;
export default listsSlice.reducer;