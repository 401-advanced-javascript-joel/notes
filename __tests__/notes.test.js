'use strict';

const mockDB = require('../data/mock-db');
const Notes = require('../lib/notes');

const notes = new Notes();
const errorSpy = jest.spyOn(console, 'error');

beforeAll(async () => await mockDB.connectMock());

afterAll(async () => await mockDB.closeMock());

describe('Testing notes module handles add action correctly.', () => {
  test('invalid command input is rejected', async () => {
    errorSpy.mockClear();
    await notes.execute({action: 'put', payload: true});
    expect(errorSpy).toHaveBeenCalled();
  });

  test('empty input cast to "true" is rejected', async () => {
    errorSpy.mockClear();
    await notes.execute({action: 'add', payload: true});
    expect(errorSpy).toHaveBeenCalled();
  });

  test('valid note is added without category', async () => {
    const result = await notes.execute({action: 'add', payload: {note: 'A new test note'}});
    expect(result.note).toBe('A new test note');
  });

  test('valid note is added with a category', async () => {
    const result = await notes.execute({action: 'add', payload: {note: 'A different new test note', categories: 'test category'}});
    expect(result.note).toBe('A different new test note');
  });

  test('valid note is added with multiple categories', async () => {
    const result = await notes.execute({action: 'add', payload: {note: 'Another new test note', categories: ['test category', 'other category']}});
    expect(result.note).toBe('Another new test note');
  });
});

describe('Testing notes module handles list action correctly.', () => {
  test('reads and prints notes when no category specified', async () => {
    const result = await notes.execute({action: 'list', payload: {categories: true}});
    expect(result.length).toBe(3);
  });

  test('reads and prints notes when existing category is specified', async () => {
    const result = await notes.execute({action: 'list', payload: {category: 'test category'}});
    expect(result.length).toBe(2);
  });

  test('doesnt read or print notes when nonexisting category is specified', async () => {
    const result = await notes.execute({action: 'list', payload: {category: 'non-existing'}});
    expect(result.length).toBe(0);
  });
});

describe('Testing notes module handles update action correctly.', () => {
  test('rejects update when invalid note is given', async () => {
    const existing = await notes.execute({action: 'add', payload: {note: 'Update Me'}});
    const updated = await notes.execute({action: 'update', payload: {id: existing.id, note: true}});
    expect(updated).toBe(undefined);
  });

  test('updates when existing id is given', async () => {
    const existing = await notes.execute({action: 'add', payload: {note: 'Update Me'}});
    const updated = await notes.execute({action: 'update', payload: {id: existing.id, note: 'You\'re Updated'}});
    expect(updated.note).toBe('You\'re Updated');
  });

  test('doesnt update when non-existing id is given', async () => {
    const fake_id = '5e7a7e61c27fb6279c0feb0b';
    const updated = await notes.execute({action: 'update', payload: {id: fake_id, note: 'You\'re Updated'}});
    expect(updated).toBeFalsy();
  });
});

describe('Testing notes module handles delete action correctly.', () => {
  test('should successfully delete a note given an existing id', async () => {
    const existing = await notes.execute({action: 'add', payload: {note: 'Delete Me'}});
    const deleted = await notes.execute({action: 'delete', payload: {id: existing.id}});
    expect(deleted.id).toBe(existing.id);
  });
  
  test('should fail to delete a note given a non-existing id', async () => {
    const fake_id = '5e7a7e61c27fb6279c0feb0b';
    const deleted = await notes.execute({action: 'delete', payload: {id: fake_id}});
    expect(deleted).toBeFalsy();
  });
});