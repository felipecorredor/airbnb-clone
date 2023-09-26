"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "../../Button";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";

const FooterContent = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  return (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className=" text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggleModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
