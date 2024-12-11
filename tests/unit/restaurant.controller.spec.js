const restaurantController = require('../../controllers/restaurant.controller');
const Model = require('../../models/restaurantModel');
const httpMocks = require('node-mocks-http');

const newRestaurant = require('../mockData/new-restaurant.json');
const foundRestaurant = require('../mockData/found-restaurant.json');
const allRestaurants = require('../mockData/all-restaurants.json');

Model.create = jest.fn();
Model.find = jest.fn();
Model.findOne = jest.fn();
Model.findByIdAndUpdate = jest.fn();
Model.findByIdAndDelete = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('Restaurant Controller - CreateRestaurant', () => {
    it('should have a CreateRestaurant function', () => {
        expect(typeof restaurantController.CreateRestaurant).toBe('function');
    });

    it('should call Model.create', async () => {
        req.body = newRestaurant;
        await restaurantController.CreateRestaurant(req, res, next);
        expect(Model.create).toHaveBeenCalledWith(newRestaurant);
    });

    it('should return 201 response code and created restaurant', async () => {
        Model.create.mockReturnValue(newRestaurant);
        await restaurantController.CreateRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error creating restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        Model.create.mockReturnValue(rejectedPromise);
        await restaurantController.CreateRestaurant(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual(errorMessage);
    });
});

describe('Restaurant Controller - getAllRestaurants', () => {
    it('should have a getAllRestaurants function', () => {
        expect(typeof restaurantController.getAllRestaurants).toBe('function');
    });

    it('should call Model.find({})', async () => {
        await restaurantController.getAllRestaurants(req, res, next);
        expect(Model.find).toHaveBeenCalledWith({});
    });

    it('should return 200 response code and all restaurants', async () => {
        Model.find.mockReturnValue(allRestaurants);
        await restaurantController.getAllRestaurants(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(allRestaurants);
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error finding restaurants' };
        const rejectedPromise = Promise.reject(errorMessage);
        Model.find.mockReturnValue(rejectedPromise);
        await restaurantController.getAllRestaurants(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual(errorMessage);
    });
});

describe('Restaurant Controller - getRestaurantById', () => {
    it('should have a getRestaurantById function', () => {
        expect(typeof restaurantController.getResturantById).toBe('function');
    });

    it('should call Model.findOne with route parameters', async () => {
        req.params.id = '5d5ecb5a6e598605f06cb945';
        await restaurantController.getResturantById(req, res, next);
        expect(Model.findOne).toHaveBeenCalledWith({ _id: '5d5ecb5a6e598605f06cb945' });
    });

    it('should return 200 response code and the restaurant', async () => {
        Model.findOne.mockReturnValue(foundRestaurant);
        await restaurantController.getResturantById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(foundRestaurant);
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error finding restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        Model.findOne.mockReturnValue(rejectedPromise);
        await restaurantController.getResturantById(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual(errorMessage);
    });
});

describe('Restaurant Controller - modifyResturantsById', () => {
    it('should have a modifyResturantsById function', () => {
        expect(typeof restaurantController.modifyResturantsById).toBe('function');
    });

    it('should call Model.findByIdAndUpdate with route parameters and body', async () => {
        req.params.id = '5d5ecb5a6e598605f06cb945';
        req.body = { name: 'Updated Name', borough: 'Updated Borough' };
        await restaurantController.modifyResturantsById(req, res, next);
        expect(Model.findByIdAndUpdate).toHaveBeenCalledWith('5d5ecb5a6e598605f06cb945', { name: 'Updated Name', borough: 'Updated Borough' }, { new: true });
    });

    it('should return 200 response code and updated restaurant', async () => {
        Model.findByIdAndUpdate.mockReturnValue(foundRestaurant);
        await restaurantController.modifyResturantsById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(foundRestaurant);
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error updating restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        Model.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await restaurantController.modifyResturantsById(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual(errorMessage);
    });
});

describe('Restaurant Controller - deleteResturantsById', () => {
    it('should have a deleteResturantsById function', () => {
        expect(typeof restaurantController.deleteResturantsById).toBe('function');
    });

    it('should call Model.findByIdAndDelete with route parameters', async () => {
        req.params.id = '5d5ecb5a6e598605f06cb945';
        await restaurantController.deleteResturantsById(req, res, next);
        expect(Model.findByIdAndDelete).toHaveBeenCalledWith('5d5ecb5a6e598605f06cb945');
    });

    it('should return 201 response code and deleted restaurant', async () => {
        Model.findByIdAndDelete.mockReturnValue(foundRestaurant);
        await restaurantController.deleteResturantsById(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toStrictEqual(foundRestaurant);
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error deleting restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        Model.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await restaurantController.deleteResturantsById(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual(errorMessage);
    });
});
