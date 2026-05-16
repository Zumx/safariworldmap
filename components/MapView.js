"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const EMOJI = "🦁";
const CLUSTER_COLOR = "#b8860b";

export default function MapView() {
  const ref = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current || !ref.current) return;

    const map = L.map(ref.current, {
      center: [25, 10],
      zoom: 3,
      worldCopyJump: true,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const icon = L.divIcon({
      html: `<div class="marker-pin">${EMOJI}</div>`,
      className: "",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });

    const cluster = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 55,
      iconCreateFunction: (c) => {
        const n = c.getChildCount();
        const size = n < 100 ? 36 : n < 1000 ? 44 : 54;
        return L.divIcon({
          html: `<div style="background:${CLUSTER_COLOR};color:#fff;width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:3px solid rgba(255,255,255,.8)">${n}</div>`,
          className: "",
          iconSize: [size, size],
        });
      },
    });

    fetch("data/points.geojson")
      .then((r) => r.json())
      .then((geo) => {
        const feats = geo.features || [];
        const markers = feats.map((f) => {
          const [lon, lat] = f.geometry.coordinates;
          const name = f.properties.name || "Unnamed nature reserve";
          const site = f.properties.website
            ? `<br/><a href="${f.properties.website}" target="_blank" rel="noreferrer">Website</a>`
            : "";
          return L.marker([lat, lon], { icon }).bindPopup(
            `<strong>${name}</strong>${site}`
          );
        });
        cluster.addLayers(markers);
        map.addLayer(cluster);
        const el = document.getElementById("point-count");
        if (el) el.textContent = `${feats.length.toLocaleString()} nature reserves mapped`;
      })
      .catch(() => {
        const el = document.getElementById("point-count");
        if (el) el.textContent = "Could not load data";
      });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
