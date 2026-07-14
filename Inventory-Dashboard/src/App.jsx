
import './App.css'
import { SideBar } from './components/SideBar'
import { TopBar } from './components/TopBar'

function App() {
  

  return (
    <div className="app-layout">
      <SideBar />
      <div className="main-content">
        <TopBar />
      </div>
    </div>
  )
}

export default App
