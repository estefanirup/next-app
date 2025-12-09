'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const COLORS = {
  BEE_YELLOW: "#F2C849",
  HONEY_GOLD: "#F2C063",
  HIVE_BROWN: "#592D23",
  CLOUD_WHITE: "#F5F9F9",
  SKY_BLUE: "#7EB0F2",
};

// --- Item do Menu ---
const SidebarMenuItem = ({ icon, label, href, isActive }) => {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: 500,
    color: COLORS.CLOUD_WHITE,
    textDecoration: "none",
    transition: "all 0.2s ease",
    opacity: isActive ? 1 : 0.85,
  };

  const activeStyle = isActive
    ? {
        background: "rgba(255,255,255,0.08)",
        fontWeight: 700,
        borderLeft: `4px solid ${COLORS.BEE_YELLOW}`,
        paddingLeft: "16px",
      }
    : {};

  return (
    <Link
      href={href}
      style={{ ...baseStyle, ...activeStyle }}
      className="hover:bg-white/10"
    >
      <span
        style={{
          fontSize: "20px",
          color: isActive ? COLORS.BEE_YELLOW : COLORS.CLOUD_WHITE,
        }}
      >
        {icon}
      </span>
      {label}
    </Link>
  );
};

// --- Sidebar ---
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "280px",
        height: "100vh",
        background: COLORS.HIVE_BROWN,
        padding: "32px 0",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 10px rgba(0,0,0,0.3)",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "0 24px" }}>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 800,
            marginBottom: "40px",
            letterSpacing: "0.5px",
            color: COLORS.BEE_YELLOW,
          }}
        >
          ApiCultura
        </h2>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <SidebarMenuItem
          icon="🏡"
          label="Dashboard"
          href="/dashboard"
          isActive={pathname === "/dashboard"}
        />

        <SidebarMenuItem
          icon="🏞️"
          label="Propriedades"
          href="/dashboard/components/property"
          isActive={pathname.startsWith("/dashboard/property")}
        />

        <SidebarMenuItem
          icon="🐝"
          label="Colmeias"
          href="/dashboard/components/hive"
          isActive={pathname.startsWith("/dashboard/hive")}
        />

        <SidebarMenuItem
          icon="📟"
          label="Dispositivos"
          href="/dashboard/components/device"
          isActive={pathname.startsWith("/dashboard/device")}
        />

        <SidebarMenuItem
          icon="🌡️"
          label="Sensores"
          href="/dashboard//components/sensor"
          isActive={pathname.startsWith("/dashboard/sensor")}
        />
      </nav>

      {/* Footer */}
      <div
        style={{
          marginTop: "auto",
          padding: "24px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: COLORS.BEE_YELLOW,
              color: COLORS.HIVE_BROWN,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            👤
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>Usuário</div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              Administrador
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
