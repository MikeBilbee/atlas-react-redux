// src/slices/cardsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardType {
	id: string;
	title: string;
	description: string;
}

export interface CardsState {
	cards: CardType[];
}

const initialState: CardsState = {
    cards: [],
};

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		createCard: (state, action: PayloadAction<CardType>) => {
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