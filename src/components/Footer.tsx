//Footer.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearBoard as clearLists } from '../slices/listsSlice';
import { clearBoard as clearCards } from '../slices/cardsSlice';

const Footer = () => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		alert('Create list');
	};

	const dispatch = useDispatch();

	const handleClearBoard = () => {
		dispatch(clearLists());
		dispatch(clearCards());
	};

	return (
		<footer
			className="sticky h-20 bottom-0 left-0 flex w-screen items-center justify-center space-x-8 border-t-2 border-blue bg-off-white-light p-8"
		>
			<form onSubmit={ handleSubmit }>
				<input
					type="text"
					placeholder="List title"
					name="title"
					className="border-0 bg-transparent text-2xl font-semibold text-blue placeholder:text-blue placeholder:opacity-50 focus:outline-none"
				/>
				<button
					type="submit"
					className="rounded bg-teal px-4 py-2 text-lg font-semibold text-off-white-light"
				>
					Save
				</button>
				<button
					onClick={ handleClearBoard }
					type="button"
					className="rounded bg-teal ml-1 px-4 py-2 text-lg font-semibold text-off-white-light"
				>
					Clear Board
				</button>
			</form>
		</footer>
	)
}

export default Footer;