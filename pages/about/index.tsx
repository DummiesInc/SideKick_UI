import { ApiError, GetStateDto, GetDisciplineDto } from '@/generated/schema';
import { sidekickClient } from '@/src/client';
import getClientErrorMessageAndStatus from '@/src/errors/getClientErrorMessageAndStatus';
import React from 'react';

import { Button, Table, TableHeadCell, TableRow, TableHead, TableBody, TableCell} from "flowbite-react";


interface Props {
  disciplines: GetDisciplineDto[];
  states: GetStateDto[];
  errors: any[];
}

const About = (props: Props) => {
  console.log(props.disciplines);
  console.log(props.states);
  
  return <div>
    {/* <Button 
    color="secondary" size="lg"
    className="bg-red-500 hover:bg-red-600"
      onClick={() => console.log('hi')}
    >
      Click me
    </Button> */}
    {/* <Table hoverable striped>

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
                {job?.id}
              </TableCell>
              <TableCell>
                {job?.name}
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table> */}
  </div>;
};

export default About;

export async function getServerSideProps() {
  const props: Props = {
    disciplines: [],
    states: [],
    errors: []
  };

  const catchFunction = (e: ApiError) => {
    props.errors.push(getClientErrorMessageAndStatus(e));
  };

  await sidekickClient.discipline.getDiscipline()
  .then((res) => props.disciplines = res)
      .catch(catchFunction);

    await sidekickClient.states
      .getStates()
      .then((res) => props.states = res)
      .catch(catchFunction);

    return {
      props: props
    };
}
