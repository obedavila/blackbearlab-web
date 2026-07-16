import DentalCore from './components/DentalCore'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PorQue from './components/PorQue'
import ServicioTecnico from './components/ServicioTecnico'
import Servicios from './components/Servicios'
import SobreObed from './components/SobreObed'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <DentalCore />
        <ServicioTecnico />
        <PorQue />
        <SobreObed />
      </main>
      <Footer />
    </>
  )
}

export default App
