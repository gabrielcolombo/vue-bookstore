# Vue Bookstore

A book listing app made with Vue.

[![A book listing app made with Vue by Gabriel Colombo](thumbnail.png)](demo.webm)

## Environment setup

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

## Running the project

### For production

1 - Clone this repository to your machine

```
git clone https://github.com/gabrielcolombo/vue-bookstore
```

2 - Navigate into the project's folder

```
cd vue-bookstore
```

3 - Build the project inside of the container

```
docker build -t gabrielcolombo/vue-bookstore .
```

4 - Run the docker container

```
docker run -it -p 8080:80 -d --name vue-bookstore gabrielcolombo/vue-bookstore
```

5 - Navigate to the home page using your browser of choice

```
http://localhost:8080
```

### For development

1 - Clone this repository to your machine

```
git clone https://github.com/gabrielcolombo/vue-bookstore
```

2 - Navigate into the project's folder

```
cd vue-bookstore
```

3 - Install the project's dependencies

```
npm install
```

4 - Start the development server

```
npm run dev
```

5 - Navigate to the home page using your browser of choice

```
http://localhost:3000
```

## Technologies used

- Framework: [Vue 3](https://v3.vuejs.org/)
- State management: [Vuex](https://vuex.vuejs.org/)
- Routing: [Vue Router](https://router.vuejs.org/)
- HTTP client: [Axios](https://github.com/axios/axios)
- Styling: [SCSS](https://sass-lang.com/)
- Icons: [CSS Icons](http://css.gg/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- API: [ITBooks](https://api.itbook.store/#api-overview)

## Roadmap

- [x] Catalog page
- [x] Cart page
- [x] LocalStorage
- [x] Docker
- [ ] Theming
- [ ] Storybook
- [ ] Unit tests
