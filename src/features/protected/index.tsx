import {useTypedSelector} from "../../services/redux/hooks/use-typed-selector.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {ReactNode, useEffect} from "react";
import {Loader} from "../../shared/components/loader";
import {Box} from "@mui/material";

interface ProtectedProps {

  redirect:string,
  
  authPath?:true,
  
  children?:ReactNode,
  
}

const Protected = (props:ProtectedProps) => {
  const session = useTypedSelector(state => state.session)
  
  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(props.authPath ? session.exists && !session.waiting : !session.exists && !session.waiting){
      navigate(props.redirect,{state: {back: location.pathname }})
    }
  },[session.exists,session.waiting])
  
  if (props.authPath ? session.waiting || session.exists : !session.exists || session.waiting){
    return (<Loader active={true}/>)
  } else {
    return props.children;
  }
};

export {Protected};