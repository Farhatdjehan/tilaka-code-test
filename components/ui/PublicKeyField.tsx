interface UserDataResponse {
  publicKey: string;
  showKey: boolean;
}

interface PublicKeyFieldProps {
  data: UserDataResponse;
  label: string;
  showPublicKey: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PublicKeyField(props: PublicKeyFieldProps) {
  const { data, label, showPublicKey } = props;
  return (
    <div className="w-full md:w-1/2">
      <label className="text-[14px] font-semibold">{label}</label>
      <div className="flex flex-row gap-[12px]">
        <input
          type={data.showKey ? "text" : "password"}
          className="w-full h-[40px] bg-[#3c3c3c] border-2 border-[#676767] rounded-[4px] px-4 mt-2"
          name="publicKey"
          placeholder="Your Public Key"
          disabled
          value={data.publicKey}
        />
        <button
          onClick={showPublicKey}
          className="py-[8px] text-[13px] shrink-0 px-4 bg-[#295dda] rounded-[6px] mt-2"
        >
          Show Key
        </button>
      </div>
    </div>
  );
}
