import { collectDefaultMetrics, register } from "prom-client";

// Collect default metrics (CPU, memory, etc.)
collectDefaultMetrics();

export async function GET() {
  try {
    const metrics = await register.metrics();
    return new Response(metrics, {
      headers: { "Content-Type": register.contentType },
    });
  } catch (err) {
    return new Response("Error collecting metrics", { status: 500 });
  }
}
