// List.tsx

import React from "react";
import { useSelector } from 'react-redux';
import { CardsState } from '../slices/cardsSlice'; 
import DeleteListButton from "./DeleteListButton";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import { Lists } from '../slices/listsSlice';

export interface ListProps {
    list: Lists; 
    onDeleteList: (listId: string) => void;
}

const List: React.FC<ListProps> = ({ list, onDeleteList }) => { // Use typeof List here
    const cards = useSelector((state: { cards: CardsState }) => 
        state.cards.cards.filter(card => list.cardIds.includes(card.id))
    );

    return (
        <div className="group/list h-full min-w-96 p-4 text-center">
            <DeleteListButton listId={list.id} onDeleteList={onDeleteList} />
            <h3>{list.title}</h3> 
            {cards.map((card) => (
            <Card key={card.id} card={card} listId={list.id} />
        ))}
            <NewCardForm listId={list.id} /> 
        </div>
    );
}

export default List;