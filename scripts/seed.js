require('../config/env');
const db = require('../server/db');
const faker = require('faker');
const { User, Movie } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const user = {
    email: 'duncangichimu@gmail.com',
    password: 'password',
    firstName: 'Duncan',
    lastName: 'Gichimu'
  };

  try {
    await User.create(user);
  } catch (error) {
    console.error(error);
    throw error;
  }

  const capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1);

  for (let _ of Array(20).fill(null)) {
    try {
      await Movie.create({
        name: `${capitalize(faker.hacker.adjective())} ${capitalize(
          faker.hacker.noun()
        )}`,
        mediaUrl: 'media/movies/presentation.mp4'
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
