import { Button, Form, Row } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { ShowToast, Severty } from "../../helper/toast";
import apiPath from "../../constants/apiPath";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useGetApi, usePostApi } from "../../hooks/useRequest";
import { SelectInput, MultiSelect } from "../../components/InputField";
import { useAuthContext } from "../../context/AuthContext";
import ImageCustomize from "./imageCustomize";
import CaptionInput from "../../components/captionInput";

function WriteShayari() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const type = searchParams.get("type");
  const { userProfile } = useAuthContext();
  const image = Form.useWatch("image", form);
  const FileType = ["image/png", "image/jpg", "image/jpeg", "image/avif", "image/webp", "image/gif"];
  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } = useGetApi({
    queryKey: "categories",
    endpoint: apiPath.common.categories,
  });
  const categories = useMemo(() => categoriesData?.data || [], [categoriesData]);

  // Fetch occasions
  const { data: occasionsData, isLoading: occasionsLoading } = useGetApi({
    queryKey: "occasions",
    endpoint: apiPath.common.getOccasion,
  });
  const occasions = useMemo(() => occasionsData?.data || [], [occasionsData]);

  // Fetch sub-categories when a category is selected
  const categoryId = Form.useWatch("category", form);
  const { data: subCategoriesData, isLoading: subCategoriesLoading } = useGetApi({
    queryKey: ["subCategories", categoryId],
    endpoint: `${apiPath.common.subCategories}?category_id=${categoryId}`,
    enabled: !!categoryId,
  });
  const subCategories = useMemo(() => subCategoriesData?.data || [], [subCategoriesData]);

  // Handle form submission
  const { mutate, isLoading: isSubmitting } = usePostApi({
    endpoint: apiPath.publish,
    onSuccess: (data) => {
      if (data.status) {
        ShowToast(data.message, Severty.SUCCESS);
        navigate("/");
      } else {
        ShowToast(data.message, Severty.ERROR);
      }
    },
    onError: (error) => {
      ShowToast(error.message || "Failed to post shayari.", Severty.ERROR);
    },
  });

  const OnSubmit = (values) => {
    const payload = new FormData();
    const appendValue = (key, fieldValue) => {
      if (fieldValue === undefined || fieldValue === null || fieldValue === "") return;

      if (Array.isArray(fieldValue)) {
        fieldValue.forEach((item) => {
          if (item !== undefined && item !== null && item !== "") {
            payload.append(key, item);
          }
        });
        return;
      }

      payload.append(key, fieldValue);
    };

    appendValue("author", userProfile?._id || "");
    appendValue("type", type || "");

    Object.entries(values || {}).forEach(([key, fieldValue]) => {
      if (key === "image") return;
      appendValue(key, fieldValue);
    });

    if (type === "shayari") {
      if (!content.trim() || content === "<p><br></p>") {
        ShowToast("Please write your shayari in the content box.", Severty.WARNING);
        return;
      }
      payload.append("content", content);
    } else {
      const selectedImage = values?.image || image;
      if (!selectedImage) {
        ShowToast("Please upload an image for your post.", Severty.WARNING);
        return;
      }
      payload.append("image", selectedImage);
    }
    mutate(payload);
  };

  useEffect(() => {
    // Reset sub-category when category changes
    form.setFieldsValue({ sub_category_id: [] });
  }, [categoryId, form]);

  return (
    <div className="mx-auto w-full max-w-5xl px-2 py-2 md:px-4 md:py-4">
      <section className="rounded-2xl border border-[#262626] bg-[#111111] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:p-6 md:p-8">
        <div className="mb-6 border-b border-[#272727] pb-4">
          <h1 className="text-3xl font-semibold tracking-tight text-[#f7f7f7] md:text-4xl">{type === "shayari" ? "Write Shayari" : "Create Post"}</h1>
          <p className="mt-2 text-sm text-[#a8a8a8]">{type === "shayari" ? "Share your thoughts with style and emotion." : "Publish a visual post for your audience."}</p>
        </div>

        <Form
          form={form}
          onFinish={OnSubmit}
          autoComplete="off"
          layout="vertical"
          disabled={isSubmitting}
          className="publish-form [&_.ant-form-item]:mb-5 [&_.ant-form-item-label>label]:!text-base [&_.ant-form-item-label>label]:!font-medium [&_.ant-form-item-label>label]:!text-[#e8e8e8] [&_.ant-select-single_.ant-select-selector]:!h-11 [&_.ant-select-single_.ant-select-selector]:!rounded-[10px] [&_.ant-select-single_.ant-select-selector]:!border-[#313131] [&_.ant-select-single_.ant-select-selector]:!bg-[#0d0d0d] [&_.ant-select-single_.ant-select-selector]:!px-3 [&_.ant-select-multiple_.ant-select-selector]:!min-h-[44px] [&_.ant-select-multiple_.ant-select-selector]:!h-auto [&_.ant-select-multiple_.ant-select-selector]:!rounded-[10px] [&_.ant-select-multiple_.ant-select-selector]:!border-[#313131] [&_.ant-select-multiple_.ant-select-selector]:!bg-[#0d0d0d] [&_.ant-select-multiple_.ant-select-selector]:!px-2 [&_.ant-select-multiple_.ant-select-selector]:!py-1 [&_.ant-select-selection-placeholder]:!text-[#7f7f7f] [&_.ant-select-selection-item]:!text-[#ececec] [&_.ant-select-arrow]:!text-[#8f8f8f] [&_.ant-select-focused_.ant-select-selector]:!border-[#D4AF37] [&_.custom-ant-input]:!h-11 [&_.custom-ant-input]:!rounded-[10px] [&_.custom-ant-input]:!border-[#313131] [&_.custom-ant-input]:!bg-[#0d0d0d] [&_.custom-ant-input]:!text-[#ececec] [&_.custom-ant-input]:!shadow-none [&_.custom-ant-input:hover]:!border-[#D4AF37]/70 [&_.notranslate.public-DraftEditor-content]:!min-h-[150px] [&_.notranslate.public-DraftEditor-content]:!rounded-[12px] [&_.notranslate.public-DraftEditor-content]:!border-[#313131] [&_.notranslate.public-DraftEditor-content]:!bg-[#0d0d0d] [&_.notranslate.public-DraftEditor-content]:!px-4 [&_.notranslate.public-DraftEditor-content]:!py-3 [&_.rdw-editor-main]:!text-[#ececec]"
        >
          <div className="space-y-6">
            <Row gutter={[16, 0]}>
              <SelectInput
                label="Category"
                name="category"
                placeholder="Select Category"
                options={categories}
                rules={true}
                loading={categoriesLoading}
                showSearch
                popupClassName="publish-select-dropdown"
                colProps={{ xs: 24, md: 12 }}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  String(option?.label || "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
              <MultiSelect
                label="Sub Category (Optional)"
                name="sub_category_id"
                placeholder="Select Sub Category"
                options={subCategories ?? []}
                rules={false}
                loading={subCategoriesLoading}
                disabled={!categoryId}
                showSearch
                popupClassName="publish-select-dropdown"
                colProps={{ xs: 24, md: 12 }}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  String(option?.label || "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
              <MultiSelect
                label="Occasion (Optional)"
                name="occasion_ids"
                placeholder="Select Occasions"
                options={occasions}
                loading={occasionsLoading}
                showSearch
                popupClassName="publish-select-dropdown"
                optionFilterProp="label"
                filterOption={(input, option) =>
                  String(option?.label || "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                colProps={{ md: 24 }}
              />
            </Row>
            {type === "shayari" ? (
              <Form.Item label="Content">
                <CaptionInput value={content} onChange={setContent} />
              </Form.Item>
            ) : (
              <Form.Item name="image" className="text-white" label="Image" rules={[{ required: true, message: "Please upload an image for your post." }]}>
                <ImageCustomize size={10} fileType={FileType} btnName={"Choose Image"} imageType="Image" isDimension={true} />
              </Form.Item>
            )}
            <div className="mt-8 flex justify-end gap-3">
              <Button
                onClick={() => navigate(-1)}
                className="!h-11 !rounded-[10px] !border !border-[#3a3a3a] !bg-[#1b1f29] !px-6 !font-medium !text-[#ececec] transition-all duration-300 hover:!border-[#D4AF37]/60 hover:!text-[#D4AF37]"
              >
                Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                className="!h-11 !rounded-[10px] !border-0 !bg-[#D4AF37] !px-7 !font-semibold !text-[#151515] shadow-[0_10px_24px_rgba(212,175,55,0.24)] transition-all duration-300 hover:!bg-[#e2bf50] hover:shadow-[0_14px_28px_rgba(212,175,55,0.32)]"
              >
                Publish
              </Button>
            </div>
          </div>
        </Form>
      </section>
    </div>
  );
}

export default WriteShayari;
