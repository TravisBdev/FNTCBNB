const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const sequelize = require('sequelize');

const router = express.Router();

//DELETE SPOT IMAGE
router.delete('/:imageId', requireAuth, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.imageId, {
    include: [{
      model: Spot,
      attributes: ['ownerId']
    }]
  });

  if (!image) {
    return res.status(404).json({
      message: "Image couldn't be found",
    });
  }

  if (image.Spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "You must own the spot",
    });
  }

  await image.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
  });
});


module.exports = router
