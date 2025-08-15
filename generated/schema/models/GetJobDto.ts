/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetDisciplineDto } from './GetDisciplineDto';
import type { GetSpecialtyDto } from './GetSpecialtyDto';
import type { JobType } from './JobType';
export type GetJobDto = {
    id?: number;
    jobTitle?: string | null;
    uniqueNotes?: string | null;
    requirements?: string | null;
    jobType?: JobType;
    housingProvided?: boolean;
    hideExternally?: boolean;
    autoPosted?: boolean;
    active?: boolean;
    allowsAutoposterUpdate?: boolean;
    contractLengthWeeks?: number;
    disciplineId?: number;
    discipline?: GetDisciplineDto;
    specialtyId?: number;
    specialty?: GetSpecialtyDto;
    startDate?: string;
    expiresOn?: string;
    platformId?: number | null;
    facilityId?: number | null;
};

