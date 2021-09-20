import { isExist, isEmpty } from './helper';

export const examValue = (data, keyValue) => ({
	value: keyValue.every(key => isExist(data[key].value)),
	notValid: keyValue.filter(key => isEmpty(data[key].value)),
});

export const examLoginFormData = data => {
	const result = examValue(data, ['phone', 'password']);

	return {
		value: result.value,
		notValid: [...result.notValid],
	};
};
