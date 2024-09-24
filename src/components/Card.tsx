// Card.tsx
import React from "react";
import { useDispatch } from 'react-redux';
import { deleteCard } from '../slices/cardsSlice';
import { removeCardFromList } from '../slices/listsSlice'
import DeleteCardButton from "./DeleteCardButton";
import { Card as CardType } from '../slices/cardsSlice';

interface CardProps {
    card: CardType;
    listId: string; // Add listId to the CardProps interface
}

const Card: React.FC<CardProps> = ({ card, listId }) => { // Receive listId as a prop
    const dispatch = useDispatch();

    const handleDeleteCard = () => {
        dispatch(deleteCard(card.id));
        dispatch(removeCardFromList({ listId, cardId: card.id }));
    };

    return (
        <div className="card group/card m-3 flex min-h-24 w-full flex-col items-start rounded bg-off-white-light px-4 py-2 text-blue">
            <h5 className="my-2 flex w-full items-end justify-between text-xl font-black">
                <span>{card.title}</span>
                <DeleteCardButton listId={listId} cardId={card.id} onDeleteCard={handleDeleteCard} /> 
            </h5>
            <p className="mt-0 text-left">
                {card.description}
            </p>
        </div>
    );
}

export default Card;