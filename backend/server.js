const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');  // Add bcrypt for hashing passwords
const ServiceProvider = require('./models/ServiceProviderDetail');
const Registeruser = require('./models/Registeruser');
const Booking = require('./models/Booking');
const middleware = require('./middleware');

const Notification = require('./models/Notification');

const ServiceProviderDetail = require('./models/ServiceProviderDetail');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'jwtSecret'; // Use a constant for the secret

// Connect to MongoDB with error handling
mongoose.connect("mongodb://127.0.0.1:27017/task2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Update booking status (accept/reject) by service provider
app.put('/update-booking-status/:bookingId', middleware, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body; // expected: 'accepted' or 'rejected'

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).send('Invalid status value');
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).send('Booking not found');

    // Verify if the logged-in user is the service provider of this booking
    if (booking.providerId.toString() !== req.user.id) {
      return res.status(403).send('Unauthorized: Not the service provider');
    }

    booking.status = status;
    await booking.save();

    res.status(200).send(`Booking ${status} successfully`);
  } catch (err) {
    console.error('Error updating booking status:', err.message);
    res.status(500).send('Server error');
  }
});

// Get all users except admins
app.get('/all-users', middleware, async (req, res) => {
  try {
    const users = await Registeruser.find({ role: { $ne: 'Admin' } }).select('-password -confirmpassword');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Server error');
  }
});

// Get all booking requests for logged-in service provider
app.get('/provider-bookings', middleware, async (req, res) => {
  try {
    const providerId = req.user.id; // assumes provider logs in
    const bookings = await Booking.find({ providerId });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching booking requests');
  }
});
// Get booking requests for logged-in user
app.get('/my-requests', middleware, async (req, res) => {
  try {
    const userId = req.user.id;  // from middleware decoded JWT token
    const bookings = await Booking.find({ userId });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).send('Server Error');
  }
});


// Book a service
app.post('/book-service/:providerId', middleware, async (req, res) => {
  try {
    const { dateOfJoining, address, contact } = req.body;
    const providerId = req.params.providerId;

    // Optional: check if service provider exists
    const providerExists = await ServiceProvider.findOne({ userId: providerId });
    if (!providerExists) return res.status(404).send('Service provider not found');

    const newBooking = new Booking({
      userId: req.user.id,
      providerId,
      dateOfJoining,
      address,
      contact,
    });
    await newBooking.save();
    res.status(200).send('Service booked successfully');
  } catch (err) {
    console.error('Booking error:', err.message);
    res.status(500).send('Booking failed');
  }
});

// Delete user by ID (not admins)
app.delete('/delete-user/:id', middleware, async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const userToDelete = await Registeruser.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userToDelete.role === 'Admin') {
      return res.status(403).json({ message: 'Cannot delete Admin users' });
    }

    await Registeruser.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get logged-in user's profile
app.get('/myprofile', middleware, async (req, res) => {
  try {
    const user = await Registeruser.findById(req.user.id).select('-password -confirmpassword');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err.message);
    res.status(500).send('Server Error');
  }
});

// Register (with password hashing)
app.post('/register', async (req, res) => {
  const { username, email, password, confirmpassword, role } = req.body;

  try {
    if (password !== confirmpassword) return res.status(400).send('Passwords do not match');

    const existingUser = await Registeruser.findOne({ email });
    if (existingUser) return res.status(400).send('User Already Exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Registeruser({
      username,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword, // store hashed also here (or remove confirmpassword field in schema)
      role,
    });

    await newUser.save();
    res.status(200).send('Registered Successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Login (with bcrypt password check)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Registeruser.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Save service provider details


app.get('/service-provider-profile', middleware, async (req, res) => {
  try {
    const provider = await ServiceProvider.findOne({ userId: req.user.id });
    if (!provider) {
      return res.status(404).json({ message: 'No provider data found' });
    }
    res.json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create notification (Admin only)
// Save service provider details
app.post("/service-provider-details", middleware, async (req, res) => {
  try {
    const { fullName, mobileNumber, address, gender, work } = req.body;
    console.log("REQ.BODY:", req.body); // 👈 Debug
    console.log("USER:", req.user); // 👈 Debug

    const userId = req.user?.id;

    if (!fullName || !mobileNumber || !address || !gender || !work) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newDetail = new ServiceProviderDetail({
      userId,
      fullName,
      mobileNumber: String(mobileNumber),
      address,
      gender,
      work,
    });

    await newDetail.save();

    res.status(201).json({ msg: "Service Provider Details Saved Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


// Get all service providers
app.get('/all-service-providers', middleware, async (req, res) => {
  try {
    const providers = await ServiceProvider.find().populate('userId', 'email username');
    res.json(providers);
  } catch (err) {
    console.error('Error fetching service providers:', err);
    res.status(500).send('Error fetching service providers');
  }
});
const Review = require('./models/Review');

// Submit a review
app.post('/submit-review', middleware, async (req, res) => {
  const { bookingId, rating, comment } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).send('Booking not found');

    if (booking.userId.toString() !== req.user.id)
      return res.status(403).send('Unauthorized: Not your booking');

    // Ensure one review per booking
    const existing = await Review.findOne({ bookingId });
    if (existing) return res.status(400).send('Review already submitted');

    const review = new Review({
      userId: req.user.id,
      providerId: booking.providerId,
      bookingId,
      rating,
      comment
    });

    await review.save();
    res.status(200).send('Review submitted successfully');
  } catch (err) {
    console.error('Review submission error:', err);
    res.status(500).send('Server error');
  }
});
// PATCH booking status (user marks as completed)
app.patch('/complete-booking/:bookingId', middleware, async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).send('Booking not found');

    // Verify that the logged-in user is the one who booked it
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).send('Unauthorized: Not your booking');
    }

    // Only allow completion if it was accepted before
    if (booking.status !== 'accepted') {
      return res.status(400).send('Cannot complete a booking that is not accepted');
    }

    booking.status = 'completed';
    await booking.save();

    res.send('Booking marked as completed');
  } catch (err) {
    console.error('Error marking booking as completed:', err.message);
    res.status(500).send('Server error');
  }
});

// Admin sends notification to SP and/or Users
// POST /send-notification - Admin sends notifications to ServiceProvider or User


// Admin sends notification to SP and/or Users
app.post('/send-notification', middleware, async (req, res) => {
  try {
    // Ensure only admin can send notifications
    const user = await Registeruser.findById(req.user.id);
    if (user.role !== 'Admin') {
      return res.status(403).send('Access denied');
    }

    const { message } = req.body;
    if (!message) return res.status(400).send('Message is required');

    const notification = new Notification({ message });
    await notification.save();
    res.status(201).send('Notification sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error while sending notification');
  }
});

// All users can fetch notifications
app.get('/notifications', middleware, async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error while fetching notifications');
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
