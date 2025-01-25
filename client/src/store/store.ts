import { configureStore } from '@reduxjs/toolkit';
import { userApi,taskApi } from '../api';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(taskApi.middleware)
});

export default store;
