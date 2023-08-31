import {ChangeEvent, useCallback, useLayoutEffect, useState} from "react";
import debounce from 'lodash.debounce'
import {cn} from '@bem-react/classname'
import './styles.scss'

interface InputTextProps {
  value?:string,
  name?:string,
  type?:'string' | 'email' | 'password' | 'tel',
  placeholder?:string,
  onChange:(value?:string,name?:string) => void
}

const cnInputText = cn('InputText')
const InputText = (props:InputTextProps) => {
  const [value, setValue] = useState<string | undefined>(props.value)
  
  const onChangeDebounce = useCallback(debounce(value => props.onChange(value, props.name),500),[props.onChange, props.name])
  const onChange = (event:ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onChangeDebounce(event.target.value)
  }
  
  useLayoutEffect(() => {setValue(props.value)},[props.value])
  return (
    <input
      className={cnInputText()}
      value={value}
      placeholder={props.placeholder}
      onChange={onChange}
    >
    </input>
  );
};

export {InputText};