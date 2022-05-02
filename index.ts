import axios, { AxiosInstance } from 'axios';
import {
  AreaData,
  CancelTripResponse,
  CreateTripRequestBody,
  CreateTripResponse,
  EstimatePriceData,
  GetTripResponse,
  GetTripsRequestBody,
  GetTripsResponse,
  LocationPoint,
  MiareModes,
} from './shared/types';

class Miare {
  private _axiosAgent: AxiosInstance;
  private _apiUrlPrefix: string;

  constructor(apiKey: string, mode: MiareModes = 'staging') {
    this._apiUrlPrefix = mode === 'production' ? '' : 'staging.';
    this._axiosAgent = axios.create({ headers: { Authorization: `Token ${apiKey}` } });
  }

  async createTrip(createTripParameters: CreateTripRequestBody) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.mia.re/trip-management/third-party-api/v2/trips`;
    const res = await this._axiosAgent.post<CreateTripResponse>(baseUrl, createTripParameters);

    return res.data;
  }

  async cancelTripById(tripId: string) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.mia.re/trip-management/third-party-api/v2/trips/${tripId}/cancel/`;
    const res = await this._axiosAgent.post<CancelTripResponse>(baseUrl);

    return res.data;
  }

  async getTripById(tripId: string) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.mia.re/trip-management/third-party-api/v2/trips/${tripId}/`;
    const res = await this._axiosAgent.get<GetTripResponse>(baseUrl);

    return res.data;
  }

  async getTrips(getTripsParameters: GetTripsRequestBody) {
    const baseUrl = `https://${this._apiUrlPrefix}ws.mia.re/trip-management/third-party-api/v2/trips`;
    const res = await this._axiosAgent.get<GetTripsResponse>(baseUrl, {
      params: getTripsParameters,
    });

    return res.data;
  }

  async getEstimatePrice(source: LocationPoint, destination: LocationPoint) {
    const baseUrl = `https://www.${this._apiUrlPrefix}mia.re/api/accounting/estimate/price`;
    const res = await this._axiosAgent.get<EstimatePriceData>(baseUrl, {
      params: {
        source: `${source.latitude},${source.longitude}`,
        destination: `${destination.latitude},${destination.longitude}`,
      },
    });

    return res.data;
  }

  async getAreas() {
    const baseUrl = `https://${this._apiUrlPrefix}ws.mia.re/area/third-party-api/v2/areas`;
    const res = await this._axiosAgent.get<AreaData[]>(baseUrl);

    return res.data;
  }
}

export { Miare };
