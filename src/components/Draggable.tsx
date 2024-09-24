// Draggable.tsx
import { useDraggable } from '@dnd-kit/core';
import { Card } from '../slices/cardsSlice';

interface DraggableData {
	card: Card;
	listId: string;
}

interface DraggableProps {
  id: string;
  data: DraggableData;
  children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ id, data, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data
  });

  const style = {
    transform: transform ? transform.toString() : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default Draggable;