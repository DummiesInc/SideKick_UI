/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetDisciplineDto } from '../models/GetDisciplineDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DisciplineService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * index discipline
     * @returns GetDisciplineDto OK
     * @throws ApiError
     */
    public getDiscipline(): CancelablePromise<Array<GetDisciplineDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discipline',
        });
    }
}
