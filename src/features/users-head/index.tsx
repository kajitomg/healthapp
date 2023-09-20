import {AlertColor, Box, Button} from "@mui/material";
import {CreateAccountModal} from "../create-account-modal";
import {ChangeEvent, SyntheticEvent, useCallback, useState} from "react";
import {useActions} from "../../services/redux/hooks/use-actions.ts";
import {useTypedSelector} from "../../services/redux/hooks/use-typed-selector.ts";
import {AlertLayout} from "../../shared/components/alert-layout";
import {CreateAccountData} from "../../services/redux/users/actions.ts";


const UsersHead = () => {
  const {createUser} = useActions()
  const users = useTypedSelector(state => state.users)
  const [modalActive,setModalActive] = useState<boolean>(false)
  const [snack,setSnack] = useState<AlertColor | null>(null)
  const [data, setData] = useState<CreateAccountData>({
    email:'',
    password:'',
    name:'',
    role:''
  })
  
  const callbacks = {
    setModal:useCallback((active:boolean) => {
      setModalActive(active)
    },[]),
    onChange: useCallback((name: string) => {
      return (event: ChangeEvent<HTMLInputElement>) => {
        setData(prevData => ({...prevData, [name]: event.target.value}));
      }
    }, []),
    onSubmit:useCallback(async (e:SyntheticEvent<SubmitEvent>) => {
      e.preventDefault();
      return await createUser(
        data,{
          onSuccess:() => {
            callbacks.setModal(false);
            callbacks.onSnackOpen('success')()
          },
          onError:() => {
            callbacks.onSnackOpen('error')()
          }
        })
    },[data]),
    onSnackOpen:useCallback((name:AlertColor) => {
      return () => {
        setSnack(name)
      }
    },[]),
    onSnackClose:useCallback(() => {
      setSnack(null)
    },[]),
    
  }
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} marginBottom={3}>
      <Button title={'Создать аккаунт'} color={'primary'} aria-label={'создать аккаунт'} size={'small'} variant={'contained'} onClick={() => callbacks.setModal(true)}>Создать</Button>
      <CreateAccountModal onClose={() => callbacks.setModal(false)} isActive={modalActive} onChange={callbacks.onChange} onSubmit={callbacks.onSubmit} />
      <AlertLayout severity={'error'} onClose={callbacks.onSnackClose} open={snack} title={'Не удалось создать аккаунт'}>{users?.errors?.errors?.response?.data?.message}</AlertLayout>
      <AlertLayout severity={'success'} onClose={callbacks.onSnackClose} open={snack} title={'Аккаунт успешно создан'}/>
    </Box>
  );
};

export {UsersHead};