import {ReactNode} from "react";
import {cn} from '@bem-react/classname'
import './styles.scss'


interface LoaderProps {
  
  children?:ReactNode,
  
  active?:boolean,
  
}

const cnLoader = cn('Loader')
const Loader = (props:LoaderProps) => {
  if(props.active){
    return (
      <div className={cnLoader()}>
        <div className={cnLoader('spinner')}>
          <span></span>
        </div>
        <div className={cnLoader('content')}>
          {props.children}
        </div>
      </div>
    )
  }
  return props.children
};

export {Loader};