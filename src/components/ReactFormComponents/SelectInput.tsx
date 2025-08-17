// components/SelectInput.tsx
import React from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister
} from 'react-hook-form';

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  options: SelectOption[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
};

export function SelectInput<T extends FieldValues>({
  label,
  name,
  options,
  register,
  errors,
  placeholder
}: SelectInputProps<T>) {
  return (
    <div className='pt-2 pb-2'>
      <label className="block font-medium mb-1">{label}</label>
      <select
        {...register(name)}
        className="w-full border border-gray-300 p-2 rounded"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
