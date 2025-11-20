import { supabase } from "@/lib/supabase/supabaseClient";

export async function POST(req: Request) {
  const body = await req.json();
  // (Pour debug : console.log("CHARIOW webhook:", body);)

  if (body.event === "successful.sale") {
    const customer = body.customer;
    if (customer?.email) {
      // Mise à jour abonnement user dans Supabase
      const now = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(now.getMonth() + 1);

      const { error } = await supabase
        .from("users")
        .update({
          subscription: "Premium",
          subscription_start: now.toISOString(),
          subscription_end: nextMonth.toISOString()
        })
        .eq("email", customer.email.toLowerCase());
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }

      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }
    // Si pas d'email fourni
    return new Response(JSON.stringify({ error: "No customer email!" }), { status: 400 });
  }
  // Event inconnu ou invalide
  return new Response(JSON.stringify({ error: "Unrecognized event" }), { status: 400 });
}
