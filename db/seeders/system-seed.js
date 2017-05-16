import models from '../../src/models';
import path from 'path';

const fns = [
  models.OAuthClientsModel.remove().then(() => {
    return models.OAuthClientsModel.create({
      clientId: 'system',
      clientSecret: 'aR1WnV91',
      redirectUri: ''
    });
  })
];

Promise.all(fns).then(() => {
  console.log("Succeeded in running " + path.basename(__filename));
  process.exit();
}).catch(err => {
  console.log("Failed to run " + path.basename(__filename));
  console.log(err);
});
