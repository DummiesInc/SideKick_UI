import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TextInput } from '../ReactFormComponents/TextInput';

const FinancialProfileFormSchema = z.object({
  name: z.string(),
  website: z.string().nullable(),
  mission: z.string().nullable(),
  contactPerson: z.string(),
  phoneNumber: z.string(),
  industuryCategory: z.string(),
  brandReputation: z.object({
    foundingYear: z.string(),
    franchiseProgramYear: z.string(),
    // nonoptional?
    totalUnits: z.int().nullable().nonoptional(),
    growthRate: z.int(),
    satisfactionScore: z.int()
  }),
  financialInformation: z.object({
    franchiseFee: z.int(),
    capital: z.object({
      // total investment range
      name: z.string()
    }),
    royaltyFee: z.int(),
    marketingFee: z.int(),
    softwareLicenseFee: z.int(),
    renewalFee: z.int(),
    trainingFee: z.int(),
    supplyFee: z.int(),
    unitGrossRevenue: z.int(),
    profitMargin: z.int().nullable(),
    // in months?
    breakEvenTimelineEst: z.int(),
    netWorthRequirement: z.int(),
    liquidityRequirement: z.int()
  }),
  operationInformation: z.object({
    // update this and make it a DB table
    ownershipModel: z.string(),
    staffCountRequired: z.int(),
    approvedSupplierOnly: z.boolean(),
    coporateSupplierOnly: z.boolean()
  })
});

type FinancialProfileForm = z.infer<typeof FinancialProfileFormSchema>;

const initialValues: FinancialProfileForm = {
  name: '',
  website: '',
  mission: '',
  contactPerson: '',
  phoneNumber: '',
  industuryCategory: '',
  brandReputation: {
    foundingYear: '',
    franchiseProgramYear: '',
    totalUnits: null,
    growthRate: 0,
    satisfactionScore: 0
  },
  financialInformation: {
    franchiseFee: 0,
    capital: {
      name: ''
    },
    royaltyFee: 0,
    marketingFee: 0,
    softwareLicenseFee: 0,
    renewalFee: 0,
    trainingFee: 0,
    supplyFee: 0,
    unitGrossRevenue: 0,
    profitMargin: null,
    breakEvenTimelineEst: 0,
    netWorthRequirement: 0,
    liquidityRequirement: 0
  },
  operationInformation: {
    ownershipModel: '',
    staffCountRequired: 0,
    approvedSupplierOnly: false,
    coporateSupplierOnly: false
  }
};

const FinancialProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FinancialProfileForm>({
    resolver: zodResolver(FinancialProfileFormSchema),
    defaultValues: initialValues
  });

  return (
    <div className="grid grid-cols-12 gap-4">
      <form
        onSubmit={() => {
          console.log('submit');
        }}
      >
        <div className="col-span-12 md:col-span-12 lg:col-span-3">
          <TextInput<FinancialProfileForm>
            label="Franchise Name"
            name="name"
            register={register}
            errors={errors}
            placeholder="Franchise Name"
          />
        </div>

        <TextInput<FinancialProfileForm>
          label="Website"
          name="website"
          register={register}
          errors={errors}
          placeholder="Website"
        />

        <TextInput<FinancialProfileForm>
          label="Mission"
          name="mission"
          register={register}
          errors={errors}
          placeholder="Mission"
        />

        <TextInput<FinancialProfileForm>
          label="Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
          placeholder="Contact Person"
        />

        <div className="flex justify-center items-center">
          <Button
            color="secondary"
            size="lg"
            type="submit"
            className="text-white bg-blue-700"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FinancialProfile;
