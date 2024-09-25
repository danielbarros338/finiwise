

# Finiwise

O Finiwise é um sistema de gestão financeira que permite aos usuários controlar suas finanças de forma eficiente e segura. Ele oferece uma API RESTful para realizar operações de gerenciamento de contas, transações e relatórios financeiros.

## Funcionalidades
- Criar e logar contas, para poder gerar tokens de acesso ao outros endpoints
- Criação, atualização, leitura e deletar registros de gastos e ganhos
- Relatórios inteligentes sobre os gastos e ganhos (**Próxima versão**)


## Endpoints Disponíveis
### auth/signin
Realiza o login da aplicação, retornando um `access_token` para ser utilizado no header das outras rotas.

**Request**\
*header*\
`Content-Type:` application/json

*body*
```json
{
    "email": "<<yourEmailHere>>",
    "password": "<<yourPasswordHere>>"
}
```

**Response - HTTP Status 200**
```json
{
    "access_token": "eyJhbGciOiJIUzI1N1IsInR5cCa6IkpXVCcC.eyJ1sc2VySWQiOjE4LCJ2aSdWruUlaWRtaW4iLCJlbWFpbCI6ImaRhSsdDDJhcnErcy5kZXYuY29udGF0b0BnbWFpbC5jb20iLCJpYXQiOjE3MjcyOTMxNTQsImV4cCI63RtyYa23CczE4NH0.DybJ47Efw02xWWHg6L0j5qa_w7CPr-4ChgbY51Aey8U"
}
```
---
### auth/signup
Realiza o cadastro de um novo usuário, retornando um `access_token` para já utilizar nos headers das outras rotas.\
Obs: A senha deve ter pelo menos: 
  - 1 caractere maiúsculo
  - 1 minúsculo
  - 1 caractere especial
  - 1 numérico
  - No mínimo, 8 caracteres no total

<br/>

**Request**
*header*\
`Content-Type:` application/json

*body*
```json
{
    "user": "<<yourUserHere>>",
    "email": "<<yourEmailHere>>",
    "password": "<<yourPasswordHere>>"
}
```

**Response - HTTP Status 201**
```json
{
    "access_token": "eyJhbGciOiJIUzI1N1IsInR5cCa6IkpXVCcC.eyJ1sc2VySWQiOjE4LCJ2aSdWruUlaWRtaW4iLCJlbWFpbCI6ImaRhSsdDDJhcnErcy5kZXYuY29udGF0b0BnbWFpbC5jb20iLCJpYXQiOjE3MjcyOTMxNTQsImV4cCI63RtyYa23CczE4NH0.DybJ47Efw02xWWHg6L0j5qa_w7CPr-4ChgbY51Aey8U"
}
```
---

### auth/verify-token
Faz a verificação da validade e autenticidade do token.

**Request**\
*header*\
`Content-Type`: application/json\
`Authentication`: <\<yourTokenHere>\>

*body*
```json
{}
```

**Response - HTTP Status 202**
```json
{
    "userId": 9999,
    "user": "user",
    "email": "email@email.com",
    "iat": 1234567890,
    "exp": 1234567890
}
```