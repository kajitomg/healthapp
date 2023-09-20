import './styles.scss'
import {Login} from "../pages/login";
import {Route, Routes, useLocation} from "react-router-dom";
import {useActions} from "../services/redux/hooks/use-actions.ts";
import {useEffect} from "react";
import {Protected} from "../features/protected";
import {Header} from "./header";
import {PageLayout} from "../shared/components/page-layout";
import {useBurger} from "../features/burger/hooks.ts";
import {Main} from "../pages/main";
import {MainLayout} from "../features/main-layout";
import {useTypedSelector} from "../services/redux/hooks/use-typed-selector.ts";
import {Users} from "../pages/users";
import {Products} from "../pages/products";

function App() {
  const {remind,setPage} = useActions()
  const location = useLocation()
  const session = useTypedSelector(state => state.session)
  const burger = useTypedSelector(state => state.burger)
  
  const {DrawerHeader, drawerWidth, headerHeight} = useBurger()
  
  useEffect(() => {
    remind()
    setPage(location.pathname)
  },[location.pathname])
  
  return (
    <PageLayout header={session.exists && <Header/>}>
      {session.exists && <DrawerHeader/>}
      <MainLayout
        open={session.exists && burger.open}
        drawerwidth={session.exists ? drawerWidth:0}
        headerheight={session.exists ? headerHeight:0}
      >
        <Routes>
          <Route path={'/'} element={<Protected redirect={'/login'}><Main/></Protected>}/>
          <Route path={'/users'} element={<Protected redirect={'/login'}><Users/></Protected>}/>
          <Route path={'/products'} element={<Protected redirect={'/login'}><Products/></Protected>}/>
          <Route path={'/login'} element={<Protected redirect={'/'} authPath={true}><Login/></Protected>}/>
        </Routes>
      </MainLayout>
    </PageLayout>
  )
}

export {App}