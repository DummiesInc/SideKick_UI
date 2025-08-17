import {
  ApiError,
  GetStateDto,
  GetDisciplineDto,
  UpdateStateDto
} from '@/generated/schema';
import { sidekickClient } from '@/src/client';
import getClientErrorMessageAndStatus from '@/src/errors/getClientErrorMessageAndStatus';
import React, { useEffect, useState } from 'react';

import {
  Button,
  Table,
  TableHeadCell,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from 'flowbite-react';

import { z } from 'zod';
import { apiRequest } from '@/src/utils/api';
import {
  State,
  fetchStates,
  updateState
} from '@/src/components/States/StateService';
import { StateForm } from '@/src/components/States/StateForm';

const About = () => {
  const [states, setStates] = useState<State[]>([]);

  const handleUpdate = async (state: State) => {
    try {
      const data = { ...state, name: state.name + '!' };
      const updated = await updateState({ ...state, name: state.name + '!' });
      setStates(states.map((s) => (s.id === updated.id ? updated : s)));
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
    <div>
      {/* {states.map((s) => (
        <li key={s.id}>
          {s.name} ({s.abbreviation})
          <button onClick={() => handleUpdate(s)}>Update Name</button>
        </li>
      ))} */}

      {states.length !== 0 && (
        <StateForm
          stateId={states[0].id}
          defaultValues={{
            name: states[0].name,
            abbreviation: states[0].abbreviation
          }}
        />
      )}

      <Button
        color="secondary"
        size="lg"
        className="bg-red-500 hover:bg-red-600"
        onClick={async () => {
          await fetchStates(setStates);
        }}
      >
        Fetch states
      </Button>

      {/* How come this button doesn't work */}
      <Button
        color="secondary"
        size="lg"
        className="bg-red-500 hover:bg-red-600"
        onClick={async () => {
          try {
            const state: State = {
              id: 2,
              name: 'test',
              abbreviation: 'te'
            };
            await updateState(state);
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Modify state
      </Button>
    </div>
  );
};

export default About;
