// components/ToggleInput.tsx
import React from 'react';
import { Checkbox, Label } from 'flowbite-react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister
} from 'react-hook-form';

type ToggleInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export function ToggleInput<T extends FieldValues>({
  label,
  name,
  register,
  errors
}: ToggleInputProps<T>) {
  return (
    <div className="flex items-center gap-2 pt-2 pb-2">
      <Label className="flex items-center gap-2">
        <Checkbox
          // type="checkbox"
          {...register(name)}
          className="w-5 h-5 rounded border-gray-300"
        />
        {label}
      </Label>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
