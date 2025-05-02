import Image from "next/image";
import profileIcon from "@/public/profile.svg";

export default function ProfileHeader() {
  return (
    <div className="relative h-[200px] w-full bg-[#2b2b2b] rounded-[8px] mb-[42px]">
      <div className="absolute left-0 right-0 mx-auto w-[135px] h-[135px] border-4 border-[#676767] bottom-[-2.5rem] bg-[#3c3c3c] rounded-[50%] flex items-center justify-center">
        <Image src={profileIcon} alt="Profile" width={60} height={60} />
      </div>
    </div>
  );
}
