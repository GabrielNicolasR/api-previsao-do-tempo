const chavaDaApi = "0ac66853c647470d925231259240309";
const botaoDeBusca = document.querySelector(".btn-busca")
const mensagemDeErro = document.querySelector(".campo-obrigatorio")

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;


    if (cidade === '') {
        mensagemDeErro.innerHTML = '<p class="novo-html">*Cidade não informada!</p>';
        return;
    } else {
        mensagemDeErro.innerHTML = '';
    }
    
    const dados = await buscarDadosDaCidade(cidade);

    if(dados) preencherDadosNaTela(dados, cidade);
})


async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chavaDaApi}&q=${cidade}&aqi=no&lang=pt`;

    const resposta = await fetch(apiUrl);

    if(resposta.status !== 200) return;

    const dados = resposta.json()

    return dados;
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicaoDoClima = dados.current.condition.text;
    const humidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;

    document.getElementById("temperatura").textContent = `${temperatura} ºC`;

    document.getElementById("condicao-do-clima").textContent = condicaoDoClima;

    document.getElementById("humidade").textContent = `${humidade}%`

    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento}km/h`

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}