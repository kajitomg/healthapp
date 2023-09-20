import {useCallback, useState} from "react";
import {useActions} from "../../services/redux/hooks/use-actions.ts";
import {
  AppBar,
  Box,
  Button, CssBaseline,
  IconButton,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Menu as MenuIcon} from "@mui/icons-material";
import {blue} from "@mui/material/colors";
import {Burger} from "../../features/burger";
import {useBurger} from "../../features/burger/hooks.ts";
import {useTypedSelector} from "../../services/redux/hooks/use-typed-selector.ts";
import {useNavigate} from "react-router-dom";


interface HeaderProps {
  
}

const Header = (props:HeaderProps) => {
  const navigate = useNavigate()
  const {signout, setBurger, setPage} = useActions()
  const {HeaderBox} = useBurger()
  const burger = useTypedSelector(state => state.burger)
  const pages = useTypedSelector(state => state.pages)
  
  const callbacks = {
    signOut: useCallback(() => {
      signout()
    },[]),
    toggleMenu: useCallback(() => {
      setBurger(!burger.open)
    },[burger.open]),
    setPage: useCallback((indent:number | string) => {
      setPage(indent,{redirect:navigate})
    },[]),
    
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <Burger tabs={pages.list} onClick={callbacks.setPage}/>
      <AppBar color={'default'} elevation={0} variant={'elevation'}>
        <Grid container alignItems={'center'} justifyContent={'space-between'} height={64}>
          <HeaderBox display={'flex'} open={burger.open} sx={{background:blue[500]}} height={'100%'} alignItems={'center'} paddingX={3} justifyContent={'space-between'}>
            <IconButton
              onClick={callbacks.toggleMenu}
              edge="start"
            >
              <MenuIcon sx={{color:blue[50]}}/>
            </IconButton>
            <Button onClick={() => callbacks.setPage('/')}>
              <Typography color={'white'} fontWeight={'bold'} fontSize={'x-large'} textTransform={'none'}>Healthapp</Typography>
            </Button>
          </HeaderBox>
          <Grid paddingX={3}>
            <Button type={'button'} variant={'outlined'} size={'small'} color={'error'} onClick={callbacks.signOut} title={'Выйти из аккаунта'}>Выйти</Button>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export {Header};