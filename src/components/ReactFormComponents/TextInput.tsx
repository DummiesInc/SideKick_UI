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

export function TextInput<T extends FieldValues = FieldValues>(
  props: TextInputProps<T>
) {
  const { label, name, register, errors, type = 'text', placeholder } = props;

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full border border-gray-300 p-2 rounded"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
