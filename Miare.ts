import axios, { AxiosInstance } from 'axios';
import {
  GetAreasResponse,
  CancelMiareTripResponse,
  CreateMiareTripRequestBody,
  CreateMiareTripResponse,
  GetEstimatePriceResponse,
  GetMiareTripResponse,
  GetMiareTripsRequestBody,
  GetMiareTripsResponse,
  MiareLocationPoint,
  MiareEnvironment,
} from './shared/types';

class Miare {
  private _axiosAgent: AxiosInstance;
  private _apiUrlPrefix: string;

  constructor(apiKey: string, mode: MiareEnvironment = 'staging') {
    this._apiUrlPrefix = mode === 'production' ? '' : 'staging.';
    this._axiosAgent = axios.create({ headers: { Authorization: `Token ${apiKey}` } });
  }

  async createTrip(createTripParameters: CreateMiareTripRequestBody) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.mia.re/trip-management/third-party-api/v2/trips`;
    const res = await this._axiosAgent.post<CreateMiareTripResponse>(baseUrl, createTripParameters);

    return res.data;
  }

  async cancelTripById(tripId: string) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.mia.re/trip-management/third-party-api/v2/trips/${tripId}/cancel/`;
    const res = await this._axiosAgent.post<CancelMiareTripResponse>(baseUrl);

    return res.data;
  }

  async getTripById(tripId: string) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.mia.re/trip-management/third-party-api/v2/trips/${tripId}/`;
    const res = await this._axiosAgent.get<GetMiareTripResponse>(baseUrl);

    return res.data;
  }

  async getTrips(getTripsParameters: GetMiareTripsRequestBody) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.mia.re/trip-management/third-party-api/v2/trips`;
    const res = await this._axiosAgent.get<GetMiareTripsResponse>(baseUrl, {
      params: getTripsParameters,
    });

    return res.data;
  }

  async getEstimatePrice(source: MiareLocationPoint, destination: MiareLocationPoint) {
    const baseUrl = `https://www.${this._apiUrlPrefix}mia.re/api/accounting/estimate/price`;
    const res = await this._axiosAgent.get<GetEstimatePriceResponse>(baseUrl, {
      params: {
        source: `${source.latitude},${source.longitude}`,
        destination: `${destination.latitude},${destination.longitude}`,
      },
    });

    return res.data;
  }

  async getAreas() {
    const baseUrl = `https://${this._apiUrlPrefix}ws.mia.re/area/third-party-api/v2/areas`;
    const res = await this._axiosAgent.get<GetAreasResponse>(baseUrl);

    return res.data;
  }
}

export default Miare;
