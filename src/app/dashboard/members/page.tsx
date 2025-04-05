import { getUsers } from "@/lib/data";
import Image from "next/image";

const MembersPage = async () => {
  const members = await getUsers();
  console.log(members);
  return (
    <main>
      {members.map((member) => {
        return (
          <div key={member.id}>
            <Image
              src={member.imageUrl}
              alt="member profile image"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <h2>{member.fullName}</h2>
          </div>
        );
      })}
    </main>
  );
};

export default MembersPage;
