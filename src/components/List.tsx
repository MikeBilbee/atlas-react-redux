import React from "react";
import { useSelector } from 'react-redux';
import { CardType, CardsState } from '../slices/cardsSlice';
import DeleteListButton from "./DeleteListButton";
import NewCardForm from "./NewCardForm";
import { Lists } from '../slices/listsSlice';
import Card from "./Card";
import {
	useDraggable,
	useDroppable,
} from '@dnd-kit/core';

export interface ListProps {
	list: Lists;
	onDeleteList: (listId: string) => void;
}

const DraggableCard = ({ card, index, listId }: { card: CardType; index: number; listId: string }) => {
    const { attributes, listeners, setNodeRef: setDraggableNodeRef } = useDraggable({
        id: card.id, // Use the card's id directly
        data: {
            type: 'card',
            cardId: card.id, // Include the cardId
            index,
            listId, // Include the listId
        },
    });

    return (
        <div ref={setDraggableNodeRef} {...attributes} {...listeners}>
            <Card card={card} listId={listId} />
        </div>
    );
};

const List: React.FC<ListProps> = ({ list, onDeleteList }) => {
	const cards = useSelector((state: { cards: CardsState }) =>
		state.cards.cards.filter((card) => list.cardIds.includes(card.id))
	);

	const { setNodeRef: setDroppableNodeRef } = useDroppable({
        id: list.id,
        data: {
            type: 'list'
        },
    });

	return (
        <div className="group/list h-full min-w-96 p-4 text-center" ref={setDroppableNodeRef}>
            <DeleteListButton listId={list.id} onDeleteList={onDeleteList} />
            <h3>{list.title}</h3>
            <div>
                {cards.map((card, index) => (
                    <DraggableCard key={card.id} card={card} index={index} listId={list.id} />
                ))}
            </div>
            <NewCardForm listId={list.id} />
        </div>
    );
};

export default List;