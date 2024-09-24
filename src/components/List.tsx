// List.tsx

import React from "react";
import { useSelector } from 'react-redux';
import { CardsState } from '../slices/cardsSlice'; 
import DeleteListButton from "./DeleteListButton";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import { Lists } from '../slices/listsSlice';
import {
	useDroppable
} from '@dnd-kit/core';
import Draggable from "./Draggable";

export interface ListProps {
    list: Lists; 
    onDeleteList: (listId: string) => void;
}

const List: React.FC<ListProps> = ({ list, onDeleteList }) => { 
    const cards = useSelector((state: { cards: CardsState }) => 
        state.cards.cards.filter(card => list.cardIds.includes(card.id))
    );

    const {setNodeRef: setDroppableNodeRef} = useDroppable({
        id: list.id
    })

    return (
        <div className="group/list h-full min-w-96 p-4 text-center">
            <DeleteListButton listId={list.id} onDeleteList={onDeleteList} /> 
            <h3>{list.title}</h3> 

			<div ref={setDroppableNodeRef}> 
            {cards.map((card) => (
                <Draggable key={card.id} id={card.id} data={{ card, listId: list.id }}> 
                    <Card card={card} listId={list.id} />
                </Draggable>
            ))}
            </div>

            <NewCardForm listId={list.id} /> 
        </div>
    );
}

export default List;