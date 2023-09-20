import {cn} from "@bem-react/classname";
import {useActions} from "../../services/redux/hooks/use-actions.ts";
import {useEffect} from "react";
import {useTypedSelector} from "../../services/redux/hooks/use-typed-selector.ts";
import {UsersHead} from "../../features/users-head";
import {UsersTable} from "../../features/users-table";
import {Box} from "@mui/material";

interface UsersProps {

}

const cnUsers = cn('Users')
const Users = (props:UsersProps) => {
  const {loadUsers} = useActions()
  const users = useTypedSelector(state => state.users)
  
  useEffect(() => {
    if(users.list.length === 0){
      loadUsers()
    }
  },[])
  
  return (
    <Box className={cnUsers()}>
      <UsersHead/>
      <UsersTable data={users.list} waiting={users.waiting}/>
    </Box>
  );
};

export {Users};