import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Button, Datepicker, Label } from 'flowbite-react';
import { FieldErrors, FieldValues, Path } from 'react-hook-form';

type DatePickerInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  errors: FieldErrors<T>;
  control: Control<any>;
  placeholder?: string;
};

export function FlowDatePicker<T extends FieldValues>({
  label,
  name,
  errors,
  placeholder,
  control
}: DatePickerInputProps<T>) {
  return (
    <div className="pt-2 pb-2">
      <label className="block font-medium mb-1">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Datepicker
              {...field}
              placeholder={placeholder}
              className="w-full"
              value={field?.value ?? null}
              onChange={(date) => {
                console.log(date);
                field.onChange(date);
              }}
            />
          );
        }}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
