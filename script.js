let itensCadastrados = []; // banco de dados em memória usando um array

const formCadastro = document.getElementById('form-cadastro');// --- elementos p DOM
const listaItens = document.getElementById('lista-itens');// ------/

function mostrarSecao(idSecao) { // essa função mostra as secções 
    document.querySelectorAll('main section').forEach(secao => {
        secao.classList.remove('secao-ativa');
        secao.classList.add('secao-inativa');
    });
    
    const secao = document.getElementById(idSecao);
    secao.classList.remove('secao-inativa');
    secao.classList.add('secao-ativa');
    
    if (idSecao === 'lista') {
        atualizarLista();
    }
}


function validarFormulario() { // essa função valida os formularios
    let valido = true;
    const nome = document.getElementById('nome');
    const descricao = document.getElementById('descricao');
    
    if (nome.value.trim() === '') {
        document.getElementById('erro-nome').textContent = 'O nome é obrigatório';
        valido = false;
    } else if (nome.value.trim().length < 3) {
        document.getElementById('erro-nome').textContent = 'O nome deve ter pelo menos 3 caracteres';
        valido = false;
    } else {
        document.getElementById('erro-nome').textContent = '';
    }
    
    if (descricao.value.trim() === '') {
        document.getElementById('erro-descricao').textContent = 'A descrição é obrigatória';
        valido = false;
    } else {
        document.getElementById('erro-descricao').textContent = '';
    }
    
    return valido;
}

function cadastrarItem(event) { // essa função cadastra um item
    event.preventDefault();
    
    if (!validarFormulario()) {
        return;
    }
    
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    
    const novoItem = {
        id: Date.now(),
        nome: nome,
        descricao: descricao,
        categoria: categoria,
        dataCadastro: new Date().toLocaleString()
    };
    
    itensCadastrados.push(novoItem);
    
    formCadastro.reset();
    
    alert('Item cadastrado com sucesso!');
    
    atualizarLista();
}

function atualizarLista() { // essa funcão atualiza a lista de itens
    listaItens.innerHTML = '';
    
    if (itensCadastrados.length === 0) {
        listaItens.innerHTML = '<p>Nenhum item cadastrado ainda.</p>';
        return;
    }
    
    itensCadastrados.forEach(item => {
        const divItem = document.createElement('div');
        divItem.className = 'item';
        divItem.innerHTML = `
            <div>
                <h3>${item.nome}</h3>
                <p><strong>Categoria:</strong> ${item.categoria}</p>
                <p>${item.descricao}</p>
                <small>Cadastrado em: ${item.dataCadastro}</small>
            </div>
            <button onclick="removerItem(${item.id})">Remover</button>
        `;
        listaItens.appendChild(divItem);
    });
}

function removerItem(id) { // essa função remove um item
    if (confirm('Tem certeza que deseja remover este item?')) {
        itensCadastrados = itensCadastrados.filter(item => item.id !== id);
        atualizarLista();
    }
}

formCadastro.addEventListener('submit', cadastrarItem); // listeners

mostrarSecao('cadastro');