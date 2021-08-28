const router = require('express').Router();
const db = require('../db/models');

router.post('/', async (req, res) => {
  const { userId, courseId } = req.body;
  const newFavCourse = await db.Favorites.findOne({ raw: true, where: { UserId: userId, CourseId: courseId } });
  if (newFavCourse) res.status(403).send();
  else {
    await db.Favorites.create({ UserId: userId, CourseId: courseId });
    const userFavoritesFromDb = await db.Favorites.findAll({raw: true, nest: true, where: {UserId: userId}, include: {model: db.Course}});
    const userFavorites = userFavoritesFromDb.map(course => course.Course);
    console.log(userFavorites);
    res.json({userFavorites});
  }
});

module.exports = router;