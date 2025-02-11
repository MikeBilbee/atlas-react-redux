import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import listsSlice from '../slices/listsSlice';
import cardsSlice from '../slices/cardsSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedListsReducer = persistReducer(persistConfig, listsSlice);
const persistedCardsReducer = persistReducer(persistConfig, cardsSlice);

const store = configureStore({
    reducer: {
        lists: persistedListsReducer,
        cards: persistedCardsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };