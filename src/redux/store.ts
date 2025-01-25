import { configureStore } from '@reduxjs/toolkit';
import slicerReducer from './slices/slicer';

export const store = configureStore({
  reducer: {
    slicer: slicerReducer,
  },
});

store.subscribe(() => {
    console.log(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;