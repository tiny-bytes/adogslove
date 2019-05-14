const router = require("express").Router();
const Breed = require("../../models/breeds");

/**
 * URL: localhost:3001/api/breeds/
 * Response: Array of all Breed documents
 */
router.get('/', (req, res, next) => {
  Breed.find({}, (err, breeds) => {
    if (err) next(err);
    else res.json(breeds);
  });
});

/**
 * URL: localhost:3001/api/breeds/seed
 * Description: Used to give database some test data.
 */
router.post('/seed', async (req, res, next) => {
  for (let x = 0; x < 5; x++) {
    const newBreed = new Breed({
      Breed: `This is Breed ${Math.random().toFixed(5)}`,
      activityLevel: new Date(),
    });
    await newBreed.save();
  }
  res.send('Lets run the GET after this to see if the Breeds got seeded successfully  ');
});

/**
 * URL: localhost:3001/api/breeds/create
 * Response: Newly created Breed object if successful
 */
router.post('/create', (req, res, next) => {
  const { Breed } = req.body;
  const newBreed = new Breed({
    Breed,
    activityLevel: new Date(),
  });
  newBreed.save(err => {
    if (err) next(err);
    else res.json({ newBreed, msg: 'Breed successfully saved!' });
  });
});

/**
 * URL: localhost:3001/api/Breeds/
 * Description: Deletes all Breeds from DB
 */
router.delete('/', (req, res, next) => {
  Breed.deleteMany({}, err => {
    if (err) next(err);
    else res.send('Successfully deleted all Breeds');
  });
});

module.exports = router;