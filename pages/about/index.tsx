import { ApiError, GetStateDto, GetDisciplineDto , UpdateStateDto} from '@/generated/schema';
import { sidekickClient } from '@/src/client';
import getClientErrorMessageAndStatus from '@/src/errors/getClientErrorMessageAndStatus';
import React, { useEffect, useState } from 'react';

import { Button, Table, TableHeadCell, TableRow, TableHead, TableBody, TableCell} from "flowbite-react";

import { z } from "zod";
import { apiRequest } from '@/src/utils/api';

// interface Props {
//   disciplines: GetDisciplineDto[];
//   states: GetStateDto[];
//   errors: any[];
// }

const StateSchema = z.object({
  id: z.number(),
  name: z.string(),
  abbreviation: z.string().max(2),
});

type State = z.infer<typeof StateSchema>;

const About = () => {
  const BASE_URL = "http://localhost:3001/states";
  
  const [states, setStates] = useState<State[]>([]);

  async function fetchStates(): Promise<State[]> {
    const data = await apiRequest<undefined, State[]>(BASE_URL, "GET");
    setStates(data)
    console.log(data)
    return data; // runtime validation
  }

  async function fetchState(id: number): Promise<State> {
    const data = await apiRequest<undefined, State>(`${BASE_URL}/${id}`, "GET");
    return StateSchema.parse(data);
  }

  async function updateState(state: State): Promise<State> {
    
    const data = await apiRequest<
      { state: { name: string; abbreviation: string } },
      State
    >(`${BASE_URL}/${state.id}`, "PUT", {
      state: {
        name: state.name,
        abbreviation: state.abbreviation,
      },
    });
  
    return StateSchema.parse(data);
  }

  const handleUpdate = async (state: State) => {
    try {
      const updated = await updateState({ ...state, name: state.name + "!" });
      setStates(states.map(s => (s.id === updated.id ? updated : s)));
    } catch (err) {
      console.error("Update failed", err);
    }
  };


  
  return <div>
    {states.map(s => (
          <li key={s.id}>
            {s.name} ({s.abbreviation})
            <button onClick={() => handleUpdate(s)}>Update Name</button>
          </li>
        ))}
    <Button 
    color="secondary" size="lg"
    className="bg-red-500 hover:bg-red-600"
      onClick={async () => {
        await fetchStates()
      }}
    >
      Fetch states
    </Button>

    <Button 
    color="secondary" size="lg"
    className="bg-red-500 hover:bg-red-600"
      onClick={async () => {
        try {
          const state: State = {
            id: 1,
            name: "test",
            abbreviation: "te"
          }
          await updateState(state)
        }
        catch(e) {
          console.log(e)
        }
      }}
    >
      Modify state
    </Button>
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

// export async function getServerSideProps() {
//   const props: Props = {
//     disciplines: [],
//     states: [],
//     errors: []
//   };

//   const data: UpdateStateDto = {
//     id: 0,
//     name: '',
//     abbreviation: ''
//   }

//   const catchFunction = (e: ApiError) => {
//     props.errors.push(getClientErrorMessageAndStatus(e));
//   };

//   await sidekickClient.discipline.getDiscipline()
//   .then((res) => props.disciplines = res)
//       .catch(catchFunction);

//     await sidekickClient.states
//       .getStates()
//       .then((res) => props.states = res)
//       .catch(catchFunction);

//     await sidekickClient.states.putStates(data)

//     return {
//       props: props
//     };
// }
