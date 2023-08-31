import {cn} from '@bem-react/classname'
import {useCallback, useState} from "react";
import {Field} from "../../shared/ui/field";
import {InputText} from "../../shared/ui/input-text";

const cnLogin = cn('Login')

interface LoginProps {

}

const Login = (props:LoginProps) => {
  const [data, setData] = useState({
    email:'',
    password:''
  })
  
  const callbacks = {
    onChange:useCallback(() => {
    
    },[]),
    onSubmit:useCallback(() => {
    
    },[])
  }
  
  return (
    <div className={cnLogin()}>
      <form onSubmit={callbacks.onSubmit}>
        <Field label={'Электронная почта'}>
          <InputText onChange={callbacks.onChange} type={'email'} value={data.email} name={'email'} placeholder={'email'}/>
        </Field>
        <Field label={'Пароль'}>
          <InputText onChange={callbacks.onChange} type={'password'} value={data.password} name={'password'} placeholder={'password'}/>
        </Field>
        <Field>
          <button type="submit">Войти</button>
        </Field>
      </form>
    </div>
  );
};

export {Login};