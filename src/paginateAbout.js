//import AppHeader from './components/AppHeader.vue';
//import TodoInput from '../components/TodoInput.vue';
import TodoItem from './components/TodoItem.vue';
import Todobirthday from './components/BirthDay.vue'
import Conection from './components/Endpoints';
import Pagination from './components/Pagination.vue';
import BreadCrum from './components/Breadcrum.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import Chart from 'chart.js/auto'
import {ref} from 'vue';
import { 
  initAccordions, 
  initCarousels, 
  initCollapses, 
  initDials, 
  initDismisses, 
  initDrawers, 
  initDropdowns, 
  initModals, 
  initPopovers, 
  initTabs, 
  initTooltips } from 'flowbite';


    const response=ref([]);
    response.value = await fetch('https://dummyjson.com/users?limit=208');
    const users = await response.value.json();
    const categoryTitle=users.users.map(item=> item.company.title)
    const items = new Set(categoryTitle);
    const title = Array.from(items);
export default {
  name: 'app',
  props:{
    faDeleteLeft:faDeleteLeft
  },
  data() {
    return {
      users:[],
      todos: users.users,
      orderTodos:[],
      breadCrumUrl:'',
      searchUser:'',
      nextId: 13,
      // date variable
      month:'',
      year:'',
      monthDay:'',
      dayhappy:'',
      currentPage: 0,
      pageSize: 10,
      visibleTodos: [],
      userId:'',
      delete:faUserPlus ,
      useradmin:'',
      categoryTitle:title ,
      newarray:[],
      Message:false,
      
      MessageString:false,
      MessageEmail:"",
      MessageCompany:false,
      MessagePhone:false,
      MessageLastName:false,
      MessageUserName:false,
      MessageFirstName:false,
      MessagePassword:false,
      MessageNumber:false,
      MessageValitePhone:false,
      MessageRepeatPassword:false,
      categoryTitle:title ,
      newarray:[],
      chart:'',
      uppercase:false,
      number:false,
      signos:false,
      phone:undefined,
      Messagetitle:false,
      MessageRole:false
    };
  },
  components: {
    FontAwesomeIcon,
    BreadCrum,
    TodoItem,
    Pagination,
    Conection,
    Todobirthday
  },
  beforeMount: function() {
    this.updateVisibleTodos();
  },
  methods: {
    async SelectFilter(item)
    {
        const response=ref([]);
        response.value = await fetch('https://dummyjson.com/users?limit=208&sortBy=firstName&order='+item+'');
        const users = await response.value.json();
        this.todos=users.users;
        this.updateVisibleTodos();    
    },
    async searchcategoryTitle(item)
    {
      const response=ref([]);
      response.value = await fetch('https://dummyjson.com/users/filter?key=company.title&value='+item+'');
      const users = await response.value.json();
      this.todos=users.users;
      this.updateVisibleTodos(); 
      this.CanvasInterface(this.todos);
  },
   CanvasInterface(items) {
    
      const ctx = document.getElementById('acquisitions').getContext('2d');
      const roleCounts = this.todos.reduce((acc, item) => {
        acc[item.role.toLowerCase()] = (acc[item.role.toLowerCase()] || 0) + 1;
        return acc;
      }, {});
      const data= {
        labels:["Admin", "Moderator","User"],
        datasets:[
          {
            label:"admin",
            data:[roleCounts.admin || 0],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
          {
            label:"moderator",
            data:[0,roleCounts.moderator || 0],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          }
          ,
          {
            label:"user",
            data:[0,0,roleCounts.user || 0],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }
        ]
        ,
        };
      const configuration = {
          type: 'bar',
          data: data,
          option: {
              tooltip: {
                mode: 'index'
            },
        options: {
    indexAxis: 'x',
    interaction: {
      mode: 'y'
  }
  
    }
  }
}
if (this.chart) {
  this.chart.destroy();
 }
  this.chart = new Chart(ctx, configuration);  
},
    search(item){
      this.searchUser=item;
    
      const dataToFilter=this.todos.filter((todo) => todo.firstName.toLowerCase()==item.toLowerCase());
      if(item.length==0) 
        {
          this.updateVisibleTodos();
        }
      else
        {
          
          this.visibleTodos=dataToFilter;
        }
    },
    MessageBoxPassword(repeat_password,floating_password){
      //let Message=false;
      const arraypassword=repeat_password===floating_password ? repeat_password : '' 
      var uppercase = /[A-Z]/g;
      var number =/[0-9]/g
      var signos=/[!@#$%^&*)(+=._-]/g
      this.uppercase=uppercase.test(arraypassword);
      this.number=number.test(arraypassword);
      this.signos=signos.test(arraypassword);
      if(arraypassword){
        this.MessageString=true
      }else{
        this.MessageString=false
      }
      //
      /*if(repeat_password===floating_password){
        this.Message=true
      }else{
        this.Message=false
        this.MessageString=true
      }else {
        this.MessageString=false
      }*/
    
    },
     async  addUser(email,floating_password,repeat_password,floating_first_name,floating_last_name,floating_phone,floating_company,floating_username,floating_role,floating_title) {
        console.log(email+","+floating_password+","+repeat_password+","+floating_first_name+","+floating_last_name+","+floating_phone+","+floating_username)
    
        var number =/^\d{3}-\d{3}-\d{4}$/g
        let MessageValitePhone=number.test(floating_phone)
        console.log(MessageValitePhone);
       if(email===undefined || email==='' || floating_password==='' ||  floating_password===undefined || repeat_password==='' || repeat_password===undefined  || floating_first_name==='' || floating_first_name===undefined || floating_last_name===""|| floating_last_name===undefined || floating_phone===undefined || floating_phone==='' || floating_username==='' || floating_username===undefined || floating_title==='' || floating_title===undefined || floating_role==='' || floating_role===undefined){ 
          if(email===undefined || email===''){
              this.MessageEmail=true
              }else{
                this.MessageEmail=false
              } if(floating_username==='' || floating_username===undefined)
            {
              this.MessageUserName=true
            }else{
              this.MessageUserName=false
            }if(floating_password==='' ||  floating_password===undefined){
            this.MessagePassword=true
            }else{
              this.MessagePassword=false
            }if(repeat_password==='' || repeat_password===undefined ){
              this.MessageRepeatPassword=true
            }else{
              this.MessageRepeatPassword=false
            }
            if(floating_first_name==='' || floating_first_name===undefined){
              this.MessageFirstName=true
            }else{
              this.MessageFirstName=false
            }if(floating_last_name==='' || floating_last_name===undefined){
              this.MessageLastName=true
            }else{
              this.MessageLastName=false
            }if(floating_phone==='' || floating_phone===undefined )
            {
              
              this.MessagePhone=true
            }else{
              
              this.MessagePhone=false
            }if(MessageValitePhone===true)
            {
              this.MessageValitePhone=true
            }else{
              this.MessageValitePhone=false
            }
            if(floating_company==='' || floating_company===undefined )
            {
              this.MessageCompany=true
            }else{
              this.MessageCompany=false
            }
          }else{
            this.login =  await fetch('https://dummyjson.com/user/add',{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                firstName:floating_first_name,
                lastName:floating_last_name,
                email:email,
                username:floating_username,
                password:repeat_password,
                phone:floating_phone,
          })
        })
      }
    },
    removeTodo(id) {
      let todos = this.todos;
      this.todos = todos.filter((todo) => todo.id != id);
      this.updateVisibleTodos();
    },
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
      this.updateVisibleTodos();
    },
    updateVisibleTodos() {
      this.useradmin=JSON.parse(localStorage.getItem('usuario'));
      if(this.useradmin){
        this.userId=JSON.parse(localStorage.getItem('usuario')).id;
        const allFilter= this.todos.filter((todo) => todo.id !==JSON.parse(localStorage.getItem('usuario')).id);
        const users=this.todos.filter((todo) => todo.id===JSON.parse(localStorage.getItem('usuario')).id);
        this.users=users.map(item=>item.role)
        this.visibleTodos = allFilter.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
  
      }else{
        this.visibleTodos = this.todos.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
      }
      
      // if we have 0 visible todos, go back a page
      if (this.visibleTodos.length == 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage -1);
      }
    },
    updateUrl(){
      this.pageSize= this.breadCrumUrl[1]!=='' ? 5 : 5,
      this.delete=faUserPlus;
      const url=window.location.pathname;
     this.breadCrumUrl=url.split("/");
     console.log(this.breadCrumUrl)
    
 
    return this.breadCrumUrl,this.pageSize;
    },
    getMonthDay(item)
    {
      const options = {
        month: "long",
        day:'numeric',
      };
      const value=JSON.stringify(item)
      const  date = new Date(value);
      const IntlDateTimeFormat0=  new Intl.DateTimeFormat("es-span",options)
      this.dayhappy=IntlDateTimeFormat0.format(date)
      return this.dayhappy
    },
     getDateNow()
    {
      const options1 = {
        day:'numeric',
        month: "long",
        
      };
      const  date = new Date();
      let IntlDateTimeFormat=  new Intl.DateTimeFormat("es-span",options1)
      this.month=IntlDateTimeFormat.format(date);
      this.year=date.getFullYear();
      const day=date.getDay()+1;
      const mes=date.getMonth()+1;
      this.monthDay=mes+'-'+day
      const ordenar=  this.todos.sort((a,b)=> new Date(a.birthDate) - new Date(b.birthDate))
      this.orderTodos=ordenar.map(item=>  {
        const name=item.firstName +" "+ item.lastName  
        const date= IntlDateTimeFormat.format(new Date(item.birthDate))
        const image=item.image
        const cargo=item.company.title
        const departamento=item.company.department
        
       return {
        date,
        name,
        image,
        cargo,
        departamento
       }
      })
      console.log(ordenar.filter(item=>item.date===this.month))
     
      return this.year,this.month, this.monthDay,this.orderTodos;
    }
    
  },
  mounted(){
  
    this.getDateNow()
   this.CanvasInterface();
    this.updateUrl();
    initAccordions();
  initCarousels();
  initCollapses();
  initDials();
  initDismisses();
  initDrawers();
  initDropdowns();
  initModals();
  initPopovers();
  initTabs();
  initTooltips();
  }
}
