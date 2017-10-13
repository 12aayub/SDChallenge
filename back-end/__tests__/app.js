const request = require('supertest')
const app = require('../app')

jest.mock('../models/activity')
jest.mock('../models/user')
jest.mock('../models/completedActivity')

describe("App", ()=>{
  it("Tests the root path", ()=>{
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200)
    })
  })

  it ("Lists activities", ()=>{
  return request(app).get("/activities").then(response =>{
    expect(response.statusCode).toBe(200)
    expect(response.body.activities[0].name).toBe('Stalk Aaron')
    })
  })

  it ("Lists users", ()=>{
  return request(app).get("/users").then(response =>{
    expect(response.statusCode).toBe(200)
    expect(response.body.users[0].firstName).toBe('Kathy')
    })
  })

  it ("Lists completed activities", ()=>{
  return request(app).get("/completedactivities/").then(response =>{
    expect(response.statusCode).toBe(200)
    expect(response.body.completedactivities[0].userID).toBe(1)
    })
  })

  it("Creates activities", ()=>{
  return request(app)
    .post("/activities")
    .send({
      name: 'Stalk Aaron',
      description: 'Find Aaron but don\'t get caught',
      longitude: 32.70961,
      latitude: -117.1601878
    })
    .then(response => {
      expect(response.statusCode).toBe(201)
      expect(response.body.activity.name).toBe('Stalk Aaron')
      expect(response.body.activity.description).toBe('Find Aaron but don\'t get caught')
      expect(response.body.activity.longitude).toBe(32.70961)
      expect(response.body.activity.latitude).toBe(-117.1601878)
    })
  })

  it("Creates users", ()=>{
  return request(app)
    .post("/users")
    .send({
      firstName: 'Kathy',
      lastName: 'OhYeah',
      email: 'cornnutfan3200@kraft.com'
    })
    .then(response => {
      expect(response.statusCode).toBe(201)
      expect(response.body.user.firstName).toBe('Kathy')
      expect(response.body.user.lastName).toBe('OhYeah')
      expect(response.body.user.email).toBe('cornnutfan3200@kraft.com')
    })
  })

  it("Validates name when creating activity", ()=>{
    return request(app)
      .post("/activities")
      .send({
        description: 'Find Aaron but don\'t get caught',
        longitude: 32.70961,
        latitude: -117.1601878
      })
      .then(response =>{
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('name')
        expect(error.msg).toBe('Is required')
      })
  })

  it("Validates description when creating activity", ()=>{
    return request(app)
      .post("/activities")
      .send({
        name: 'Stalk Aaron',
        longitude: 32.70961,
        latitude: -117.1601878
      })
      .then(response =>{
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('description')
        expect(error.msg).toBe('Is required')
      })
  })

  it("Validates longitude when creating activity", ()=>{
    return request(app)
      .post("/activities")
      .send({
        description: 'Find Aaron but don\'t get caught',
        latitude: -117.1601878,
        name: 'Stalk Aaron'

      })
      .then(response =>{
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('longitude')
        expect(error.msg).toBe('Is required')
      })
  })

  it("Validates latitude when creating activity", ()=>{
    return request(app)
      .post("/activities")
      .send({
        name: 'Stalk Aaron',
        longitude: 32.70961,
        description: 'Find Aaron but don\'t get caught'
      })
      .then(response =>{
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('latitude')
        expect(error.msg).toBe('Is required')
      })
  })

  it("Validates firstName when creating user", ()=>{
    return request(app)
      .post("/users")
      .send({
        lastName: 'OhYeah',
        email: 'cornnutfan3200@kraft.com'
      })
      .then(response =>{
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('firstName')
        expect(error.msg).toBe('Is required')
      })
    })

  it("Validates lastName when creating activity", ()=>{
    return request(app)
      .post("/users")
      .send({
        firstName: 'Kathy',
        email: 'cornnutfan3200@kraft.com'
      })
      .then(response =>{
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('lastName')
        expect(error.msg).toBe('Is required')
        })
    })

  it("Validates email when creating activity", ()=>{
    return request(app)
      .post("/users")
      .send({
        lastName: 'OhYeah',
        firstName: 'Kathy'
      })
      .then(response =>{
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('email')
        expect(error.msg).toBe('Is required')
        })
    })

})
