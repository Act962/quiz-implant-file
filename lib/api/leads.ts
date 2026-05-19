import type { Lead } from "@/constants/quiz-data";

const NEW_LEAD_ENDPOINT =
  process.env.EXPO_PUBLIC_NEW_LEAD_URL ??
  "https://orbita.nasaex.com/api/external/new-lead/";

const MOCK_TRACKING_ID =
  process.env.EXPO_PUBLIC_TRACKING_ID ?? "cmpcu82iy06jm0uqmhlmsvdop";
const MOCK_STATUS_ID =
  process.env.EXPO_PUBLIC_STATUS_ID ?? "cmpcu82j806jo0uqmjxdxozx5";
const DEFAULT_DESCRIPTION = "Lead capturado pelo Quiz de Implantodontia";

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; status?: number; message: string };

export async function submitLead(lead: Lead): Promise<SubmitLeadResult> {
  const payload = {
    trackingId: MOCK_TRACKING_ID,
    statusId: MOCK_STATUS_ID,
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? "",
    description: DEFAULT_DESCRIPTION,
  };

  try {
    const response = await fetch(NEW_LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return {
        ok: false,
        status: response.status,
        message: body || `HTTP ${response.status}`,
      };
    }
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Erro de rede",
    };
  }
}
