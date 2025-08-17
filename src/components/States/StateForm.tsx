// components/StateForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateState } from './StateService';
import { TextInput } from '../ReactFormComponents/TextInput';
import { RadioInput } from '../ReactFormComponents/RadioInput';
import { ToggleInput } from '../ReactFormComponents/ToggleInput';
import { DatePickerInput } from '../ReactFormComponents/DatePickerInput';
import { SelectInput } from '../ReactFormComponents/SelectInput';

const StateFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  abbreviation: z
    .string()
    .length(2, 'Abbreviation must be exactly 2 characters'),
  region: z
    .enum(['West', 'Midwest', 'South', 'Northeast'], 'Select a region')
    .optional()
    .nullable(),
  isActive: z.boolean().optional().nullable(),
  foundingDate: z.string().optional().nullable(),
  timezone: z.string().optional().nullable()
});

const initialValues: StateFormType = {
  name: '',
  abbreviation: '',
  region: null,
  isActive: null,
  foundingDate: null,
  timezone: null
};

type StateFormType = z.infer<typeof StateFormSchema>;

type Props = {
  stateId: number;
  defaultValues?: StateFormType;
};

export const StateForm: React.FC<Props> = ({ stateId, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<StateFormType>({
    resolver: zodResolver(StateFormSchema),
    defaultValues: defaultValues || initialValues
  });

  const onSubmit = async (data: StateFormType) => {
    try {
      const updated = await updateState({ id: stateId, ...data });
      alert(`State updated: ${updated.name} (${updated.abbreviation})`);
    } catch (err) {
      console.error(err);
      alert('Failed to update state');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4"
    >
      {/* Name field */}
      <TextInput<StateFormType>
        label="Name"
        name="name"
        register={register}
        errors={errors}
        placeholder="Enter state name"
      />

      {/* Abbreviation field */}
      <TextInput<StateFormType>
        label="Abbreviation"
        name="abbreviation"
        register={register}
        errors={errors}
        placeholder="Enter abbreviation (2 letters)"
      />

      <RadioInput<StateFormType>
        label="Region"
        name="region"
        register={register}
        errors={errors}
        options={[
          { label: 'West', value: 'West' },
          { label: 'Midwest', value: 'Midwest' },
          { label: 'South', value: 'South' },
          { label: 'Northeast', value: 'Northeast' }
        ]}
      />

      <ToggleInput<StateFormType>
        label="Active?"
        name="isActive"
        register={register}
        errors={errors}
      />

      <DatePickerInput<StateFormType>
        label="Founding Date"
        name="foundingDate"
        register={register}
        errors={errors}
      />

      <SelectInput<StateFormType>
        label="Timezone"
        name="timezone"
        register={register}
        errors={errors}
        placeholder="Select timezone"
        options={[
          { label: 'Pacific', value: 'Pacific' },
          { label: 'Mountain', value: 'Mountain' },
          { label: 'Central', value: 'Central' },
          { label: 'Eastern', value: 'Eastern' }
        ]}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Update State
      </button>
    </form>
  );
};
