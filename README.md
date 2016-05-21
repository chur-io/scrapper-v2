# scrapper-v2
A dockerized scrapper hacked from [Horseman.js](http://www.horsemanjs.org/) and [Hapi.js boilerplate](https://github.com/pashariger/testing-hapi)

## Usage
```sh
docker build -t scrapper-v2 .
docker run -p 3000:3000 scrapper-v2 node app.js
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
	"open": "http://nz.indeed.com/",
	"actions": [{
		"type": "type",
		"selector": "input[name=\"q\"]",
		"text": "angular"
	}, {
		"type": "click",
		"selector": "#fj"
	}, {
		"type": "waitForNextPage"
	}],
	"results": [{
		"type": "html",
		"selector": "h2.jobtitle"
	}]
}' 'http://localhost:3000/api/basic/scrape'
```
