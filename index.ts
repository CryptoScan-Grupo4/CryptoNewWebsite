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

app.post('/cadastrarSetor', async (req, res) => {
  const andar = req.body.andar
  const codFunc = req.body.codFunc
  const codEmp = req.body.codEmp

  await prisma.setor.create({
    data: {
      Andar: andar,
      fkEmpresa: codEmp,
      fkFuncionarioResponsavel: codFunc
    }
  })
  res.status(201).send("Setor criado com sucesso")
})

app.post('/cadastrarComputador', async (req, res) => {
  const serial = req.body.serial
  const codSetor = req.body.codSetor
  const status = req.body.status
  const codEmp = req.body.codEmp

  await prisma.computador.create({
    data: {
      serialComputador: serial,
      fkEmpresa: codEmp,
      fkSetor: codSetor,
      statusAtividade: status
    }
  })
  res.status(201).send("Computador cadastrado com sucesso")
})

app.get('/funcionario', async (req, res) => {
  const email: any = req.query.email
  const senha: any = req.query.senha

  try {
    const users = await prisma.funcionario.findFirst({
      where: {
        emailFuncionario: email,
        Senha: senha
      },
      select:{
        nomeFuncionario: true,
        emailFuncionario: true,

      }
    })
    res.status(200).send(users)
  } catch (error) {
    res.status(404).json(error)
  }
})

app.get('/computer', async (req, res) => {
  try {
    const computers = await prisma.computador.findMany({
      select: {
        idComputador: true,
        serialComputador: true,
        statusAtividade: true,
        empresa: {
          select: {
            nomeEmpresa: true
          }
        },
        setor: {
          select: {
            Andar: true
          }
        }
      }
    })
    res.status(200).send(computers)
  } catch (error) {
    res.status(404).json(error)
  }
})

app.get('/sector', async (req, res) => {
  try {
    const sectors = await prisma.setor.findMany({
      select: {
        idSetor: true,
        Andar: true,
        empresa: {
          select: {
            nomeEmpresa: true
          }
        },
        funcionario: {
          select: {
            nomeFuncionario: true
          }
        }
      }
    })
    res.status(200).send(sectors)
  } catch (error) {
    res.status(404).json(error)
  }
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



// Dashboard

app.get('/dadosProcessador', async (req, res) => {
  try {
    const cpuData = await prisma.medida.findMany({
      where: {
        componente: {
          tipoComponente: "Processador"
        }
      },
      orderBy:{
        dataHoraMedida: 'desc'
      },
      take: 11
    })
    res.status(200).send(cpuData)
  } catch (error) {
    res.status(404).json("Não foi possível encontrar")
    console.error(error)
  }
})

app.get('/dadosRam', async (req, res) => {
  try {
    const ramData = await prisma.medida.findMany({
      where: {
        componente: {
          tipoComponente: "Memoria RAM"
        }
      },
      orderBy:{
        dataHoraMedida: 'desc'
      },
      take: 11
    })
    res.status(200).send(ramData)
  } catch (error) {
    res.status(404).json("Não foi possível encontrar")
    console.error(error)
  }
})

app.get('/dadosDisco', async (req, res) => {
  try {
    const discoData = await prisma.medida.findMany({
      where: {
        componente: {
          tipoComponente: "HD"
        }
      },
      orderBy:{
        dataHoraMedida: 'desc'
      },
      take: 11
    })
    res.status(200).send(discoData)
  } catch (error) {
    res.status(404).json("Não foi possível encontrar")
    console.error(error)
  }
})
app.get('/dadosGpu', async (req, res) => {
  try {
    const gpuData = await prisma.medida.findMany({
      where: {
        componente: {
          tipoComponente: "GPU"
        }
      },
      orderBy:{
        dataHoraMedida: 'desc'
      },
      take: 11
    })
    res.status(200).send(gpuData)
  } catch (error) {
    res.status(404).json("Não foi possível encontrar")
    console.error(error)
  }
})
