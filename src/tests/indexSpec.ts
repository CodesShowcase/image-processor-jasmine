import app from '../index'
import supertest from 'supertest'

const request = supertest(app)

describe('Route Tests', () => {

  it('Route | Root => Should return status 200', async () => {
    const response = await request.get('/')
		expect(response.status).toBe(200)
  })

  it('Route | Get all images => Should return status 200', async () => {
    const response = await request.get('/api/view')
		expect(response.status).toBe(200)
  })

  it('Route | Retrieve single image => Should return status 200', async () => {
    const response = await request.get('/api/view?file=fjord');
    expect(response.status).toBe(200);
  })

  it('Route | Retrieve single nonexistent image => Should return status 400', async () => {
    const response = await request.get('/api/view?file=doesnotexist');
    expect(response.status).toBe(400);
  })

  it('Route | Resize image => Should return status 200', async () => {
    const response = await request.get('/api/resize?file=fjord&width=400&height=200');
    expect(response.status).toBe(200);
  })

  it('Route | Greyscale image => Should return status 200', async () => {
    const response = await request.get('/api/greyscale?file=fjord');
    expect(response.status).toBe(200);
  })

})

describe('Controller Tests', () => {

  it('Controller | Retrieve a single image', async () => {
    const response = await request.get(`/api/view?file=fjord`)
		expect(response.files).toBeTrue
  })

  it('Controller | Should return resized image', async () => {
    const response = await request.get(`/api/resize?file=fjord&width=400&height=200`)
		expect(response.files).toBeTrue
  })

  it('Controller | Resize some parameters are missing Parameters', async () => {
    const response = await request.get(`/api/resize?width=400&height=200`)
		expect(response.text).toBe('Parameters are missing => /api/resize?file=name&width=pixel&height=pixel')
  })

  it('Controller | Should return greyscaled image', async () => {
    const response = await request.get(`/api/greyscale?file=fjord`)
		expect(response.files).toBeTrue
  })

})
