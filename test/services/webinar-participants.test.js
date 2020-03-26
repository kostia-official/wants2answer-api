const app = require('../../src/app');

describe('\'webinar-participants\' service', () => {
  it('registered the service', () => {
    const service = app.service('webinar-participants');
    expect(service).toBeTruthy();
  });
});
