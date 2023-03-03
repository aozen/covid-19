# Covid Charts

Charts that show the current number of confirmed coronavirus cases, deaths, and recoveries in Turkey.

Fetching data from an API, parsing it with jquery, and then displaying it on the frontend using chart.js.

GitHub repository where the API connection is used: [coronavirus-tracker-api](https://github.com/ExpDev07/coronavirus-tracker-api)

Since sharing COVID information has now stopped, the API has become useless.

If project doesn't work, to see how the project looks with the old data, you can follow the steps below

## Running

For handling CORS:

Install http-server if you don't have

```bash
npm install -g http-server
```

Run server on 8080:

```bash
http-server -a 0.0.0.0 -p 8000
```

edit the main.js 2nd line

```javascript
    $.get("https://coronavirus-tracker-api.herokuapp.com/all", function(resp, status){
```

to

```javascript
    $.get("http://localhost:8000/data/all.json", function(resp, status){
```

and open the [http://localhost:8000/](http://localhost:8000/)