import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Capital, Involvement, Reason, Vision } from './enums/questionnaireEnums';
import { TextInput } from '../ReactFormComponents/TextInput';
import { SelectInput } from '../ReactFormComponents/SelectInput';
import { ToggleInput } from '../ReactFormComponents/ToggleInput';
import { DatePickerInput } from '../ReactFormComponents/DatePickerInput';
import { Button } from 'flowbite-react';





const buyInReasonOptions = [
    Reason.escapeFullTimeJob,
    Reason.expandPortfolio,
    Reason.passiveIncome,
    Reason.personalPassion
]

const visionOptions = [
    Vision.singleLocation,
    Vision.multiLocation,
    Vision.growthFocused,
    Vision.legacy,
]

const involvementOptions = [
    Involvement.fullTime,
    Involvement.partTime,
    Involvement.investor
]

// These are just array of enum values
const capitalOptions = [
    Capital.smallCap,
    Capital.medCap,
    Capital.largeCap,
    Capital.megaCap
]

function requiredEnum<T extends readonly [string, ...string[]]>(
  values: T,
  msg: string
) {
  return z.preprocess(
    (val) => (val === null || val === "" ? undefined : val), // normalize null/empty
    z.enum(values).refine((v) => v !== undefined, { message: msg })
  );
}

// Can these be nullable to accept a default null value but also required so the validation gets triggered
const QuestionnaireSchema = z.object({
    firstName: z.string().min(2, "Please enter your first name"),
    lastName: z.string().min(2, "Please enter your last name "),

    buyInReason: z.string().nullable().refine(val => val !== null, { message: "Select an option" }),
    vision: z.string().nullable().refine(val => val !== null, { message: "Select an option" }),
    involvement: z.string().nullable().refine(val => val !== null, { message: "Select an option" }),
    capital: z.string().nullable().refine(val => val !== null, { message: "Select an option" }),
    financeRequired: z.boolean().optional().nullable(),
    startDate: z.string().optional().nullable().refine(val => val !== null, { message: "Select an option" }),
  });

  type QuestionnaireForm = z.infer<typeof QuestionnaireSchema>;

  const initialValues: QuestionnaireForm = {
    firstName: '',
    lastName: '',
    buyInReason: null,
    vision: null,
    involvement: null,
    capital: null,
    financeRequired: null,
    startDate: null
  }


export const CustomerQuestionnaireForm: React.FC = () => {
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
          console.log(data)
          // const updated = await updateState({ id: stateId, ...data });
          // alert(`State updated: ${updated.name} (${updated.abbreviation})`);
        } catch (err) {
          console.error(err);
          alert('Failed to update state');
        }
      };
    

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
                options={buyInReasonOptions.map((option, i) => ({label: option, value: i}))}
            />

        <SelectInput<QuestionnaireForm>
                label="Which of the following best describes your long-term vision?"
                name="vision"
                register={register}
                errors={errors}
                placeholder="Select an option"
                options={visionOptions.map((option, i) => ({label: option, value: i}))}
            />

        <SelectInput<QuestionnaireForm>
                label="How involved will you be in day-to-day operations?"
                name="involvement"
                register={register}
                errors={errors}
                placeholder="Select an option"
                options={involvementOptions.map((option, i) => ({label: option, value: i}))}
            />

        <SelectInput<QuestionnaireForm>
                label="What is your approximate available liquid capital for investment?"
                name="capital"
                register={register}
                errors={errors}
                placeholder="Select an option"
                options={capitalOptions.map((option, i) => ({label: option, value: i}))}
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

    <div className='flex justify-center items-center'>
    <Button
        color="secondary"
        size="lg"
        type="submit"
        className='text-white bg-blue-700'
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </div>
    </form>
  )
}
