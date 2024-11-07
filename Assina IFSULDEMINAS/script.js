function atualizarLocalTrabalho() {
    const localTrabalho = document.getElementById('localTrabalho').value;
    google.script.run.withSuccessHandler(function (info) {
        document.getElementById('logoLocal').src = info.logo;
        document.getElementById('endereco').value = info.endereco;
        document.getElementById('site').value = info.site;
        document.getElementById('telefoneLocal').value = info.telefone;

        const redesContainer = document.getElementById('redesSociaisContainer');
        redesContainer.innerHTML = '';
        info.redesSociais.forEach(function (rede) {
            const img = document.createElement('img');
            img.src = rede.logo;
            img.className = 'logo-social';
            const a = document.createElement('a');
            a.href = rede.link;
            a.appendChild(img);
            redesContainer.appendChild(a);
        });

        // Preencher o select dos setores com as opções disponíveis
        const setorSelect = document.getElementById('setor');
        setorSelect.innerHTML = ''; // Limpar opções existentes
        info.setores.forEach(function (setor) {
            const option = document.createElement('option');
            option.value = setor.nome;
            option.text = setor.nome;
            option.dataset.site = setor.site;  // Adicionando o site no data-site
            setorSelect.appendChild(option);
        });


        document.getElementById('imgFinalPreview').src = info.imagemFinal;
        document.getElementById('infoLocalTrabalho').style.display = 'block';
    }).getLocalTrabalhoInfo(localTrabalho);
}

function formatarTelefone(input) {
    input.value = input.value.replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
}

function formatarCelular(input) {
    input.value = input.value.replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{1})(\d{4})(\d)/, '$1 $2-$3');
}

document.getElementById('telefone').addEventListener('input', function () {
    formatarTelefone(this);
});

document.getElementById('celular').addEventListener('input', function () {
    formatarCelular(this);
});

const form = document.getElementById('formAssinatura');
const inputs = form.querySelectorAll('input[required], select[required]');
const gerarAssinaturaBtn = document.getElementById('gerarAssinaturaBtn');

function validarFormulario() {
    let valido = true;
    inputs.forEach((input) => {
        const errorMessage = input.nextElementSibling; // A mensagem de erro associada
        if (!input.value) {
            input.classList.add('invalid');
            errorMessage.style.display = 'inline'; // Mostrar a mensagem de erro
            valido = false;
        } else {
            input.classList.remove('invalid');
            errorMessage.style.display = 'none'; // Ocultar a mensagem de erro
        }
    });
    gerarAssinaturaBtn.disabled = !valido;
}

inputs.forEach((input) => {
    input.addEventListener('input', validarFormulario);
});

