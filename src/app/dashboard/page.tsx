// app/dashboard/page.tsx
import { ProfileForm } from "@/components";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const DashboardPage = async () => {
  const user = await currentUser();

  // Create a serializable user object
  const serializableUser = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        emailAddress: user.emailAddresses[0]?.emailAddress,
        publicMetadata: user.publicMetadata,
      }
    : null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {serializableUser && <ProfileForm user={serializableUser} />}
    </div>
  );
};

export default DashboardPage;
