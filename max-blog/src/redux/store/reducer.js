import { nanoid } from "nanoid";

import { ADD_ITEM, DELETE_ITEM, HANDLE_CHECK } from "./actionTypes";

const initialState = [
	{
		id: nanoid(),
		value: "react checkbox 控制",
		checked: false,
	},
	{
		id: nanoid(),
		value: "redux 项目设计",
		checked: false,
	},
];

// reducer 两个参数，上一个 state 和 action
function ListReducer(prevState = initialState, action) {
	const { type, value, index } = action;
	switch (type) {
		case ADD_ITEM:
			return [
				...prevState,
				{
					id: nanoid(),
					value,
					checked: false,
				},
			];
		case DELETE_ITEM:
			prevState.map((v, i) => {
				if (v.checked == true) prevState.splice(i, 1);
			});

			return [...prevState];
		case HANDLE_CHECK:
			prevState[index].checked = !prevState[index].checked;
			prevState.splice(index, 1, prevState[index]);
			return [...prevState];
		default:
			return prevState;
	}
}

export default ListReducer;
