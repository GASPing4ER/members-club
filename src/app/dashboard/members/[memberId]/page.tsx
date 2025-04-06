import { UserData } from "@/components/ProfileForm";
import { clerkClient } from "@/lib/clerk";
import Image from "next/image";
const MemberPage = async ({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) => {
  const { memberId } = await params;
  const member: UserData = await clerkClient.users.getUser(memberId);
  return (
    <div className="relative w-full h-screen flex flex-col items-center bg-white pt-20">
      {/* Image with hover effect */}
      <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md">
        <Image
          src={member.imageUrl}
          alt={`${member.firstName} ${member.lastName}'s profile`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 128px, (max-width: 1200px) 150px, 192px"
        />
      </div>

      {/* Member Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {member.firstName} {member.lastName}
        </h3>
        {member.publicMetadata.industry && (
          <p className="text-sm text-gray-600">
            {member.publicMetadata.industry}
          </p>
        )}
        {member.publicMetadata.company && (
          <p className="text-xs text-gray-600">
            {member.publicMetadata.company}
          </p>
        )}
        {member.publicMetadata.bio && (
          <p className="text-gray-600 mt-4">{member.publicMetadata.bio}</p>
        )}
      </div>
    </div>
  );
};

export default MemberPage;
