import {
  findAllTuits, findTuitById,
  createTuit, deleteTuit, 
} from "../services/tuits-service";
import {
  createUser,
  deleteUsersByUsername
} from "../services/users-service";

// sample user to insert
const ripley = {
  username: 'ellenripley',
  password: 'lv426',
  email: 'ellenripley@aliens.com'
};


describe('can create tuit with REST API', () => {
  // TODO: implement this
  
  
  const testTuit = { _id: '622d4b49d76d32582dcc096c',
                     tuit: 'tuit testing'};

beforeAll(async() => {
  // remove users to make sure we create it in the test
   await deleteTuit(testTuit._id);
   return await deleteUsersByUsername(ripley.username);
})
// clean up after test runs
afterAll(async() => {
  // remove any data we created
  await deleteTuit(testTuit._id);
   return await deleteUsersByUsername(ripley.username);
})

test('can create new tuit with REST API', async () => {
 
  const newUser = await createUser(ripley)
  const newTuit = await createTuit(newUser._id, testTuit);

  expect(newTuit.tuit).toEqual(testTuit.tuit);
  expect(newTuit.postedBy).toEqual(newUser._id);
});

});
describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
  // sample tuit to delete
  const tuit = {
    _id: '622d4b49d76d32582dcc096c',
    tuit: 'delete the tuit'
  };

  // setup test before running test
  beforeAll(async () => {
    // remove user and tuit to delete in test
    await deleteTuit(tuit._id);
    await deleteUsersByUsername( ripley.username);
});

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteTuit(tuit._id);
    return await deleteUsersByUsername(ripley.username);
  });

  test('can delete tuit with REST API', async () => {
    const user = await createUser(ripley);
    await createTuit(user._id, tuit);
    const status = await deleteTuit(tuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // sample tuit to retrieve by id
  const tuittest = {
    _id: '622d4b49d76d32582dcc096c',
    tuit: 'Hola Amigo'
  };

  // setup test before running test
  beforeAll(async () => {
    // remove user and tuit to delete in test
    await deleteTuit(tuittest._id);
    return await deleteUsersByUsername(ripley.username);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteTuit(tuittest._id);
    return await deleteUsersByUsername(ripley.username);
  });

  test('can retrieve a tuit by id with REST API', async () => {
    const user = await createUser(ripley);
    await createTuit(user._id, tuittest);

    const retrievedTuit = await findTuitById(tuittest._id);
    expect(retrievedTuit.tuit).toEqual(tuittest.tuit);
    expect(retrievedTuit.postedBy).toEqual(user);
  });
});


describe('can retrieve all tuits with REST API', () => {
  //Create sample tuits to retrieve them
  const tuits = [
    {
      _id: '622d4b49d76d32582dcc096c',
      tuit: 'Network error is irritating'
    },
    {
      _id: '622d4b49d76d42582dcc096c',
      tuit: 'I fixed the network error'
    },
    {
      _id: '622d4b49d76d52582dcc096c',
      tuit: 'Finally this works'
    }
  ];

  // setup test before running test
  beforeAll(async () => {
    // remove user and tuits to delete in test
    await Promise.all(tuits.map(async (tuit) => await deleteTuit(tuit._id)));
    return await deleteUsersByUsername(ripley.username);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await Promise.all(tuits.map(async (tuit) => await deleteTuit(tuit._id)));
    return await deleteUsersByUsername(ripley.username);
  });

  test('can retrieve all tuits with REST API', async () => {
    const user = await createUser(ripley);
    await Promise.all(tuits.map(async (tuit) => {
      return await createTuit(user._id, tuit);
    }));

    const retrievedTuits = await findAllTuits();
    expect(retrievedTuits.length).toBeGreaterThanOrEqual(tuits.length);
    
    const tuitsWeInserted = retrievedTuits.filter(
      tuit => tuit.postedBy === user);

    tuitsWeInserted.forEach(tuitInserted => {
      const tuit = tuits.find(tuit => tuit._id === tuitInserted._id);
      expect(tuitInserted.tuit).toEqual(tuit.tuit);
      expect(tuitInserted.postedBy).toEqual(user);
    });
  });
});