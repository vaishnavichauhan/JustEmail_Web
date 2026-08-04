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

export const ProviderModel = {
  // Fetch all providers
  async findAll(): Promise<ProviderItem[]> {
    try {
      const [rows]: any = await db.query("SELECT * FROM providers ORDER BY created_at DESC, id DESC");
      if (Array.isArray(rows)) {
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
      }
    } catch (e) {
      console.error("ProviderModel.findAll MySQL Error:", e);
    }
    return [];
  },

  // Create new provider
  async create(p: ProviderItem): Promise<void> {
    const formattedItem: ProviderItem = {
      id: (p.id || "").trim().toLowerCase(),
      name: (p.name || "").trim(),
      subtitle: (p.subtitle || "").trim(),
      badge: (p.badge || "").trim(),
      price: (p.price || "").trim(),
      period: (p.period || "").trim(),
      billingNote: (p.billingNote || "").trim(),
      storage: (p.storage || "").trim(),
      uptime: (p.uptime || "").trim(),
      recommendedUsers: (p.recommendedUsers || "").trim(),
      logoType: (p.logoType || "").trim().toLowerCase(),
      features: Array.isArray(p.features) ? p.features : [],
      enabled: p.enabled ?? true,
      created_at: p.created_at || new Date().toISOString()
    };

    const featuresJson = JSON.stringify(formattedItem.features || []);
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
        formattedItem.id,
        formattedItem.name,
        formattedItem.subtitle,
        formattedItem.badge,
        formattedItem.price,
        formattedItem.period,
        formattedItem.billingNote,
        formattedItem.storage,
        formattedItem.uptime,
        formattedItem.recommendedUsers,
        formattedItem.logoType,
        featuresJson,
        formattedItem.enabled
      ]
    );
  },

  // Update existing provider
  async update(id: string, p: Partial<ProviderItem>): Promise<void> {
    const targetId = (id || "").trim().toLowerCase();
    const existing = await this.findById(targetId);
    if (existing) {
      const updated = { ...existing, ...p };
      await this.create(updated);
    }
  },

  // Find provider by ID
  async findById(id: string): Promise<ProviderItem | null> {
    const targetId = (id || "").trim().toLowerCase();
    try {
      const [rows]: any = await db.query("SELECT * FROM providers WHERE id = ? LIMIT 1", [targetId]);
      if (rows && rows.length > 0) {
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
      }
    } catch (e) {
      console.error("ProviderModel.findById MySQL Error:", e);
    }
    return null;
  },

  // Delete provider by ID
  async delete(id: string): Promise<void> {
    const targetId = (id || "").trim().toLowerCase();
    await db.query("DELETE FROM providers WHERE id = ?", [targetId]);
  }
};
