"use client";
import React from "react";
import { Button, Form, Input } from "antd";
import { validateTeamName, validateURL } from "@/app/utils";

const Step1 = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    let stepData = {
      teamname: values.teamname,
      link: values.link
    }
    props.setHook("step1", stepData);
    props.next();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

return (
    <div className="p-4 sm:p-6 lg:p-8">
      <style jsx>{`
        .animated-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 24px ;
          border: 3px solid;
          border-color: transparent;
          font-size: 14px;
          background-color: inherit;
          border-radius: 100px;
          font-weight: 600;
          color: black;
          box-shadow: 0 0 0 2px #bdc7edff;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          width: 100%;
          justify-content: center;
          margin-top: 16px;
        }
        .animated-button svg {
          position: absolute;
          width: 20px;
          fill: white;
          z-index: 9;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .animated-button .arr-1 {
          right: 12px;
        }
        .animated-button .arr-2 {
          left: -25%;
        }
        .animated-button .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background-color: white;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .animated-button .text {
          position: relative;
          z-index: 1;
          transform: translateX(-10px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .animated-button:hover {
          box-shadow: 0 0 0 8px transparent;
          color: black;
          border-radius: 12px;
        }
        .animated-button:hover .arr-1 {
          right: -25%;
        }
        .animated-button:hover .arr-2 {
          left: 12px;
        }
        .animated-button:hover .text {
          transform: translateX(10px);
        }
        .animated-button:hover svg {
          fill: #212121;
        }
        .animated-button:active {
          scale: 0.95;
          box-shadow: 0 0 0 3px black;
        }
        .animated-button:hover .circle {
          width: 180px;
          height: 180px;
          opacity: 1;
        }
      `}</style>
      
      <div className="max-w-md mx-auto my-6">
        <Form
          size="large"
          name="basic"
          labelAlign="left"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Team Name"
            name="teamname"
            rules={[
              { required: true, message: "Please input your Team Name!" },
              { validator: validateTeamName }
            ]}
            initialValue={props?.stepData?.teamname ?? ""}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Assets Link"
            name="link"
            rules={[
              { required: true, message: "Please input your uploaded drive link!" },
              { validator: validateURL }
            ]}
            initialValue={props?.stepData?.link ?? ""}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 24 }}
          >
            <button type="submit" className="animated-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
              </svg>
              <span className="text">Next</span>
              <span className="circle"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
              </svg>
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Step1;