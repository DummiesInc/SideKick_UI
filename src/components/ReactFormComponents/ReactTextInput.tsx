import { TextInput, Label } from 'flowbite-react';
import React from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path
} from 'react-hook-form';

type TextInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
  placeholder?: string;
};

export function ReactTextInput<T extends FieldValues = FieldValues>(
  props: TextInputProps<T>
) {
  const { label, name, register, errors, type = 'text', placeholder } = props;

  return (
    <div className="pt-2 pb-2">
      <Label className="block font-medium mb-1">{label}</Label>
      <TextInput {...register(name)} placeholder={placeholder} type={type} />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
