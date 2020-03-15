const app = require('../../src/app');

describe('\'present_students\' service', () => {
  it('registered the service', () => {
    const service = app.service('present-students');
    expect(service).toBeTruthy();
  });
});
