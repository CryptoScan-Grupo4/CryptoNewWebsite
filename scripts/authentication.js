const usuarios = []

let id = 0

function register(email, senha, nome, sobrenome, empresa) {
  usuarios.push({
    id: id += 1,
    nome: nome,
    sobrenome: sobrenome,
    email: email,
    senha: senha,
    empresa: empresa
  })
}

function login() {
  let email = iptEmail.value
  let senha = iptSenha.value
  if (email == "admin@crypto.com" && senha == "crypto123") {
    alert("Seu login foi realizado com sucesso")
  } else {
    alert("E-mail e/ou senha incorreto !!")
  }
}
