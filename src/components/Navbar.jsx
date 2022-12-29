import { useState } from "react";
import { Sidebar } from 'primereact/sidebar'
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useSignOut } from "react-auth-kit";
import { FaSignOutAlt } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";

export const Navbar = () => {
    const [visible,setVisible] = useState(false);
    const qc = useQueryClient();
    const navigate = useNavigate();

    const signOut = useSignOut()

    const logout = () => {
      if(signOut()) {
        qc.clear();
        navigate("/login", {replace: true})
      }
    }


  return (
    <>
   <Sidebar visible={visible} onHide={() => setVisible(false)}>
    <div className="flex items-center justify-center mb-5">
    <span> <img src="/ecampus.png" alt="logo" className="h-32 w-32" /></span>
    </div>a501b048-2803-40d8-86f3-0b118c6477e9
    
    <div className="flex flex-col space-y-1">
    <button onClick={logout} className="inline-block w-full px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-700 to-blue-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs">Se Déconnecter</button>
    </div>
</Sidebar>
<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
    <span> <img src="/ecampus.png" alt="logo" className="h-20 w-20" /></span>
    <button data-collapse-toggle="navbar-default" type="button" onClick={() => setVisible(true)} className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-1 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
      <li>
        <Link to="stats" className="inline-block w-full px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-amber-700 to-amber-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs">Statistiques <MdQueryStats className="inline w-4 h-4"/></Link>
        </li>
        <li>
        <button onClick={logout} className="inline-block w-full px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-700 to-blue-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs">Se Déconnecter <FaSignOutAlt  className="inline w-4 h-4"/></button>
        </li>
      </ul>
    </div>
  </div>
</nav>



    </>
  )
}
