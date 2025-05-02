"use client";
import ProfilePage from "@/components/ui/ProfilePage";
import { useEffect, useState } from "react";

const defaultData = {
  id: 0,
  name: "",
  email: "",
  publicKey: "",
  showKey: false,
};
export default function Home() {
  const [userData, setUserData] = useState(defaultData);

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
  return (
    <div className="max-w-[900px] mx-auto px-5 py-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <ProfilePage
          data={userData}
          handleChange={handleChange}
          showPublicKey={showPublicKey}
        />
      </main>
    </div>
  );
}
