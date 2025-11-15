import { Button, Modal } from "antd";
import { useNavigate } from "react-router";

const CreatePostOption = ({ show, hide }) => {
  const navigate = useNavigate();
  const handleCreateOptionClick = (type) => {
    hide(); // Close modal
    navigate(`/publish?type=${type}`); // Navigate with type
  };

  return (
    <>
      <Modal
        title={<span className="text-white">What would you like to create?</span>} // Title styled for dark theme
        open={show}
        onCancel={() => hide()}
        footer={null} // No default footer buttons
        centered
        className="create-options-modal bg-gray-800 rounded-lg" // Custom class for modal styling
        bodyStyle={{ backgroundColor: "#1f1f1f", borderRadius: "8px" }} // Dark background for modal body
      >
        <div className="flex flex-col gap-4 p-4">
          <Button type="primary" size="large" onClick={() => handleCreateOptionClick("shayari")} className="w-full bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 text-white">
            Write Shayari
          </Button>
          <Button type="default" size="large" onClick={() => handleCreateOptionClick("post")} className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-700 hover:border-gray-600">
            Create Post
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreatePostOption;
