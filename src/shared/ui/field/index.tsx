import {cn} from '@bem-react/classname'
import './styles.scss'
import {ReactNode} from "react";

interface FieldProps {
  label?:ReactNode,
  children?:ReactNode,
  error?:ReactNode
}

const cnField = cn('Field')

const Field = (props:FieldProps) => {
  return (
    <div>
      <label className={cnField('label')}>{props.label}</label>
      <div>{props.children}</div>
      <div>{props.error}</div>
    </div>
  );
};

export {Field};