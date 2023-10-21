import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000
const prisma = new PrismaClient()



app.use(express.json())
app.use(cors({
  origin: '*'
}))

app.listen(port, () => {
  console.log(`A executar na porta ${port}`)
})


app.post('/cadastrarFuncionario', async (req, res) => {
  const nome = req.body.nome
  const email = req.body.email
  const senha = req.body.senha
  const cpf = req.body.cpf
  const codEmp = req.body.codEmp
  const tipoConta = 1

  if (nome === "" || email === "" || senha === "" || cpf === "" || codEmp === "") {
    res.status(400).json("Preencha os campos corretamente")
  } else {
    await prisma.funcionario.create({
      data: {
        nomeFuncionario: nome,
        cpfFuncionario: cpf,
        emailFuncionario: email,
        Senha: senha,
        fkEmpresa: codEmp,
        fkTipoConta: tipoConta
      }
    })
    res.status(201).json("Usuário criado com sucesso")
  }
})

app.get('/funcionario', async (req, res) => {
  const email = req.body.email
  const senha = req.body.senha

  const users = await prisma.funcionario.findFirst({
    where: {
      emailFuncionario: email,
      Senha: senha
    }
  })
  res.status(200).send(users)
})

app.patch('/esqueciSenha/:id', async (req, res) => {
  const userId = Number(req.params.id)
  const userEmail = req.body.email
  const newPassword = req.body.senha

  try {
    const findEmail = prisma.funcionario.findFirst({
      where: {
        emailFuncionario: userEmail
      }
    })

    if (userEmail === findEmail) {
      await prisma.funcionario.update({
        where: {
          idFuncionario: userId
        },
        data: {
          Senha: newPassword
        }
      })
    }
  } catch (error) {
    res.status(404).json("Usuário não existe")
    console.error(error)
  }
})

app.delete('/deletarUsuario/:id', async (req, res) => {
  const userId = Number(req.params.id)
  try {
    await prisma.funcionario.delete({
      where: {
        idFuncionario: userId
      }
    })
  } catch (error) {
    res.status(304).json("Não foi possível deletar")
    console.error(error)
  }
})
