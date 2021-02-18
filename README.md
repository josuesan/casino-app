This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Information

Casino is a project development used React and React Material UI. Is simple project to game a casino like a star.
This app include features like Sign in, Table record of all your spins, Awesome prizes and notifications...

### How Start the project

This project is now hosted on this url [http://localhost:3000](http://localhost:3000)
Also if you can run in your own PC, this project have two alternative

1- Downland source code, install the modules and finally run `npm start`.

2- Thisproject have a Dockerfile So you can use the build command `docker build -t casino-app .` to create your own project image and thus be able to use it without having to have certain programs like node installed on your computer. After you build teh image, the next command you need to run is `docker run -p 3000:3000 casino-app`.
