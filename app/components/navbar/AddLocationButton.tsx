'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useAddLocationModal from "@/app/hooks/useAddLocationModal";

interface AddLocationButtonProps {
  userId?: string | null;
}

const AddLocationButton: React.FC<AddLocationButtonProps> = ({
  userId
}) => {
  const loginModal = useLoginModal();
  const addLocationModal = useAddLocationModal();

  const addYourLocation = () => {
      if (userId) {
          addLocationModal.open()
      } else {
          loginModal.open();
      }
  }

  return (
      <div
          onClick={addYourLocation}
          className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
      >
          Add a Location
      </div>
  )
}

export default AddLocationButton;