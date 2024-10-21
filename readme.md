# Teste Técnico Portdata

Esse repositório contém o teste técnico portdata realizado com Vue/Node/MySql.

## Tabela de Conteúdo

- [Instalação](#instalação)
- [Uso](#uso)


## Instalação

Intruções para rodar o projeto. Para rodar o projeto se faz necessário ter o docker composer instalado. Esse projeto tem 2 formas de rodar o backend para escolha.

```bash
# Clone o repositório
git clone https://github.com/Arturstriker3/test-portdata

# Navegue até o diretório do projeto
cd test-portdata

# Execução 1: Com o composer instalado execute o comando para rodar o banco de dados e backend juntos dockerizados
docker-compose up -d

# Execução 2: Com o composer instalado execute o comando para rodar somente o banco de dados e depois rode a api separadamente
cd db
docker-compose up -d
cd ..
cd back
npm install
npm run dev
```

## Uso

Para experimentar o projeto rodando precisa somente executar o index.html dentro da pasta front.