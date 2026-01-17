import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import Main from "../../components/layout/Main";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const { Title, Text } = Typography;

const GoAds = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    // countdown
    const timer = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);

    // redirect
    const redirect = setTimeout(() => {
      navigate("/");
    }, 5000);

    // Adsterra script inject
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.highperformanceformat.com/97228a33739aa85c6b33ec3f91706555/invoke.js";
    script.async = true;

    document.getElementById("adsterra-container")?.appendChild(script);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
      script.remove();
    };
  }, [navigate]);

  return (
    <Main>
      <Helmet>
        <title>Redirecting | Black Diary</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          padding: "20px",
        }}
      >
        <div
          style={{
            maxWidth: 420,
            width: "100%",
            textAlign: "center",
            background: "#0e0e0e",
            borderRadius: 12,
            padding: "24px",
            boxShadow: "0 0 25px rgba(255,255,255,0.05)",
          }}
        >
          {/* Brand */}
          <Title level={3} style={{ color: "#fff", marginBottom: 4 }}>
            Black Diary
          </Title>
          <Text style={{ color: "#aaa" }}>Please wait, redirecting…</Text>

          {/* Countdown */}
          <div style={{ margin: "12px 0" }}>
            <Text style={{ color: "#888" }}>
              Redirecting in <b>{count}</b> seconds
            </Text>
          </div>

          {/* Adsterra Banner */}
          <div
            id="adsterra-container"
            style={{
              margin: "20px 0",
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#111",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#555" }}>Advertisement</Text>
          </div>

          {/* Skip Button */}
          <Button type="link" onClick={() => navigate("/")} style={{ color: "#1890ff", padding: 0 }}>
            Skip →
          </Button>
        </div>
      </div>
    </Main>
  );
};

export default GoAds;
