process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');

const User = require('../models/User');
const Task = require('../models/Task');
const Category = require('../models/Category');
const Comment = require('../models/Comment');

//
// ===== USERS =====
//
describe('GET Users', () => {

  test('GET /users', async () => {
    await User.create({
      username: 'jose',
      password: '12345678',
      googleId: '123'
    });

    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
  });

  test('GET /users/:id', async () => {
    const user = await User.create({
      username: 'jane',
      password: '12345678',
      googleId: '456'
    });

    const res = await request(app).get(`/users/${user._id}`);

    expect(res.statusCode).toBe(200);
  });

  test('GET /users invalid id', async () => {
    const res = await request(app).get('/users/invalid');

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  test('GET /users route exists', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).not.toBe(404);
  });

});

//
// ===== TASKS =====
//
describe('GET Tasks', () => {

  test('GET /tasks', async () => {
    const user = await User.create({
      username: 'Maryi',
      password: '12345678',
      googleId: '789'
    });

    await Task.create({
      title: 'Task',
      description: 'desc',
      userId: user._id
    });

    const res = await request(app).get('/tasks');

    expect(res.statusCode).toBe(200);
  });

  test('GET /tasks/:id', async () => {
    const user = await User.create({
      username: 'Sena',
      password: '12345678',
      googleId: '999'
    });

    const task = await Task.create({
      title: 'Task2',
      description: 'desc',
      userId: user._id
    });

    const res = await request(app).get(`/tasks/${task._id}`);

    expect(res.statusCode).toBe(200);
  });

  test('GET /tasks invalid id', async () => {
    const res = await request(app).get('/tasks/invalid');

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  test('GET /tasks route exists', async () => {
    const res = await request(app).get('/tasks');

    expect(res.statusCode).not.toBe(404);
  });

});

//
// ===== CATEGORIES =====
//
describe('GET Categories', () => {

  test('GET /categories', async () => {
    const user = await User.create({
      username: 'Mamina',
      password: '12345678',
      googleId: '222'
    });

    await Category.create({
      name: 'Work',
      user: user._id
    });

    const res = await request(app).get('/categories');

    expect(res.statusCode).toBe(200);
  });

  test('GET /categories/:id', async () => {
    const user = await User.create({
      username: 'Papa Saleh',
      password: '12345678',
      googleId: '333'
    });

    const category = await Category.create({
      name: 'Home',
      user: user._id
    });

    const res = await request(app).get(`/categories/${category._id}`);

    expect(res.statusCode).toBe(200);
  });

  test('GET /categories invalid id', async () => {
    const res = await request(app).get('/categories/invalid');

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  test('GET /categories route exists', async () => {
    const res = await request(app).get('/categories');

    expect(res.statusCode).not.toBe(404);
  });

});

//
// ===== COMMENTS =====
//
describe('GET Comments', () => {

  test('GET /comments', async () => {
    const user = await User.create({
      username: 'Ahimsa',
      password: '12345678',
      googleId: '444'
    });

    const task = await Task.create({
      title: 'Task3',
      description: 'desc',
      userId: user._id
    });

    await Comment.create({
      text: 'Nice',
      user: user._id,
      task: task._id
    });

    const res = await request(app).get('/comments');

    expect(res.statusCode).toBe(200);
  });

  test('GET /comments/:id', async () => {
    const user = await User.create({
      username: 'Ali Munyanya',
      password: '12345678',
      googleId: '555'
    });

    const task = await Task.create({
      title: 'Task4',
      description: 'desc',
      userId: user._id
    });

    const comment = await Comment.create({
      text: 'Great',
      user: user._id,
      task: task._id
    });

    const res = await request(app).get(`/comments/${comment._id}`);

    expect(res.statusCode).toBe(200);
  });

  test('GET /comments invalid id', async () => {
    const res = await request(app).get('/comments/invalid');

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  test('GET /comments route exists', async () => {
    const res = await request(app).get('/comments');

    expect(res.statusCode).not.toBe(404);
  });

});
