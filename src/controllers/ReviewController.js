const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear una nueva reseña
const createReview = async (req, res) => {
  const { userId, breweryId, beerId, rating, comment } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        userId,
        breweryId,
        beerId,
        rating,
        comment,
      },
    });
    console.log(review);

    res.status(201).json({
        message: 'Review created successfully',
        review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to created Review' });
  }
};

// Obtener todas las reseñas
const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Obtener una reseña por ID
const getReviewById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const review = await prisma.review.findUnique({
      where: { id: id },
    });
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: 'Reseña no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reseña' });
  }
};

// Actualizar una reseña por ID
const updateReview = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { userId, breweryId, beerId, rating, comment } = req.body;
  console.log(req.body);

  try {
    const review = await prisma.review.update({
      where: { id: id },
      data: { userId, breweryId, beerId, rating, comment },
    });
    res.status(200).json({
        message: 'Review updated successfully',
        review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

// Eliminar una reseña por ID
const deleteReview = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await prisma.review.delete({
      where: { id: id },
    });
    res.status(204).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
