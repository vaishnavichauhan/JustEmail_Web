import { db } from "@/lib/db";

export interface EnquiryRecord {
  id?: number;
  enquiry_id: string;
  organization_name: string;
  domain: string;
  city: string;
  state: string;
  zip: string;
  address?: string;
  first_name: string;
  last_name: string;
  email: string;
  alternative_email: string;
  phone_number: string;
  notes?: string;
  provider?: string;
  plan?: string;
  provider_id?: string;
  user_count?: number;
  status?: string;
  created_at?: string;
}

export const EnquiryModel = {
  // Ensure table exists
  async ensureTableExists(): Promise<void> {
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
        provider_id VARCHAR(100),
        user_count INT DEFAULT 1,
        status VARCHAR(20) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add provider_id column if table exists without it
    try {
      await db.query(`ALTER TABLE enquiries ADD COLUMN provider_id VARCHAR(100) NULL`);
    } catch (e) {}

    // Add status column if table exists without it
    try {
      await db.query(`ALTER TABLE enquiries ADD COLUMN status VARCHAR(20) DEFAULT 'Pending'`);
    } catch (e) {}

    // Add user_count column if table exists without it
    try {
      await db.query(`ALTER TABLE enquiries ADD COLUMN user_count INT DEFAULT 1`);
    } catch (e) {}
  },

  // Insert a new enquiry into MySQL database
  async create(data: {
    enquiryId: string;
    organizationName: string;
    domain: string;
    city: string;
    state: string;
    zip: string;
    address?: string;
    firstName: string;
    lastName: string;
    email: string;
    alternativeEmail: string;
    phoneNumber: string;
    notes?: string;
    provider?: string;
    plan?: string;
    providerId?: string;
    userCount?: number;
    status?: string;
  }): Promise<number> {
    await this.ensureTableExists();

    const [result]: any = await db.query(
      `INSERT INTO enquiries (
        enquiry_id, organization_name, domain, city, state, zip, address,
        first_name, last_name, email, alternative_email, phone_number,
        notes, provider, plan, provider_id, user_count, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.enquiryId,
        data.organizationName.trim(),
        data.domain.trim(),
        data.city.trim(),
        data.state.trim(),
        data.zip.trim(),
        data.address?.trim() || "",
        data.firstName.trim(),
        data.lastName.trim(),
        data.email.trim().toLowerCase(),
        data.alternativeEmail.trim().toLowerCase(),
        data.phoneNumber.trim(),
        data.notes?.trim() || "",
        data.provider || null,
        data.plan || null,
        data.providerId || null,
        data.userCount || 1,
        data.status || "Pending",
      ]
    );

    return result.insertId;
  },

  // Fetch all enquiries from MySQL database
  async findAll(): Promise<EnquiryRecord[]> {
    await this.ensureTableExists();
    const [rows]: any = await db.query(
      "SELECT * FROM enquiries ORDER BY id DESC"
    );
    return rows as EnquiryRecord[];
  },

  // Find enquiry by enquiry_id
  async findByEnquiryId(enquiryId: string): Promise<EnquiryRecord | null> {
    await this.ensureTableExists();
    const [rows]: any = await db.query(
      "SELECT * FROM enquiries WHERE enquiry_id = ? LIMIT 1",
      [enquiryId]
    );
    if (rows.length === 0) return null;
    return rows[0] as EnquiryRecord;
  },

  // Update enquiry status
  async updateStatus(id: number | string, status: string): Promise<boolean> {
    await this.ensureTableExists();

    const isNumeric = typeof id === "number" || (/^\d+$/).test(String(id));
    if (isNumeric) {
      await db.query("UPDATE enquiries SET status = ? WHERE id = ?", [status, Number(id)]);
    } else {
      await db.query("UPDATE enquiries SET status = ? WHERE enquiry_id = ?", [status, String(id)]);
    }

    return true;
  },
};
