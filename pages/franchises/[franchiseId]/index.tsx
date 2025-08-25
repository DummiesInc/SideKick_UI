import FinancialProfile, {
  GetFinancialProfileDto
} from '@/src/components/Franchise/FinancialProfile';
import { BASE_URL } from '@/src/utils/api';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';

interface Props {
  franchiseProfile?: GetFinancialProfileDto | null;
}

const Franchise = ({ franchiseProfile }: Props) => {
  return (
    <div className=" w-full rounded-lg shadow-sm max-w-xl">
      <FinancialProfile franchiseProfile={franchiseProfile} />
    </div>
  );
};

export default Franchise;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Props = {
    franchiseProfile: null
  };

  const { franchiseId } = context.params!;

  try {
    const res = await axios.get<GetFinancialProfileDto>(
      `${BASE_URL}/franchise/${franchiseId}`
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
