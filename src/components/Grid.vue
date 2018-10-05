<template>
  <div>
      <div class="row">
          <div class="col-sm-3" v-show="hasSearchField">
              <app-input type="text" v-model="query" label=''
               placeholder="Filtrar Resultados" @input="search"
              />
          </div>
      </div>
      <AppButton v-for="column in hiddenColumns" :key="column"
        type="button" icon="fa fa-eye" cssClass="btn-sm btn-default" 
        :name="column" @click="toggleColumn(column)"
      />
      <table class="table table-bordered table-striped" v-if="gridData.length>0">
          <GridHeader :gridData="grid" @sort="sortBy" :gridConfig="gridConfig"
           @hideColumn="toggleColumn"/>
          <GridRows v-for="(data, index) in grid" :key="index"
           :rowData="data" 
           :gridConfig="gridConfig" 
           @click="handleClick($event, data)"
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
            gridConfig:{
                type:Array,
                default:()=>[],
            },
            hasSearchField:{
                type:Boolean,
                default:false,
            },
            hasActionButtons:{
                type:Boolean,
                default:false,
            },
            actions:{
                type:Array,
                default:()=>[],
            }
        },
        data(){
            return {
                sortedBy:null,
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
            if(this.hasActionButtons && this.actions.length === 0){
                const defaultActions = [
                    {name:'Editar', icon:'fa fa-edit',
                        event:function(){console.log('EDIT ITEM')},},
                    {name:'Detalhar', icon:'fa fa-th-list',
                        event:function(){console.log('View Details')},},
                    {name:'Apagar', icon:'fa fa-trash',
                        event:function(row){console.log('Apagar'+row)},
                    },
                ]
                grid.forEach((item)=>item['Ações'] = defaultActions)
            }
            else if(this.actions.length>0){
                grid.forEach((item)=>
                    item['Ações'] = this.actions
                )
            }
            this.grid = grid;
            this.originalGrid = grid.concat()
            this.header = Object.keys(this.grid[0]);
        },
        watch:{
            gridData(){
                let grid = this.gridData.slice();
                this.grid = grid
            },
        },
        methods:{
            toggleColumn(item){
                let colName = item;
                let index =  this.hiddenColumns.indexOf(colName);
                let hidden = index === -1;
                let addConfig = true;

                this.gridConfig.filter(config=>config.id===item ||
                    config.colName===item).forEach(config=>{
                        this.$set(config, 'hidden', hidden);
                        colName = config.colName!==undefined?
                            config.colName:item;
                        addConfig = false;
                    })

                if(addConfig){
                    this.gridConfig.push({id:item, hidden:hidden})
                }
                if(hidden){
                    this.hiddenColumns.push(colName)
                }
                else{
                    this.hiddenColumns.splice(index, 1)
                }
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
                let colName = col;
                this.gridConfig.forEach(item=>{
                    if(col === item.colName){
                        colName = item.id
                    }
                })

                let sortType = this.sortedBy!==colName?
                    'sort':'reverse';

                if(colName !== 'Ações'){
                    this.grid[sortType]((a,b)=>{
                        if(a[colName] > b[colName]){
                            return 1
                        }
                        if(a[colName] < b[colName]){
                            return -1
                        }
                        else{return 0}
                    })
                    this.sortedBy = colName
                }
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
            handleClick(event, data){
                this.$emit('click', event, data)
            }
        },
  }
</script>
<style>
</style>
