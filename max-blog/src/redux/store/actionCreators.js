import { ADD_ITEM, DELETE_ITEM, HANDLE_CHECK } from "../../redux/store/actionTypes";

export const addItemAction = (value) => ({
	type: ADD_ITEM,
	value,
});

export const handleCheckAction = (index) => ({
	type: HANDLE_CHECK,
	index,
});

export const deleteItemAction = () => ({
	type: DELETE_ITEM,
});
