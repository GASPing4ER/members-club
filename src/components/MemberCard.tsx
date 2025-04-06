// components/MemberCard.tsx
import Image from "next/image";
import { UserData } from "./ProfileForm";
import Link from "next/link";

const MemberCard = ({ member }: { member: UserData }) => {
  return (
    <Link
      href={`/members/${member.id}`}
      className="group relative flex flex-col items-center rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
    >
      {/* Image with hover effect */}
      <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md">
        <Image
          src={member.imageUrl}
          alt={`${member.firstName} ${member.lastName}'s profile`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
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
      </div>
    </Link>
  );
};

export default MemberCard;
