import axios, { AxiosInstance } from 'axios';
import {
  AddMiareCoursesToTripRequestBody,
  CancelMiareTripResponse,
  CreateMiareTripRequestBody,
  CreateMiareTripResponse,
  GetAreasResponse,
  GetEstimatePriceResponse,
  GetMiareTripResponse,
  GetMiareTripsRequestBody,
  GetMiareTripsResponse,
  MiareEnvironment,
  MiareLocationPoint,
} from './shared/types';

class Miare {
  private _axiosAgent: AxiosInstance;
  private _apiUrlPrefix: string;

  constructor(apiKey: string, mode: MiareEnvironment = 'staging') {
    this._apiUrlPrefix = mode === 'production' ? '' : 'staging.';
    this._axiosAgent = axios.create({ headers: { Authorization: `Token ${apiKey}` } });
  }

  async createTrip(createTripParameters: CreateMiareTripRequestBody) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.miare.ir/trip-management/third-party-api/v2/trips`;
    const res = await this._axiosAgent.post<CreateMiareTripResponse>(baseUrl, createTripParameters);

    return res.data;
  }

  async addCourseToTrip(tripid: string, newCourse: AddMiareCoursesToTripRequestBody) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.miare.ir/trip-management/third-party-api/v2/trips/${tripid}/courses`;
    const res = await this._axiosAgent.patch<CreateMiareTripResponse>(baseUrl, newCourse);

    return res.data;
  }

  async removeCourseFromTrip(courseId: string) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.miare.ir/trip-management/third-party-api/v2/courses/${courseId}`;
    const res = await this._axiosAgent.delete<CreateMiareTripResponse>(baseUrl);

    return res.data;
  }

  async cancelTripById(tripId: string) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.miare.ir/trip-management/third-party-api/v2/trips/${tripId}/cancel/`;
    const res = await this._axiosAgent.post<CancelMiareTripResponse>(baseUrl);

    return res.data;
  }

  async getTripById(tripId: string) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.miare.ir/trip-management/third-party-api/v2/trips/${tripId}/`;
    const res = await this._axiosAgent.get<GetMiareTripResponse>(baseUrl);

    return res.data;
  }

  async getTrips(getTripsParameters: GetMiareTripsRequestBody) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.miare.ir/trip-management/third-party-api/v2/trips`;
    const res = await this._axiosAgent.get<GetMiareTripsResponse>(baseUrl, {
      params: getTripsParameters,
    });

    return res.data;
  }

  async getEstimatePrice(source: MiareLocationPoint, destination: MiareLocationPoint) {
    const baseUrl = `https://www.${this._apiUrlPrefix}miare.ir/api/accounting/estimate/price`;
    const res = await this._axiosAgent.get<GetEstimatePriceResponse>(baseUrl, {
      params: {
        source: `${source.latitude},${source.longitude}`,
        destination: `${destination.latitude},${destination.longitude}`,
      },
    });

    return res.data;
  }

  async getAreas() {
    const baseUrl = `https://${this._apiUrlPrefix}ws.miare.ir/area/third-party-api/v2/areas`;
    const res = await this._axiosAgent.get<GetAreasResponse>(baseUrl);

    return res.data;
  }
}

export default Miare;
