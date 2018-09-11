<template>
  <div>
      <div class="row">
          <div class="col-sm-3">
              <app-input type="text" v-model="query" label=''
               placeholder="Filtrar Resultados" @input="search"
              />
          </div>
      </div>
      <AppButton v-for="column in hiddenColumns" :key="column"
        type="button" icon="fa fa-eye" cssClass="btn-sm btn-default" 
        :name="column" @click="showColumn(column)"
      />
      <table class="table table-bordered table-striped" v-if="gridData.length>0">
          <GridHeader :gridData="grid" @sort="sortBy"
           @hideColumn="hideColumn"/>
          <GridRows v-for="(data, index) in grid" :key="index"
           :rowData="data" @removeItem="$emit('removeItem',data)"
           @editItem="$emit('editItem', data)"
           @detailItem="$emit('detailItem', data)"         
           @click="$emit('click', data)"
           />
      </table>
      <Alert title="" :showAlert="grid.length===0" align="center"
       cssClass="warning">
          <h4>Item não localizado!</h4>
      </Alert>
  </div>
</template>
<script>
    import GridHeader from './GridHeader';
    import GridRows from './GridRows';
    import AppButton from './AppButton';
    import Alert from './Alert';
    import AppInput from './AppInput';

    export default{
        name:'Grid',
        components:{GridHeader, GridRows, AppButton, 
            Alert, AppInput},
        props:{
            gridData:{
                type:Array,
                required:true,
                default:()=>[
                    {id:'001',info:'Texto Demonstrativo'},
                    {id:'002',info:'Outro texto Qualquer'},
                ],
            },
            hasActionButtons:{
                type:Boolean,
                default:false,
            },

        },
        data(){
            return {
                sortedBy:'',
                hiddenColumns:[],
                storedData:[],
                grid:[],
                header:[],
                query:null,
                originalGrid:[],
            }
        },
        created(){
            const grid = this.gridData.slice();
            if(this.hasActionButtons){
                grid.forEach((item)=>item['Ações'] = 'actionButtons');
            }
            this.grid = grid;
            this.originalGrid = grid.concat()
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
            },
            search(){
                const pattern = this.query.length>0?
                    new RegExp(this.query.toLowerCase()):null;
                let newGrid = [];
                if(pattern!==null){
                    this.originalGrid.forEach((row)=>{
                        Object.keys(row).forEach(col=>{
                            if(col.toLowerCase()!=='ações'){
                                try{
                                    pattern.test(
                                        row[col].toString().toLowerCase()
                                    )?newGrid.push(row):null;
                                }
                                catch(err){
                                    //Handle excpetions
                                }
                            }
                        })
                    })
                    if(newGrid.length!==0){
                        this.grid = newGrid.slice()
                    }
                }
                else{
                    newGrid = this.originalGrid.concat()
                }
                this.grid = newGrid.filter((item, index,arr)=>
                    arr.indexOf(item)===index).concat()
            },
        },
  }
</script>
<style>
</style>
