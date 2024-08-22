import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { category_api } from './services/category_api';
import { user_api } from './services/user_api';
import { product_api } from './services/product_api';
import { order_api } from './services/order_api';




const store = configureStore({
    reducer: {
        [category_api.reducerPath]: category_api.reducer,
        [user_api.reducerPath]: user_api.reducer,
        [product_api.reducerPath]: product_api.reducer,
        [order_api.reducerPath]: order_api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(category_api.middleware)
            .concat(user_api.middleware)
            .concat(product_api.middleware)
            .concat(order_api.middleware)
});

setupListeners(store.dispatch);

export default store;