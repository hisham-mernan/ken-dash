import React, { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { CammeraIcon } from "../../../assets/icons/Icon";
import { useTranslation } from "react-i18next";
import { handleErrors } from "../../../utils/handleError";
import axiosInstance from "../../../service/axiosInstance";
import { API } from "../../../service/apiUrl";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Button from "../../../components/shared/button/Button";

const Scanner = ({ filter }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const html5QrCodeRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const [isScanning, setIsScanning] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [qrId, setQrId] = useState(false);
  const scanQr = async () => {
    try {
      const response = await axiosInstance.post(
        `${API.admin.qr.scannar}${qrId}/`,
        filter
      );

      if (response.status === 200) {
        navigate(`/admin/qr/${qrId}/details`);
      }
    } catch (err) {
      console.log(err);
      setQrId(false);
      handleErrors(err, t);
    }
  };
  const handleStartScanner = async () => {
    setErrorMsg("");
    try {
      // Explicit permission request
      await navigator.mediaDevices.getUserMedia({ video: true });

      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        setErrorMsg(t("camera_not_found") || "No camera found on this device.");
        return;
      }

      setIsScanning(true);
    } catch (err) {
      console.error("Camera access error:", err);

      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        setErrorMsg(
          t("camera_permission_denied") ||
            "We couldn't access your camera. Please allow camera permission in your browser settings to scan QR codes."
        );
      } else {
        setErrorMsg(
          t("camera_error") ||
            "An unexpected error occurred while accessing the camera."
        );
      }
    }
  };

  useEffect(() => {
    if (isScanning) {
      const start = async () => {
        const qrRegionId = "qr-reader";
        try {
          const devices = await Html5Qrcode.getCameras();
          if (devices && devices.length) {
            // Try to get the back camera (usually labeled with "back" or "environment")
            const backCamera = devices.find((d) =>
              /back|rear|environment/i.test(d.label)
            );

            const cameraId = backCamera ? backCamera.id : devices[0].id;

            html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
            await html5QrCodeRef.current.start(
              cameraId,
              {
                fps: 10,
                qrbox: {
                  width: isMobile ? 200 : 280,
                  height: isMobile ? 200 : 280,
                },
              },
              async (decodedText) => {
                console.log(decodedText);
                if (!qrId) {
                  setQrId(decodedText);
                }
                stopScanner();
              }
            );
          }
        } catch (err) {
          console.error("Camera init error:", err);
          setErrorMsg(t("camera_permission_denied"));
          setIsScanning(false);
        }
      };
      start();
    }
  }, [isScanning, isMobile, t, qrId]);

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      await html5QrCodeRef.current.stop();
      await html5QrCodeRef.current.clear();
      html5QrCodeRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    if (qrId) {
      scanQr();
    }
  }, [qrId]);

  return (
    <div className="flex_center page w-full min-h-[418px] sm:min-h-[418px]">
      {!isScanning ? (
        <div className="flex flex-col items-center text-center gap-5">
          <span
            className="cursor-pointer"
            role="button"
            onClick={handleStartScanner}
          >
            <CammeraIcon />
          </span>
          <p className="max-w-[200px] body_lg text-grey-600 font-semibold">
            {t("open_camera_text")}
          </p>
          {errorMsg && (
            <p className="text-red-dark text-sm  max-w-[300px] text-center">
              {errorMsg}
            </p>
          )}
        </div>
      ) : (
        <section className="flex flex-col gap-6 ">
          <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] relative overflow-hidden">
            <div id="qr-reader" className="qr-reader"></div>
          </div>
          {/* <Button size="md" hasFullWidth onClick={stopScanner}>
            {t("stop_scanner")}
          </Button> */}
        </section>
      )}
    </div>
  );
};

export default Scanner;
