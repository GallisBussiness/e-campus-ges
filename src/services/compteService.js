import Api from './api';

export const createCompte = ({id,solde}) => Api.post('/compte/'+ id,{solde}).then(res => res.data);
export const getCompteByEtudiant = (id) => Api.get('/compte/etudiant/'+ id).then(res => res.data);
export const getCompteByCode = (code) => Api.get('/compte/code/'+ code).then(res => res.data);
export const getComptes = () => Api.get('/compte').then(res => res.data);
export const getCompte = (id) => Api.get('/compte/' + id).then(res => res.data);
export const deleteCompte = (id) => Api.delete('/compte/' + id).then(res => res.data);