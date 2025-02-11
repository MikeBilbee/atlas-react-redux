import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { deleteList, ListsState, moveCard } from "../slices/listsSlice";
import List from "./List";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DragStartEvent,
    DragEndEvent
} from "@dnd-kit/core";
import { CardType, CardsState } from '../slices/cardsSlice'; 

const Board = () => {
    const lists = useSelector((state: { lists: ListsState }) => state.lists.lists);
    const cards = useSelector((state: { cards: CardsState }) => state.cards.cards);
    const dispatch = useDispatch();

    const handleDeleteList = (listId: string) => {
        dispatch(deleteList(listId));
    };

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

    const [activeId, setActiveId] = useState<string | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
		try {
			const { active, over } = event;
			setActiveId(null); // Reset activeId
	
			if (over && active.id !== over.id) {
				const activeListId = String(active.data.current?.listId);
				const overListId = String(over.id);
	
				const activeCardId = active.data.current?.cardId;
				const activeIndex = active.data.current?.index ?? 0;

				const isOverListValid = lists.some((list) => list.id === overListId);
	
				if (activeCardId && activeListId && overListId && isOverListValid) {
					const activeList = lists.find((list) => list.id === activeListId);
					const overList = lists.find((list) => list.id === overListId);
	
					if (activeList && overList) {
						dispatch(
							moveCard({
								activeListId,
								overListId,
								activeIndex,
								overIndex: over.data.current?.index || 0,
								cardId: activeCardId,
							})
						);
					} else {
						console.error('Invalid card or list IDs during drag end.');
					}
				}
			}
		} catch (error) {
			console.error('Error in handleDragEnd:', error);
		}
	};

    const renderDraggableItem = (item: {
        card: CardType;
        listId: string;
        index: number;
    }) => {
        return (
            <div
                key={item.card.id}
                style={{
                    backgroundColor: 'lightgray',
                    padding: '8px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Card card={item.card} listId={item.listId} />
            </div>
        );
    };

	const renderDragOverlayContent = () => {
		if (!activeId) return null;
	
		try {
			const activeCard = cards.find((card) => card.id === activeId);
			const activeList = lists.find((list) => list.cardIds.includes(activeId));
	
			if (activeCard && activeList) {
				return renderDraggableItem({
					card: activeCard,
					listId: activeList.id,
					index: activeList.cardIds.indexOf(activeId),
				});
			} else {
				console.error('Invalid card or list IDs in DragOverlay.');
				return null;
			}
		} catch (error) {
			console.error('Error in DragOverlay:', error);
			return null;
		}
	};

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div className="m-auto
            h-screen w-screen overflow-x-scroll text-center">
                <div className="flex h-full space-x-4">
                    {lists.map((list) => (
                        <List key={list.id} list={list} onDeleteList={handleDeleteList} />
                    ))}
                </div>
            </div>
            <DragOverlay>
                {renderDragOverlayContent()}
            </DragOverlay>
        </DndContext>
    );
};

export default Board;