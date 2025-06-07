let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarCarrinho() {
  const count = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
  const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = total.toFixed(2);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarAoCarrinho() {
  const quantidadeInput = document.getElementById("quantidade");
  let quantidade = parseInt(quantidadeInput?.value);
  if (!quantidade || quantidade < 1) quantidade = 1;

  const produto = {
    id: 1,
    nome: "Óculos Ray-Ban",
    preco: 199.90,
    quantidade: quantidade
  };

  const index = carrinho.findIndex(item => item.id === produto.id);
  if (index > -1) {
    carrinho[index].quantidade += produto.quantidade;
  } else {
    carrinho.push(produto);
  }

  atualizarCarrinho();
  alert(`${quantidade} unidade(s) adicionada(s) ao carrinho!`);
}

function verCarrinho() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let resumo = "Carrinho:\n\n";
  carrinho.forEach(item => {
    resumo += `${item.nome} - ${item.quantidade}x R$ ${item.preco.toFixed(2)} = R$ ${(item.quantidade * item.preco).toFixed(2)}\n`;
  });

  const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
  resumo += `\nTotal: R$ ${total.toFixed(2)}\n`;

  const cidade = prompt("Digite sua cidade para simular o frete:");
  if (cidade) {
    resumo += `Cidade: ${cidade}\nFrete: R$ 20,00\nTotal com frete: R$ ${(total + 20).toFixed(2)}`;
  }

  alert(resumo);
}

atualizarCarrinho();
