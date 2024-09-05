# InvApp

## Descrição

-   Aplicação Full-Stack desenvolvida utilizando do framework Next.js com TypeScript que possibilita o gerenciamento de invoices de clientes;
-   Validação e serialização de dados provenientes dos formulários de cadastro e edição de invoices, e também de login de usuário. Para essa funcionalidade foi utilizada a biblioteca Zod em conjunto com Server Actions;
-   Interação com o banco de dados PostgreSQL é efetuada utilizando de Server Actions e Server Components, garantindo assim segurança para leitura e escrita no banco de dados;
-   Autenticação e proteção de rotas por meio de credenciais de usuário;
-   Utilização da funcionalidade de streaming e pré renderização parcial das rotas, viabilizando assim uma melhor performance da aplicação e consequentemente melhor experiência para o usuário;
-   Tratamento customizado de erros;
-   Otimização de metadados da aplicação visando otimização de SEO;
-   Aplicação responsiva para visualização em diferentes dispositivos.

## Tecnologias utilizadas

-   [Next.js](https://nextjs.org/): Framework React.js;
-   [Prisma](https://www.prisma.io/): ORM utilizado em conjunto do PostgreSQL;
-   [PostgreSQL](https://www.postgresql.org/): Sistema de banco de dados relacional;
-   [Zod](https://zod.dev/): Validação de dados;
-   [Auth.js](https://authjs.dev/): Autenticação de usuário;
-   [Tailwind](https://tailwindcss.com/): Estilização das interfaces de usuário;

## Funcionalidades da aplicação

Como se trata de uma aplicação simulada, o banco de dados será populado com dados fictícios de usuário, clientes e invoices ao efetuar a migração do banco de dados PostgreSQL.
Dessa forma, utilizar as credenciais a seguir para login na plataforma:

-   E-mail: johndoe@johndoe.io
-   Password: 123456

1. Após login e autenticação, o usuário é direcionado para o a página principal do dashboard:
    - Visualizar a relação das últimas 5 invoices criadas;
    - Visualizar de forma gráfica o faturamento acumulado para os últimos 12 meses;
    - Visualizar cards com informações diversas relacionadas aos clientes e ao faturamento (valor total pago, valor total pendente, número total de invoices e número total de clientes).
2. Na página "Invoices":
    - Visualizar a relação completa de invoices registradas e seus respectivos dados (cliente, e-mail, valor, data e status);
    - Filtrar invoices por nome do cliente, e-mail ou status;
    - Criar nova invoice;
    - Editar invoice;
    - Excluir invoice.
3. Na página "Customers":
    - Visualizar a relação de clientes cadastrados (nome, e-mail, número total de invoices, valor total pendente e valor total pago);
    - Filtrar clientes por nome ou e-mail.

## Pré-requisitos

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/en)
-   [pnpm](https://pnpm.io/)
-   [PostgreSQL](https://www.postgresql.org/)

## Clonando o projeto

```bash
git clone <github template url> <project_name>
```

## Instalando dependências

```bash
cd <project_name>
pnpm install
```

## Criando o banco de dados PostgreSQL

```bash
psql -c "CREATE DATABASE 'db_name';"
```

## Variáveis de ambiente

Copie o arquivo '.env.example' e o renomeie para '.env'. Substitua os valores das variáveis de ambiente presentes no arquivo, para os valores de suas credenciais.

Esse projeto utiliza as seguintes variáveis de ambiente:

| Nome         | Descrição                                         | Obrigatório |
| ------------ | ------------------------------------------------- | ----------- |
| DATABASE_URL | Credenciais do banco de dados                     | [x]         |
| AUTH_SECRET  | Chave secreta do Token de autenticação de usuário | [x]         |

## Migração e seed do banco de dados

Migração das tabelas do banco de dados:

```bash
pnpm run migrate:dev
```

Por se tratar de uma aplicação simulada, é necessário popular o banco de dados com informações fictícias:

```bash
npx prisma db seed
```

## Inicialização da aplicação

O servidor roda, por padrão, na porta 3000.

```bash
pnpm run dev
```

Navegue até http://localhost:3000 para acessar a aplicação.
