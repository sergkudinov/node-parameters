---
title: API method `route`
description: How to use the `route` method to execute code associated with a particular command.
keywords: ["parameters", "node.js", "cli", "api", "router", "command", "route"]
maturity: initial
---

# Method `route(context, ...users_arguments)`

The `route` method dispatch command into handler function. Learn more about [routing](/usage/routing/) in the usage documentation.

* `context`: `[string] | object` The arguments to parse into parameters, accept the [Node.js process](https://nodejs.org/api/process.html) instance, an [argument list](https://nodejs.org/api/process.html#process_process_argv) provided as an array of strings or the context object; optional, default to `process`.
* `...users_arguments`: `any` Any arguments that will be passed to the executed function associated with a route.
* Returns: `any` Whatever the route function returns.

How to use the `route` method to execute code associated with a particular command.

## Description

The route function receive as first argument a context object with the following properties:

* `argv`   
  The CLI arguments, either passed to the `route` method or obtained from `process.argv`.
* `params`   
  The parameters object derived from `argv`, will change form between flatten and extended mode.
* `config`   
  The configuration object used to initialise the parameters instance.

## Examples

Considering a "server" application containing a "start" and a "stop" commands, each commands define a `route` function:

```js
const parameters = require("parameters")
const app = parameters(
{ name: "server",
  commands:
  { "start":
    { options:
      { "host":
        { shortcut: "h",
          description: "Web server listen host"},
        "port":
        { shortcut: "p", type: "integer",
          description: "Web server listen port" } }
      route: "./routes/start.js" } } })
app.route()
```

The file "./routes/start.js" could look like:

```js
module.exports = ({argv, params, config}) ->
  process.stderr.write(`Listen address is ${params.host}:${params.port}`)
```
