"use client";

import { ToggleProps } from "@/types";
import { UploadDropzone } from "@/utils/uploadthing";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  status: string;
  photoUrl: string;
  fileKey: string;
}

const ImageUploadCard = ({ toggleCard }: ToggleProps) => {
  const [error, setError] = useState("");
  const { update, data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const deleteProfile = async () => {
    try {
      setLoading(true);
      const data = { status: "delete" };
      const resp = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await resp.json();
      await update({ ...session, user: { ...response.res } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      toggleCard();
    }
  };

  const afterComplete = async (data: Props) => {
    try {
      if (!session?.user) throw new Error("No User Data");
      const resp = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await resp.json();
      await update({ ...session, user: { ...response.res } });
      toggleCard();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50"></div>
      <div className="fixed z-40 h-full w-full justify-center items-center top-0 left-0 ">
        <div className="h-full w-full flex justify-center items-center">
          <div className="card w-auto h-auto flex justify-center items-center ">
            <div className="card-body rounded-xl shadow-2xl w-full bg-base-300  ">
              <div className="flex justify-between items-center">
                <h1 className="card-title">Profile Picture</h1>
                <FaTimes className="cursor-pointer" onClick={toggleCard} />
              </div>
              <UploadDropzone
                appearance={{ button: "bg-secondary", container: " " }}
                className="mx-0 max-sm:w-[13rem] p-0  ut-button:btn-secondary ut-label:text-secondary max-sm:ut-label:text-xs"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  const data = {
                    status: "add",
                    photoUrl: res[0].url,
                    fileKey: res[0].key,
                  };
                  afterComplete(data);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  console.log(`ERROR! ${error.message}`);
                }}
              />
              {error && <p className="alert alert-warning">{error}</p>}
              <div className="w-full mt-6 text-center">
                <button
                  disabled={loading}
                  onClick={deleteProfile}
                  className="btn"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Delete profile"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploadCard;
