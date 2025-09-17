import app from './App.js'

// starting the server !!!

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on ${process.env.SERVER_PORT}`);
    console.log("server started");
});

