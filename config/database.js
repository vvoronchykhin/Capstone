const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const DB_PATH = process.env.DB_PATH || './database.db';

// Initialize database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    throw err;
  }
  console.log('Connected to SQLite database');
});

// Create users table and insert test data
const initializeDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('admin', 'staff')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating users table:', err.message);
          reject(err);
          return;
        }
        console.log('Users table created or already exists');
      });

      // Check if test users already exist
      db.get('SELECT COUNT(*) as count FROM users', async (err, row) => {
        if (err) {
          console.error('Error checking users:', err.message);
          reject(err);
          return;
        }

        // Only insert test users if no users exist
        if (row.count === 0) {
          try {
            // Hash passwords for test users
            const adminPassword = await bcrypt.hash('123', 10);
            const staffPassword = await bcrypt.hash('123', 10);

            // Insert test admin user
            db.run(
              'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
              ['admin', adminPassword, 'admin'],
              (err) => {
                if (err) {
                  console.error('Error creating admin user:', err.message);
                } else {
                  console.log('Test admin user created (username: admin, password: 123)');
                }
              }
            );

            // Insert test staff user
            db.run(
              'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
              ['staff', staffPassword, 'staff'],
              (err) => {
                if (err) {
                  console.error('Error creating staff user:', err.message);
                } else {
                  console.log('Test staff user created (username: staff, password: 123)');
                }
              }
            );

            resolve();
          } catch (error) {
            console.error('Error hashing passwords:', error.message);
            reject(error);
          }
        } else {
          console.log('Test users already exist');
          resolve();
        }
      });
    });
  });
};

// Get user by username
const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = {
  initializeDatabase,
  getUserByUsername
};

