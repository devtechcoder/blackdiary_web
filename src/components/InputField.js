import { Col, Form, Input, Select, InputNumber, Checkbox } from "antd";
import PhoneInput from "react-phone-input-2";
import { useAppContext } from "../context/AppContext";
import lang from "../helper/langHelper";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export const NumberInputBox = ({ label, name, placeholder, rules, cover, className, colProps, ...props }) => {
  return (
    <Col md={cover ? cover.md : 12} {...colProps}>
      <Form.Item className={!!className ? className : ""} label={label} name={name} rules={rules} {...props}>
        <InputNumber placeholder={placeholder} />
      </Form.Item>
    </Col>
  );
};

///------------------------

export const MultiSelect = ({ cover, name, label, rules, placeholder, className, options, colProps }) => {
  const { language } = useAppContext();
  return (
    <Col md={cover ? cover.md : 12} {...colProps}>
      <Form.Item
        name={name}
        label={label}
        rules={[
          {
            required: !!rules,
            message: `Please select a ${label || "value"}!`,
          },
        ]}
      >
        <Select
          placeholder={placeholder}
          className={`dark-input w-full ${className || ""}`}
          mode="multiple" // Set mode to "multiple" for selecting multiple values
        >
          {options && options.length > 0
            ? options.map((item, index) => (
                <Select.Option key={item._id} value={item._id}>
                  <span className="cap">{language !== ("en" || null) ? item[`${language}_name`] ?? item?.name : item?.name}</span>
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
    </Col>
  );
};

export const EmailInputBox = ({ label, name, placeholder, rules, cover, className, isDisable, inputProps, colProps, ...props }) => {
  return (
    <Col span={24} md={cover ? cover.md : 12} sm={24} {...colProps}>
      <Form.Item
        className={!!className ? className : ""}
        label={label}
        name={name}
        rules={[
          {
            required: !!rules ? true : false,
            message: lang("Please enter your email!"),
          },
          {
            type: "email",
            message: lang("Please enter a valid email address!"),
          },
          {
            max: 255,
            message: lang("Email address not more then 255 characters!"),
          },
        ]}
        normalize={(value) => value.trimStart()}
        {...props}
      >
        <Input className="custom-ant-input" placeholder={placeholder} disabled={isDisable} {...inputProps} />
      </Form.Item>
    </Col>
  );
};

export const PasswordInputBox = ({ label, name, placeholder, rules, cover, className, isDisable, inputProps, colProps, ...props }) => {
  return (
    <Col span={24} md={cover ? cover.md : 12} sm={24} {...colProps}>
      <Form.Item className={!!className ? className : ""} label={label} name={name} rules={rules} normalize={(value) => value.trimStart()} {...props}>
        <Input.Password className="custom-ant-input" placeholder={placeholder} disabled={isDisable} {...inputProps} />
      </Form.Item>
    </Col>
  );
};

export const TextInputBox = ({ type = "text", label, name, placeholder, rules, cover, className, isDisable, inputProps, colProps, max = 150, ...props }) => {
  return (
    <Col span={24} md={cover ? cover.md : 12} sm={24} {...colProps}>
      <Form.Item
        className={!!className ? className : ""}
        label={label}
        name={name}
        normalize={(value) => value.trimStart()}
        {...props}
        rules={[
          {
            required: !!rules ? true : false,
            message: lang("Please enter your full value!"),
          },
          {
            max: max,
            message: lang(`Value must not be more than ${max} characters!`),
          },
        ]}
      >
        {type === "text" ? (
          <Input className="custom-ant-input" placeholder={placeholder} disabled={isDisable} {...inputProps} />
        ) : (
          <Input.TextArea className="custom-ant-input" placeholder={placeholder} disabled={isDisable} {...inputProps} />
        )}
      </Form.Item>
    </Col>
  );
};

export const SelectInput = ({ label, name, placeholder, options, rules, cover, className, defaultValue, handleChange, colProps, ...props }) => {
  const { language } = useAppContext();
  return (
    <Col md={cover ? cover.md : 12} {...colProps}>
      <Form.Item
        name={name}
        label={label}
        rules={[
          {
            required: !!rules ? true : false,
            message: lang("Please select a Value!"),
          },
        ]}
      >
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          {...props}
          placeholder={placeholder}
          className={`dark-input w-full ${className || ""}`}
          defaultValue={defaultValue}
          onChange={handleChange}
        >
          {options && options && options.length > 0
            ? options.map((item, index) => (
                <Select.Option className="select-option" key={item._id} value={item._id} label={item.name} onChange={handleChange}>
                  <span className="cap">{language !== ("en" || null) ? item[`${language}_name`] ?? item?.name : item?.name}</span>
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
    </Col>
  );
};
export const CheckboxInput = ({ label, name, options, rules, cover, className, defaultValue, handleChange, colProps, ...props }) => {
  const { language } = useAppContext();

  return (
    <Col md={cover ? cover.md : 12} {...colProps}>
      <Form.Item
        name={name}
        label={label}
        rules={[
          {
            required: !!rules,
            message: lang("Please select at least one option!"),
          },
        ]}
      >
        <Checkbox.Group className={className ?? ""} defaultValue={defaultValue} onChange={handleChange} {...props}>
          <div className="flex flex-col space-y-2">
            {options?.length > 0 &&
              options.map((item) => (
                <Checkbox key={item._id} value={item._id} className="select-option">
                  <span className="cap">{language !== "en" && item[`${language}_name`] ? item[`${language}_name`] : item?.name}</span>
                </Checkbox>
              ))}
          </div>
        </Checkbox.Group>
      </Form.Item>
    </Col>
  );
};

export const SingleCheckboxInput = ({ label, name, options, rules, cover, className, defaultValue, handleChange, colProps, ...props }) => {
  const { language } = useAppContext();

  return (
    <Col md={cover ? cover.md : 12} {...colProps}>
      <Form.Item
        valuePropName="checked"
        name={name}
        label={label}
        rules={[
          {
            required: !!rules,
            message: lang("Please select at least one option!"),
          },
        ]}
      >
        <Checkbox key={options._id} value={options._id} className="select-option">
          <span className="cap">{language !== "en" && options[`${language}_name`] ? options[`${language}_name`] : options?.name}</span>
        </Checkbox>
      </Form.Item>
    </Col>
  );
};
export const UserNameInputBox = ({ label, name, placeholder, rules, cover, className, isDisable, inputProps, colProps, ...props }) => {
  return (
    <Col span={24} md={cover ? cover.md : 12} sm={24} {...colProps}>
      <Form.Item
        className={!!className ? className : ""}
        label={label}
        name={name}
        rules={[
          {
            required: !!rules ? true : false,
            message: lang("Please enter your username!"),
          },
          {
            pattern: /^(?!.*\.\.)(?!.*\.$)[a-z0-9._]{1,30}$/,
            message: lang("Username can only contain lowercase letters, numbers, underscores, and periods. No consecutive or trailing periods."),
          },
          {
            min: 3,
            message: lang("Username must not be more than 30 characters!"),
          },
          {
            max: 30,
            message: lang("Username must not be more than 30 characters!"),
          },
        ]}
        normalize={(value) => value.trimStart()}
        {...props}
      >
        <Input className="custom-ant-input" placeholder={placeholder} disabled={isDisable} {...inputProps} />
      </Form.Item>
    </Col>
  );
};

export const FullNameInputBox = ({ label, name, placeholder, rules, cover, className, isDisable, inputProps, colProps, max = 150, min, ...props }) => {
  return (
    <Col span={24} md={cover ? cover.md : 12} sm={24} {...colProps}>
      <Form.Item
        className={!!className ? className : ""}
        label={label}
        name={name}
        rules={[
          {
            required: !!rules ? true : false,
            message: lang("Please enter your full name!"),
          },
          {
            pattern: /^[\w\s.'-]{1,150}$/,
            message: lang("Full name can only contain letters, numbers, spaces, apostrophes, hyphens, and periods."),
          },
          {
            max: max,
            message: lang(`Full name must not be more than ${max} characters!`),
          },
        ]}
        normalize={(value) => value.trimStart()}
        {...props}
      >
        <Input className="custom-ant-input" placeholder={placeholder} disabled={isDisable} {...inputProps} />
      </Form.Item>
    </Col>
  );
};

export const PhoneNumberInputBox = ({ label, name, placeholder, cover, className, onChange, inputProps, colProps, rules, number, ...props }) => {
  return (
    <Col md={cover ? cover.md : 12} {...colProps}>
      <Form.Item
        className="mb-0"
        label={label}
        name={name}
        rules={[
          {
            required: rules ? rules : true,
            validator: (rule, value) => {
              if (!value) {
                return Promise.reject(lang("Please enter phone number"));
              }
              if (!/^\d{8,12}$/.test(number)) {
                return Promise.reject(lang("Phone number must be between 8 and 12 digits"));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <PhoneInput
          className="custom-ant-input"
          inputProps={{
            name: name,
            required: true,
            autoFocus: false,
            placeholder: placeholder,
            ...inputProps,
          }}
          isValid={(value, country) => {}}
          //value={}
          country={"in"}
          preferredCountries={["in"]}
          onChange={(value, data) => {
            onChange(value, data);
          }}
        />
      </Form.Item>
    </Col>
  );
};

export const EmailOrUserNameInputBox = ({
  label,
  name,
  placeholder,
  rules,
  cover,
  className,
  isDisable,
  inputProps,
  colProps,
  onChange, // your custom handler
  ...props
}) => {
  const handleChange = (e) => {
    const value = e.target.value.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isUsername = /^(?!.*\.\.)(?!.*\.$)[a-z0-9._]{1,30}$/.test(value);

    if (onChange) {
      onChange(e, {
        value,
        type: isEmail ? "Email" : isUsername ? "UserName" : "invalid",
      });
    }
  };

  return (
    <Col span={24} md={cover ? cover.md : 12} sm={24} {...colProps}>
      <Form.Item
        className={!!className ? className : ""}
        label={label}
        name={name}
        rules={[
          {
            required: true,
            message: lang("Please enter your blackdiary username or email address!"),
          },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();

              const trimmedValue = value.trim();
              const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
              const isUsername = /^[a-zA-Z0-9._]{3,30}$/.test(trimmedValue);

              if (isEmail || isUsername) {
                return Promise.resolve();
              } else {
                return Promise.reject(lang("Enter a valid email or username!"));
              }
            },
          },
          {
            max: 255,
            message: lang("Value should not be more than 255 characters!"),
          },
        ]}
        normalize={(value) => value.trimStart()}
        {...props}
      >
        <Input className="custom-ant-input" placeholder={placeholder} disabled={isDisable} onChange={handleChange} {...inputProps} />
      </Form.Item>
    </Col>
  );
};

export const DescriptionEditor = ({ onChange, placeholder, value }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const rawContent = convertToRaw(newEditorState.getCurrentContent());

    const htmlContent = draftToHtml(rawContent, null, null, {
      defaultBlockTag: "p",
      blockRenderers: {
        unstyled: (block) => {
          return `<p>${block.text.replace(/\n/g, "<br>")}</p>`;
        },
      },
    });

    if (onChange) {
      onChange(htmlContent);
    }
  };

  useEffect(() => {
    if (value) {
      const blocksFromHTML = convertFromHTML(value);
      const content = ContentState.createFromBlockArray(blocksFromHTML);
      const editorState = EditorState.createWithContent(content);
      setEditorState(editorState);
    }
  }, []);

  return (
    <Editor
      editorState={editorState}
      placeholder={placeholder}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={handleEditorChange}
    />
  );
};

// export const DescriptionEditor = ({ onChange, placeholder, value }) => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const handleEditorChange = (newEditorState) => {
//     setEditorState(newEditorState);
//     const rawContent = convertToRaw(newEditorState.getCurrentContent());

//     const htmlContent = draftToHtml(rawContent, null, null, {
//       defaultBlockTag: "p",
//       blockRenderers: {
//         unstyled: (block) => {
//           return `<p>${block.text.replace(/\n/g, "<br>")}</p>`;
//         },
//       },
//     });

//     if (onChange) {
//       onChange(htmlContent);
//     }
//   };

//   useEffect(() => {
//     if (value) {
//       const blocksFromHTML = convertFromHTML(value);
//       const content = ContentState.createFromBlockArray(blocksFromHTML);
//       const editorState = EditorState.createWithContent(content);
//       setEditorState(editorState);
//     }
//   }, []);

//   return (
//     <Editor
//       editorState={editorState}
//       placeholder={placeholder}
//       toolbarClassName="toolbarClassName"
//       wrapperClassName="wrapperClassName"
//       editorClassName="editorClassName"
//       onEditorStateChange={handleEditorChange}
//     />
//   );
// };
