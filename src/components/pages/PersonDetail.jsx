import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";
// import ReadQr from '../users/ReadQr'
export default function PersonDetail() {
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setData({
        ...data,
        identifier: user.identifier,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return (
    <>
      {user.role === "staff" && (
        <div className="mt-5">
          <QRCode
            size={256}
            value={JSON.stringify(data)}
            viewBox={`0 0 256 256`}
          />
        </div>
      )}
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
