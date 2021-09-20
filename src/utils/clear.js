const clear = data => ({
	...data,
	valid: true,
	error: '',
});

const clearData = (data, keyArray) => {
	const newData = { ...data };
	for (let index = 0; index < keyArray.length; index += 1) {
		newData[keyArray[index]] = clear(newData[keyArray[index]]);
	}
	return newData;
};

export const clearLoginFormData = data => {
	const newData = clearData(data, ['account', 'password']);

	return newData;
};
