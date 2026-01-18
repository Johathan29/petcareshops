import {ref} from 'vue';

export default {
    name: 'Conections',
    props: {
        todos:['a'],
       users:[],
    },
    data(){
      return{
        
      todos: ["johathan"]     
  }
  },
    methods: {
      async usersAll() {
          const response = await fetch('https://dummyjson.com/users?limit=208');
        const users= await response.json();
        return this.users=users.users
       
      },
     async endpointAll(){
      const response= await fetch('https://dummyjson.com/users?limit=208');
      const users = await response.json();
      return this.users=users.users
      },
   
      totalPages() {
        return Math.ceil(this.todos.length / this.pageSize);
      },
      showPreviousLink() {
        return this.currentPage >= 1 ? false : true;
      },
      showNextLink() {
        const stock=(this.totalPages() - 1);
        return this.currentPage < stock ? false : true;
      },
      
    },
    
    mounted(){
      this.endpointAll();
      this.usersAll();
    },
  }
  