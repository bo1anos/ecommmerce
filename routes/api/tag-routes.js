const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll(
    {
      include:{
        model: Product,
        attributes:['product_name']
      }
    }
  )
    .then(tagData => res.json(tagData))
    .catch(err=>{
      console.log(err);
      res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
      id:req.params.id
    },
    include:{
      model:Product,
    }
  })
  .then(tagData => res.json(tagData))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name:req.body.category_name
  })
  .then(tagData => res.json(tagData))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name:req.body.tag_name
    },
    {
      where:{
        id: req.params.id
      }
    })
    .then(tagData=>{
      if(!tagData){
        res.status(404).json({message : 'no tag with that id'});
        return;
      }
      res.json(tagData);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  
  try {
    const deleted = await Tag.destroy({
      where: {id: req.params.id}
    });
    res.json(deleted)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
