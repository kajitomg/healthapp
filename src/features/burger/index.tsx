import {Drawer, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useBurger} from "./hooks.ts";
import {useCallback} from "react";
import {useTypedSelector} from "../../services/redux/hooks/use-typed-selector.ts";
import {useActions} from "../../services/redux/hooks/use-actions.ts";
import {Page} from "../../services/redux/pages/reducer.ts";

interface BurgerProps {
  
  tabs?:Page[]
  
  onClick?:(id:number) => void
  
}

const Burger = (props:BurgerProps) => {
  const {drawerWidth,headerHeight} = useBurger()
  const {closeBurger} = useActions()
  const burger = useTypedSelector(state => state.burger)
  
  const callbacks = {
    closeMenu:useCallback(() => {
      closeBurger()
    },[]),
    setPage:useCallback((id:number) => {
      props.onClick && props.onClick(id)
    },[])
    
  }
  return (
    <Drawer
      anchor={'left'}
      open={burger.open}
      variant={'persistent'}
      ModalProps={{
        keepMounted: true,
      }}
      onClose={callbacks.closeMenu}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          top:headerHeight,
          width: drawerWidth,
          boxSizing: 'border-box',
          height:`calc(100% - ${headerHeight}px)`,
        },
      }}
    >
      <List disablePadding>
        {props.tabs?.map((tab) => (
          <ListItem key={tab.id} disablePadding selected={tab.selected} onClick={() => callbacks.setPage(tab.id)}>
            <ListItemButton>
              <ListItemText primary={tab.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export {Burger};