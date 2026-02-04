
# Plano: Formulário de Associação com Envio de Email

## Objetivo
Criar um formulário simplificado de "Quero me associar" que envia os dados por email para dois destinatários:
- eduardo@fastconstrutora.com.br
- secretaria@abiesv.org.br

## Análise do Formulário Atual vs. Original

O documento original da ABIESV tem campos extensos:
- Razão Social, Nome Fantasia, CNPJ, Inscrição Estadual
- Dois endereços completos (correspondência e cobrança)
- Contato principal e suplente
- Indicante e Sindicante
- Declarações e assinaturas

O formulário atual já é simplificado e contém os campos essenciais para primeiro contato. Manteremos essa abordagem.

## Campos do Formulário Simplificado

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Nome do contato | texto | Sim |
| Empresa | texto | Sim |
| E-mail | email | Sim |
| Telefone/WhatsApp | tel | Sim |
| Perfil | radio (Indústria/Serviços ou Varejo) | Sim |
| Mensagem | textarea | Não |
| Aceite LGPD | checkbox | Sim |

## Arquitetura da Solução

```text
+----------------+       +----------------------+       +---------+
|   Formulário   | ----> | Supabase Edge        | ----> | Resend  |
|   React        |       | Function             |       |   API   |
|   (frontend)   |       | send-association     |       |         |
+----------------+       +----------------------+       +---------+
                                    |
                                    v
                         +--------------------+
                         | Emails enviados:   |
                         | - eduardo@fast...  |
                         | - secretaria@...   |
                         +--------------------+
```

## Etapas de Implementação

### 1. Configurar Resend API Key
Será necessário que você:
1. Crie uma conta em [resend.com](https://resend.com)
2. Verifique um domínio (ex: abiesv.org.br) em [resend.com/domains](https://resend.com/domains)
3. Crie uma API Key em [resend.com/api-keys](https://resend.com/api-keys)
4. Forneça a API Key para salvar como secret no projeto

### 2. Criar Supabase Edge Function
Criar `supabase/functions/send-association/index.ts` que:
- Recebe os dados do formulário via POST
- Valida os campos obrigatórios
- Formata um email HTML profissional com os dados
- Envia para os dois destinatários usando Resend
- Retorna sucesso ou erro

### 3. Atualizar Formulário
Modificar `src/pages/AssocieSe.tsx` para:
- Adicionar validação com Zod (segurança)
- Chamar a edge function ao submeter
- Exibir feedback de sucesso/erro
- Tratar estados de loading

### 4. Atualizar Configuração Supabase
Criar/atualizar `supabase/config.toml` para registrar a nova função.

---

## Detalhes Técnicos

### Edge Function - send-association
```text
Endpoint: POST /functions/v1/send-association

Request Body:
{
  "nome": string,
  "empresa": string,
  "email": string,
  "telefone": string,
  "perfil": "industria" | "varejo",
  "mensagem": string (opcional)
}

Response Success (200):
{ "success": true }

Response Error (400/500):
{ "error": "mensagem de erro" }
```

### Template do Email
O email enviado terá formato HTML profissional com:
- Logo da ABIESV (ou fallback texto)
- Título: "Nova Solicitação de Associação"
- Dados do interessado formatados
- Data/hora do envio

### Validação com Zod
```text
- nome: string, trim, min 2 chars, max 100 chars
- empresa: string, trim, min 2 chars, max 200 chars  
- email: string, trim, email válido, max 255 chars
- telefone: string, trim, min 8 chars, max 20 chars
- perfil: enum ["industria", "varejo"]
- mensagem: string, trim, max 1000 chars (opcional)
```

---

## Pré-requisitos para Implementação

Antes de implementar, você precisará:

1. **Criar conta no Resend** (se ainda não tiver): https://resend.com
2. **Verificar domínio** no Resend para poder enviar emails "from" um endereço profissional
3. **Gerar API Key** no Resend
4. **Fornecer a API Key** quando solicitado - ela será salva de forma segura como secret do projeto

Após aprovação do plano, solicitarei a API Key para prosseguir com a implementação.
