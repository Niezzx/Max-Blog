import React from "react";

import { useRef } from "react";
import store from "../../redux/store";
import {
	addItemAction,
	handleCheckAction,
	deleteItemAction,
} from "../../redux/store/actionCreators.js";

import "./FutureList.scss";

export default function FutureList() {
	const inputEl = useRef(null);

	const list = store.getState().map((v, i) => {
		return (
			<li key={v.id}>
				<input
					type="checkbox"
					id={`checkbox-${i}`}
					checked={v.checked}
					onChange={onChangeClick}
				/>

				<span>{v.value}</span>
				<span className={v.checked ? `Checked` : "UnChecked"}>
					{v.checked ? "Check" : "Uncheck"}
				</span>
			</li>
		);
	});

	const onButtonClick = (e) => {
		e.preventDefault();
		const action = addItemAction(inputEl.current.value);
		store.dispatch(action);
	};

	const onButtonClear = (e) => {
		e.preventDefault();
		const action = deleteItemAction();
		store.dispatch(action);
	};

	function onChangeClick(e) {
		const index = e.target.id.charAt(e.target.id.length - 1);
		const action = handleCheckAction(index);
		store.dispatch(action);
	}

	return (
		<div className="futureList">
			<h2>
				YOU'VE GOT <span className="emphasis">{store.getState().length}</span>{" "}
				things TO DO:
			</h2>
			<ul>{list}</ul>
			<form>
				<input
					className="add-input"
					placeholder="I need to..."
					type="text"
					ref={inputEl}
				/>
				<button className="add-btn" onClick={onButtonClick}>
					<h2>Add</h2>
				</button>
				<button className="clear-btn" onClick={onButtonClear}>
					Clear completed
				</button>
			</form>
		</div>
	);
}
