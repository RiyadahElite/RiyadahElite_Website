import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from '../config/database.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'riyadah_elite_super_secret_key_2025';

const authController = {
  // Register new user
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
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
        name: name.trim(),
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

  // Admin login
  async adminLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const admin = await db.getAdminByEmail(email.toLowerCase().trim());
      if (!admin) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { 
          userId: admin.id, 
          email: admin.email, 
          role: 'admin',
          name: admin.name 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password: _, ...adminWithoutPassword } = admin;

      res.json({
        message: 'Admin login successful',
        token,
        user: { ...adminWithoutPassword, role: 'admin' }
      });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ error: 'Admin login failed. Please try again.' });
    }
  },

  // Host login
  async hostLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const host = await db.getHostByEmail(email.toLowerCase().trim());
      if (!host) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isValidPassword = await bcrypt.compare(password, host.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { 
          userId: host.id, 
          email: host.email, 
          role: 'host',
          name: host.name 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password: _, ...hostWithoutPassword } = host;

      res.json({
        message: 'Host login successful',
        token,
        user: { ...hostWithoutPassword, role: 'host' }
      });
    } catch (error) {
      console.error('Host login error:', error);
      res.status(500).json({ error: 'Host login failed. Please try again.' });
    }
  },

  // Moderator login
  async moderatorLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const moderator = await db.getModeratorByEmail(email.toLowerCase().trim());
      if (!moderator) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isValidPassword = await bcrypt.compare(password, moderator.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { 
          userId: moderator.id, 
          email: moderator.email, 
          role: 'moderator',
          name: moderator.name 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password: _, ...moderatorWithoutPassword } = moderator;

      res.json({
        message: 'Moderator login successful',
        token,
        user: { ...moderatorWithoutPassword, role: 'moderator' }
      });
    } catch (error) {
      console.error('Moderator login error:', error);
      res.status(500).json({ error: 'Moderator login failed. Please try again.' });
    }
  },

  // Get user profile
  async getProfile(req, res) {
    try {
      const { userId, role } = req.user;
      let user = null;

      switch (role) {
        case 'user':
          user = await db.getUserById(userId);
          break;
        case 'admin':
          user = await db.getAdminById(userId);
          break;
        case 'host':
          user = await db.getHostById(userId);
          break;
        case 'moderator':
          user = await db.getModeratorById(userId);
          break;
      }

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ ...userWithoutPassword, role });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Failed to get profile' });
    }
  },

  // Update user profile
  async updateProfile(req, res) {
    try {
      const { name, avatar } = req.body;
      const { userId, role } = req.user;
      const updates = {};

      if (name) updates.name = name.trim();
      if (avatar) updates.avatar = avatar;

      let updatedUser = null;
      
      if (role === 'user') {
        updatedUser = await db.updateUser(userId, updates);
        // Log profile update activity
        await db.logActivity(userId, 'profile_update', 'Profile updated');
      } else {
        // For other roles, we'd need separate update methods
        return res.status(400).json({ error: 'Profile updates not supported for this role' });
      }
      
      // Return user data without password
      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ ...userWithoutPassword, role });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  },

  // Get user dashboard data
  async getDashboardData(req, res) {
    try {
      const { userId, role } = req.user;
      
      if (role !== 'user') {
        return res.status(400).json({ error: 'Dashboard data only available for users' });
      }
      
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