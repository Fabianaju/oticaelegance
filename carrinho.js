let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function renderizarCarrinho() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    document.getElementById("total").textContent = "0.00";
    return;
  }

  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <div>
        <p><strong>${item.nome}</strong></p>
        <p>Quantidade: ${item.quantidade}</p>
        <p>Preço: R$ ${item.preco.toFixed(2)}</p>
        <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
      </div>
      <button onclick="removerItem(${index})">Remover</button>
    `;

    container.appendChild(itemDiv);
  });

  document.getElementById("total").textContent = total.toFixed(2);
  calcularFrete();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

function calcularFrete() {
  const cidade = document.getElementById("cidade").value.trim().toLowerCase();
  const estado = document.getElementById("estado").value.trim().toUpperCase();
  const freteElement = document.getElementById("frete");

  let frete = 0;

  if (!cidade || !estado) {
    freteElement.textContent = `Frete: R$ 0.00`;
    return 0;
  }

  // Simulação de valores com base em cidade + estado
  if (cidade === "curitiba" && estado === "PR") {
    frete = 15;
  } else if (cidade === "são paulo" && estado === "SP") {
    frete = 20;
  } else if (cidade === "rio de janeiro" && estado === "RJ") {
    frete = 25;
  } else if (estado === "SC") {
    frete = 18;
  } else if (estado === "RS") {
    frete = 22;
  } else {
    frete = 30; // frete padrão para outras localidades
  }

  freteElement.textContent = `Frete: R$ ${frete.toFixed(2)}`;
  return frete;
}

function finalizarCompra(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const complemento = document.getElementById("complemento").value.trim();
  const bairro = document.getElementById("bairro").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const cep = document.getElementById("cep").value.trim();

  if (!nome || !email || !telefone || !rua || !numero || !bairro || !cidade || !estado || !cep) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const totalProdutos = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
  const frete = calcularFrete();
  const totalGeral = totalProdutos + frete;

  alert(
    `Compra finalizada com sucesso!\n` +
    `Cliente: ${nome}\n` +
    `Endereço: ${rua}, ${numero}${complemento ? " - " + complemento : ""} - ${bairro}, ${cidade} - ${estado}, ${cep}\n` +
    `Total com frete: R$ ${totalGeral.toFixed(2)}\n` +
    `Obrigado pela sua compra!`
  );

  localStorage.removeItem("carrinho");
  location.reload();
}

// Atualiza o frete automaticamente ao digitar cidade ou estado
document.getElementById("cidade").addEventListener("input", calcularFrete);
document.getElementById("estado").addEventListener("input", calcularFrete);

renderizarCarrinho();
