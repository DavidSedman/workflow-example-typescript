import request from 'supertest';
import { api } from '../../api/api';

describe('Hit API with everthing', () => {
  it(`responds with I'm Healthy!`, async () => {
    await request(api)
      .get('/')
      .set('Accept', 'text/plain')
      .expect('Content-Type', /text/)
      .expect(/I'm Healthy!/)
      .expect(200);
  });

  it(`responds with Cats`, async () => {
    const response = await request(api)
      .get('/cats')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.cats[0].id).toBe(1);
    expect(response.body.cats[0].name).toBe('Tiger');
    expect(response.body.cats[0].character).toBe('fierce');
    expect(response.body.cats[1].id).toBe(2);
    expect(response.body.cats[1].name).toBe('Tigger');
    expect(response.body.cats[1].character).toBe('bouncy');
  });
});
