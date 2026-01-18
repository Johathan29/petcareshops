export default{
  name:'anavegation',
  props:{

  },
  data(){
    return{
title:'',
tituloDeLaPagina: 'Título predeterminado'
    }
  },
  methods:{
    updateUrl(){
     console.log('asdasds')
},
  },
 
  mounted(){
    this.updateUrl();
  }
}
