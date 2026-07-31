import { db } from "@/lib/db";

export interface ProviderItem {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  price: string;
  period: string;
  billingNote: string;
  storage: string;
  uptime: string;
  recommendedUsers: string;
  logoType: string;
  features: string[];
  enabled?: boolean;
  created_at?: string;
}

export const defaultProviders: ProviderItem[] = [
  {
    id: "google",
    name: "Google Workspace",
    subtitle: "Business Starter",
    badge: "Best for Google Ecosystem",
    price: "₹136",
    period: "/ user / month",
    billingNote: "Billed annually (₹160/mo if monthly)",
    storage: "30 GB Storage",
    uptime: "99.9% SLA",
    recommendedUsers: "5 - 500 Users",
    logoType: "google",
    features: [
      "30 GB Pooled Cloud Storage per User",
      "Gmail for Professional Business Domain",
      "100 Participant Google Meet Video Calls",
      "Google Docs, Sheets, Slides & Forms Suite",
      "Centralized Google Cloud Admin Console",
      "24/7 Enterprise Support & 2SV Security"
    ],
    enabled: true
  },
  {
    id: "microsoft",
    name: "Microsoft 365",
    subtitle: "Exchange Online (Plan 1)",
    badge: "Best for Office & Outlook",
    price: "₹145",
    period: "/ user / month",
    billingNote: "Billed annually (₹175/mo if monthly)",
    storage: "50 GB Storage",
    uptime: "99.9% SLA",
    recommendedUsers: "10 - 1000+ Users",
    logoType: "microsoft",
    features: [
      "50 GB Dedicated Mailbox Storage",
      "150 MB Attachment Sending & Receiving Limit",
      "Full Outlook Web & Premium Mobile Apps",
      "Exchange Anti-Spam & Threat Protection",
      "Shared Calendars, Contacts & Distribution Lists",
      "24/7 Microsoft Enterprise Technical Support"
    ],
    enabled: true
  },
  {
    id: "zoho",
    name: "Zoho Mail",
    subtitle: "Mail Lite Starter Plan",
    badge: "Best Value for Startups",
    price: "₹58",
    period: "/ user / month",
    billingNote: "Billed annually (₹69/mo if monthly)",
    storage: "5 GB Storage",
    uptime: "99.9% SLA",
    recommendedUsers: "1 - 50 Users",
    logoType: "zoho",
    features: [
      "5 GB NVMe Mailbox Storage per User",
      "Custom Business Domain (@yourcompany.com)",
      "Email Aliases, Routing & Group Mailboxes",
      "Webmail, iOS/Android & Desktop App Access",
      "Zero-Ads Interface with AI Anti-Spam Shield",
      "Free 1-Click Migration & 24/7 Managed Support"
    ],
    enabled: true
  },
  {
    id: "rediff",
    name: "Rediffmail Pro",
    subtitle: "Enterprise Mail Suite",
    badge: "High Security & Compliance",
    price: "₹89",
    period: "/ user / month",
    billingNote: "Billed annually (₹99/mo if monthly)",
    storage: "10 GB Storage",
    uptime: "99.99% SLA",
    recommendedUsers: "10 - 200 Users",
    logoType: "rediff",
    features: [
      "10 GB Encrypted Storage per Inbox",
      "Custom Domain Email Branding & Setup",
      "Advanced Phishing & Malware Shield",
      "POP3, IMAP, SMTP & Webmail Protocols",
      "Centralized Admin Console & User Permissions",
      "24/7 Priority Indian Technical Support"
    ],
    enabled: true
  },
  {
    id: "titan",
    name: "Titan Mail",
    subtitle: "Business Mail Lite",
    badge: "Most Popular for Teams",
    price: "₹79",
    period: "/ user / month",
    billingNote: "Billed annually (₹89/mo if monthly)",
    storage: "10 GB Storage",
    uptime: "99.9% SLA",
    recommendedUsers: "1 - 100 Users",
    logoType: "titan",
    features: [
      "10 GB Storage with Instant Global Search",
      "Read Receipts, Undo Send & Scheduled Mail",
      "Follow-up Reminders & Snippet Templates",
      "Integrated Calendar, Contacts & Tasks",
      "Seamless One-Click Gmail & Outlook Import",
      "Multi-Account Support on Mobile & Desktop"
    ],
    enabled: true
  }
];

