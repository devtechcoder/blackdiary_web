import { Button, Form, Row } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { ShowToast, Severty } from "../../helper/toast";
import apiPath from "../../constants/apiPath";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useGetApi, usePostApi } from "../../hooks/useRequest";
import { DescriptionEditor, SelectInput, MultiSelect } from "../../components/InputField";
import { useAuthContext } from "../../context/AuthContext";
import ProfileImageUpload from "../../modals/ProfileImageUpload";

function WriteShayari() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const type = searchParams.get("type");
  const { isLoggedIn, setIsLoggedIn, refreshUser, userProfile } = useAuthContext();
  const [image, setImage] = useState();
  const FileType = ["image/png", "image/jpg", "image/jpeg", "image/avif", "image/webp", "image/gif"];
  const handleImage = (data) => {
    data ? setImage(data) : setImage();
  };
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
    let payload = { ...values, author: userProfile?._id, type };
    if (type === "shayari") {
      if (!content.trim() || content === "<p><br></p>") {
        ShowToast("Please write your shayari in the content box.", Severty.WARNING);
        return;
      }
      payload = payload.content = content;
    } else {
      if (!image) {
        ShowToast("Please upload an image for your post.", Severty.WARNING);
        return;
      }
      payload = payload.image = image;
    }
    mutate(payload);
  };

  useEffect(() => {
    // Reset sub-category when category changes
    form.setFieldsValue({ sub_category_id: [] });
  }, [categoryId, form]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white text-white rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl text-black font-bold mb-6">{type === "shayari" ? "Write Shayari" : "Create Post"}</h1>
      <Form form={form} onFinish={OnSubmit} autoComplete="off" layout="vertical" disabled={isSubmitting}>
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
              filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
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
              filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
            />
            <MultiSelect
              label="Occasion (Optional)"
              name="occasion_ids"
              placeholder="Select Occasions"
              options={occasions}
              loading={occasionsLoading}
              showSearch
              filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
              colProps={{ md: 24 }}
            />
          </Row>
          {type === "shayari" ? (
            <Form.Item label="Content">
              <DescriptionEditor value={content} onChange={setContent} placeholder="Write your heart out..." />
            </Form.Item>
          ) : (
            <Form.Item name="image" className="text-white" label="Image" rules={[{ required: true, message: "Please upload an image for your post." }]}>
              <ProfileImageUpload value={image} fileType={FileType} btnName={"Choose Image"} imageType="Image" onChange={(data) => handleImage(data)} isDimension={true} />
            </Form.Item>
          )}
          <div className="flex justify-end gap-4 mt-8">
            <Button onClick={() => navigate(-1)} className="bg-gray-700 text-white hover:bg-gray-600 border-gray-700">
              Back
            </Button>
            <Button type="primary" htmlType="submit" loading={isSubmitting} className="bg-green-500 hover:bg-green-600 border-green-500">
              Publish
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default WriteShayari;
