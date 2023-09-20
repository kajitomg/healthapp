import {LoginForm} from "../../features/login-form";
import {ReactNode} from "react";
import {Box} from "@mui/material";
import {cn} from "@bem-react/classname";

interface LoginProps {
  
  header?:ReactNode,
  
  footer?:ReactNode,
  
}
const cnLogin = cn('Login')

const Login = (props:LoginProps) => {
  
  return (
    <Box className={cnLogin()} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <LoginForm/>
    </Box>
  );
};

export {Login};