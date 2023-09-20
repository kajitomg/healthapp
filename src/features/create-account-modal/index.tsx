import {MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {CreateModalLayout} from "../../shared/components/create-modal-layout";
import {useTypedSelector} from "../../services/redux/hooks/use-typed-selector.ts";
import {useActions} from "../../services/redux/hooks/use-actions.ts";
import {Loader} from "../../shared/components/loader";

interface CreateAccountModalProps {
  
  isActive?:boolean;
  
  onClose?:() => void;
  
  onSubmit?:any;
  
  onChange:any
}

const CreateAccountModal = (props:CreateAccountModalProps) => {
  const role = useTypedSelector(state => state.role)
  const users = useTypedSelector(state => state.users)
  const {loadRoles} = useActions()
  
  useEffect(() => {
    loadRoles()
  },[])

  
  return (
      <CreateModalLayout isActive={props.isActive} onSubmit={props.onSubmit} onClose={props.onClose} button={'Создать'} label={'Создание аккаунта'}>
        <Grid container spacing={1} width={300}>
          <Loader active={users.waiting}>
            <Grid xs={12}>
              <TextField type={'email'} fullWidth name={'E-mail'} label={'E-mail'} margin={'dense'} size={'small'} required onChange={props.onChange('email')}/>
            </Grid>
            <Grid xs={12}>
              <TextField type={'password'} fullWidth name={'Пароль'} label={'Пароль'} margin={'dense'} size={'small'} required onChange={props.onChange('password')}/>
            </Grid>
            <Grid xs={12}>
              <TextField type={'text'} fullWidth name={'Имя'} label={'Имя'} margin={'dense'} size={'small'} onChange={props.onChange('name')}/>
            </Grid>
            <Grid xs={12}>
              <TextField type={'text'} defaultValue={''} select label={'Выбор роли'} name={'Выбор роли'} fullWidth margin={'dense'} size={'small'} onChange={props.onChange('role')}>
                {role.list.map((option) => (
                  <MenuItem key={option.id} value={option.level}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Loader>
        </Grid>
      </CreateModalLayout>
  );
};

export {CreateAccountModal};