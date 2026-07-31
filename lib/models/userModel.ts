import { db } from "@/lib/db";

export interface UserRecord {
  id?: number;
  full_name: string;
  email: string;
  password_hash: string;
  role?: "admin" | "reseller" | "user";
  created_at?: string;
}

export const UserModel = {
  // 1. Find user by email (SELECT * FROM users WHERE email = ?)
  async findByEmail(email: string): Promise<UserRecord | null> {
    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email.trim().toLowerCase()]
    );
    if (rows.length === 0) return null;
    return rows[0] as UserRecord;
  },

  // 2. Find user by ID (SELECT * FROM users WHERE id = ?)
  async findById(id: number): Promise<UserRecord | null> {
    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as UserRecord;
  },

  // 3. Create a new user (INSERT INTO users ...)
  async create(userData: {
    fullName: string;
    email: string;
    passwordHash: string;
    role?: "admin" | "reseller" | "user";
  }): Promise<number> {
    const [result]: any = await db.query(
      "INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [
        userData.fullName.trim(),
        userData.email.trim().toLowerCase(),
        userData.passwordHash,
        userData.role || "user",
      ]
    );
    return result.insertId;
  },

  // 4. Fetch all users list
  async findAll(): Promise<UserRecord[]> {
    const [rows]: any = await db.query(
      "SELECT id, full_name, email, role, created_at FROM users ORDER BY id DESC"
    );
    return rows as UserRecord[];
  },
};
