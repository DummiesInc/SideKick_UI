import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { Franchise, fetchFranchiseForCustomer } from '@/src/utils/Services/FranchiseService';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { BASE_URL } from '@/src/utils/api';

interface Props {
  franchises : Franchise[]
}

const FranchiseReport = ({
  franchises
}: Props) => {
  const router = useRouter();
  const { customerId } = router.query;

    // useEffect(() => {
    //     if(router.isReady) {
    //       (async() => {
    //         console.log(router.query)
    //         const data = await fetchFranchiseForCustomer(Number(customerId))
    //         console.log(data)
    //       })()
    //     }
    // }, [router])

    useEffect(() => {
      console.log(franchises)
    }, [])

  return (
    <div>index</div>
  )
}

export default FranchiseReport

export const getServerSideProps: GetServerSideProps = async (context) => {

  const props: Props = {
    franchises: []
  }

  const { customerId } = context.params!;

  try {
    const res = await axios.get<Franchise[]>(
      `${BASE_URL}/franchise/customer/${customerId}`
    );
    props.franchises = res.data;

    return {
      props: props,
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};