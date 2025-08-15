/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetDisciplineDto } from '../models/GetDisciplineDto';
import type { GetJobDto } from '../models/GetJobDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProviderService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns any OK
     * @throws ApiError
     */
    public getApiProvider(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Provider',
        });
    }
    /**
     * @returns GetDisciplineDto OK
     * @throws ApiError
     */
    public getApiProviderGetDisciplines(): CancelablePromise<GetDisciplineDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Provider/GetDisciplines',
        });
    }
    /**
     * @returns GetJobDto OK
     * @throws ApiError
     */
    public getApiProviderJobs(): CancelablePromise<Array<GetJobDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Provider/Jobs',
        });
    }
}
