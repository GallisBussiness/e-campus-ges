import { AbilityBuilder, PureAbility } from "@casl/ability"
import { useContext } from "react"
import { useAuthUser } from "react-auth-kit"
import { useQuery} from "react-query"
import { Route, Routes } from "react-router-dom"
import { AbilityContext } from "../casl/can"
import { getAuth } from "../services/authservice"
import Cards from "./Cards"
import Depot from "./Depot"
import GlobalLoadingIndicator from "./GlobalLoadingIndicator"
import { Navbar } from "./Navbar"
import Operation from "./Operation"
import Service from "./Service"
import Statistiques from "./Statistiques"

function updateAbility(ability, user) {
  const { can,cannot, rules } = new AbilityBuilder(PureAbility);
  if (user.role.includes('superadmin')) {
    can('manage', 'all');
  } else if (user.role.includes('controleur')) {
    can('manage', 'ticket');
  } else if(user.role.includes('vendeur')) {
    can('manage', 'vente');
  } else if(user.role.includes('admin')) {
    can('manage', 'stats');
  }
  else {
    cannot('manage','all');
  }

  ability.update(rules);
}


function Dashboard() {
  const ability = useContext(AbilityContext);
    const auth = useAuthUser()();
    const qk = ['auth',auth?.id]
    const {data} = useQuery(qk, () => getAuth(auth?.id), {
     onSuccess: (_) => {
        updateAbility(ability,_);
     },
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
     <Route path="/stats" element={<Statistiques />}/>
     <Route path="/services/:id" element={<Service auth={data} />}/>
    <Route path="/operation" element={<Operation auth={data} />}/>
    <Route path="/depot" element={<Depot auth={data} />}/>
     </Routes>
    </div>
    </>
  )
}

export default Dashboard