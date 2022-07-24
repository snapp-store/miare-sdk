export type MiareEnvironment = 'staging' | 'production';

export interface MiareLocationPoint {
  latitude: number;
  longitude: number;
}
export interface MiareArea {
  id: number;
  max_ongoing_trips: number;
  name: string;
  ongoing_trips: number;
  polygon: {
    type: 'Polygon';
    coordinates: Array<Array<[number, number]>>;
  };
}

export type MiareTripState =
  | 'assign_queue'
  | 'pickup'
  | 'dropoff'
  | 'delivered'
  | 'canceled_by_miare'
  | 'canceled_by_client';

export interface MiareCourseManifestItem {
  name: string;
  quantity: number;
}

export interface MiareTripCourses {
  id: string;
  trip_id: string;
  bill_number: string;
  name: string;
  address: string;
  dropped_off_at: string | null;
  phone_number: string;
  location: MiareLocationPoint | null;
  manifest_items: MiareCourseManifestItem[];
  payment: {
    payment_type: 'cash';
    price: number;
  };
}

export interface MiareTripCourier {
  image: string;
  location: MiareLocationPoint | null;
  location_updated_at: string;
  name: string;
  phone_number: string;
}

export interface MiareTrip {
  id: string;
  created_at: string;
  assigned_at: string | null;
  delivery_cost: null | number;
  picked_up_at: string | null;
  state: MiareTripState;
  pickup: {
    address: string;
    deadline: string;
    image: string;
    location: MiareLocationPoint;
    name: string;
    phone_number: string;
  };
  area: {
    id: string;
    name: string;
  };
  courier: MiareTripCourier | null;
  courses: MiareTripCourses[];
  tracking_url: string;
}

export type GetAreasResponse = MiareArea[];

export interface GetEstimatePriceResponse {
  price: number;
  status: string;
}

export interface GetMiareTripsRequestBody {
  area_id?: number;
  state?: MiareTripState;
  bill_number?: string;
  from_datetime?: string;
  to_datetime?: string;
  offset?: number;
  limit?: number;
}

export interface CreateMiareTripResponse extends MiareTrip {
  state: 'assign_queue';
}

export interface CancelMiareTripResponse extends MiareTrip {
  state: 'canceled_by_client';
}

export interface GetMiareTripResponse extends MiareTrip {}

export interface AddMiareCoursesToTripRequestBody {
  bill_number: string;
  name: string;
  address: string;
  dropped_off_at: string | null;
  phone_number: string;
  location: MiareLocationPoint | null;
  manifest_items: MiareCourseManifestItem[] | null;
}

export interface GetMiareTripsResponse {
  data: MiareTrip[];
  next: string | null;
  previous: string | null;
  total_count: number;
}

export interface CreateMiareTripRequestBody {
  pickup: {
    address: string;
    deadline: string;
    image: string;
    location: MiareLocationPoint;
    name: string;
    phone_number: string;
  };
  courses: AddMiareCoursesToTripRequestBody[];
}
