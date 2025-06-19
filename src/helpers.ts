import { AlertFeature } from "./types.js";

const USER_AGENT = "weather-app/1.0";

// Helper function for making NWS API request
export async function makeNWSRequest<T>(url: string): Promise<T | null> {
  const headers = {
    "User-Agent": USER_AGENT,
    Accept: "application/geo+json",
  };

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making NWS request: ", error);

    return null;
  }
}

export function formatAlert(feature: AlertFeature | null): string { 
  const { properties } = feature ?? {};

  return [
    `Event: ${properties?.event || "Unknown"}`,
    `Area: ${properties?.areaDesc || "Unknown"}`,
    `Severity: ${properties?.severity || "Unknown"}`,
    `Status: ${properties?.status || "Unknown"}`,
    `Headline: ${properties?.headline || "Unknown"}`,
    "----"
  ].filter(Boolean).join(" - ");
}