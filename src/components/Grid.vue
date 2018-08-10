<template>

  <div>
      <GridIcon v-for="column in hiddenColumns" :key="column"
       icon="fa fa-eye" :name="column" @click="showColumn(column)"
      />

      <table class="table table-bordered table-striped">
          <GridHeader :gridData="grid" @sort="sortBy"
           @hideColumn="hideColumn"/>
          <GridRows v-for="(data, index) in grid" :key="index"
           :rowData="data" @removeItem="removeItem(data)"
           @click="$emit('click', data)"
           />
      </table>
  </div>
</template>
<script>
    import GridHeader from './GridHeader';
    import GridRows from './GridRows';

    export default{
        name:'Grid',
        props:['gridData','hasActionButtons',],
        components:{GridHeader, GridRows },
        data(){
            return {
                sortedBy:'',
                hiddenColumns:[],
                storedData:[],
                grid:[],
                header:[],
            }
        },
        created(){
            const grid = this.gridData;
            if(this.hasActionButtons){
                grid.forEach((item)=>item['Ações'] = 'actionButtons');
            }
            this.grid = grid;
            this.header = Object.keys(this.grid[0]);
        },
        methods:{
            hideColumn(colName){
                const storedData = {[colName]:
                    this.grid.slice().map(row=>row[colName])};
                this.grid.map(row=>
                    this.$delete(row, colName)
                )
                this.hiddenColumns.push(colName);
                this.storedData.push(storedData);
            },
            showColumn(column){
                const restoredData = this.storedData.filter((item)=>
                    item[column]!==undefined)[0][column];

                const index = this.hiddenColumns.indexOf(column);
                
                const restoredGrid = []
                //eslint-disable-next-line
                for(let i in this.grid){
                    restoredGrid.push({})
                }

                this.header.forEach((col,)=>{
                    this.grid.forEach((row, index)=>{
                        if(row[col]===undefined){
                            restoredGrid[index][column]=restoredData[index]
                        }
                        else{
                            restoredGrid[index][col]=row[col]
                        }
                    })
                })
                this.grid = restoredGrid;
                this.storedData.splice(index, 1)
                this.hiddenColumns.splice(index, 1)
            },
            removeItem(row){
                const index = this.grid.map((item)=>item.id).indexOf(row.id);
                if(this.storedData.length>0){
                    this.storedData.forEach((storedItems=>{
                        for(let item in storedItems){
                            storedItems[item].splice(index, 1)
                        }
                    }))
                }
                this.grid.splice(index, 1);
            },
            sortBy(col){
                if(col === this.sortedBy){
                    this.grid.reverse((a,b)=>{
                        if(a[col] > b[col]){
                            return 1
                        }
                        if(a[col] < b[col]){
                            return -1
                        }
                        else{return 0}
                    })
                }
                else{
                    this.grid.sort((a,b)=>{
                        if(a[col] > b[col]){
                            return 1
                        }
                        if(a[col] < b[col]){
                            return -1
                        }
                        else{return 0}
                    })
                }
                this.sortedBy = col;
            }
        }
  }
</script>
<style>
</style>
