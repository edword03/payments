import { ChangeEvent, FC } from 'react';
import { TextInput, NumberInput } from "@mantine/core";

import styles from './Input.module.css'

interface IndexProps {
  type: 'text' | 'number' | 'date'
  required?: boolean
  minLength?: number
  maxLength?: number
  placeholder?: string
  label: string
  width?: string
  name: string
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export const Input: FC<IndexProps> = ({
                                        type,
                                        placeholder,
                                        label,
                                        required,
                                        minLength,
                                        maxLength,
                                        width,
                                        name,
                                        handleChange,
                                        value,
                                        ...getInputProps
                                      }) => {
  return (
    <>
      {type === 'text' &&
        (<TextInput
          placeholder={placeholder}
          label={label}
          required={required}
          {...getInputProps}
          minLength={minLength}
          maxLength={maxLength}
          className={styles.inputWrapper}
          width={width}
          onChange={handleChange}
          name={name}
          value={value}
        />)}

      {type === 'number' &&
        (<NumberInput
          placeholder={placeholder}
          label={label} required={required}
          {...getInputProps}
          minLength={minLength}
          maxLength={maxLength}
          hideControls width={width}
          name={name}
        />)}
    </>
  )
}