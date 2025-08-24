"use client";
import React, { useEffect, useRef } from "react";
import type { Place } from "../data/data";

function escapeHtml(str: string) {
  return String(str).replace(
    /[&<>'"]/g,
    (s) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[
        s
      ] as string)
  );
}

function createTileLayer(L: any, style: string) {
  switch (style) {
    case "Topo":
      return L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution: "&copy; OpenTopoMap, &copy; OpenStreetMap",
      });
    case "CartoLight":
      return L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution: "&copy; Carto, &copy; OpenStreetMap",
        }
      );
    default:
      return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      });
  }
}

export function LeafletMap({
  points,
  focusId,
  onFocus,
  activeDayIds,
  onInit,
  onStatus,
  mapStyle,
}: {
  points: Place[];
  focusId?: string;
  onFocus?: (id: string) => void;
  activeDayIds: string[];
  onInit?: (s: any) => void;
  onStatus?: (e: any) => void;
  mapStyle: string;
}) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersGroupRef = useRef<any>(null);
  const routeGroupRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markerByIdRef = useRef<Map<string, any>>(new Map());
  const LRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import("leaflet");
        const L = mod.default || mod;
        LRef.current = L;
        if (!mounted) return;
        const el = containerRef.current;
        if (!el) throw new Error("Missing map container");
        // Ensure CSS for Leaflet (in Next.js import in globals.css is better)
        const map = L.map(el, {
          center: [28.2916, -16.6291],
          zoom: 9,
          zoomControl: true,
          attributionControl: true,
        });
        mapRef.current = map;
        markersGroupRef.current = L.layerGroup().addTo(map);
        routeGroupRef.current = L.layerGroup().addTo(map);
        const tl = createTileLayer(L, mapStyle);
        tileLayerRef.current = tl;
        tl.addTo(map);
        markerByIdRef.current.clear();
        points.forEach((p) => {
          const popupHtml = `<strong>${escapeHtml(
            p.name
          )}</strong><br/>${escapeHtml(
            p.blurb || ""
          )}<br/><a href="https://www.google.com/maps/search/?api=1&query=${
            p.lat
          },${
            p.lon
          }" target="_blank" rel="noopener noreferrer">Otwórz w Google Maps</a>`;
          const m = L.circleMarker([p.lat, p.lon], {
            radius: 6,
            color: "#10b981",
            weight: 2,
            fillColor: "#10b981",
            fillOpacity: 0.9,
          })
            .addTo(markersGroupRef.current)
            .bindPopup(popupHtml);
          m.on("click", () => onFocus && onFocus(p.id));
          markerByIdRef.current.set(p.id, m);
        });
        if (activeDayIds && activeDayIds.length) {
          fitToIds(L, map, points, activeDayIds);
          drawRoute(L, routeGroupRef.current, points, activeDayIds);
        }
        onInit && onInit({ ok: true });
      } catch (err) {
        onInit && onInit({ ok: false, error: String(err) });
      }
    })();
    return () => {
      mounted = false;
      try {
        mapRef.current && mapRef.current.remove();
      } catch (_) {}
    };
  }, []);

  useEffect(() => {
    const L = LRef.current,
      map = mapRef.current;
    if (!L || !map) return;
    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    const tl = createTileLayer(L, mapStyle);
    tileLayerRef.current = tl;
    tl.addTo(map);
    onStatus && onStatus({ type: "style", style: mapStyle });
  }, [mapStyle]);

  useEffect(() => {
    const L = LRef.current,
      map = mapRef.current;
    if (!L || !map || !focusId) return;
    const m = markerByIdRef.current.get(focusId);
    if (m) {
      map.setView(m.getLatLng(), Math.max(map.getZoom(), 12), {
        animate: true,
      });
      m.openPopup();
      onStatus && onStatus({ type: "focus", id: focusId });
    }
  }, [focusId]);

  useEffect(() => {
    const L = LRef.current,
      map = mapRef.current;
    if (!L || !map || !activeDayIds || !activeDayIds.length) return;
    routeGroupRef.current.clearLayers();
    fitToIds(L, map, points, activeDayIds);
    const count = drawRoute(L, routeGroupRef.current, points, activeDayIds);
    onStatus && onStatus({ type: "route", count });
  }, [activeDayIds?.join(",")]);

  return <div ref={containerRef} className="absolute inset-0" />;
}

function fitToIds(L: any, map: any, points: Place[], ids: string[]) {
  const sel = points.filter((p) => ids.includes(p.id));
  if (!sel.length) return 0;
  const b = L.latLngBounds(sel.map((p) => [p.lat, p.lon]));
  map.fitBounds(b, { padding: [44, 44] });
  return sel.length;
}

function drawRoute(L: any, group: any, points: Place[], ids: string[]) {
  const sel = points.filter((p) => ids.includes(p.id));
  if (sel.length < 2) return 0;
  const latlngs = ids.map((id) => {
    const p = points.find((pp) => pp.id === id)!;
    return [p.lat, p.lon];
  });
  const poly = L.polyline(latlngs, {
    color: "#2563eb",
    weight: 3,
    opacity: 0.95,
  });
  group.addLayer(poly);
  latlngs.forEach((ll) =>
    group.addLayer(
      L.circleMarker(ll, {
        radius: 2,
        color: "#2563eb",
        fillColor: "#2563eb",
        fillOpacity: 1,
      })
    )
  );
  return 1;
}
