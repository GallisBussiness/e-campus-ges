import { useDebouncedValue } from '@mantine/hooks';
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { Toast } from 'primereact/toast';
import { useMutation} from 'react-query';
import { useLocation } from 'react-router-dom';
import { getCompteByCode } from '../services/compteService';
import { createRetrait } from '../services/operationService';
import { useRef } from 'react';
import { Divider, Image } from '@mantine/core';
import { env } from '../env';


function Operation({auth}) {

  const [value,setValue] = useState('')
  const [hasError,setHasError] = useState(false)
  const [hasSuccess,setHasSuccess] = useState(false)
  const [debounced] = useDebouncedValue(value, 200);
  const location = useLocation();
  const toast = useRef(null);
  const successRef = useRef(null);
  const errorRef = useRef(null);
  const {price,payement} = location.state;

const {data:compte,mutate} = useMutation((code) => getCompteByCode(code), {
  onSuccess: (_) => {
    if(_) {
      if(_.solde < price) {
        setHasError(true)
      toast.current.show({ severity: 'warn', summary: 'Creation Retrait', detail: 'Une erreur !!', life: 2000 });
      errorRef.current.play()
    }
    else {
      setHasError(false)
      mutateR({compte: _._id,montant: price, responsable: auth._id, payement_subject: payement})
    }
    }
  },
  onSettled: (_) => {
    setValue('')
  }
})

const { mutate:mutateR } = useMutation((data) => createRetrait(data), {
  onSuccess:(_) => {
      toast.current.show({ severity: 'info', summary: 'Creation Retrait', detail: 'Paiement éffectué !!', life: 2000 });
      successRef.current.play()
      setHasSuccess(true)
      setHasError(false)
  },
  onError:(_) => {
      toast.current.show({ severity: 'warn', summary: 'Creation Retrait', detail: 'Une erreur !!', life: 2000 });
      errorRef.current.play()
      setHasSuccess(false)
      setHasError(true)
  }
})

useEffect(() => {
  if(debounced !== '') mutate(debounced)
}, [debounced,mutate]);

  return (
    <>
    <div className="flex h-screen">
        <div className="w-4/12 bg-slate-200 h-full">
          
            <div className="flex flex-col items-center justify-center h-full">
            <div className="my-4 h-40 rounded-md flex items-center justify-center text-5xl font-bold w-full">
               {price} FCFA
          </div>
            <InputText value={value} onChange={(e) => setValue(e.target.value)} autoFocus/>
            </div>
        </div>
        <div className="w-8/12">
         <div className="flex items-center justify-around">
          <img src="/logo.png" className="w-20 h-20 object-cover" alt="logo" />
          <img src="/ecampus.png" className="w-32 h-32 object-contain" alt="ecampus" />
         </div>
         <Divider size="md" />
         <div className="my-4 flex items-center justify-center">
        <h1 className="text-3xl font-bold uppercase">INFORMATIONS DE L'ETUDIANT </h1>
         </div>
        {compte ? <div className="my-4">
        <div style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }} className="my-5">
      <Image
        radius="sm"
        src={`${env.baseServerURL}/${compte.etudiant.avatar}`}
        alt="etudiant profile"
      />
    </div>
    <div className="overflow-x-auto relative mx-10">
    <table className="w-full text-sm text-left text-white">
        <thead className="text-xs text-white uppercase bg-black">
            <tr>
                <th scope="col" className="py-3 px-6">
                   PRENOM
                </th>
                <th scope="col" className="py-3 px-6">
                    NOM
                </th>
                <th scope="col" className="py-3 px-6">
                    N° CARTE
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-black border-b">
              
                <td className="py-4 px-6">
                    {compte.etudiant.prenom}
                </td>
                <td className="py-4 px-6">
                {compte.etudiant.nom}
                </td>
                <td className="py-4 px-6">
                {compte.etudiant.nce}
                </td>
            </tr>
        </tbody>
    </table>
</div>

         </div> : <div className="my-4 flex items-center justify-center"> 
             <img src="/student.png" alt="student" className="w-96 h-96 object-cover" />
         </div>}
         {hasError && <div className="my-60 border border-red-600 w-8/12 mx-auto rounded-md">
          <div className="flex items-center justify-around">
            <img src="/echec.png" alt="echec" className="w-20 h-20 object-cover" />
            <h1 className="text-3xl font-semibold text-red-600">Solde Insuffisant !!!!</h1>
          </div>
         </div>}
         {hasSuccess && !hasError && <div className="my-60 border border-green-600 w-8/12 mx-auto rounded-md">
          <div className="flex items-center justify-around">
            <img src="/success.png" alt="echec" className="w-20 h-20 object-cover" />
            <h1 className="text-3xl font-semibold text-green-600">Paiement Effectué !!!!</h1>
          </div>
         </div>}
        </div>
    </div>
    <Toast ref={toast} />
    <audio ref={successRef} src="/success.mp3" />
    <audio ref={errorRef} src="/error.mp3" />
    </>
  )
}

export default Operation
