import {Box, Button, IconButton, Modal, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import {ReactNode} from "react";

interface CreateModalProps {
  
  isActive?:boolean,
  
  onClose?:() => void,
  
  onSubmit?:() => void,
  
  children?:ReactNode,
  
  button?:string,
  
  label?:string
  
}

const CreateModalLayout = (props:CreateModalProps) => {

  
  return (
    <Modal
      open={props.isActive || false}
      onClose={props.onClose}
      sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}
    >
      <Box
        component={'form'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        bgcolor={'whitesmoke'}
        width={400}
        borderRadius={1}
        padding={3}
        onSubmit={props.onSubmit}
      >
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'} paddingBottom={3} paddingX={2}>
          <Typography fontSize={'x-large'}>{props.label}</Typography>
          <IconButton onClick={props.onClose} title={'Закрыть окно'} edge={'end'}>
            <Close/>
          </IconButton>
        </Box>
        {props.children}
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'} paddingTop={3} paddingX={2}>
          <Button type={'submit'} variant={'contained'} color={'primary'} size={'small'}>{props.button}</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export {CreateModalLayout};