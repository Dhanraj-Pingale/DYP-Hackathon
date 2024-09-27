import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; // Correct import
import bcrypt from "bcryptjs";
import session from "express-session";

dotenv.config();

const app = express();
app.use(express.json()); // To handle JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

const uri = process.env.MONGO_URI; // Use environment variable for MongoDB URI

// Setup express-session with 1 day expiry (24 hours)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // Use an environment variable for session secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session expires in 1 day
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection and Passport configuration
async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");

    const usersCollection = client.db("Test").collection("users");
    const adminCollection = client.db("CollegeAdmin").collection("admins");
    const teacherCollection = client.db("teacher").collection("teachers");
    const clubCollection = client.db("club").collection("clubs");
    const timetableCollection = client.db("TimetableDB").collection("timetable"); // Collection for timetable

    // Passport Local Strategy for User
    passport.use(
      "user-local",
      new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
          const user = await usersCollection.findOne({ email });
          if (!user) {
            console.log("User not found");
            return done(null, false, { message: "Incorrect email." });
          }

          // Compare the password using bcrypt
          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            console.log("Password does not match");
            return done(null, false, { message: "Incorrect password." });
          }

          console.log("User login successful");
          return done(null, user);
        } catch (error) {
          console.error("Error during user login:", error);
          return done(error);
        }
      })
    );

    // Passport Local Strategy for Admin
    passport.use(
      "admin-local",
      new LocalStrategy({ usernameField: "adminID" }, async (adminID, password, done) => {
        try {
          const admin = await adminCollection.findOne({ adminID });
          if (!admin) {
            console.log("Admin not found");
            return done(null, false, { message: "Incorrect admin ID." });
          }

          // Compare the password using bcrypt
          const isValidAdminPassword = await bcrypt.compare(password, admin.password);

          if (!isValidAdminPassword) {
            console.log("Admin password does not match");
            return done(null, false, { message: "Incorrect password." });
          }

          console.log("Admin login successful");
          return done(null, admin);
        } catch (error) {
          console.error("Error during admin login:", error);
          return done(error);
        }
      })
    );

    // Passport Local Strategy for Teacher
    passport.use(
      "teacher-local",
      new LocalStrategy({ usernameField: "teacherID" }, async (teacherID, password, done) => {
        try {
          const teacher = await teacherCollection.findOne({ teacherID });
          if (!teacher) {
            console.log("Teacher not found");
            return done(null, false, { message: "Incorrect teacher ID." });
          }

          // Compare the password using bcrypt
          const isValidTeacherPassword = await bcrypt.compare(password, teacher.password);

          if (!isValidTeacherPassword) {
            console.log("Teacher password does not match");
            return done(null, false, { message: "Incorrect password." });
          }

          console.log("Teacher login successful");
          return done(null, teacher);
        } catch (error) {
          console.error("Error during teacher login:", error);
          return done(error);
        }
      })
    );

    // Passport Local Strategy for Club
    passport.use(
      "club-local",
      new LocalStrategy({ usernameField: "clubID" }, async (clubID, password, done) => {
        try {
          const club = await clubCollection.findOne({ clubID });
          if (!club) {
            console.log("Club not found");
            return done(null, false, { message: "Incorrect club ID." });
          }

          // Compare the password using bcrypt
          const isValidClubPassword = await bcrypt.compare(password, club.password);

          if (!isValidClubPassword) {
            console.log("Club password does not match");
            return done(null, false, { message: "Incorrect password." });
          }

          console.log("Club login successful");
          return done(null, club);
        } catch (error) {
          console.error("Error during club login:", error);
          return done(error);
        }
      })
    );

    // Serialize and deserialize user for session support
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });
        if (user) return done(null, user);

        const admin = await adminCollection.findOne({ _id: new ObjectId(id) });
        if (admin) return done(null, admin);

        const teacher = await teacherCollection.findOne({ _id: new ObjectId(id) });
        if (teacher) return done(null, teacher);

        const club = await clubCollection.findOne({ _id: new ObjectId(id) });
        done(null, club);
      } catch (error) {
        done(error);
      }
    });

    // Register user route
    app.post("/registerdb", async (req, res) => {
      const { name, email, password } = req.body;

      // Ensure all fields are provided
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      try {
        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the "users" collection
        const result = await usersCollection.insertOne({
          name,
          email,
          password: hashedPassword,
        });
        res.status(201).json({
          message: "User registered successfully",
          userId: result.insertedId,
        });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // User login route
    app.post("/logindb", (req, res, next) => {
      passport.authenticate("user-local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ error: info.message });

        req.login(user, (loginErr) => {
          if (loginErr) return next(loginErr);
          res.json({
            message: "Logged in successfully",
            user: {
              email: req.user.email,
              name: req.user.name,
            },
          });
        });
      })(req, res, next);
    });

    // Admin login route
    app.post("/adminlogindb", (req, res, next) => {
      passport.authenticate("admin-local", (err, admin, info) => {
        if (err) return next(err);
        if (!admin) return res.status(400).json({ error: info.message });

        req.login(admin, (loginErr) => {
          if (loginErr) return next(loginErr);
          res.json({
            message: "Admin logged in successfully",
            admin: {
              adminID: req.user.adminID,
            },
          });
        });
      })(req, res, next);
    });

    // Teacher login route
    app.post("/teacherlogindb", (req, res, next) => {
      passport.authenticate("teacher-local", (err, teacher, info) => {
        if (err) return next(err);
        if (!teacher) return res.status(400).json({ error: info.message });

        req.login(teacher, (loginErr) => {
          if (loginErr) return next(loginErr);
          res.json({
            message: "Teacher logged in successfully",
            teacher: {
              teacherID: req.user.teacherID,
            },
          });
        });
      })(req, res, next);
    });

    // Logout route
    app.post("/logout", (req, res) => {
      req.logout((err) => {
        if (err) {
          return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ message: "Logged out successfully" });
      });
    });

    // POST route to add a new timetable entry
    app.post("/add-timetable", async (req, res) => {
      const {
        class: className,
        division,
        batch,
        subject,
        teacherId,
        teacherName,
        roomNumber,
        day,
        startTime,
        endTime,
        classCancelledByTeacher,
        adminId,
      } = req.body;

      // Validate the input
      if (!className || !division || !batch || !subject || !teacherId || !teacherName || !roomNumber || !day || !startTime || !endTime || adminId === undefined) {
        return res.status(400).json({ error: "All fields are required" });
      }

      try {
        // Create a new timetable entry object
        const newTimetableEntry = {
          class: className,
          division,
          batch,
          subject,
          teacherId,
          teacherName,
          roomNumber,
          day,
          startTime,
          endTime,
          classCancelledByTeacher: classCancelledByTeacher || false, // Default to false if not provided
          adminId,
          createdAt: new Date().toISOString(), // Use current timestamp
          updatedAt: new Date().toISOString(),
        };

        // Insert the new timetable entry into the collection
        const result = await timetableCollection.insertOne(newTimetableEntry);

        res.status(201).json({
          message: "Timetable entry added successfully",
          timetableId: result.insertedId,
        });
      } catch (error) {
        console.error("Error adding timetable entry:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
}

// Start the server and connect to MongoDB
app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await main(); // Call the main function to connect to MongoDB
});
