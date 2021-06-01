const authMiddleWare = require("../auth/middleware");
const { Router } = require("express");
const Space = require("../models/").space;
const Story = require("../models").story;

const router = new Router();

router.post("/:id/stories", authMiddleWare, async (req, res, next) => {
  try {
    const { name, content, image } = req.body;
    const { id } = req.params;
    const result = await Space.findByPk(id);
    if (result.userId !== req.user.id) {
      res
        .status(400)
        .send({ message: "you are not authorize to post in this space" });
    } else {
      const newStory = await Story.create({
        name,
        content,
        image,
        spaceId: result.id,
      });
      res.status(200).send({ message: "new story created", newStory });
    }
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allStories = await Space.findAll();
    res.json(allStories);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
