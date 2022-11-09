import Api from './api';

export const createDepot = (data) => Api.post('/operations/depot',data).then(res => res.data);
export const createRetrait = (data) => Api.post('/operations/retrait', data).then(res => res.data);