var dbRef = firebase.database().ref('clientes'); 
const div_register = document.getElementById('div_register') // Área do formulário de cadastro
const div_list = document.getElementById('div_listing') // Área da listagem dos clientes
const bt_register = document.getElementById('bt_register') // Botão para mostrar formulário de cadastro de clientes
const bt_listing = document.getElementById('bt_listing') // Botão para mostrar área de listagem de clientes
const register = document.getElementById('register')  // Botão para cadastrar cliente no Firebase

// ESCONDE AS DUAS DIVS - CADASTRO E LISTAGEM
div_register.style.display='none'
div_edit.style.display = 'none'
div_list.style.display='flex'

// MOSTRA FORMULÁRIO DE CADASTRO
bt_register.addEventListener( 'click', () => {
    div_list.style.display = 'none'
    div_edit.style.display = 'none'
    div_register.style.display = 'flex'
});

// MOSTRA LISTAGEM DE CLIENTES
bt_listing.addEventListener( 'click', () => {
    div_register.style.display = 'none'
    div_edit.style.display = 'none'
    div_list.style.display = 'flex'
});

// CADASTRA CLIENTE NO BD
register.addEventListener( 'click', () => {
    const nome = document.getElementById('nome').value
    const sobrenome =  document.getElementById('sobrenome').value 
    const idade = document.getElementById('idade').value 
    const endereco = document.getElementById('endereco').value 
    const numero = document.getElementById('numero').value 
    
    dbRef.push (
        {
            nome: nome,
            sobrenome: sobrenome,
            idade: idade,
            endereco: endereco,
            numero: numero
        }
    ).then(() => {
        alert("Cliente Cadastrado com SUCESSO!")
        window.location.reload()
    }).catch((error) => {
        alert("Cliente NÃO pode ser cadastrado!")
    })
});


// LISTAGEM DOS CLIENTES
dbRef.orderByChild('idade').on('value', (snapshot) => {
    snapshot.forEach((item) => {
        

        var tbody = document.getElementById('table-body')
        var tr = document.createElement("tr")
        
        var td_nome = document.createElement("td")
            td_nome.innerHTML = item.val().nome
            td_nome.className = "table-td"
            tr.appendChild(td_nome)

        var td_sobrenome = document.createElement("td")
            td_sobrenome.innerHTML = item.val().sobrenome
            td_sobrenome.className = "table-td"
            tr.appendChild(td_sobrenome)

        var td_idade = document.createElement("td")
            td_idade.innerHTML = item.val().idade
            td_idade.className = "table-td"
            tr.appendChild(td_idade)

        var td_endereco = document.createElement("td")
            td_endereco.innerHTML = item.val().endereco
            td_endereco.className = "table-td"
            tr.appendChild(td_endereco)

        var td_numero = document.createElement("td")
            td_numero.innerHTML = item.val().numero
            td_numero.className = "table-td"
            tr.appendChild(td_numero)
            
        var button_delete = document.createElement("button")//Cria um botão 
            button_delete.innerHTML = "Excluir"
            button_delete.className = "button button-delete"
            button_delete.setAttribute("id",item.key ) // Atribui a key do dado do BD para o id do botão
            button_delete.onclick = () => {
                deleteClient(item.key)
            }
            tr.appendChild(button_delete)

        var button_edit = document.createElement("button") //Cria um botão 
            button_edit.innerHTML = "Editar"
            button_edit.className = "button button-edit"
            button_edit.setAttribute("id",item.key)
            button_edit.onclick = () => {
                editClient(item.key)
            }
            tr.appendChild(button_edit)


            tbody.appendChild(tr)


})
});


//EXCLUI CLIENTE
function deleteClient(id) {
    dbRef.child(id).remove().then(() => {
        div_list.style.display = 'none'
        alert("Cliente excluido com sucesso")
        window.location.reload()
    }).catch((error) => {
        alert("Cliente NÃO pode ser excluído!")
    }) 
}

//EDITA CLIENTE

function editClient(id) {
    div_list.style.display = 'none'
    div_edit.style.display = 'flex'
    div_register.style.display = 'none'

    var dbRefUpdate = firebase.database().ref('clientes').child(id)
    var date = []
    dbRefUpdate.on('value', (snapshot) => {
    snapshot.forEach( (item) => {
        date.push(item.val())
    });
    });
    
    var input_nome = document.getElementById('edit_nome')
    var input_sobrenome = document.getElementById('edit_sobrenome')
    var input_idade = document.getElementById('edit_idade')
    var input_endereco = document.getElementById('edit_endereco')
    var input_numero = document.getElementById('edit_numero')

    var nome = document.createElement("input")
        nome.type = "text"
        nome.id = "nome_edit"
        nome.className = "input"
        nome.value = date[2]
        input_nome.appendChild(nome)
        
    var sobrenome = document.createElement("input")
        sobrenome.type = "text"
        sobrenome.id = "sobrenome_edit"
        sobrenome.className = "input"
        sobrenome.value = date[4]
        input_sobrenome.appendChild(sobrenome)

    var idade = document.createElement("input")
        idade.type = "text"
        idade.id = "idade_edit"
        idade.className = "input"
        idade.value = date[1]
        input_idade.appendChild(idade)

    var endereco = document.createElement("input")
        endereco.type = "text"
        endereco.id = "endereco_edit"
        endereco.className = "input"
        endereco.value = date[0]
        input_endereco.appendChild(endereco)

    var numero = document.createElement("input")
        numero.type = "text"
        numero.id = "numero_edit"
        numero.className = "input"
        numero.value = date[3]
        input_numero.appendChild(numero)

        edit.addEventListener( 'click', () => {
            const nome = document.getElementById('nome_edit').value
            const sobrenome =  document.getElementById('sobrenome_edit').value 
            const idade = document.getElementById('idade_edit').value 
            const endereco = document.getElementById('endereco_edit').value 
            const numero = document.getElementById('numero_edit').value 
           
            dbRefUpdate.update (
                {
                    nome: nome,
                    sobrenome: sobrenome,
                    idade: idade,
                    endereco: endereco,
                    numero: numero
                }
            ).then(() => {
                alert("Cliente atualizado com SUCESSO!")
                window.location.reload()
            }).catch((error) => {
                alert("Cliente NÃO pode ser atualizado!")
            })
        });
}
