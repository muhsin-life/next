import ModalContainer from "./ui/modal-container";
import { Dialog } from "@headlessui/react";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";

const InvalidOTPModal = ({
  showModal,
  setCloseModal,
}: {
  showModal: any;
  setCloseModal: any;
}) => {
  return (
    <ModalContainer showModal={showModal} setCloseModal={setCloseModal}>
      <div className="rounded-t-xl bg-red-500 p-6 text-center text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="mx-auto h-28 w-28"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className=" p-5 text-center space-y-3">
        <Typography size={"xl"} bold={"bold"}>
          Oops
        </Typography>
        <Typography size={"xl"} bold={"semibold"}>
          Something went wrong!
        </Typography>
        <Typography bold={"semibold"}>
          Invalid code. Please enter the correct code.
        </Typography>

        <Button
          onClick={() => {
            setCloseModal(false);
          }}
        >
          OK
        </Button>
      </div>
    </ModalContainer>
  );
};

export default InvalidOTPModal;
