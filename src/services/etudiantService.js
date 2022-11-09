import Api from './api';
export const getAllEtudiants = () => Api.get('/etudiants').then(res => res.data);
export const getEtudiant = (id) => Api.get('/etudiants/' + id).then(res => res.data);
export const createEtudiant = (data) => Api.post('/etudiants/new', data).then(res => res.data);
export const updateEtudiant = (data) => {
    const {id,...rest} = data;
    return Api.put('/etudiants/update/' + id, rest ).then(res => res.data);
}

export const deleteEtudiant = (id) => Api.delete('/etudiants/delete/' + id).then(res => res.data);

