import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await Album.deleteMany({});
    await Song.deleteMany({});

    // First, create all songs
    const createdSongs = await Song.insertMany([
      {
        title: "抜け空",
        artist: "Ado",
        imageUrl: "/cover-images/ado1.jpeg",
        audioUrl: "/songs/Ado抜け空.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 280, // 0:39
      },
      {
        title: "桜日和とタイムマシン",
        artist: "Ado",
        imageUrl: "/cover-images/ado2.jpeg",
        audioUrl: "/songs/Ado桜日和とタイムマシン.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 280, // 0:36
      },
      {
        title: "踊",
        artist: "Ado",
        imageUrl: "/cover-images/Ado踊.jpeg",
        audioUrl: "/songs/ado3.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 280, // 0:36
      },
      {
        title: "うっせぇわ",
        artist: "Ado",
        imageUrl: "/cover-images/ado4.jpeg",
        audioUrl: "/songs/Adoうっせぇわ.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 280, // 0:39
      },
      {
        title: "A゙ラギラ",
        artist: "Ado",
        imageUrl: "/cover-images/ado5.jpeg",
        audioUrl: "/songs/Adoギラギラ.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 240, // 0:24
      },
      {
        title: "心海",
        artist: "Eve",
        imageUrl: "/cover-images/eve1.jpeg",
        audioUrl: "/songs/Eve心海.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 286, // 0:28
      },
      {
        title: "平行線",
        artist: "Eve",
        imageUrl: "/cover-images/eve2.jpeg",
        audioUrl: "/songs/Eve平行線.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 300, // 0:39
      },
      {
        title: "蒼のワルツ",
        artist: "Eve",
        imageUrl: "/cover-images/eve3.jpeg",
        audioUrl: "/songs/Eve蒼のワルツ.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 300, // 0:30
      },
      {
        title: "YOKU",
        artist: "Eve",
        imageUrl: "/cover-images/eve4.jpeg",
        audioUrl: "/songs/EveYOKU.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 300, // 0:46
      },
      {
        title: "海のまにまに",
        artist: "YOASOBI",
        imageUrl: "/cover-images/yoasobi1.jpeg",
        audioUrl: "/songs/YOASOBI海のまにまに.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 300, // 0:41
      },
      {
        title: "アイドル",
        artist: "YOASOBI",
        imageUrl: "/cover-images/yoasobi2.jpeg",
        audioUrl: "/songs/YOASOBIアイドル.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 270, // 0:27
      },
      {
        title: "たふん",
        artist: "YOASOBI",
        imageUrl: "/cover-images/yoasobi3.jpeg",
        audioUrl: "/songs/YOASOBIたふん.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 240, // 0:24
      },
      {
        title: "モノトーン",
        artist: "YOASOBI",
        imageUrl: "/cover-images/yoasobi4.jpeg",
        audioUrl: "/songs/YOASOBIモノトーン.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 300, // 0:39
      },
      {
        title: "Alive",
        artist: "wave",
        imageUrl: "/cover-images/wave1.jpeg",
        audioUrl: "/songs/wave-alive.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 270, // 0:17
      },
      {
        title: "Anna",
        artist: "wave",
        imageUrl: "/cover-images/wave2.jpeg",
        audioUrl: "/songs/wave-Anna.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 270, // 0:17
      },
      {
        title: "Lullaby",
        artist: "wave",
        imageUrl: "/cover-images/wave3.jpeg",
        audioUrl: "/songs/wave-Lullaby.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 270, // 0:17
      },
      {
        title: "Stay Still",
        artist: "wave",
        imageUrl: "/cover-images/wave4.jpeg",
        audioUrl: "/songs/wave-Stay-Still.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 270, // 0:17
      },
      {
        title: "Still Sleeping",
        artist: "wave",
        imageUrl: "/cover-images/wave5.jpeg",
        audioUrl: "/songs/wave-still-sleeping.mp3",
        plays: Math.floor(Math.random() * 5000),
        duration: 270, // 0:17
      },
    ]);

    // Create albums with references to song IDs
    const albums = [
      {
        title: "狂言",
        artist: "Ado",
        imageUrl: "/albums/ado.jpeg",
        releaseYear: 2024,
        songs: createdSongs.slice(0, 4).map((song) => song._id),
      },
      {
        title: "迴人",
        artist: "Eve",
        imageUrl: "/albums/eve.jpeg",
        releaseYear: 2024,
        songs: createdSongs.slice(5, 8).map((song) => song._id),
      },
      {
        title: "群青",
        artist: "YOASOBI",
        imageUrl: "/albums/yoasobi.jpeg",
        releaseYear: 2024,
        songs: createdSongs.slice(9, 12).map((song) => song._id),
      },
      {
        title: "Wave",
        artist: "Various Artists",
        imageUrl: "/albums/wave.jpeg",
        releaseYear: 2024,
        songs: createdSongs.slice(13, 17).map((song) => song._id),
      },
    ];

    // Insert all albums
    const createdAlbums = await Album.insertMany(albums);

    // Update songs with their album references
    for (let i = 0; i < createdAlbums.length; i++) {
      const album = createdAlbums[i];
      const albumSongs = albums[i].songs;

      await Song.updateMany(
        { _id: { $in: albumSongs } },
        { albumId: album._id }
      );
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
