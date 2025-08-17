// components/RadioInput.tsx
import React from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister
} from 'react-hook-form';

type RadioOption = {
  label: string;
  value: string | number;
};

type RadioInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  options: RadioOption[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export function RadioInput<T extends FieldValues>({
  label,
  name,
  options,
  register,
  errors
}: RadioInputProps<T>) {
  return (
    <div className="pt-2 pb-2">
      <p className="font-medium mb-1">{label}</p>
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-1">
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              className="form-radio"
            />
            {option.label}
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
