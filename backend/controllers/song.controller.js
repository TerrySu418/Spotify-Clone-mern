import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    // -1 = Descending => newest -> oldest
    // 1 = Ascending => oldest -> newest
    const songs = await Song.find().sort({ createAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in song controller");
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // fetch 6 random song using mongoDB's aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    console.log("Error in song controller");
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // fetch 4 random song using mongoDB's aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    console.log("Error in song controller");
    next(error);
  }
};

export const getTrendASongs = async (req, res, next) => {
  try {
    // fetch 4 random song using mongoDB's aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    console.log("Error in song controller");
    next(error);
  }
};
