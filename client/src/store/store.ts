import { configureStore } from '@reduxjs/toolkit';
import { userApi,taskApi,feedApi} from '../api';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(taskApi.middleware)
      .concat(feedApi.middleware)
});

export default store;
