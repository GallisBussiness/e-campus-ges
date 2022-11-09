import { MantineProvider } from '@mantine/core';
import Cards from './components/Cards';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Restaurations from './components/Restaurations';
import Medical from './components/Medical';
import Operation from './components/Operation';
import Depot from './components/Depot';
import { AuthenticationForm } from './components/Login';
import { AbilityContext } from './casl/can';
import ability from './casl/ability';


export default function App() {


  return (
    <MantineProvider withGlobalStyles>
    <AbilityContext.Provider value={ability}>
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<AuthenticationForm />}/>
              <Route path="/services" element={<Cards />}/>
              <Route path="/restauration" element={<Restaurations />}/>
              <Route path="/medical" element={<Medical />}/>
              <Route path="/operation" element={<Operation />}/>
              <Route path="/depot" element={<Depot />}/>
          </Routes>
        </BrowserRouter>
    </AbilityContext.Provider>
     
    </MantineProvider>
  );
}
