require('dotenv').config({ path: './.env' });
const { Miare } = require('miare-sdk');

const miare = new Miare(process.env.MIARE_API_KEY);

(async () => {
  const trips = await miare.getTrips({ state: 'assign_queue' });

  console.log(trips);
})();
