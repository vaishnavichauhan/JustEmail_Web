import { db } from "./db";

export async function initializeTables() {
  // 1. Create Users Table
  await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'reseller', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

  // 2. Create Enquiries Table
  await db.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        enquiry_id VARCHAR(50) NOT NULL UNIQUE,
        organization_name VARCHAR(255) NOT NULL,
        domain VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        zip VARCHAR(20) NOT NULL,
        address TEXT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        alternative_email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        notes TEXT,
        provider VARCHAR(100),
        plan VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

  return { success: true, message: "Tables created in MySQL!" };
}
