import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavBar'
import AgamaHalaman from './components/Agama/Agama'
import ProvinsiHalaman from './components/Provinsi/Provinsi'
import PendudukHalaman from './components/Penduduk/Penduduk'

function App() {
    return (
        <MemoryRouter history="/strukturdata">
            <Routes>
                <Route path="/" element={<NavigationBar/>} />
                <Route path="/beranda" element={<NavigationBar/>} />
                <Route path="/agama" element={<><NavigationBar/><AgamaHalaman/></>}/>
                <Route path="/provinsi" element={<><NavigationBar/><ProvinsiHalaman/></>}/>
                <Route path="/penduduk" element={<><NavigationBar/><PendudukHalaman/></>}/>
                <Route path="*" element={<PageNotFound />} status={404}/>
            </Routes>
        </MemoryRouter>
    )
}

function PageNotFound() {
    return (
        <div className="container mt-3">
            <h3>404 page not found</h3>
            <p>We are sorry but the page you are looking for does not exist.</p>
        </div>
    );
}

export default App;