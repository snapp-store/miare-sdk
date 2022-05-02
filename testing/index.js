require('dotenv').config({ path: './.env' });
const { default: Miare } = require('miare-sdk');

const miare = new Miare(process.env.MIARE_API_KEY);

(async () => {
  const trips = await miare.getTrips();

  console.log(trips);
})();
