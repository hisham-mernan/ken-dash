import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useTranslation } from "react-i18next";

import Button from "../button/Button";
import { Dialog } from "primereact/dialog";
import Modal from "../modal/Modal";
const Map = ({
  onlyForShow = false,
  onChangeMap,
  markerPosition = [24, 45],
  item,
  loading,
  disabled,
  error,
  value,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const [mapPosition, setMapPosition] = useState(markerPosition);
  const draggable = true;

  const markerRef = useRef(null);
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (!onlyForShow) {
          setMapPosition([lat, lng]);
        }
      },
    });
    return null;
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setMapPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
      },
    }),
    []
  );

  const handleCurrentLocation = async () => {
    if (onChangeMap) {
      onChangeMap(mapPosition);
      setVisible(false);
    }
  };
  useEffect(() => {
    if (value) {
      setMapPosition(value);
    }
  }, [value]);
  return (
    <>
      <div
        role="button"
        onClick={() => setVisible(true)}
        className={` cursor-pointer flex input gap-2 ${
          disabled || loading ? "disabled" : ""
        } ${error ? "!border-red-dark" : ""} focus-within:!border-secondary `}
      >
        {item?.icon && <span className="flex_center">{item.icon}</span>}
        <p className={`${value ? "text-grey-500" : "text-grey-300"}`}>
          {t(value?.at(0) ? "selected_location" : item?.placeholder)}
        </p>
      </div>
      <Modal
        open={visible}
        onClose={() => setVisible(false)}
        variant="modal"
        hideSecondaryButton={true}
        hideMainButton={true}
        modalTitle="select_address"
      >
        <div className="grid gap-6">
          <div className="map_container rounded-xl ">
            <div className="map ">
              <MapContainer
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                <Marker
                  draggable={!onlyForShow ? draggable : null}
                  eventHandlers={!onlyForShow ? eventHandlers : null}
                  position={mapPosition}
                  ref={markerRef}
                ></Marker>
                <ChangeCenter position={mapPosition} />
              </MapContainer>
            </div>
          </div>
          <Button hasFullWidth onClick={handleCurrentLocation} hasFullWidht>
            {t("select_location")}
          </Button>
        </div>
      </Modal>
    </>
  );
};
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
