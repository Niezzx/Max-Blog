import { createStore } from "redux";
import reducer from "./reducer";

// 整个应用只能有一个 store
const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
