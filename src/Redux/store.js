import { configureStore } from "@reduxjs/toolkit";
import tourSlice from "./tourSlice";
import categorySlice from "./categorySlice";
import currencySlice from "./currencySlice";
import destinationSlice from "./destinationSlice";
import reviewSlice from "./reviewSlice";
import authSlice from "./authSlice";



const store = configureStore({
    reducer:{
        tours: tourSlice,
        category: categorySlice,
        currency: currencySlice,
        destination: destinationSlice,
        review: reviewSlice,
        userAuth: authSlice
    }
})
export default store


