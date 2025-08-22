import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Involvement, Reason, Vision } from './enums/questionnaireEnums';
import { ReactTextInput } from '../ReactFormComponents/ReactTextInput';
import { SelectInput } from '../ReactFormComponents/SelectInput';
import { ToggleInput } from '../ReactFormComponents/ToggleInput';
import { DatePickerInput } from '../ReactFormComponents/DatePickerInput';
import { Button } from 'flowbite-react';
import { fetchCapitals } from '@/src/utils/Services/CapitalService';
import { Customer, createCustomer } from '@/src/utils/Services/CustomerService';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { FlowDatePicker } from '../ReactFormComponents/FlowDatePicker';

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
    .date()
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
    control,
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
        startDate: data.startDate?.toISOString() ?? '',
        capitalId: Number(data.capitalId) ?? 1,
        financeRequired: data.financeRequired ?? false
      };
      console.log(payload);
      const result = await createCustomer(payload);
      toast.success('Submitted!');
      router.push(`/franchiseReport/${result?.id}`);
    } catch (err) {
      toast.error('Failed to submit!');
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
      className="max-w-md mx-auto space-y-4"
    >
      <ToastContainer />
      <ReactTextInput<QuestionnaireForm>
        label="First Name"
        name="firstName"
        register={register}
        errors={errors}
        placeholder="Enter First Name"
      />

      <ReactTextInput<QuestionnaireForm>
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

      <FlowDatePicker
        name="startDate"
        label="Start Date"
        placeholder="Pick a start date"
        control={control}
        errors={errors}
      />

      <div className="flex justify-center items-center mt-5">
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
