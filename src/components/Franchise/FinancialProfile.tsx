import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Datepicker, Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ReactTextInput } from '../ReactFormComponents/ReactTextInput';
import { FinancialProfileFormSchema } from './FinancialProfileHelper';
import Divider from '@/src/utils/components/Divider';
import { fetchCapitals } from '@/src/utils/Services/CapitalService';
import { SelectInput } from '../ReactFormComponents/SelectInput';
import { FlowDatePicker } from '../ReactFormComponents/FlowDatePicker';

type FinancialProfileForm = z.infer<typeof FinancialProfileFormSchema>;

const initialValues: FinancialProfileForm = {
  name: '',
  website: '',
  mission: '',
  contactPerson: '',
  phoneNumber: '',
  industuryCategory: '',
  brandReputation: {
    foundingYear: null,
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
  const [capitals, setCapitals] = useState<SelectOption[]>([]);

  const {
    getValues,
    register,
    handleSubmit,
    control,
    getFieldState,
    formState: { errors, isSubmitting }
  } = useForm<FinancialProfileForm>({
    resolver: zodResolver(FinancialProfileFormSchema),
    defaultValues: initialValues
  });

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
    <div
      className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm max-w-xl"
      style={
        {
          // border: 'solid 2px red',
        }
      }
    >
      <form
        onSubmit={() => {}}
        style={
          {
            // border: 'solid 2px red'
          }
        }
      >
        <h5 className="font-semibold text-gray-900 underline decoration-blue-500 mb-5 mt-5">
          Franchise Information
        </h5>
        <div className="grid grid-flow-col grid-rows-3 grid-cols-1 gap-4">
          <ReactTextInput
            label="Franchise Name"
            name="name"
            register={register}
            errors={errors}
            placeholder="Franchise Name"
          />

          <ReactTextInput
            label="Website"
            name="website"
            register={register}
            errors={errors}
            placeholder="Website"
          />

          <ReactTextInput
            label="Mission"
            name="mission"
            register={register}
            errors={errors}
            placeholder="Mission"
          />

          <ReactTextInput
            label="Contact Person"
            name="contactPerson"
            register={register}
            errors={errors}
            placeholder="Contact Person"
          />

          <ReactTextInput
            label="Contact Phone Number"
            name="phoneNumber"
            register={register}
            errors={errors}
            placeholder="Contact Number"
          />
        </div>

        <Divider />

        <div>
          <h5 className="font-semibold text-gray-900 underline decoration-blue-500 mb-5 mt-5">
            Brand Reputation
          </h5>

          <div className="grid grid-flow-col grid-rows-2 grid-cols-2 gap-4">
            <FlowDatePicker
              name="brandReputation.foundingYear"
              label="Brand Founding Year"
              placeholder="Brand Founding Year"
              control={control}
              errors={errors}
            />

            <ReactTextInput
              label="Franchise Program Year"
              name="brandReputation.franchiseProgramYear"
              register={register}
              errors={errors}
              placeholder="Franchise Program Year"
            />

            <ReactTextInput
              label="Total Units"
              name="brandReputation.totalUnits"
              register={register}
              errors={errors}
              placeholder="Total Units"
            />
            <ReactTextInput
              label="Growth Rate"
              name="brandReputation.growthRate"
              register={register}
              errors={errors}
              placeholder="Growth Rate"
              type="number"
            />

            <ReactTextInput
              label="Satisfaction Score"
              name="brandReputation.satisfactionScore"
              register={register}
              errors={errors}
              placeholder="Satisfaction Score"
              type="number"
            />
          </div>
        </div>

        <Divider />

        <div>
          <h5 className="font-semibold text-gray-900 underline decoration-blue-500 mb-5 mt-5">
            Financial Information
          </h5>

          <div className="grid grid-flow-col grid-rows-2 grid-cols-2 gap-4">
            <ReactTextInput
              label="Franchise Fee"
              name="financialInformation.franchiseFee"
              register={register}
              errors={errors}
              placeholder="Franchise Fee"
              type="number"
            />

            <SelectInput
              label="Investment Range"
              name="financialInformation.capital.name"
              register={register}
              errors={errors}
              placeholder="Select an option"
              options={capitals}
            />
          </div>
        </div>

        <div className="flex justify-center items-center mt-5">
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
