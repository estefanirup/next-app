import React from 'react';
// Para simular a navegação profissional, vamos usar um componente MenuItem separado.

const COLORS = {
  BEE_YELLOW: "#F2C849",
  HONEY_GOLD: "#F2C063",
  HIVE_BROWN: "#592D23",
  CLOUD_WHITE: "#F5F9F9",
  SKY_BLUE: "#7EB0F2",
};

// --- Componente de Item de Menu (Boas Práticas: Modularidade) ---
// Em uma aplicação real, você usaria um componente de Link de roteador (ex: <Link to="/dashboard">)

const SidebarMenuItem = ({ icon, label, isActive = false }) => {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    color: COLORS.CLOUD_WHITE,
    transition: "all 0.2s ease",
    opacity: isActive ? 1 : 0.85, // Menor opacidade para itens inativos
    position: 'relative', // Para a borda lateral
  };

  const activeStyle = isActive ? {
    // Melhoria: Fundo sutil para o item ativo para não chocar com o fundo marrom
    background: 'rgba(255, 255, 255, 0.08)', // Fundo escuro sutil
    fontWeight: 700,
    opacity: 1,
    // Melhoria: Borda lateral como acento de cor (Padrão profissional)
    borderLeft: `4px solid ${COLORS.BEE_YELLOW}`,
    paddingLeft: '16px', // Ajusta o padding para compensar a borda
  } : {};

  // O className 'hover:bg-white/10' (do código original) deve ser mantido para interatividade
  return (
    <div
      style={{ ...baseStyle, ...activeStyle }}
      className={isActive ? '' : 'hover:bg-white/10'}
    >
      <span style={{ fontSize: "20px", color: isActive ? COLORS.BEE_YELLOW : COLORS.CLOUD_WHITE }}>
        {icon}
      </span>
      {label}
    </div>
  );
};


// --- Componente Principal da Sidebar ---

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "280px", // Largura confortável
        height: "100vh",
        background: COLORS.HIVE_BROWN,
        // Remove a cor do texto daqui, é definida no MenuItem
        padding: "32px 0", // Padding vertical
        display: "flex",
        flexDirection: "column",
        // Sombra suave para separar do conteúdo (se não for fixed)
        boxShadow: "4px 0 10px rgba(0,0,0,0.3)",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "0 24px" }}>
        <h2
          style={{
            fontSize: "26px", // Mais elegante
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
        {/* Usando o componente refatorado */}
        <SidebarMenuItem icon="🏡" label="Dashboard" isActive={true} />
        <SidebarMenuItem icon="🏞️" label="Propriedades" />
        <SidebarMenuItem icon="🐝" label="Colmeias" />
        <SidebarMenuItem icon="📟" label="Dispositivos" />
        <SidebarMenuItem icon="🌡️" label="Sensores" />
      </nav>

      {/* Footer / User */}
      <div
        style={{
          marginTop: "auto",
          padding: "24px 24px 0 24px", // Padding para a área do usuário
          borderTop: "1px solid rgba(255,255,255,0.1)", // Linha de separação muito sutil
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 0",
            cursor: "pointer",
            color: COLORS.CLOUD_WHITE,
          }}
          className="hover:bg-white/10 rounded-lg p-2 transition duration-200" // Adiciona hover e arredondamento
        >
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
              fontSize: "18px",
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