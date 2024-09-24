// Board.tsx

import { useSelector, useDispatch } from 'react-redux';
import { deleteList } from '../slices/listsSlice'; 
import List from "./List";
import { ListsState } from '../slices/listsSlice';

const Board = () => {
	const lists = useSelector((state: { lists: ListsState }) => state.lists.lists); 
	const dispatch = useDispatch();

	const handleDeleteList = (listId: string) => {
		dispatch(deleteList(listId));
	};

	return (
		<div className="m-auto h-screen w-screen overflow-x-scroll text-center">
			<div className="flex h-full space-x-4">
				{lists.map((list) => (
					<List key={list.id} list={list} onDeleteList={handleDeleteList} /> 
				))}
			</div>
		</div>
	);
};

export default Board;