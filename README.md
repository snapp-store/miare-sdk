# miare-sdk

Miare SDK is a Typescript library for dealing with [mia.re](https://www.mia.re/docs/#introduction) 3rd party api 🛵.

## Installation

Use the package manager [npm](https://npmjs.com/) to install miare-sdk.

```bash
npm install @snapp-store/miare-sdk
```

## Usage

Pass your API key and environment between "staging" or "production" to Miare class and create an instance of it.

```javascript
import Miare from '@snapp-store/miare-sdk';

const miare = new Miare('<YOUR_MIARE_API_KEY>', 'staging');

const someFancyFunction = async () => {
  // some loginc here

  const canceledTrips = await miare.getTrips({ state: 'canceled_by_client' });

  return canceledTrips;
};
```

## Available Methods

- **createTrip(createTripParameters)**
- **addCourseToTrip(tripid, newCourse)**
- **removeCourseFromTrip(courseId)**
- **cancelTripById(tripId)**
- **getTripById(tripId)**
- **getTrips(getTripsParameters)**
- **getEstimatePrice(source, destination)**
- **getAreas()**

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
