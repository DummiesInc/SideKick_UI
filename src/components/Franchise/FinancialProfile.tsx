import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Datepicker, Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ReactTextInput } from '../ReactFormComponents/ReactTextInput';
import {
  GetFinancialProfileFormSchema,
  UpdateFinancialProfileDto,
  UpdateFinancialProfileFormSchema
} from './FinancialProfileHelper';
import Divider from '@/src/utils/components/Divider';
import { fetchCapitals } from '@/src/utils/Services/CapitalService';
import { SelectInput } from '../ReactFormComponents/SelectInput';
import { FlowDatePicker } from '../ReactFormComponents/FlowDatePicker';
import { DatePickerInput } from '../ReactFormComponents/DatePickerInput';
import { ToggleInput } from '../ReactFormComponents/ToggleInput';
import { useRouter } from 'next/router';
import { getFranchiseProfile } from '@/src/utils/Services/FranchiseService';
import dayjs from 'dayjs';
import { involvementOptions } from '../Questionnaire/QuestionnaireForm';

export type GetFinancialProfileDto = z.infer<
  typeof GetFinancialProfileFormSchema
>;

interface Props {
  franchiseProfile?: GetFinancialProfileDto | null;
}

const FinancialProfile: React.FC<Props> = ({ franchiseProfile }) => {
  const [capitals, setCapitals] = useState<SelectOption[]>([]);

  const getInitialValue = (
    dto: GetFinancialProfileDto | null | undefined
  ): UpdateFinancialProfileDto => {
    return {
      franchise: {
        name: dto?.franchise?.name ?? '',
        website: dto?.franchise?.website ?? '',
        mission: dto?.franchise?.mission ?? '',
        contactPerson: dto?.franchise?.contactPerson ?? '',
        phoneNumber: dto?.franchise?.phoneNumber ?? ''
      },
      brandReputation: {
        foundingDate: dto?.brandReputation?.foundingDate ?? '',
        franchiseProgramYear: dto?.brandReputation?.franchiseProgramYear ?? '',
        totalUnits: dto?.brandReputation?.totalUnits ?? 0,
        growthRate: dto?.brandReputation?.growthRate ?? 0,
        satisfactionScore: dto?.brandReputation?.satisfactionScore ?? 0
      },
      financialInformation: {
        franchiseFee: dto?.financialInformation?.franchiseFee ?? 0,
        capital: { name: dto?.financialInformation?.capital?.name ?? '' },
        royaltyFee: dto?.financialInformation?.royaltyFee ?? 0,
        marketingFee: dto?.financialInformation?.marketingFee ?? 0,
        softwareLicenseFee: dto?.financialInformation?.softwareLicenseFee ?? 0,
        renewalFee: dto?.financialInformation?.renewalFee ?? 0,
        trainingFee: dto?.financialInformation?.trainingFee ?? 0,
        supplyFee: dto?.financialInformation?.supplyFee ?? 0,
        profitMargin: dto?.financialInformation?.profitMargin ?? 0,
        netWorthRequirement:
          dto?.financialInformation?.netWorthRequirement ?? 0,
        liquidityRequirement:
          dto?.financialInformation?.liquidityRequirement ?? 0
      },
      operationInformation: {
        ownershipModel: dto?.operationInformation?.ownershipModel ?? '',
        staffCountRequired: dto?.operationInformation?.staffCountRequired ?? 0,
        approvedSupplierOnly:
          dto?.operationInformation?.approvedSupplierOnly ?? false,
        coporateSupplierOnly:
          dto?.operationInformation?.coporateSupplierOnly ?? false
      }
    };
  };

  // Can the default be a type of GetFinancialProfileDto instead of UpdateFinancialProfileDto
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UpdateFinancialProfileDto>({
    resolver: zodResolver(UpdateFinancialProfileFormSchema),
    defaultValues: getInitialValue(franchiseProfile),
    mode: 'all'
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

  const onSubmit = async (data: any) => {
    console.log(data);
  };

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
        onSubmit={handleSubmit(onSubmit)}
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
            name="franchise.name"
            register={register}
            errors={errors}
            placeholder="Franchise Name"
          />

          {/* Error doesn't seem to show when the field is empty string */}
          <ReactTextInput
            label="Website"
            name="franchise.website"
            register={register}
            errors={errors}
            placeholder="Website"
          />

          <ReactTextInput
            label="Mission"
            name="franchise.mission"
            register={register}
            errors={errors}
            placeholder="Mission"
          />

          <ReactTextInput
            label="Contact Person"
            name="franchise.contactPerson"
            register={register}
            errors={errors}
            placeholder="Contact Person"
          />

          <ReactTextInput
            label="Contact Phone Number"
            name="franchise.phoneNumber"
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
            <DatePickerInput
              name="brandReputation.foundingDate"
              label="Brand Founding Date"
              placeholder="Brand Founding Date"
              register={register}
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
              type="number"
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
              onChange={(e) => {
                console.log(typeof e);
              }}
            />

            <SelectInput
              label="Investment Range"
              name="financialInformation.capital.name"
              register={register}
              errors={errors}
              placeholder="Select an option"
              options={capitals}
            />

            <ReactTextInput
              label="Royalty Fee"
              name="financialInformation.royaltyFee"
              register={register}
              errors={errors}
              placeholder="Royalty Fee"
              type="number"
            />

            <ReactTextInput
              label="Marketing Fee"
              name="financialInformation.marketingFee"
              register={register}
              errors={errors}
              placeholder="Marketing Fee"
              type="number"
            />
          </div>

          <div className="grid grid-flow-col grid-rows-2 grid-cols-2 gap-4">
            <ReactTextInput
              label="Software LicenseFee Fee"
              name="financialInformation.softwareLicenseFee"
              register={register}
              errors={errors}
              placeholder="Software LicenseFee Fee"
              type="number"
            />

            <ReactTextInput
              label="Renewal Fee"
              name="financialInformation.renewalFee"
              register={register}
              errors={errors}
              placeholder="Renewal Fee"
              type="number"
            />

            <ReactTextInput
              label="Training Fee"
              name="financialInformation.trainingFee"
              register={register}
              errors={errors}
              placeholder="Training Fee"
              type="number"
            />

            <ReactTextInput
              label="Supply Fee"
              name="financialInformation.supplyFee"
              register={register}
              errors={errors}
              placeholder="Supply Fee"
              type="number"
            />
          </div>

          <ReactTextInput
            label="Profit Margin"
            name="financialInformation.profitMargin"
            register={register}
            errors={errors}
            placeholder="Profit Margin"
            type="number"
          />

          <ReactTextInput
            label="Net Worth Requirement"
            name="financialInformation.netWorthRequirement"
            register={register}
            errors={errors}
            placeholder="Net Worth Requirement"
            type="number"
          />

          <ReactTextInput
            label="Liquidity Requirement"
            name="financialInformation.liquidityRequirement"
            register={register}
            errors={errors}
            placeholder="Liquidity Requirement"
            type="number"
          />
        </div>

        <Divider />

        <div>
          <h5 className="font-semibold text-gray-900 underline decoration-blue-500 mb-5 mt-5">
            Operation Information
          </h5>

          {/* <ReactTextInput
            label="Ownership Model"
            name="operationInformation.ownershipModel"
            register={register}
            errors={errors}
            placeholder="Ownership Model"
            type="text"
          /> */}

          <SelectInput
            label="Ownership Model"
            name="operationInformation.ownershipModel"
            register={register}
            errors={errors}
            placeholder="Select an option"
            options={involvementOptions.map((option, i) => ({
              label: option,
              value: i
            }))}
          />

          <ReactTextInput
            label="Number of staff required for operation"
            name="operationInformation.staffCountRequired"
            register={register}
            errors={errors}
            placeholder="Staff number"
            type="number"
          />

          <ToggleInput
            label="Approved Supplier Only"
            name="operationInformation.approvedSupplierOnly"
            register={register}
            errors={errors}
          />

          <ToggleInput
            label="Coporate Supplier Only"
            name="operationInformation.coporateSupplierOnly"
            register={register}
            errors={errors}
          />
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
