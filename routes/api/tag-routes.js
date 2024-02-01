const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          as: 'product_tags',
          attributes: ['product_name'],
        },
      ],
    });
    res.json(tags);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: 'product_tags',
          attributes: ['product_name'],
        },
      ],
    });

    if (tags) {
      res.json(tags);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error fetching product by id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedTag[0] === 1) {
      res.json({ message: 'Tag updated successfully' });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedTag === 1) {
      res.json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
