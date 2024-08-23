class Funcionario{
    constructor(nome, idade, cargo){
        this.nome = nome
        this.idade = idade
        this.cargo = cargo
    }


    seApresentar(){
        return `"Olá, sou ${this.nome}, tenho ${this.idade} anos."`;
    }

    getNome(){
        return this.nome
    }

    getIdade(){
        return this.idade
    }

    getCargo(){
        return this.cargo
    }


    trabalhar(){
        return `${this.nome} está trabalhando`;
    }
}


class Gerente extends Funcionario{
    constructor(nome, idade, cargo, departamento){
        super(nome, idade, cargo)
        this.departamento = departamento
    }


    gerenciar(){
        return `${this.nome} está gerenciando o departamento de ${this.departamento}`;
    }

    getDepartamento(){
        return this.departamento
    }

}


class Desenvolvedor extends Funcionario{
    constructor(nome, idade, cargo, linguagem){
        super(nome, idade, cargo)
        this.linguagem = linguagem
        }


    programar(){
        return `${this.nome} está programando em ${this.linguagem}`;
    }

    getLanguage(){
        return this.linguagem
    }
}


function showFuncionário(funcionario){
    let form = document.getElementById('form')
    form.style.display = 'none'
    let apresentacao = document.getElementById('apresentacao')
    apresentacao.style.display='flex'
    let nome = document.getElementById('NomeApresentação')
    let idade = document.getElementById('IdadeApresentação')
    let cargo = document.getElementById('CargoApresentação')
    let especialidade = document.getElementById('Especialidade')
    let apresentar = document.getElementById('apresentarFuncionario')

    nome.textContent = funcionario.getNome()
    idade.textContent = funcionario.getIdade()
    cargo.textContent = funcionario.getCargo()
    apresentar.innerHTML = `${funcionario.seApresentar()}<br><br>${funcionario.trabalhar()}<br><br>${funcionario instanceof Desenvolvedor ? funcionario.programar() : funcionario.gerenciar()}`
    if (funcionario.getCargo() === 'desenvolvedor'){
        let language = funcionario.getLanguage()
        especialidade.innerHTML = `Linguagem:<span>${language}</span>`
    } else{
        let departamento = funcionario.departamento()
        especialidade.innerHTML = `departamento:<span>${departamento}</span>`
    }
}


function escolhaArea(area){
    console.log(area);
    let form = document.getElementById('form')
    try{
      if (document.getElementById('desenvolvedor_choice')){
        form.removeChild(document.getElementById('desenvolvedor_choice'))
        form.removeChild(document.getElementById('button'))
      } else if(document.getElementById('gerente_choice')){
        form.removeChild(document.getElementById('gerente_choice'))
        form.removeChild(document.getElementById('button'))
      } else{
        throw new Error('Nenhuma escolha ainda')
      }  
    } catch(error){
        console.log(error)
    }

    if(area == "gerente"){
        let div = document.createElement('div')
        let divButton = document.createElement('div')
        
        div.className = 'item'
        div.id='gerente_choice'
        div.innerHTML = '<label for="departamento">Digite seu Departamento</label><input type="text" id="departamento" placeholder="departamento">'
        
        divButton.className = 'item'
        divButton.id = 'button'
        divButton.innerHTML = '<p id="errorMessage"></p><button type="submit">Adicionar Funcionário</button>'

        form.appendChild(div)
        form.appendChild(divButton)
    } else{
        let div = document.createElement('div')
        let divButton = document.createElement('div')

        div.className = 'item'
        div.id='desenvolvedor_choice'
        div.innerHTML = '<label for="linguagem">Digite sua Linguagem</label><input type="text" id="linguagem" placeholder="linguagem">'
        
        divButton.className = 'item'
        divButton.id = 'button'
        divButton.innerHTML = '<p id="errorMessage"></p><button type="submit">Adicionar Funcionário</button>'


        form.appendChild(div)
        form.appendChild(divButton)
    }
}

function enaltecerErro(nome){
    let input = document.getElementById(nome)
    input.style.border = '2px solid #850000'
    input.style.boxShadow = '0px 0px 10px #850000'
}


function exibirErro(erro){
    if (erro.message === 'O nome não foi preenchido'){
        enaltecerErro('nome')
        errorMessage.innerHTML = 'O nome não foi preenchido'
    }
    if (erro.message === 'A idade não está dentro do intervalo de 18 a 65'){
        enaltecerErro('idade')
        let errorMessage = document.getElementById('errorMessage')
        errorMessage.innerHTML = 'A idade não está dentro do intervalo de 18 a 65'
    }
    if (erro.message === 'A linguagem não foi preenchida'){
        enaltecerErro('linguagem')
        let errorMessage = document.getElementById('errorMessage')
        errorMessage.innerHTML = 'A linguagem não foi preenchido'
    }
    if (erro.message === 'O departamento não foi preenchido'){
        enaltecerErro('departamento')
        let errorMessage = document.getElementById('errorMessage')
        errorMessage.innerHTML = 'O departamento não foi preenchido'
    }
}


function createDev(nome, idade, cargo, ling){
    try{
        let dev = new Desenvolvedor(nome, idade, cargo, ling)
        return dev
    } catch (error){
        console.log(error)
    }
}

function createGer(nome, idade, cargo, depart){
    try{
        let ger = new Gerente(nome, idade, cargo, depart)
        return ger

    } catch (error){
        console.log(error)
    }
}


function checkForm(name, age, carg, ling, depart){
    if (name === '' || name.length === 0){
        throw new Error('O nome não foi preenchido')
    }
    if (age < 18 || age > 65){
        throw new Error('A idade não está dentro do intervalo de 18 a 65')    
    }
    if (carg === '' || carg.length === 0){
        throw new Error('O cargo não foi preenchido')    
    }
        
    if (carg === 'desenvolvedor'){
        if (ling === '' || ling.length === 0){
            throw new Error('A linguagem não foi preenchida')
    
        }
            
    }
    if (carg === 'gerente'){
        if (depart === '' || depart.length === 0){
            throw new Error('O departamento não foi preenchido')
            }
    }
    return true
}


function SubmitForm(event){
    event.preventDefault()
    let nome = document.getElementById('nome').value
    let idade = document.getElementById('idade').value
    let cargo = document.querySelector("input[type='radio'][name=cargo]:checked").value;
    let linguagem;
    let departamento;

    if (cargo === 'desenvolvedor'){
        linguagem = document.getElementById('linguagem').value
    } else{
        departamento = document.getElementById('departamento').value
    }

    
    try{
        var checked = checkForm(nome, idade, cargo, linguagem, departamento)
    } catch(error){
        exibirErro(error)
    }


    if (checked){
        if (cargo === 'desenvolvedor'){
            var dev = createDev(nome, idade, cargo, linguagem)
            showFuncionário(dev)
        } else{
            var ger = createGer(nome, idade, cargo, departamento)
            showFuncionário(ger)
        }
    }

}

var form = document.getElementById('form')
form.addEventListener('submit', SubmitForm)