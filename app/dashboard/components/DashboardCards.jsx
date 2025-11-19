const COLORS = {
  BEE_YELLOW: "#F2C849",
  HONEY_GOLD: "#F2C063",
  HIVE_BROWN: "#592D23",
  CLOUD_WHITE: "#F5F9F9",
  SKY_BLUE: "#7EB0F2",
};

export default function DashboardCards() {
  const cards = [
    { title: "Propriedades", color: COLORS.HONEY_GOLD, desc: "Gerencie propriedades cadastradas" },
    { title: "Colmeias", color: COLORS.BEE_YELLOW, desc: "Visualize colmeias vinculadas" },
    { title: "Dispositivos", color: COLORS.SKY_BLUE, desc: "Gerencie dispositivos IoT" },
    { title: "Sensores", color: COLORS.HIVE_BROWN, desc: "Monitore sensores" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {cards.map((c, idx) => (
        <div
          key={idx}
          style={{
            background: "white",
            borderRadius: "14px",
            border: `3px solid ${c.color}`,
            padding: "20px",
            minHeight: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3 className="text-lg font-semibold">{c.title}</h3>
          <p className="text-3xl font-bold">—</p>
          <p className="text-sm text-gray-600">{c.desc}</p>
        </div>
      ))}

    </div>
  );
}
