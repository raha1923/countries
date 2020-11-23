# Countries

This project is made for displaying all the worlds countries using [Countries Rest API](https://restcountries.eu). Implemented using [vue](https://vuejs.org) and [nuxt](https://nuxtjs.org).

Some of dependencies:
- vue Bootstrap
- vue Google Analytics
- i18n-iso-countries

## Run in dev mode
```bash
# install the dependencies
$ yarn install

# run in the dev mode
$ yarn dev
```

## Build for production (docker)
The project has been dockerized before and you can just run the following command to build the project image and run it:

```bash
# build the image
$ docker build -t countries:1.0.0 .

# run the image and make it available on the current machine
$ docker run -d -p 3000:3000  --name countries countries:1.0.0

# it's available on: http://localhost:3000
```
 
## Build for production

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```
