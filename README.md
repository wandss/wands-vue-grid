# wands-vue-grid

## Description
A (yet) simple Grid compoment made with VueJS

## Installing
1 - Clone this repository
2 - CD into cloned Directory
3 - Run:
```
npm install
/*then*/
npm run serve
```

## Usage
### Single File Component
- Import the component
```
import Grid from @/components/Grid
```
- Register it
```
...
components: {Grid}
...
```
- Inside _template_ tags (HTML block)
```
<grid />
```

### Properties
- gridData:
An Array with objects that will be displayed in the grid.
```
const myAwesomeGriData=[{id:1, user:'wandss', repository:'wands-vuw-grid'}]
```
Then pass the property to the component:
```
<grid :gridData="myAwesomeGridData" />
```
The Header will be created by the key names, resulting in something like:


