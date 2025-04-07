import { addUser } from "@/actions/users";

export async function POST(req: Request) {
  const user = await req.json();

  try {
    await addUser({
      id: user.id,
      email: user.email_addresses?.[0]?.email_address,
      first_name: user.first_name,
      last_name: user.last_name,
      image_url: user.profile_image_url,
      company: user.public_metadata.company,
      industry: user.public_metadata.industry,
      bio: user.public_metadata.bio,
    });
    return new Response("Successfully added new user.", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Error processing new user.", { status: 500 });
  }
}
