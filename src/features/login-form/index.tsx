import {ChangeEvent, useCallback, useState} from 'react';
import {useActions} from "../../services/redux/hooks/use-actions.ts";
import {useTypedSelector} from "../../services/redux/hooks/use-typed-selector.ts";
import {cn} from '@bem-react/classname'
import {useLocation, useNavigate} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const cnLoginForm = cn('LoginForm')
const LoginForm = () => {
  const actions = useActions()
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState({
    email:'',
    password:''
  })
  
  const callbacks = {
    onChange:useCallback((name:string) => {
      return (event:ChangeEvent<HTMLInputElement>) => {
        setData(prevData => ({...prevData, [name]: event.target.value}));
      }
    },[]),
    onSubmit:useCallback((e) => {
      e.preventDefault();
      actions.signin(data,{onSuccess:() =>{
        // Возврат на страницу, с которой пришли
        const back = location.state?.back && location.state?.back !== location.pathname
          ? location.state?.back
          : '/';
        navigate(back);
      }
      })
    },[data])
  }
  return (
    <Box
      className={cnLoginForm()}
      component={'form'}
      noValidate
      autoComplete="off"
      onSubmit={callbacks.onSubmit}
      width={350}
    >
      <Grid container spacing={1}>
        <Grid xs={12}>
          <TextField type={'email'} value={data.email} name={'E-mail'} label={'E-mail'} onChange={callbacks.onChange('email')} margin={'dense'} fullWidth size={'small'}/>
        </Grid>
        <Grid xs={12}>
          <TextField type={'password'} value={data.password} name={'Пароль'} label={'Пароль'} onChange={callbacks.onChange('password')} margin={'dense'} fullWidth size={'small'}/>
        </Grid>
        <Grid xs={12}>
          <Button type={'submit'} variant={'contained'} color={'primary'} size={'small'}>Войти</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export {LoginForm};