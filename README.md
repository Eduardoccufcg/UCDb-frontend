# UCDb - Front-end
Projeto final da disciplina Projeto de Software na Universidade Federal de Campina Grande no período 2019.1

## Sobre o desenvolvimento

O projeto foi desenvolvido puramente com HTML/CSS/JavaScript, não utilizamos nenhum framework para o desenvolvimento.
Está disponível em [https://ucdbapp.herokuapp.com](https://ucdbapp.herokuapp.com).

A estrutura do projeto consiste:

```
|---
---| components
---| pages
---| services
```

A pasta `components` incluí todos os *web components* criados para melhorar o reaproveitamento do código.

### Web Components

#### `alert-message`

Componente responsável por gerar um *widget* de notificação na aplicação.

```html
<alert-message message="Isso é um alerta!" type="error"></alert-message>
```

O atributo `type` pode ser do tipo `error` ou `success`. E o atributo `message` compõe a message a ser exibida no alerta.

#### `button-like`

*Widget* de comportamento *toggle* é utilizado para exibir se o usuário curtiu ou não a disciplina atual.

```html
<button-like liked="true" counter="10"></button-like>
```

O atributo `counter` determina a quantidade de curtidas e o atributo booleano `liked` determina se o botão está `checked` 
ou não. Isto é útil para simbolizar se o usuário logado curtiu ou não a disciplina visualizada.
O componente disponibiliza o evento customizado `like` que dará como vantagem o desacoplamento e a possbilidade de 
utilizar *listeners* específicos em cada momento.

### `comment-item`

```html
<comment-item code="1" show-remove="true" message="Comentário bacana." author="Julia Alves"></comment-item>
```

Componente responsável por exibir um comentário com os atributos `code` (id do comentário), `message` (texto do comentário),
`author` (autor do comentário) e `show-remove` (atributo booleano afim de definir se o comentário irá permitir a ação de removê-lo).
Além dos atributos customizados, o `comment-item` disponibiliza dos seguintes eventos customizados:
- `reply`: disparado quando o *link* de reposta é clicado, exibindo também um formulário.
- `remove`: acionado quando o *link* de remover é clicado. No contexto dessa aplicação, só será exibido quando o usuário 
logado for o autor do comentário.

O comentário exibe um avatar específico para cada author, é utilizado o *webservice* [robohash](https://robohash.org/)
para gerar aleatóriamente os avatares.

### `header-menu`

```html
<header-menu logged="true" username="Julia Alves"></header-menu>
```

Componente responsável por exibir o menu principal da aplicação. Possui os atributos `username` (nome do usuário logado) 
e `logged` (atributo booleano afim de definir se o usuário está logado na aplicação). O atributo `loggged` quando `true`
exibe os menus específicos de usuário logado.
O `header-menu` disponibiliza o evento customizado `logout` disparado quando o item do menu *Sair* foi clicado.
logado for o autor do comentário.

### `ranking-item`

```html
<ranking-item code="1" name="Estatística" counter="10" position="1"></ranking-item>
```

Componente responsável por exibir um item de listagem do *ranking*. Possui os atributos `code` (id da disciplina), 
`name` (nome da disciplina), `counter` (o quantitativo, no contexto da aplicação, o total de comentário ou curtidas) 
e `position` (a posição na listagem).

### `subject-item`

```html
<subject-item code="1" name="Estatística" show-detail="true"></subject-item>
```

Componente responsável por exibir um item de uma listagem, no caso da aplicação, a listagem de resultados da busca. 
Possui os atributos `code` (id da disciplina), `name` (nome da disciplina), `show-remove` (atributo booleano afim de 
definir se o irá permitir ao usuário logado acessar os detalhes da disciplina).

Os componentes `subject-item` e `ranking-item` disponibilizam o evento customizado `detail` disparado quando o botão 
*Visualizar* for clicado.

## Arquitetura

O projeto utiliza a [arquitetura MVC](https://github.com/daltonserey/projsw-20191/blob/master/06.web_apps/1-padrao_mvc/text.md), os *controllers* se encontram na pasta `pages` juntamente com a *views*, os 
serviços de acesso a *API* estão na pasta `services`.

A camada da *view* utiliza da componentização e a programação baseada em eventos.

## Desenvolvedores

- [Eduardo Pereira](https://github.com/Eduardoccufcg)
- [Júlia Fernandes Alves](https://github.com/juliafealves)
