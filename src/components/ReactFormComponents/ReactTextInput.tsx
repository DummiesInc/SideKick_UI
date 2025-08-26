import { TextInput, Label } from 'flowbite-react';
import get from 'lodash.get';
import React from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
  FieldError
} from 'react-hook-form';

type TextInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
  placeholder?: string;
  step?: string;
  onChange?: (value: any) => void;
};

export function ReactTextInput<T extends FieldValues = FieldValues>(
  props: TextInputProps<T>
) {
  const {
    label,
    name,
    register,
    errors,
    type = 'text',
    placeholder,
    step = 'any',
    onChange
  } = props;
  const fieldError = get(errors, name) as FieldError | undefined;
  return (
    // what should the type be if I want to be able to enter a decimal number?
    <div className="pt-2 pb-2">
      <Label className="block font-medium mb-1">{label}</Label>
      {/* <TextInput {...register(name)} placeholder={placeholder} type={type} step={step}
        onChange={(e) => {
          if (onChange) onChange(e.target.value)
        }}
      /> */}
      <TextInput
        {...register(name, { valueAsNumber: type === 'number' })}
        placeholder={placeholder}
        type={type}
        step={type === 'number' ? step : undefined}
        onChange={(e) => {
          if (onChange) {
            if (type === 'number') {
              onChange(e.target.valueAsNumber); // decimal number
            } else {
              onChange(e.target.value); // string for text
            }
          }
        }}
      />
      {fieldError && (
        <p className="text-red-500 text-sm mt-1">
          {fieldError?.message as string}
        </p>
      )}
    </div>
  );
}
