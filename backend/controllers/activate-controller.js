const Jimp = require("jimp");
const path = require("path");
const userService = require("../services/user-service");
const UserDto = require("../dtos/user-dto");

class ActivateController {
  //activate function
  async activate(req, res) {
    // Activation logic
    const { name, avatar } = req.body;
    if (!name || !avatar) {
      res.status(400).json({ message: "All fields are required!" });
    }

    //Image BASE64 string
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimResp = await Jimp.read(buffer);
      jimResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (err) {
      res.status(500).json({ message: "Could not process the image" });
    }

    const userId = req.user._id;
    //update user from false to true
    try {
      const user = await userService.findUser({ _id: userId });

      // if user is not in the database
      if (!user) {
        res.status(404).json({ message: "user not found!" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      res.json({ user: new UserDto(user), auth: true });
    } catch (err) {
      res.status(500).json({ message: "Database error" });
    }
  }
}

module.exports = new ActivateController();