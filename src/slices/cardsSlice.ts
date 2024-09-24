// src/slices/cardsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Card {
	id: string;
	title: string;
	description: string;
}

export interface CardsState {
	cards: Card[];
}

const initialState: CardsState = {
	cards: [
		{ id: "card1", title: "Lorem ipsum dolor", description: "Sed viverra, diam eu facilisis bibendum, anto orci placerat quam" },
		{ id: "card2", title: "Lorem ipsum dolor", description: "Sed viverra, diam eu facilisis bibendum, anto orci placerat quam" },
		{ id: "card3", title: "Lorem ipsum dolor", description: "Sed viverra, diam eu facilisis bibendum, anto orci placerat quam" },
	],
};

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		createCard: (state, action: PayloadAction<Card>) => {
			state.cards.push(action.payload);
		},
		deleteCard: (state, action: PayloadAction<string>) => {
			state.cards = state.cards.filter((card) => card.id !== action.payload);
		},
		clearBoard: (state) => {
			state.cards = [];
		},
	},
});

export const { createCard, deleteCard, clearBoard } = cardsSlice.actions;
export default cardsSlice.reducer;