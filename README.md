# trumpable - Get Trump tweets realtime and much much more.

## Features
* Trump's twitter steam
* Hillary's twitter stream
* Toggle button to switch between streams
* Background color is animated when fetching data sources
* Real-time! well almost, every 10 seconds

## Stack
* React
* Redux
* Semantic UI
* cors-anywhere

## Limitations
* Because the twitter data is scraped from the public page, only the last 20 tweets are displayed. It has the advantage to work without a backend to hide the twitter api credentials. I used cors-anywere demo for this, so the fetch could fail at any time, for like no reason. I'm sorry.
* Does not work on mobile because I used the fetch api and didn't inclue the polyfill, I'm also sorry for this.

## Easter Egg
* jfdoube

## Screenshots
![Trump](/screenshots/trump.png)
![Hillary](/screenshots/hillary.png)
