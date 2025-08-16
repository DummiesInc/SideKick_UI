/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetStateDto } from '../models/GetStateDto';
import type { UpdateStateDto } from '../models/UpdateStateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StatesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * index states
     * @returns GetStateDto OK
     * @throws ApiError
     */
    public getStates(): CancelablePromise<Array<GetStateDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/states',
        });
    }
    /**
     * show states
     * @returns GetStateDto OK
     * @throws ApiError
     */
    public getStates1(): CancelablePromise<Array<GetStateDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/states/{id}',
        });
    }
    /**
     * update states
     * @param requestBody
     * @returns GetStateDto OK
     * @throws ApiError
     */
    public patchStates(
        requestBody: UpdateStateDto,
    ): CancelablePromise<Array<GetStateDto>> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/states/{id}',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * update states
     * @param requestBody
     * @returns GetStateDto OK
     * @throws ApiError
     */
    public putStates(
        requestBody: UpdateStateDto,
    ): CancelablePromise<Array<GetStateDto>> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/states/{id}',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
