const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { User } = require("./models/User");
const { Artiste } = require("./models/Artiste");
const { Album } = require("./models/Album");
const { Song } = require("./models/Song");
const { Playlist } = require("./models/Playlist");
const { Comment } = require("./models/Comment");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB().then(async () => {
      // Clear existing data
      await User.deleteMany({});
      await Artiste.deleteMany({});
      await Album.deleteMany({});
      await Song.deleteMany({});
      await Playlist.deleteMany({});
      await Comment.deleteMany({});

      console.log("Cleared existing data");

      // Create dummy users
      const hashedPassword = await bcrypt.hash("password123", 12);

      const users = await User.create([
        {
          username: "musiclover",
          email: "musiclover@example.com",
          password: hashedPassword,
          image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        },
        {
          username: "beatmaker",
          email: "beatmaker@example.com",
          password: hashedPassword,
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        },
        {
          username: "soundwave",
          email: "soundwave@example.com",
          password: hashedPassword,
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        },
      ]);

      console.log("Created users");

      // Create dummy artists
      const artistes = await Artiste.create([
        {
          name: "Neon Pulse",
          image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
          bio: "Electronic music producer pushing the boundaries of sound",
          genre: "Electronic",
          followers: 15000,
        },
        {
          name: "Cosmic Harmony",
          image:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
          bio: "Ambient and atmospheric music creator",
          genre: "Ambient",
          followers: 8500,
        },
        {
          name: "Vibrant Beats",
          image:
            "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop",
          bio: "Hip-hop and R&B artist with infectious rhythms",
          genre: "Hip-Hop",
          followers: 22000,
        },
        {
          name: "Digital Dreams",
          image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
          bio: "Future bass and synthwave producer",
          genre: "Future Bass",
          followers: 12000,
        },
        {
          name: "Echo Chamber",
          image:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
          bio: "Alternative rock band with unique sound",
          genre: "Alternative Rock",
          followers: 18000,
        },
      ]);

      console.log("Created artists");

      // Create dummy albums
      const albums = await Album.create([
        {
          title: "Neon Nights",
          artiste: artistes[0]._id,
          coverImage:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
          genre: "Electronic",
          releaseDate: new Date("2024-01-15"),
          description: "A journey through electronic soundscapes",
        },
        {
          title: "Cosmic Waves",
          artiste: artistes[1]._id,
          coverImage:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop",
          genre: "Ambient",
          releaseDate: new Date("2024-02-20"),
          description: "Atmospheric ambient music for relaxation",
        },
        {
          title: "Vibrant Vibes",
          artiste: artistes[2]._id,
          coverImage:
            "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop",
          genre: "Hip-Hop",
          releaseDate: new Date("2024-03-10"),
          description: "Infectious beats and smooth flows",
        },
        {
          title: "Digital Dimensions",
          artiste: artistes[3]._id,
          coverImage:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
          genre: "Future Bass",
          releaseDate: new Date("2024-01-30"),
          description: "Futuristic bass music with synthwave elements",
        },
        {
          title: "Echo Reflections",
          artiste: artistes[4]._id,
          coverImage:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop",
          genre: "Alternative Rock",
          releaseDate: new Date("2024-02-15"),
          description: "Alternative rock with unique sonic textures",
        },
      ]);

      console.log("Created albums");

      // Create dummy songs
      const songs = await Song.create([
        {
          title: "Neon Dreams",
          artiste: artistes[0]._id,
          album: albums[0]._id,
          coverImage:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
          audioURL:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          duration: 180,
          genre: "Electronic",
          lyrics: "In the neon lights, we find our dreams...",
          releaseDate: new Date("2024-01-15"),
        },
        {
          title: "Cosmic Flow",
          artiste: artistes[1]._id,
          album: albums[1]._id,
          coverImage:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
          audioURL:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          duration: 240,
          genre: "Ambient",
          lyrics: "Flowing through the cosmic waves...",
          releaseDate: new Date("2024-02-20"),
        },
        {
          title: "Vibrant Energy",
          artiste: artistes[2]._id,
          album: albums[2]._id,
          coverImage:
            "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop",
          audioURL:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          duration: 200,
          genre: "Hip-Hop",
          lyrics: "Feel the vibrant energy flowing...",
          releaseDate: new Date("2024-03-10"),
        },
        {
          title: "Digital Pulse",
          artiste: artistes[3]._id,
          album: albums[3]._id,
          coverImage:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
          audioURL:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          duration: 220,
          genre: "Future Bass",
          lyrics: "Digital pulse in the night...",
          releaseDate: new Date("2024-01-30"),
        },
        {
          title: "Echo Chamber",
          artiste: artistes[4]._id,
          album: albums[4]._id,
          coverImage:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
          audioURL:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          duration: 280,
          genre: "Alternative Rock",
          lyrics: "In the echo chamber of my mind...",
          releaseDate: new Date("2024-02-15"),
        },
        {
          title: "Neon Lights",
          artiste: artistes[0]._id,
          album: albums[0]._id,
          coverImage:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
          audioURL:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          duration: 195,
          genre: "Electronic",
          lyrics: "Neon lights guide the way...",
          releaseDate: new Date("2024-01-15"),
        },
        {
          title: "Cosmic Journey",
          artiste: artistes[1]._id,
          album: albums[1]._id,
          coverImage:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
          audioURL:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          duration: 320,
          genre: "Ambient",
          lyrics: "On this cosmic journey we travel...",
          releaseDate: new Date("2024-02-20"),
        },
        {
          title: "Vibrant Soul",
          artiste: artistes[2]._id,
          album: albums[2]._id,
          coverImage:
            "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop",
          audioURL:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          duration: 185,
          genre: "Hip-Hop",
          lyrics: "My vibrant soul speaks...",
          releaseDate: new Date("2024-03-10"),
        },
      ]);

      console.log("Created songs");

      // Create dummy playlists
      const playlists = await Playlist.create([
        {
          title: "Late Night Vibes",
          createdBy: users[0]._id,
          coverImage:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
          description: "Perfect for late night listening sessions",
          songs: [songs[0]._id, songs[1]._id, songs[4]._id],
          isPublic: true,
        },
        {
          title: "Workout Beats",
          createdBy: users[1]._id,
          coverImage:
            "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop",
          description: "High energy tracks to keep you motivated",
          songs: [songs[2]._id, songs[5]._id, songs[7]._id],
          isPublic: true,
        },
        {
          title: "Chill Ambient",
          createdBy: users[2]._id,
          coverImage:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
          description: "Relaxing ambient music for meditation",
          songs: [songs[1]._id, songs[6]._id],
          isPublic: true,
        },
      ]);

      console.log("Created playlists");

      // Create dummy comments
      const comments = await Comment.create([
        {
          user: users[0]._id,
          song: songs[0]._id,
          content: "Amazing track! Love the electronic vibes.",
          createdAt: new Date("2024-01-20"),
        },
        {
          user: users[1]._id,
          song: songs[2]._id,
          content: "This beat is fire! 🔥",
          createdAt: new Date("2024-03-15"),
        },
        {
          user: users[2]._id,
          song: songs[1]._id,
          content: "Perfect for studying and relaxing.",
          createdAt: new Date("2024-02-25"),
        },
      ]);

      console.log("Created comments");

      // Update user favorites
      await User.findByIdAndUpdate(users[0]._id, {
        favoriteSongs: [songs[0]._id, songs[1]._id],
        favoriteAlbums: [albums[0]._id, albums[1]._id],
        favoriteArtistes: [artistes[0]._id, artistes[1]._id],
        favoritePlaylists: [playlists[0]._id, playlists[2]._id],
      });

      await User.findByIdAndUpdate(users[1]._id, {
        favoriteSongs: [songs[2]._id, songs[5]._id],
        favoriteAlbums: [albums[2]._id, albums[3]._id],
        favoriteArtistes: [artistes[2]._id, artistes[3]._id],
        favoritePlaylists: [playlists[1]._id],
      });

      await User.findByIdAndUpdate(users[2]._id, {
        favoriteSongs: [songs[1]._id, songs[6]._id],
        favoriteAlbums: [albums[1]._id, albums[4]._id],
        favoriteArtistes: [artistes[1]._id, artistes[4]._id],
        favoritePlaylists: [playlists[2]._id],
      });
    });

    console.log("Updated user favorites");

    console.log("✅ Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`- ${users.length} users created`);
    console.log(`- ${artistes.length} artists created`);
    console.log(`- ${albums.length} albums created`);
    console.log(`- ${songs.length} songs created`);
    console.log(`- ${playlists.length} playlists created`);
    console.log(`- ${comments.length} comments created`);

    console.log("\n🔑 Test Accounts:");
    console.log("Email: musiclover@example.com, Password: password123");
    console.log("Email: beatmaker@example.com, Password: password123");
    console.log("Email: soundwave@example.com, Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
