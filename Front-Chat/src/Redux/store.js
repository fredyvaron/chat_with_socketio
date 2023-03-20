import { configureStore} from "@reduxjs/toolkit";
import datosReducer from "./reducer";

export default configureStore({
  reducer: {
    data: datosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
