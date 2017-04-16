# Template for Node.js Express App

Here is sample node.js app. Main goal of this project to provide supportable app architecture.

- Logging
- Mongo db
- EJS
- EJS partials
- Bluebird integrated

## Classes descriptions

- AppBuilder - creates node app, initializes middlewares.
- AppEnvironment - contains for db client, configs and other common stuff.
- EnvBuilder - creates AppEnvironment and initializes it. Creates db connection.
- RouteFactory - wireup controllers and path
- ServerBuilder - runs node app. Entry point for init.

```

ServerBuilder ----> EnvBuilder -----> AppEnvironment
               |--> AppBuilder
               |--> RouteFactory
```
