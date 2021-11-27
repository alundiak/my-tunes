# Initial Info
My iTunes library statistics project. Designed to run script `./setup.sh`, then refresh `http-server` and look to music tracks which require some changes (missed artwork, missed artist name, missed album name, etc.)

![logo](/img.png)

## Tools

- https://github.com/shawnbot/itunes-data
- https://github.com/d3/d3/wiki/Gallery
- https://en.wikipedia.org/wiki/ID3

## D3.Bubble
- https://bl.ocks.org/mbostock/4063269 - Bubble chart
- http://www.tylernwolf.com/#/portfolio/uxwords - nice Bubble example with interactive click
- http://vallandingham.me/bubble_cloud/#words
- http://vallandingham.me/vis/gates/ - nice idea by years
- http://bl.ocks.org/phuonghuynh/54a2f97950feadb45b07 - another Bubble chart using JQuery and Cafey
- https://bl.ocks.org/danielatkin/57ea2f55b79ae686dfc7 - nice with categories.

## D3.Pack

- https://bl.ocks.org/mbostock/4063530 - Circle Packing - for albums BY artists
- http://mbostock.github.io/d3/talk/20111116/pack-hierarchy.html - interactive
- https://www.visualcinnamon.com/occupations - nice interactive: Artists \ Albums \ Tracks (by size might be)
- http://www.primordion.com/Xholon/gwt/Xholon.html?app=07d99d4a5583b4802df6&src=gist&gui=none - like AI doing something

## D3 Pie chart
- http://bl.ocks.org/dbuezas/9306799 - nice, simple
- https://bl.ocks.org/mbostock/3887235
- http://d3pie.org/
- http://bl.ocks.org/anwargm/11145882 - polar clock pie chart

## Donut chart
- http://bl.ocks.org/NPashaP/9994181 - too simple
- https://bl.ocks.org/mbostock/1346395 - 3D Donut


## Other
- Looks doable, integration with [Spotify Web API](https://developer.spotify.com/documentation/web-api/).
	- http://michaelthelin.se/spotify-web-api-node/#search
	- https://github.com/thelinmichael/spotify-web-api-node
	- and many npm packages for Spotify API wrappers.
- https://gerardnico.com/viz/d3/stratify#creating_the_tree_by_calling_the_stratify_operator
- Maybe C3,
- maybe Plotly.JS https://plot.ly/javascript/, https://github.com/plotly/plotly.js/, https://github.com/plotly/plotly-nodejs

# HowTo


## Find library xml file
- https://support.apple.com/en-gb/HT201610

>The iTunes Library.xml file is no longer used by the latest versions of Apple media applications on OS X Yosemite and later.

>The iTunes Library.xml file contains some, but not all, of the same information that's stored in the iTunes Library.itl file. The purpose of the iTunes Library.xml file is to make your music and playlists available to other applications on your computer, such as iPhoto, Garageband, iMovie, and third-party software, in OS X Mountain Lion and earlier. These applications use this file to make it easier for you to add music from your iTunes library to your projects.

## Export iTunes library

- http://apple.stackexchange.com/questions/46312/export-itunes-music-library-information-album-artist-track-names-to-csv-or-s

>You can do File -> Library -> Export Library and get an XML file of your library metadata. From there it would be a relatively straightforward matter for a programmer to convert the XML data into a CSV, spreadsheet, or database.

## Generate XSD scheme from Library.xml
- http://www.freeformatter.com/xsd-generator.html#
- http://xmlgrid.net/cgi-bin/xg/xo.cgi
- http://xmlgrid.net/

## Visualize JSON
- https://github.com/burningtree/awesome-json
- https://github.com/tulios/json-viewer


## Redo with ReactJS
- http://uber.github.io/react-vis/examples/showcases/treemaps


# Other people do

- https://quantixed.wordpress.com/2014/12/01/my-favorite-things/
- https://www.wired.com/2016/10/lets-obsess-intricate-map-alt-music-history/ Circuit Board like v.
- `g-index`, `h-index` ?
