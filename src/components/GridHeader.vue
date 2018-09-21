<template>
    <thead>
        <tr>
            <th v-for="(item, index) in header" :key="index"
             @click.prevent.self="$emit('sort', item)">
                <i class="fa fa-sort"></i>
                {{item}}
                <div id="hideColumn" @click="hideColumn(index)">
                    <i class='fa fa-eye-slash'></i>
                </div>
            </th>
        </tr>
        </thead>
    </template>
<script>
    export default{
        name:'GridHeader',
        props:{
            gridData:{
                type:Array,
                required:true
            },
            gridConfig:{
                type:Array,
                default:()=>[],
            }
        },
        data(){
            return{
                originalHeader:null,
            }
        },
        computed:{
            header(){
                return this.createHeader()
            },
        },
        created(){
            this.originalHeader = this.createHeader()
        },
        methods:{
            createHeader(){
                let header = []
                if(this.gridData.length>0){
                    header = Object.keys(this.gridData[0])
                    this.gridConfig.forEach(column=>{
                        const index = header.indexOf(column.id);
                        const hidden = column.hidden===undefined?
                            false:column.hidden

                        if(index!==-1){
                            if(!hidden){
                                header[index] = column.colName!==undefined?
                                    column.colName:column.id
                            }
                            else{
                                //Removes columns when hidden is true
                                header.splice(index,1)
                            }
                        }
                    })
                }
                else{header = this.originalHeader}
                
                return header 
            },
            hideColumn(index){
                this.$emit('hideColumn', 
                    Object.keys(this.gridData[0])[index])
            }
        }
  }
</script>
<style scoped>
tr{
    cursor:pointer;
}
th{
    text-transform:capitalize;
    text-align:left;
}
#hideColumn{
    float:right;
    font-size:1.5rem;
}
#hideColumn:hover{
    opacity:.8;
}
</style>
