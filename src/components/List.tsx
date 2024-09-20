//List.tsx
import React from "react";

import DeleteListButton from "./DeleteListButton";
import Card from "./Card";
import NewCardForm from "./NewCardForm";

interface ListProps {
	id: string
}

const List: React.FC<ListProps> = ({ id }) => {
	const cards = [
		{ id: "card1", title: "Card 1", description: "Description for Card 1" },
		{ id: "card2", title: "Card 2", description: "Description for Card 2" },
		{ id: "card3", title: "Card 3", description: "Description for Card 3" }
	];
	

	return (
		<div className="group/list h-full min-w-96 p-4 text-center">
			<DeleteListButton listId={id}/>
			<h3>To Do</h3>
			{cards.map((card) => (
				<Card key={card.id} id={card.id} /> 
			))}
			<NewCardForm />
		</div>
	)
}

export default List;