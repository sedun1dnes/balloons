const Balloon = require('../models/balloon');

const getAllBalloons = async (req, res) => {
  try {
    const balloons = await Balloon.findAll();
    res.status(200).json(balloons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении данных' });
  }
};


const getBalloonById = async (req, res) => {
  try {
    const balloon = await Balloon.findByPk(req.params.id);
    if (!balloon) {
      return res.status(404).json({ message: 'Шарика не существует' });
    }
    res.status(200).json(balloon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении данных' });
  }
};


const createBalloon = async (req, res) => {
  try {
    const { name, description, color, size } = req.body;
    const newBalloon = await Balloon.create({ name, description, color, size });
    res.status(201).json(newBalloon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при создании шарика' });
  }
};


const updateBalloon = async (req, res) => {
  try {
    const balloon = await Balloon.findByPk(req.params.id);
    if (!balloon) {
      return res.status(404).json({ message: 'Шарика не существует' });
    }
    const { name, color, size } = req.body;
    balloon.name = name || balloon.name;
    balloon.color = color || balloon.color;
    balloon.size = size || balloon.size;
    await balloon.save();
    res.status(200).json(balloon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при обновлении шарика' });
  }
};


const deleteBalloon = async (req, res) => {
  try {
    const balloon = await Balloon.findByPk(req.params.id);
    if (!balloon) {
      return res.status(404).json({ message: 'Шарика не существует' });
    }
    await balloon.destroy();
    res.status(200).json({ message: 'Шарик удален' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при удалении шарика' });
  }
};

module.exports = {
  getAllBalloons,
  getBalloonById,
  createBalloon,
  updateBalloon,
  deleteBalloon,
};
