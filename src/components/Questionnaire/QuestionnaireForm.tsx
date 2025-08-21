import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Involvement, Reason, Vision } from './enums/questionnaireEnums';
import { TextInput } from '../ReactFormComponents/TextInput';
import { SelectInput } from '../ReactFormComponents/SelectInput';
import { ToggleInput } from '../ReactFormComponents/ToggleInput';
import { DatePickerInput } from '../ReactFormComponents/DatePickerInput';
import { Button } from 'flowbite-react';
import { fetchCapitals } from '@/src/utils/Services/CapitalService';
import { Customer, createCustomer } from '@/src/utils/Services/CustomerService';
import { useRouter } from 'next/router';

const buyInReasonOptions = [
  Reason.escapeFullTimeJob,
  Reason.expandPortfolio,
  Reason.passiveIncome,
  Reason.personalPassion
];

const visionOptions = [
  Vision.singleLocation,
  Vision.multiLocation,
  Vision.growthFocused,
  Vision.legacy
];

export const involvementOptions = [
  Involvement.fullTime,
  Involvement.partTime,
  Involvement.investor
];

const QuestionnaireSchema = z.object({
  firstName: z.string().min(2, 'Please enter your first name'),
  lastName: z.string().min(2, 'Please enter your last name '),

  buyInReason: z
    .string()
    .nullable()
    .refine((val) => val !== null, { message: 'Select an option' }),
  vision: z
    .string()
    .nullable()
    .refine((val) => val !== null, { message: 'Select an option' }),
  involvement: z
    .string()
    .nullable()
    .refine((val) => val !== null, { message: 'Select an option' }),

  capitalId: z.string().refine((val) => val !== '' && val !== '-1', {
    message: 'Select an option'
  }),
  financeRequired: z.boolean().optional().nullable(),
  startDate: z
    .string()
    .optional()
    .nullable()
    .refine((val) => val !== null, { message: 'Select an option' })
});

type QuestionnaireForm = z.infer<typeof QuestionnaireSchema>;

const initialValues: QuestionnaireForm = {
  firstName: '',
  lastName: '',
  buyInReason: null,
  vision: null,
  involvement: null,
  capitalId: '-1',
  financeRequired: null,
  startDate: null
};

export const CustomerQuestionnaireForm: React.FC = () => {
  const router = useRouter();
  const [capitals, setCapitals] = useState<SelectOption[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<QuestionnaireForm>({
    resolver: zodResolver(QuestionnaireSchema),
    defaultValues: initialValues
  });

  const onSubmit = async (data: QuestionnaireForm) => {
    try {
      const payload: Customer = {
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        buyInReason: buyInReasonOptions[Number(data.buyInReason)] ?? '',
        vision: visionOptions[Number(data.vision)] ?? '',
        involvement: involvementOptions[Number(data.involvement)] ?? '',
        startDate: data.startDate ?? '',
        capitalId: Number(data.capitalId) ?? 1,
        financeRequired: data.financeRequired ?? false
      };
      const result = await createCustomer(payload);
      router.push(`/franchiseReport/${result?.id}`);
    } catch (err) {
      alert('Failed to update state');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCapitals();
        setCapitals(data);
      } catch (_err) {
        setCapitals([]);
      }
    })();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 "
    >
      <TextInput<QuestionnaireForm>
        label="First Name"
        name="firstName"
        register={register}
        errors={errors}
        placeholder="Enter First Name"
      />

      <TextInput<QuestionnaireForm>
        label="Last Name"
        name="lastName"
        register={register}
        errors={errors}
        placeholder="Enter Last Name"
      />

      <SelectInput<QuestionnaireForm>
        label={`What is your primary reason for buying a franchise?`}
        name="buyInReason"
        register={register}
        errors={errors}
        placeholder="Select an option"
        options={buyInReasonOptions.map((option, i) => ({
          label: option,
          value: i
        }))}
      />

      <SelectInput<QuestionnaireForm>
        label="Which of the following best describes your long-term vision?"
        name="vision"
        register={register}
        errors={errors}
        placeholder="Select an option"
        options={visionOptions.map((option, i) => ({
          label: option,
          value: i
        }))}
      />

      <SelectInput<QuestionnaireForm>
        label="How involved will you be in day-to-day operations?"
        name="involvement"
        register={register}
        errors={errors}
        placeholder="Select an option"
        options={involvementOptions.map((option, i) => ({
          label: option,
          value: i
        }))}
      />

      {/* Can you make modification to the SelectInput so it can expect either string or number? */}
      <SelectInput<QuestionnaireForm>
        label="What is your approximate available liquid capital for investment?"
        name="capitalId"
        register={register}
        errors={errors}
        placeholder="Select an option"
        options={capitals}
      />

      <ToggleInput<QuestionnaireForm>
        label="Are you open to financing options?"
        name="financeRequired"
        register={register}
        errors={errors}
      />

      <DatePickerInput<QuestionnaireForm>
        label="When are you looking to start the process?"
        name="startDate"
        register={register}
        errors={errors}
      />

      <div className="flex justify-center items-center">
        <Button
          color="secondary"
          size="lg"
          type="submit"
          className="text-white bg-blue-700"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
