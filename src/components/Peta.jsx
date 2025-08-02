import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Center,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Flex,
  Input,
  Textarea,
  Dialog,
  Portal,
  CloseButton,
  Separator,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../utils/api";
import axios from "axios";

// Fix untuk icon marker Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons untuk berbagai jenis lokasi
const puskesmasIcon = L.divIcon({
  html: '<div style="background-color: #e53e3e; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 12px;">🏥</div>',
  className: "custom-div-icon",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const fasilitasIcon = L.divIcon({
  html: '<div style="background-color: #3182ce; width: 16px; height: 16px; border-radius: 50% 50% 50% 0; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3); transform: rotate(-45deg); position: relative;"><div style="width: 4px; height: 4px; border-radius: 50%; background-color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div></div>',
  className: "custom-div-icon",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const lokasiUmumIcon = L.divIcon({
  html: '<div style="background-color: #38a169; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 10px;">📍</div>',
  className: "custom-div-icon",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

// Komponen untuk menangkap klik pada map
function TangkapKlikMap({ onClick }) {
  useMapEvents({
    click: (e) => {
      onClick(e);
    },
  });
  return null;
}

// Komponen untuk tooltip berdasarkan zoom
function ZoomBasedTooltip({ children, zoom, titikData }) {
  const map = useMapEvents({});
  const currentZoom = map.getZoom();

  if (currentZoom < zoom) {
    return null;
  }

  return <Popup>{children}</Popup>;
}

function Peta() {
  const [titik, setTitik] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bounds untuk Kalimantan Timur (sesuai koordinat yang Anda berikan)
  const boundsPaser = [
    [-2.5, 114.5], // Southwest
    [-0.5, 118.5], // Northeast
  ];

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/titik/get`
        ); // Sesuaikan endpoint dengan API Anda
        const data = response.data.result || response.data;

        // Memastikan data adalah array
        if (Array.isArray(data)) {
          setTitik(data);
          setError(null);
        } else {
          console.error("Data yang diterima bukan array:", data);
          setError("Format data tidak valid");
          setTitik([]);
        }
        console.log(response.data, "DATA PETA");
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data lokasi");
        // Data contoh jika API belum tersedia
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMapClick = (e) => {
    console.log("Klik pada koordinat:", e.latlng);
  };

  const handleTitikClick = (titikData) => {
    console.log("Klik pada titik:", titikData);
  };

  const getIconByJenis = (jenis) => {
    switch (jenis) {
      case "Puskesmas":
        return puskesmasIcon;
      case "Fasilitas Kesehatan Lainnya":
        return fasilitasIcon;
      default:
        return lokasiUmumIcon;
    }
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Center>
          <Text>Memuat data lokasi...</Text>
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Center>
          <Text color="red.500">{error}</Text>
        </Center>
      </Container>
    );
  }

  return (
    <Box width="100%" height="50vh" position="relative">
      <MapContainer
        center={[-1.5, 116.5]}
        zoom={10}
        minZoom={9}
        maxZoom={18}
        maxBounds={boundsPaser}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        />

        <TangkapKlikMap onClick={handleMapClick} />

        {titik.map((pos, idx) => (
          <Marker
            key={idx}
            position={[pos.latitude, pos.longitude]}
            // icon={getIconByJenis(pos.jenis)}
            eventHandlers={{
              click: () => handleTitikClick(pos),
            }}
          >
            <ZoomBasedTooltip zoom={12} titikData={pos}>
              <div className="leaflet-tooltip-content">
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#3182ce",
                    fontSize: "15px",
                    lineHeight: "1.2",
                  }}
                >
                  {pos.nama}
                </div>
              </div>
            </ZoomBasedTooltip>
            <ZoomBasedTooltip zoom={14} titikData={pos}>
              <div className="leaflet-tooltip-content">
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#3182ce",
                    fontSize: "16px",
                    marginBottom: "8px",
                    lineHeight: "1.2",
                  }}
                >
                  {pos.nama}
                </div>
                {pos.deskripsi && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginTop: "4px",
                      fontStyle: "italic",
                    }}
                  >
                    {pos.deskripsi}
                  </div>
                )}
              </div>
            </ZoomBasedTooltip>
            <ZoomBasedTooltip zoom={16} titikData={pos}>
              <div className="leaflet-tooltip-content">
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#3182ce",
                    fontSize: "18px",
                    marginBottom: "10px",
                    lineHeight: "1.2",
                  }}
                >
                  {pos.nama}
                </div>
                {pos.deskripsi && (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      marginTop: "8px",
                      lineHeight: "1.4",
                      padding: "8px 0",
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    <strong>Deskripsi:</strong> {pos.deskripsi}
                  </div>
                )}
              </div>
            </ZoomBasedTooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend untuk jenis marker */}
    </Box>
  );
}

export default Peta;
