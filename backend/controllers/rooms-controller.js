const RoomDto = require("../dtos/room-dto");
const roomService = require("../services/room-service");

class RoomsController {
  async create(req, res) {
    const { topic, roomType } = req.body;
    if (!topic || !roomType) {
      return res.status(400).json({ message: "All fields are required !" });
    }

    //creating room
    const room = await roomService.create({
      topic,
      roomType,
      ownerId: req.user._id,
    });

    //returning room to client
    return res.json(new RoomDto(room));
  }
}

module.exports = new RoomsController();
