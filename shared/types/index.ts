export type MiareModes = 'staging' | 'production';

export interface LocationPoint {
  latitude: number;
  longitude: number;
}

export interface EstimatePriceData {
  price: number;
  status: string;
}

export interface AreaData {
  id: number;
  max_ongoing_trips: number;
  name: string;
  ongoing_trips: number;
  polygon: {
    type: 'Polygon';
    coordinates: Array<Array<[number, number]>>;
  };
}

export type StateType =
  | 'assign_queue'
  | 'pickup'
  | 'dropoff'
  | 'delivered'
  | 'canceled_by_miare'
  | 'canceled_by_client';

export interface GetTripsRequestBody {
  area_id?: number;
  state?: StateType;
  bill_number?: string;
  from_datetime?: string;
  to_datetime?: string;
  offset?: number;
  limit?: number;
}

interface ManifestTtem {
  name: string;
  quantity: number;
}

interface Courses {
  id: string;
  trip_id: string;
  bill_number: string;
  name: string;
  address: string;
  dropped_off_at: string | null;
  phone_number: string;
  location: LocationPoint | null;
  manifest_items: ManifestTtem[] | null;
  payment: {
    payment_type: 'cash';
    price: number;
  };
}

interface Courier {
  image: string;
  location: LocationPoint | null;
  location_updated_at: string;
  name: string;
  phone_number: string;
}

export interface Trip {
  id: string;
  created_at: string;
  assigned_at: string | null;
  picked_up_at: string | null;
  state: StateType;
  pickup: {
    address: string;
    deadline: string;
    image: string;
    location: LocationPoint;
    name: string;
    phone_number: string;
  };
  area: {
    id: string;
    name: string;
  };
  courier: Courier | null;
  courses: Courses[];
  tracking_url: string;
}

export interface GetTripsResponse {
  data: Trip[];
  next: string | null;
  previous: string | null;
  total_count: number;
}

export interface CreateTripRequestBody {
  pickup: {
    address: string;
    deadline: string;
    image: string;
    location: LocationPoint;
    name: string;
    phone_number: string;
  };
  courses: Courses[];
}

export interface CreateTripResponse extends Trip {
  state: 'assign_queue';
}

export interface CancelTripResponse extends Trip {
  state: 'canceled_by_client';
}

export interface GetTripResponse extends Trip {}
