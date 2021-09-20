export const isExist = value => value !== null && value !== '' && typeof value !== 'undefined';

export const isEmpty = value => !isExist(value);
