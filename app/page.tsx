"use client";
import ProfilePage from "@/components/ui/ProfilePage";
import { encryptText } from "@/components/utils";
import { useEffect, useState } from "react";

const defaultData = {
  id: 0,
  name: "",
  email: "",
  publicKey: "",
  showKey: false,
};
let flag = false;

export default function Home() {
  const [userData, setUserData] = useState(defaultData);
  const [processingText, setProcessingText] = useState({
    iv: "",
    ciphertext: "",
  });

  useEffect(() => {
    getUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getUserData = () => {
    fetch("api/user", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  const showPublicKey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUserData((prevData) => ({
      ...prevData,
      showKey: !prevData.showKey,
    }));
  };
  const encryptEmail = async (
    e: React.MouseEvent<HTMLButtonElement>,
    email: string
  ) => {
    e.preventDefault();
    flag = !flag;
    const encrypting = await encryptText(email);
    setProcessingText(encrypting);
  };
  return (
    <div className="max-w-[900px] mx-auto px-5 py-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <ProfilePage
          data={userData}
          handleChange={handleChange}
          showPublicKey={showPublicKey}
          encryptEmail={encryptEmail}
          processingText={processingText}
        />
      </main>
    </div>
  );
}
