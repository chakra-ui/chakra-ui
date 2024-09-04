"use server"

function getSlackWebhookUrl() {
  const res = process.env.SLACK_ENTERPRISE_WEBHOOK_URL
  if (!res) {
    throw new Error("SLACK_ENTERPRISE_WEBHOOK_URL is not set")
  }
  return res
}

export const submitEnterpriseForm = async (
  _: unknown,
  formData: FormData,
): Promise<{ success: boolean; message: string }> => {
  const request = new Request(getSlackWebhookUrl(), {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      budget: formData.get("budget"),
    }),
  })

  const response = await fetch(request)

  if (response.ok) {
    return { success: true, message: "Form submitted successfully" }
  } else {
    console.error(await response.json())
    return {
      success: false,
      message: "Failed to submit form. Please try again",
    }
  }
}
