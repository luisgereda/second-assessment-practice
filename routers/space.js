const authMiddleWare = require("../auth/middleware");
const { Router } = require("express");
const Space = require("../models/").space;
const Story = require("../models").story;

const router = new Router();

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, backgroundColor, color } = req.body;
    const space = await Space.findByPk(id);

    await space.update({ backgroundColor, color, description, title });
    return res.status(200).send({ space });
  } catch (e) {
    console.log(e.message);
  }
});

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
    const allSpaces = await Space.findAll();
    res.json(allSpaces);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const space = await Space.findByPk(parseInt(id), {
      include: [Story],
      order: [[Story, "createdAt", "DESC"]],
    });
    res.status(200).send({ message: "ok", space });
  } catch (e) {
    console.log(e.message);
    next();
  }
});

module.exports = router;
