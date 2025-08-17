// components/StateForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateState } from './StateService';

const StateFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  abbreviation: z
    .string()
    .length(2, 'Abbreviation must be exactly 2 characters')
});

type StateForm = z.infer<typeof StateFormSchema>;

type Props = {
  stateId: number; // ID of the state to update
  defaultValues?: StateForm; // optional pre-filled values
};

export const StateForm: React.FC<Props> = ({ stateId, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<StateForm>({
    resolver: zodResolver(StateFormSchema),
    defaultValues: defaultValues || { name: '', abbreviation: '' }
  });

  const onSubmit = async (data: StateForm) => {
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
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          {...register('name')}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Abbreviation</label>
        <input
          {...register('abbreviation')}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.abbreviation && (
          <p className="text-red-500 text-sm">{errors.abbreviation.message}</p>
        )}
      </div>

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
