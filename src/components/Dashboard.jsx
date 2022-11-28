import { useAuthUser } from "react-auth-kit"
import { useQuery} from "react-query"
import { Route, Routes } from "react-router-dom"
import { getAuth } from "../services/authservice"
import Cards from "./Cards"
import Depot from "./Depot"
import GlobalLoadingIndicator from "./GlobalLoadingIndicator"
import { Navbar } from "./Navbar"
import Operation from "./Operation"
import Service from "./Service"

function Dashboard() {

    const auth = useAuthUser()();
    const qk = ['auth',auth?.id]
    const {data} = useQuery(qk, () => getAuth(auth?.id), {
      stateTime: 100_000,
      refetchOnWindowFocus:false,
    })

  return (
    <>
     <div className="overflow-x-hidden">
      <GlobalLoadingIndicator />
      <Navbar />
     <Routes>
     <Route path="" element={<Cards />} />
     <Route path="/services" element={<Cards />}/>
     <Route path="/services/:id" element={<Service auth={data} />}/>
    <Route path="/operation" element={<Operation auth={data} />}/>
    <Route path="/depot" element={<Depot auth={data} />}/>
     </Routes>
    </div>
    </>
  )
}

export default Dashboard