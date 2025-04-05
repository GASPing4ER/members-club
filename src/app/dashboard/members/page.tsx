import { getUsers } from "@/lib/data";
import { MemberCard } from "@/components";

const MembersPage = async () => {
  const members = await getUsers();
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={{
            id: member.id,
            firstName: member.firstName,
            lastName: member.lastName,
            imageUrl: member.imageUrl,
            emailAddress: member.emailAddresses[0]?.emailAddress,
            publicMetadata: member.publicMetadata,
          }}
        />
      ))}
    </main>
  );
};

export default MembersPage;
