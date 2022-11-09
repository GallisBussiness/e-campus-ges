import { useDebouncedValue } from '@mantine/hooks';
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { Toast } from 'primereact/toast';
import { useMutation} from 'react-query';
import { getCompteByCode } from '../services/compteService';
import { createDepot} from '../services/operationService';
import { useRef } from 'react';
import { Button, Divider } from '@mantine/core';
import { InputNumber } from 'primereact/inputnumber'
import { GiPayMoney } from 'react-icons/gi'


function Depot() {

    const [value,setValue] = useState('')
    const [curCode,setCurCode] = useState('');
    const [montant,setMontant] = useState(0);
    const [hasError,setHasError] = useState(false)
    const [hasSuccess,setHasSuccess] = useState(false)
    const [debounced] = useDebouncedValue(value, 200);
    const toast = useRef(null);
    const successRef = useRef(null);
    const errorRef = useRef(null);

    const {data:compte,mutate} = useMutation((code) => getCompteByCode(code), {
        onSuccess: (_) => {
            setCurCode(_.code);
        },
        onSettled: (_) => {
          setValue('')
        }
      })
      
      const { mutate:mutateD } = useMutation((data) => createDepot(data), {
        onSuccess:(_) => {
            toast.current.show({ severity: 'info', summary: 'Creation Depot', detail: 'Paiement éffectué !!', life: 2000 });
            successRef.current.play()
            setMontant(0)
            setHasSuccess(true)
            setHasError(false)
            mutate(curCode)
        },
        onError:(_) => {
            toast.current.show({ severity: 'warn', summary: 'Creation Depot', detail: 'Une erreur !!', life: 2000 });
            errorRef.current.play()
            setMontant(0)
            setHasSuccess(false)
            setHasError(true)
            mutate(curCode)
        }
      })

      const confMontant = (v) => isNaN(v) ? setMontant(0) : setMontant(v);

      const Depot = (id) => {
        const d = {id,montant, description: `Depot de ${montant} FCFA`};
        mutateD(d);
      }
      
      useEffect(() => {
        if(debounced !== '') mutate(debounced)
      }, [debounced,mutate]);

  return (
    <>
    <div className="flex h-screen">
        <div className="w-4/12 bg-slate-200 h-full">
          
            <div className="flex flex-col items-center justify-center h-full">
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
                <th scope="col" className="py-3 px-6">
                    SOLDE 
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
                <td className="py-4 px-6">
                {compte.solde} FCFA
                </td>
            </tr>
        </tbody>
    </table>
</div>

        <div className="my-5 flex flex-col items-center justify-center w-8/12 mx-auto bg-slate-200 p-10 rounded-md">
        <div className="text-3xl font-semibold my-2 uppercase">
            Renseigner Le montant à déposer
        </div>
        <InputNumber value={montant} onValueChange={(e) => confMontant(e.value)} mode="currency" currency="XOF" locale="fr-FR"
         className="" placeholder="Montant*" />
         <div className="my-4">
         <Button leftIcon={<GiPayMoney size={14} />} className="bg-blue-800" onClick={() => Depot(compte.id)}>
            DEPOSER SUR LE COMPTE
        </Button>
         </div>
        </div>
         </div> : <div className="my-4 flex items-center justify-center"> 
             <img src="/student.png" alt="student" className="w-96 h-96 object-cover" />
         </div>}
         {hasError && <div className="my-60 border border-red-600 w-8/12 mx-auto rounded-md">
          <div className="flex items-center justify-around">
            <img src="/echec.png" alt="echec" className="w-20 h-20 object-cover" />
            <h1 className="text-3xl font-semibold text-red-600">Une Erreur s'est produite, Dépot échoué !!!!</h1>
          </div>
         </div>}
         {hasSuccess && !hasError && <div className="my-60 border border-green-600 w-8/12 mx-auto rounded-md">
          <div className="flex items-center justify-around">
            <img src="/success.png" alt="echec" className="w-20 h-20 object-cover" />
            <h1 className="text-3xl font-semibold text-green-600">Dépot Effectué !!!!</h1>
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

export default Depot