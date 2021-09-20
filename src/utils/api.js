import qs from 'qs';
import axios from 'axios';

export const generateUrl = (url, params) => {
	const paramsString = qs.stringify(params, { arrayFormat: 'brackets' });
	const baseURL = '';

	const URL = paramsString !== '' ? `${baseURL}/${url}?${paramsString}` : `${baseURL}/${url}`;

	return URL;
};

export const wrapFetch = async (url, method = 'get', data = null, params = {}) => {
	const URL = generateUrl(url, params);

	const result = await axios({
		method,
		url: URL,
		data,
		headers: { 'Content-Type': 'application/json' },
	})
		.then(response => response)
		.catch(error => error);

	// if (result.data.success === 'false' && result.data.message === 'no auth') {
	// 	window.location.href = '/login';
	// 	return null;
	// }

	return result.data;
};
