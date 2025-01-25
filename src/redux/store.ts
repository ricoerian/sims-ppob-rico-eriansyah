import { configureStore } from '@reduxjs/toolkit';
import slicerReducer from './slices/slicer';
import toastReducer from './slices/toastSlices';

export const store = configureStore({
  reducer: {
    slicer: slicerReducer,
    toast: toastReducer,
  },
});

// Ekspor tipe global
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
