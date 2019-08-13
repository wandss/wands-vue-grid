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
const myAwesomeGriData=[{id:1, user:'wandss', repository:'wands-vue-grid'}]
```
Then pass the property to the component:
```
<grid :gridData="myAwesomeGridData" />
```
Grid header's will be created by introspecting the array and getting the keys from the object, resulting in something like:

| Id | User | Repository |
| -- | ---- | ---------- |
| 1  | wandss | wands-vue-grid|

- gridConfig:
Property to customize the grid's renderization, consisting of an Array with objects, like:
```
const customizeMe = [{id:'id', hidden:true}, {id:'Repository', colName:'Git Hub Repo'}, 
                     {id: 'user', style:{'color': red}]
```
where:
1 - **id**: must match key names inside _gridData_
2 - **hidden**: makes this column to not be rendered
3 - **colName**: the name to be displayed
4 - **style**: an object to style all the cells that matches the given id.



