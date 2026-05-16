"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Home() {
  return (
    <main className="map-root">
      <MapView />
      <div className="overlay">
        <h1>🦁 Safari World Map</h1>
        <p>
          Every nature reserve on Earth, sourced live from OpenStreetMap. Zoom
          in and explore protected wilderness and safari country — from African
          savannas to remote wetlands.
        </p>
        <span className="count" id="point-count">
          Loading nature reserves…
        </span>
      </div>
      <div className="footer-credit">
        Data ©{" "}
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
          OpenStreetMap
        </a>{" "}
        contributors
      </div>
    </main>
  );
}
