import './styles.scss'
import {cn} from '@bem-react/classname'
import {Login} from "../pages/login";

const cnApp = cn('App')
function App() {
  
  return (
    <div className={cnApp()}>
        <Login/>
    </div>
  )
}

export {App}