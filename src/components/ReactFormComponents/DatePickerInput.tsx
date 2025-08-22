// components/DatePickerInput.tsx
import React from 'react';
import { Datepicker, Label } from 'flowbite-react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister
} from 'react-hook-form';

type DatePickerInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
};

export function DatePickerInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  placeholder
}: DatePickerInputProps<T>) {
  return (
    <div className="pt-2 pb-2">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="date"
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
