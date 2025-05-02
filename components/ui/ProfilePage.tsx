import ProfileHeader from "./ProfileHeader";
import PublicKeyField from "./PublicKeyField";

interface UserDataResponse {
  id: number;
  name: string;
  email: string;
  publicKey: string;
  showKey: boolean;
}

interface UserData {
  data: UserDataResponse;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPublicKey: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function ProfilePage(props: UserData) {
  const { data, handleChange, showPublicKey } = props;
  return (
    <>
      <ProfileHeader />
      <div className="w-full px-0 md:px-6">
        <h2 className="text-[20px] md:text-[24px] font-semibold mb-[1.75rem]">
          Personal Information
        </h2>

        <form>
          <div className="flex flex-row gap-[28px] mb-[1.75rem]">
            <div className="w-1/2">
              <label className="text-[14px] font-semibold">Name</label>
              <input
                type="text"
                className="w-full h-[40px] bg-[#3c3c3c] border-2 border-[#676767] rounded-[4px] px-4 mt-2"
                placeholder="Your Name"
                name="name"
                onChange={handleChange}
                value={data.name}
              />
            </div>
            <div className="w-1/2">
              <label className="text-[14px] font-semibold">Email</label>
              <input
                type="text"
                className="w-full h-[40px] bg-[#3c3c3c] border-2 border-[#676767] rounded-[4px] px-4 mt-2"
                placeholder="Your Email"
                name="email"
                onChange={handleChange}
                value={data.email}
              />
            </div>
          </div>
          <div className="flex flex-row gap-[28px] mb-[4rem]">
            <PublicKeyField
              data={data}
              label="Public Key"
              showPublicKey={showPublicKey}
            />
          </div>
          <button className="py-[10px] float-right px-6 bg-[#295dda] rounded-[6px]">
            Update Data
          </button>
        </form>
      </div>
    </>
  );
}
