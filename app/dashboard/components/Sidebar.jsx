const COLORS = {
  BEE_YELLOW: "#F2C849",
  HONEY_GOLD: "#F2C063",
  HIVE_BROWN: "#592D23",
  CLOUD_WHITE: "#F5F9F9",
  SKY_BLUE: "#7EB0F2",
};

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "260px",
        background: COLORS.HIVE_BROWN,
        color: "white",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h2 style={{ fontSize: "26px", marginBottom: "40px", fontWeight: "600" }}>
        ApiCultura
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div className="hover:bg-white/10 p-2 rounded cursor-pointer">🏡 Dashboard</div>
        <div className="hover:bg-white/10 p-2 rounded cursor-pointer">🏞️ Propriedades</div>
        <div className="hover:bg-white/10 p-2 rounded cursor-pointer">🐝 Colmeias</div>
        <div className="hover:bg-white/10 p-2 rounded cursor-pointer">📟 Dispositivos</div>
        <div className="hover:bg-white/10 p-2 rounded cursor-pointer">🌡️ Sensores</div>
      </nav>

      <div
        style={{
          marginTop: "32px",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          paddingTop: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ fontSize: "26px" }}>👤</div>
          <div>
            <div style={{ fontWeight: "600" }}>Usuário</div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>Administrador</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