function gerarAssinatura() {
    const form = document.getElementById('formAssinatura');
    const fotoOpcao = document.getElementById('fotoOpcao').value;

    const dados = {
        nome: form.nome.value,
        cargo: form.cargo.value,
        telefone: form.telefone.value,
        celular: form.celular.value || '', // Previne campos vazios
        email: form.email.value,
        endereco: form.endereco.value,
        site: form.site.value || '', // Previne campos vazios
        telefoneLocal: form.telefoneLocal.value || '',
        setor: form.setor.value,
        siteSetor: form.setor.selectedOptions[0]?.dataset.site || '#', // Previne undefined
        redesSociais: document.getElementById('redesSociaisContainer').innerHTML,
        imgFinal: document.getElementById('imgFinalPreview').src,
        imgLogo: document.getElementById('logoLocal').src,
        foto: (fotoOpcao === 'comFoto')
    };

    // Geração de foto (se a opção de incluir estiver marcada)
    let fotoHtml = '';
    if (dados.foto) {
        fotoHtml = `
<td style="text-align: center; width: 125px;">
    <div style="width: 125px; height: 125px; border: 2px solid #00b050; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <img src="https://portal.ifsuldeminas.edu.br/images/comunica%C3%A7%C3%A3o/ASSINA_IFSULDEMINAS.png" alt="Logo Foto de Perfil" width="125" style="object-fit: cover;">
    </div>
</td>`;
    }

    // Evitar problemas ao concatenar strings com HTML
    let celularHtml = '';
    if (dados.celular) {
        celularHtml = `
    <div style="color: black; margin-bottom: 10px; font-size: 13px; vertical-align: middle;"> 
        <img src="https://portal.ifsuldeminas.edu.br/images/comunica%C3%A7%C3%A3o/Icones/celular.png" alt="Celular" width="15"> 
        Celular: <a href="tel:${dados.celular}" style="color: black; font-size: 13px;">
            <strong>${dados.celular}</strong></a>
    </div>`;
    }

    // Geração de foto (se a opção de incluir estiver marcada)
    let telefoneHtml = '';
    if (dados.telefone) {
        telefoneHtml = `
    <div style="color: black; margin-bottom: 10px; font-size: 13px; vertical-align: middle;">
              <img src="https://portal.ifsuldeminas.edu.br/images/comunica%C3%A7%C3%A3o/Icones/telefone.png" alt="Telefone" width="15">  Telefone: <a href="tel:${dados.telefone}" style="color: black; font-size: 13px;">
                    <strong>${dados.telefone}</strong></a>
            </div>
`;
    }

    // Garantir que os dados e URLs estejam corretamente escapados
    const siteSetorEscaped = encodeURIComponent(dados.siteSetor);
    const siteEscaped = encodeURIComponent(dados.site);

    // Corrigir o ícone de email e o funcionamento do mailto
    const emailHtml = `
<div style="color: black; margin-bottom: 10px; font-size: 13px; vertical-align: middle;">
    <img src="https://portal.ifsuldeminas.edu.br/images/comunica%C3%A7%C3%A3o/Icones/e-mail.png" alt="E-mail" width="15"> 
    E-mail: <a href="mailto:${dados.email}" style="color: #00b050; font-size: 13px;">
        <strong>${dados.email}</strong></a>
</div>
`;

    const iconeTelefone = `
<img src="https://portal.ifsuldeminas.edu.br/images/comunica%C3%A7%C3%A3o/Icones/telefone.png" alt="Telefone" width="15"> 
`;

    const iconeLocal = `
<img src="https://portal.ifsuldeminas.edu.br/images/comunica%C3%A7%C3%A3o/Icones/localizacao.png" alt="Telefone" width="15"> 
`;

    const iconeSite = `
<img src="https://portal.ifsuldeminas.edu.br/images/comunica%C3%A7%C3%A3o/Icones/site.png" alt="Telefone" width="15"> 
`;

    const setorHtml = `
<div style="color: black; margin-bottom: 10px; font-size: 13px; vertical-align: middle;">
          <img src="https://portal.ifsuldeminas.edu.br/images/comunica%C3%A7%C3%A3o/Icones/Setor.png" alt="Telefone" width="15">   Setor: <strong>${dados.setor}</strong>
            </div>
`;

    const siteSetorHtml = `
<div style="color: black; margin-bottom: 10px; font-size: 13px; vertical-align: middle;">
          <img src="https://portal.ifsuldeminas.edu.br/images/comunica%C3%A7%C3%A3o/Icones/site.png" alt="Telefone" width="15"><a href="${dados.siteSetor}" target="_blank" style="color: #00b050; font-size: 13px;">
                    <strong>Página do Setor</strong>
                </a>
            </div>
`;

    const localHtml = `
<div style="font-style: italic; color: #999999; font-size: 13px; margin-top: 10px;">
        <img src="https://portal.ifsuldeminas.edu.br/images/comunica%C3%A7%C3%A3o/Icones/localizacao.png" alt="Telefone" width="15">    ${dados.endereco}
        </div>
`;

    // Atualizando a assinatura gerada
    document.getElementById('assinaturaPreview').innerHTML = `
<table>
    <tr>
        ${fotoHtml}
        <td colspan="1" style="padding-left: 10px; vertical-align: middle; width: 325px;">
            <div style="color: #00b050; font-size: 20px;">
                <strong>${dados.nome}</strong>
            </div>
            <div style="font-style: italic; color: #999999; font-size: 16px;">
                ${dados.cargo}
            </div><br>
            ${telefoneHtml}
            ${celularHtml}
            ${emailHtml}
            ${setorHtml}
            ${siteSetorHtml}
        </td>
        <td colspan="1" style="border-left: 2px solid #00b050; width: 250px;">
            <div style="padding-left: 10px;">
                <div style="text-align: center;">
                    <img src="${dados.imgLogo}" alt="Logo do Local" width="150">
                </div>
                <div style="font-style: italic; color: #999999; font-size: 13px; margin-top: 10px;">
            ${localHtml}
        </div>
                <div style="font-size: 13px; margin-top: 10px; vertical-align: middle;">
        ${iconeSite}
            <a href="${dados.site}" target="_blank" style="color: #00b050;">
                <strong>Portal Institucional</strong>
            </a>
        </div>
                <div style="color: black; margin-top: 10px; font-size: 13px; vertical-align: middle;">
          ${iconeTelefone}  Telefone: <a href="tel:${dados.telefoneLocal}" style="color: black; font-size: 13px;">
                <strong>${dados.telefoneLocal}</strong></a>
        </div>
                <div class="redessociais" style="margin-top: 15px; height: 25px; border: 1px solid #fff;">
                    ${dados.redesSociais}
                </div>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="padding-top: 20px; text-align: center; width: 700px;">
            <img src="${dados.imgFinal}" alt="Imagem Final" width="550px">
        </td>
    </tr>
</table>
`;

    // Mostrar a assinatura e esconder o formulário
    form.style.display = 'none';
    document.getElementById('assinaturaPronta').style.display = 'block';
}

function voltarFormulario() {
    document.getElementById('formAssinatura').style.display = 'block';
    document.getElementById('assinaturaPronta').style.display = 'none';
}

// Função para integrar a assinatura com o Gmail
function integrarGmail() {
    const assinaturaHtml = document.getElementById('assinaturaPreview').innerHTML;
    google.script.run.withSuccessHandler(function (sucesso) {
        if (sucesso) {
            alert('Assinatura integrada com sucesso!');
        } else {
            alert('Houve um erro ao integrar a assinatura.');
        }
    }).salvarAssinatura(assinaturaHtml);
}