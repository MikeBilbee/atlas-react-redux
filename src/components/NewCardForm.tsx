// NewCardForm.tsx

import { FormEvent, useState } from "react";
import { useDispatch } from 'react-redux';
import { createCard } from '../slices/cardsSlice';
import { addCardToList } from '../slices/listsSlice';

const NewCardForm = ({ listId }: { listId: string }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();

    const handleSubmitCard = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newCardId = `card-${Date.now()}`;

        dispatch(createCard({
            id: newCardId,
            title,
            description
        }));
        dispatch(addCardToList({ listId, cardId: newCardId }));

        setTitle("");
        setDescription("");
    };

    return (
        <div className="group/new-card m-3 flex h-44 w-full justify-center">
            <form
                onSubmit={handleSubmitCard}
                className="hidden min-h-24 w-full flex-col items-start rounded bg-off-white-light px-4 text-blue group-hover/new-card:flex"
            >
                <input
                    className="w-11/12 resize-none overflow-auto rounded-t-3xl border-0 bg-off-white-light px-0 py-6 text-xl font-black text-blue outline-none"
                    autoFocus
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-11/12 resize-none overflow-auto border-0 bg-off-white-light text-blue outline-none"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="buttons w-full">
                    <button type="submit" className="w-full p-4">Save</button>
                </div>
            </form>
        </div>
    )
}

export default NewCardForm;