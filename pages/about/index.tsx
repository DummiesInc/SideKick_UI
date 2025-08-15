import { ApiError, GetJobDto } from '@/generated/schema';
import { sidekickClient } from '@/src/client';
import getClientErrorMessageAndStatus from '@/src/errors/getClientErrorMessageAndStatus';
import React from 'react';

import { Button, Table, TableHeadCell, TableRow, TableHead, TableBody, TableCell} from "flowbite-react";


interface Props {
  data: GetJobDto[];
  errors: any[];
}

const About = (props: Props) => {
  console.log(props);
  return <div>
    {/* <Button 
    color="secondary" size="lg"
    className="bg-red-500 hover:bg-red-600"
      onClick={() => console.log('hi')}
    >
      Click me
    </Button> */}
    <Table hoverable striped>

      <TableHead>
        <TableHeadCell>Job Title</TableHeadCell>
        <TableHeadCell>Contract Week Length</TableHeadCell>
        <TableHeadCell>Requirements</TableHeadCell>
      </TableHead>

      <TableBody>
        {
          props.data.map(job => (
            <TableRow>
              <TableCell>
                {job?.jobTitle}
              </TableCell>

              <TableCell>
                {job?.contractLengthWeeks ? `${job?.contractLengthWeeks} weeks` : ''}
              </TableCell>

              <TableCell>
                {job?.requirements}
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  </div>;
};

export default About;

export async function getServerSideProps() {
  const props: Props = {
    data: [],
    errors: []
  };

  const catchFunction = (e: ApiError) => {
    props.errors.push(getClientErrorMessageAndStatus(e));
  };


    await sidekickClient.provider
      .getApiProviderJobs()
      .then((res) => props.data = res)
      .catch(catchFunction);

    return {
      props: props
    };
}
