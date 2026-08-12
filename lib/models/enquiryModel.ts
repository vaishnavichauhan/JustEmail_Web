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
  plan_type?: string;
  provider_id?: string;
  user_count?: number;
  status?: string;
  created_at?: string;
}

let inMemoryEnquiries: EnquiryRecord[] = [];

export const EnquiryModel = {
  // Ensure table exists
  async ensureTableExists(): Promise<void> {
    try {
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
          plan_type VARCHAR(50) DEFAULT 'New',
          provider_id VARCHAR(100),
          user_count INT DEFAULT 1,
          status VARCHAR(20) DEFAULT 'Pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      try {
        await db.query(`ALTER TABLE enquiries ADD COLUMN provider_id VARCHAR(100) NULL`);
      } catch (e) {}

      try {
        await db.query(`ALTER TABLE enquiries ADD COLUMN plan_type VARCHAR(50) DEFAULT 'New'`);
      } catch (e) {}

      try {
        await db.query(`ALTER TABLE enquiries ADD COLUMN status VARCHAR(20) DEFAULT 'Pending'`);
      } catch (e) {}

      try {
        await db.query(`ALTER TABLE enquiries ADD COLUMN user_count INT DEFAULT 1`);
      } catch (e) {}
    } catch (e) {
      console.warn("MySQL offline in EnquiryModel.ensureTableExists, using in-memory fallback.");
    }
  },

  // Insert a new enquiry into MySQL database or fallback
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
    planType?: string;
    providerId?: string;
    userCount?: number;
    status?: string;
  }): Promise<number> {
    const newEnquiry: EnquiryRecord = {
      id: Date.now(),
      enquiry_id: data.enquiryId,
      organization_name: (data.organizationName || "").trim(),
      domain: (data.domain || "").trim(),
      city: (data.city || "").trim(),
      state: (data.state || "").trim(),
      zip: (data.zip || "").trim(),
      address: (data.address || "").trim(),
      first_name: (data.firstName || "").trim(),
      last_name: (data.lastName || "").trim(),
      email: (data.email || "").trim().toLowerCase(),
      alternative_email: (data.alternativeEmail || "").trim().toLowerCase(),
      phone_number: (data.phoneNumber || "").trim(),
      notes: (data.notes || "").trim(),
      provider: data.provider || undefined,
      plan: data.plan || undefined,
      plan_type: data.planType || "New",
      provider_id: data.providerId || undefined,
      user_count: Number(data.userCount) || 1,
      status: data.status || "Pending",
      created_at: new Date().toISOString()
    };

    inMemoryEnquiries.unshift(newEnquiry);

    try {
      await this.ensureTableExists();

      const [result]: any = await db.query(
        `INSERT INTO enquiries (
          enquiry_id, organization_name, domain, city, state, zip, address,
          first_name, last_name, email, alternative_email, phone_number,
          notes, provider, plan, plan_type, provider_id, user_count, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newEnquiry.enquiry_id,
          newEnquiry.organization_name,
          newEnquiry.domain,
          newEnquiry.city,
          newEnquiry.state,
          newEnquiry.zip,
          newEnquiry.address,
          newEnquiry.first_name,
          newEnquiry.last_name,
          newEnquiry.email,
          newEnquiry.alternative_email,
          newEnquiry.phone_number,
          newEnquiry.notes,
          newEnquiry.provider || null,
          newEnquiry.plan || null,
          newEnquiry.plan_type || "New",
          newEnquiry.provider_id || null,
          newEnquiry.user_count,
          newEnquiry.status,
        ]
      );

      return result.insertId;
    } catch (dbError) {
      console.warn("MySQL enquiry write skipped, stored in memory:", dbError);
      return newEnquiry.id!;
    }
  },

  // Fetch all enquiries
  async findAll(): Promise<EnquiryRecord[]> {
    try {
      await this.ensureTableExists();
      const [rows]: any = await db.query(
        "SELECT * FROM enquiries ORDER BY id DESC"
      );
      if (Array.isArray(rows) && rows.length > 0) {
        return rows as EnquiryRecord[];
      }
    } catch (e) {
      console.warn("EnquiryModel.findAll MySQL fallback to memory store:", e);
    }
    return inMemoryEnquiries;
  },

  // Find enquiry by enquiry_id
  async findByEnquiryId(enquiryId: string): Promise<EnquiryRecord | null> {
    try {
      await this.ensureTableExists();
      const [rows]: any = await db.query(
        "SELECT * FROM enquiries WHERE enquiry_id = ? LIMIT 1",
        [enquiryId]
      );
      if (rows && rows.length > 0) return rows[0] as EnquiryRecord;
    } catch (e) {
      console.warn("EnquiryModel.findByEnquiryId MySQL fallback:", e);
    }
    return inMemoryEnquiries.find((item) => item.enquiry_id === enquiryId) || null;
  },

  // Update enquiry status
  async updateStatus(id: number | string, status: string): Promise<boolean> {
    const isNumeric = typeof id === "number" || (/^\d+$/).test(String(id));
    const targetStr = String(id);
    const itemIndex = inMemoryEnquiries.findIndex((e) =>
      isNumeric ? String(e.id) === targetStr : e.enquiry_id === targetStr
    );
    if (itemIndex >= 0) {
      inMemoryEnquiries[itemIndex].status = status;
    }

    try {
      await this.ensureTableExists();

      if (isNumeric) {
        await db.query("UPDATE enquiries SET status = ? WHERE id = ?", [status, Number(id)]);
      } else {
        await db.query("UPDATE enquiries SET status = ? WHERE enquiry_id = ?", [status, String(id)]);
      }
    } catch (e) {
      console.warn("EnquiryModel.updateStatus MySQL fallback:", e);
    }

    return true;
  },

  // Delete enquiry record by ID or enquiry_id
  async delete(id: number | string): Promise<boolean> {
    const isNumeric = typeof id === "number" || (/^\d+$/).test(String(id));
    const targetStr = String(id);
    inMemoryEnquiries = inMemoryEnquiries.filter((e) =>
      isNumeric ? String(e.id) !== targetStr : e.enquiry_id !== targetStr
    );

    try {
      await this.ensureTableExists();

      if (isNumeric) {
        await db.query("DELETE FROM enquiries WHERE id = ?", [Number(id)]);
      } else {
        await db.query("DELETE FROM enquiries WHERE enquiry_id = ?", [String(id)]);
      }
    } catch (e) {
      console.warn("EnquiryModel.delete MySQL fallback:", e);
    }

    return true;
  },
};
