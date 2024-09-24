// Board.tsx
// Board.tsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "./Draggable";
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
  DragEndEvent,
} from "@dnd-kit/core";
import { Card as CardType, CardsState } from '../slices/cardsSlice'; 

const Board = () => {
  const lists = useSelector((state: { lists: ListsState }) => state.lists.lists);
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
    const { active, over } = event;


    setActiveId(null);

    if (over && active.id !== over.id && active.data.current) {
      const activeListId = active.id as string;
      const overListId = over.id as string;

      dispatch(
        moveCard({
          activeListId,
          overListId,
          activeIndex: active.data.current.sortable.index,
          overIndex: over.data.current?.sortable.index || 0,
        })
      );
    }
  };

  const cards = useSelector((state: { cards: CardsState }) => state.cards.cards);

  const renderDraggableItem = (item: {
	card: CardType;
	listId: string;
	sortable: { id: string };
}) => {
	return (
		<Draggable key={item.card.id} id={item.card.id} data={item}>
			<Card card={item.card} listId={item.listId} />
		</Draggable>
	);
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
                {activeId ? (
                    renderDraggableItem({
                        card: cards.find(card => card.id === activeId) as CardType, 
                        listId: lists.find(list => list.cardIds.includes(activeId))?.id as string,
                        sortable: { id: activeId as string }
                    })
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Board;