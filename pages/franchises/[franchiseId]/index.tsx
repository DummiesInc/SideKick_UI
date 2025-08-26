import FinancialProfile, {
  GetFinancialProfileDto
} from '@/src/components/Franchise/FinancialProfile';
import { BASE_URL, DEBUG_URL } from '@/src/utils/api';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';

interface Props {
  franchiseId: number | null;
  franchiseProfile?: GetFinancialProfileDto | null;
}

const Franchise = ({ franchiseProfile, franchiseId }: Props) => {
  return (
    <div className=" w-full rounded-lg shadow-sm max-w-xl">
      <FinancialProfile
        franchiseProfile={franchiseProfile}
        franchiseId={franchiseId}
      />
    </div>
  );
};

export default Franchise;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Props = {
    franchiseId: null,
    franchiseProfile: null
  };

  const { franchiseId } = context.params!;

  props.franchiseId = franchiseId ? +franchiseId : null;

  try {
    const res = await axios.get<GetFinancialProfileDto>(
      `${BASE_URL}/franchise/${franchiseId}`
      // `${DEBUG_URL}/franchise/${franchiseId}`
    );
    props.franchiseProfile = res.data;

    return {
      props: props
    };
  } catch (err) {
    return {
      props: props
    };
  }
};
