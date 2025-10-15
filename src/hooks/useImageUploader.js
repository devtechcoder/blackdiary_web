import { useState } from "react";
import useRequest from "./useRequest";
import { message } from "antd";
import { ShowToast, Severty } from "../helper/toast";

const useImageUploader = () => {
    const [uploading, setUploading] = useState(false)
    const [urls, setUrls] = useState([])
    const FileType = ["image/png", "image/jpg", "image/jpeg", "pdf", "video/mp4"]
    const { request } = useRequest()

    const upload = (file) => {
        return new Promise((resolve, reject) => {
            const formdata = new FormData()
            formdata.append('file', file)
            request({
                url: '/common/image-upload',
                method: 'POST',
                data: formdata,
                onSuccess: ({ data, status }) => {
                    if (status) {
                        resolve(data)
                        setUrls(data)
                    } else {
                        reject(status)
                    }
                },
                onError: (err) => reject(err)
            })
        });
    }

    function uploadImages(images) {
        return new Promise((resolve, reject) => {
            let uploadedImages = [];
            let currentIndex = 0;
            setUploading(true)
            const uploadNextImage = () => {
                if (currentIndex >= images.length) {
                    resolve(uploadedImages);
                    setUploading(false)
                    return;
                }
                const image = images[currentIndex];
                const formData = new FormData();
                formData.append('file', image);
                request({
                    url: '/auth/uploadFile',
                    method: 'POST',
                    data: formData,
                    onSuccess: ({ data, status }) => {
                        if (status) {
                            uploadedImages.push(data);
                            currentIndex++;
                            uploadNextImage()
                        } else {
                            //  setUploading(false)
                            ShowToast("Something went Wrong", Severty.ERROR)
                            uploadNextImage()
                        }
                    },
                    onError: (err) => {
                        setUploading(false)
                        reject(err)
                    }
                })
            };
            uploadNextImage();
        });
    }

    const beforeUpload = (file) => {
        let isValid = true
        console.log(file.type);
        if (FileType.includes(file.type)) {
            // upload(file)
        } else {
            ShowToast("file type is not correct ", Severty.ERROR)
            return isValid = false
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log(isLt2M, "file Size");
        if (!isLt2M) {
            ShowToast("Image must be smaller than 2MB!", Severty.ERROR)
            return isValid = false
        }
        return isValid
    }

    return { uploading, setUploading, beforeUpload, upload, uploadImages, urls }
}

export default useImageUploader