export const ProviderModel = {
  // Ensure table exists & seed default providers if empty
  async ensureTableExists(): Promise<void> {
    await db.query(`
      CREATE TABLE IF NOT EXISTS providers (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        badge VARCHAR(255) NOT NULL,
        price VARCHAR(100) NOT NULL,
        period VARCHAR(100) NOT NULL,
        billing_note VARCHAR(255) NOT NULL,
        storage VARCHAR(100) NOT NULL,
        uptime VARCHAR(100) NOT NULL,
        recommended_users VARCHAR(100) NOT NULL,
        logo_type VARCHAR(100) NOT NULL,
        features JSON NOT NULL,
        enabled BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check count
    const [rows]: any = await db.query("SELECT COUNT(*) as cnt FROM providers");
    if (rows[0].cnt === 0) {
      for (const p of defaultProviders) {
        await this.create(p);
      }
    }
  },

  // Fetch all providers
  async findAll(): Promise<ProviderItem[]> {
    try {
      await this.ensureTableExists();
      const [rows]: any = await db.query("SELECT * FROM providers ORDER BY created_at ASC");
      return rows.map((r: any) => ({
        id: r.id,
        name: r.name,
        subtitle: r.subtitle,
        badge: r.badge,
        price: r.price,
        period: r.period,
        billingNote: r.billing_note,
        storage: r.storage,
        uptime: r.uptime,
        recommendedUsers: r.recommended_users,
        logoType: r.logo_type,
        features: typeof r.features === "string" ? JSON.parse(r.features) : r.features || [],
        enabled: Boolean(r.enabled),
        created_at: r.created_at
      }));
    } catch (e) {
      console.error("ProviderModel findAll Error:", e);
      return defaultProviders;
    }
  },

  // Create new provider
  async create(p: ProviderItem): Promise<void> {
    const featuresJson = JSON.stringify(p.features || []);
    await db.query(
      `INSERT INTO providers (
        id, name, subtitle, badge, price, period, billing_note,
        storage, uptime, recommended_users, logo_type, features, enabled
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        subtitle = VALUES(subtitle),
        badge = VALUES(badge),
        price = VALUES(price),
        period = VALUES(period),
        billing_note = VALUES(billing_note),
        storage = VALUES(storage),
        uptime = VALUES(uptime),
        recommended_users = VALUES(recommended_users),
        logo_type = VALUES(logo_type),
        features = VALUES(features),
        enabled = VALUES(enabled)`,
      [
        p.id.trim().toLowerCase(),
        p.name.trim(),
        p.subtitle.trim(),
        p.badge.trim(),
        p.price.trim(),
        p.period.trim(),
        p.billingNote.trim(),
        p.storage.trim(),
        p.uptime.trim(),
        p.recommendedUsers.trim(),
        p.logoType.trim().toLowerCase(),
        featuresJson,
        p.enabled ?? true
      ]
    );
  },

  // Update existing provider
  async update(id: string, p: Partial<ProviderItem>): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) return;

    const updated: ProviderItem = {
      ...existing,
      ...p,
    };

    await this.create(updated);
  },

  // Find provider by ID
  async findById(id: string): Promise<ProviderItem | null> {
    const [rows]: any = await db.query("SELECT * FROM providers WHERE id = ? LIMIT 1", [id]);
    if (rows.length === 0) return null;
    const r = rows[0];
    return {
      id: r.id,
      name: r.name,
      subtitle: r.subtitle,
      badge: r.badge,
      price: r.price,
      period: r.period,
      billingNote: r.billing_note,
      storage: r.storage,
      uptime: r.uptime,
      recommendedUsers: r.recommended_users,
      logoType: r.logo_type,
      features: typeof r.features === "string" ? JSON.parse(r.features) : r.features || [],
      enabled: Boolean(r.enabled),
      created_at: r.created_at
    };
  },

  // Delete provider by ID
  async delete(id: string): Promise<void> {
    await db.query("DELETE FROM providers WHERE id = ?", [id]);
  }
};
