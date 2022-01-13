import { useState } from 'react';

export const useBoolean = (options = {}) => {
	const { onTrue = () => {}, onFalse = () => {}, defaultBoolean = false } = options;

	const [boolean, setState] = useState(defaultBoolean);

	const toggle = () => {
		if (boolean) {
			onFalse();
		} else {
			onTrue();
		}
		setState(!boolean);
	};

	const setFalse = () => {
		setState(false);
		onFalse();
	};

	const setTrue = () => {
		setState(true);
		onTrue();
	};

	return [boolean, { toggle, setFalse, setTrue }];
};
