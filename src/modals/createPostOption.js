import { Button, Modal } from "antd";
import { useNavigate } from "react-router";

const CreatePostOption = ({ show, hide }) => {
  const navigate = useNavigate();
  const handleCreateOptionClick = (type) => {
    hide();
    navigate(`/publish?type=${type}`);
  };

  return (
    <Modal width={520} open={show} onCancel={hide} footer={null} centered className="custom-modal create-options-modal">
      <div className="p-1 text-white">
        <div className="mb-5 text-center">
          <h2 className="text-[28px] font-semibold tracking-tight text-[#f7f7f7]">Create something new</h2>
          <p className="mt-1 text-sm text-[#ababab]">Choose what you want to publish</p>
        </div>

        <div className="rounded-2xl border border-[#2f2f2f] bg-[#141414] p-4 sm:p-5">
          <div className="space-y-3">
            <Button
              size="large"
              onClick={() => handleCreateOptionClick("shayari")}
              className="!h-12 !w-full !rounded-xl !border-0 !bg-[#D4AF37] !text-base !font-semibold !text-[#171717] shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition-all duration-300 hover:!bg-[#e2bf50] hover:shadow-[0_14px_28px_rgba(212,175,55,0.34)]"
            >
              Write Shayari
            </Button>
            <Button
              size="large"
              onClick={() => handleCreateOptionClick("post")}
              className="!h-12 !w-full !rounded-xl !border !border-[#3a3a3a] !bg-[#1f2633] !text-base !font-medium !text-[#f0f0f0] transition-all duration-300 hover:!border-[#D4AF37]/60 hover:!text-[#D4AF37]"
            >
              Create Post
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostOption;
