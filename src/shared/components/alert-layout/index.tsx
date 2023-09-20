import {Alert, AlertColor, AlertTitle, Snackbar} from "@mui/material";
import {ReactNode} from "react";

interface AlertLayoutProps {
  
  open?:AlertColor | null
  
  onClose?:() => void
  
  title?:string
  
  children?: ReactNode
  
  severity: AlertColor
  
}
const AlertLayout = (props:AlertLayoutProps) => {
  
  return (
    <Snackbar open={props.open === props.severity} autoHideDuration={6000} onClose={props.onClose} >
      <Alert onClose={props.onClose} elevation={6} variant="filled" severity={props.severity} sx={{ width: '100%' }} >
        <AlertTitle>{props.title}</AlertTitle>
        {props.children}
      </Alert>
    </Snackbar>
  );
};

export {AlertLayout};