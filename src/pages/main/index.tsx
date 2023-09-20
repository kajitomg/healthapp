import {ReactNode} from "react";
import {cn} from '@bem-react/classname'
import {Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";


interface MainProps {
  
  header?:ReactNode,
  
  footer?:ReactNode,
  
}

const cnMain = cn('Main')
const Main = (props:MainProps) => {
  
  return (
    <Box className={cnMain()} height={'100%'}>
      <Grid>
        Main
      </Grid>
    </Box>
  );
};

export {Main};