document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("user-form");
    const fields = ["nome", "email", "cep", "rua", "bairro", "cidade", "estado"];
  
    // Carrega dados do localStorage
    fields.forEach(field => {
      const value = localStorage.getItem(field);
      if (value) {
        document.getElementById(field).value = value;
      }
    });
  
    // Atualiza localStorage a cada mudança
    fields.forEach(field => {
      document.getElementById(field).addEventListener("input", (e) => {
        localStorage.setItem(field, e.target.value);
      });
    });
  
    // Busca endereço pelo CEP
    document.getElementById("cep").addEventListener("blur", async () => {
      const cep = document.getElementById("cep").value.replace(/\D/g, '');
      if (cep.length !== 8) return;
  
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
  
        if (!data.erro) {
          document.getElementById("rua").value = data.logradouro || "";
          document.getElementById("bairro").value = data.bairro || "";
          document.getElementById("cidade").value = data.localidade || "";
          document.getElementById("estado").value = data.uf || "";
  
          // Atualiza localStorage com os dados da API
          ["rua", "bairro", "cidade", "estado"].forEach(field => {
            localStorage.setItem(field, document.getElementById(field).value);
          });
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    });
  
    // Salva no localStorage ao submeter
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Dados salvos com sucesso!");
    });
  });
  