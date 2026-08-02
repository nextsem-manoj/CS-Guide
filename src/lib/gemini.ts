/**
 * Call Gemini AI (gemini-1.5-flash / gemini-2.0-flash) to generate responses for user prompts
 */
export async function askGemini(
  prompt: string, 
  apiKey?: string, 
  systemInstruction?: string,
  model: string = "gemini-1.5-flash"
): Promise<string> {
  const key = apiKey || (typeof window !== "undefined" ? localStorage.getItem("nextsem_gemini_api_key") : "") || "";
  
  if (!key) {
    throw new Error("Gemini API Key missing. Please provide a valid Gemini API Key in the settings input above.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  
  const bodyPayload: any = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  if (systemInstruction) {
    bodyPayload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyPayload)
  });
  
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = errData?.error?.message || `API call failed with status: ${response.status}`;
    throw new Error(message);
  }
  
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response text generated.";
}
