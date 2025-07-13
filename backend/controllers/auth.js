import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'riyadah_elite_fallback_secret';

const authController = {
  // Register new user
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      // Check if user already exists
      const existingUser = await db.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const userData = {
        name: username.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: 'user',
        points: 100 // Welcome bonus
      };

      const user = await db.createUser(userData);

      // Log registration activity
      await db.logActivity(user.id, 'registration', 'User registered', 100);

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role,
          name: user.name 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
  },

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Find user
      const user = await db.getUserByEmail(email.toLowerCase().trim());
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Log login activity
      await db.logActivity(user.id, 'login', 'User logged in');

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role,
          name: user.name 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        message: 'Login successful',
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed. Please try again.' });
    }
  },

  // Get user profile
  async getProfile(req, res) {
    try {
      const user = await db.getUserById(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Failed to get profile' });
    }
  },

  // Update user profile
  async updateProfile(req, res) {
    try {
      const { name, avatar } = req.body;
      const updates = {};

      if (name) updates.name = name.trim();
      if (avatar) updates.avatar = avatar;

      const updatedUser = await db.updateUser(req.user.userId, updates);
      
      // Log profile update activity
      await db.logActivity(req.user.userId, 'profile_update', 'Profile updated');
      
      // Return user data without password
      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  },

  // Get user dashboard data
  async getDashboardData(req, res) {
    try {
      const userId = req.user.userId;
      
      const [user, tournaments, rewards, activity] = await Promise.all([
        db.getUserById(userId),
        db.getUserTournaments(userId),
        db.getUserRewards(userId),
        db.getUserActivity(userId, 5)
      ]);

      const { password: _, ...userWithoutPassword } = user;

      res.json({
        user: userWithoutPassword,
        tournaments,
        rewards,
        activity,
        stats: {
          totalTournaments: tournaments.length,
          totalRewards: rewards.length,
          totalPoints: user.points
        }
      });
    } catch (error) {
      console.error('Dashboard data error:', error);
      res.status(500).json({ error: 'Failed to get dashboard data' });
    }
  }
};

export default authController;