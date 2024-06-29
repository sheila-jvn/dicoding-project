import React, { useEffect, useRef, useState } from "react";
import { TOTP } from "otpauth";

// Define the OtpItem interface
interface OtpItem {
  secret: string;
  label: string;
}

// Function to parse OTP URL
function parseOtpUrl(url: string): OtpItem {
  const parsed = new URL(url);
  const secret = parsed.searchParams.get("secret");
  const label = parsed.pathname.split("/").pop();

  if (!secret) throw new Error("OTP secret not found in URL");

  return { secret, label: label || "No label" };
}

// The React component
const TotpComponent: React.FC = () => {
  // State to store the TOTP token and remaining seconds
  const [token, setToken] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(0);

  // Ref to hold the TOTP instance
  const totpRef = useRef<TOTP | null>(null);

  useEffect(() => {
    // Initialize the TOTP instance
    const otpUrl = "otpauth://totp/label?secret=I65VU7K5ZQL7WB4E"; // Example URL
    const { secret } = parseOtpUrl(otpUrl);
    totpRef.current = new TOTP({ secret });

    // Function to update the token and seconds
    const updateTokenAndSeconds = () => {
      if (totpRef.current) {
        const newToken = totpRef.current.generate();
        const newSeconds = totpRef.current.period - (Math.floor(Date.now() / 1000) % totpRef.current.period);
        setToken(newToken);
        setSeconds(newSeconds);
      }
    };

    // Initial update
    updateTokenAndSeconds();

    // Set up an interval to update every second
    const interval = setInterval(updateTokenAndSeconds, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>Token: {token}</p>
      <p>Seconds until token refresh: {seconds}</p>
    </div>
  );
};

export default TotpComponent;