import React from 'react';
import {
  Franchise,
  FranchiseReportType
} from '@/src/utils/Services/FranchiseService';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { BASE_URL } from '@/src/utils/api';
import FranchiseReportPDF from '@/src/components/ReactPDFs/FranchiseReportPDF';

interface Props {
  franchiseReport: FranchiseReportType | null;
  pdfBase64: any;
}

const FranchiseReport = ({ pdfBase64, franchiseReport }: Props) => {
  console.log(franchiseReport);
  return (
    <div>
      {pdfBase64 === null ? (
        <>
          <h5>The report you're looking for doesn't exist</h5>
          <p>Please head back to the main menu</p>
        </>
      ) : (
        <iframe
          src={`data:application/pdf;base64,${pdfBase64}`}
          width="800px"
          height="950px"
        />
      )}
    </div>
  );
};

export default FranchiseReport;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Props = {
    franchiseReport: null,
    pdfBase64: null
  };

  const { customerId } = context.params!;

  try {
    const res = await axios.get<FranchiseReportType>(
      `${BASE_URL}/franchise/customer/${customerId}`
    );
    props.franchiseReport = res.data;

    const { default: ReactPDF } = await import('@react-pdf/renderer');
    const pdfStream = await ReactPDF.renderToStream(
      <FranchiseReportPDF franchiseReport={props.franchiseReport} />
    );
    const chunks: Buffer[] = [];
    for await (let chunk of pdfStream) {
      chunks.push(Buffer.from(chunk));
    }
    const pdfBuffer = Buffer.concat(chunks);
    props.pdfBase64 = pdfBuffer.toString('base64');

    return {
      props: props
    };
  } catch (err) {
    return {
      props: props
    };
  }
};
