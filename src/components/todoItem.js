import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'todoitem',
  props: ['todo'],
  methods: {
    removeTodo() {
      
      this.$emit('todo:remove', this.todo.id);
    },
    faEye(){
      return faEye;
    }
  },
  return:{
    FontAwesomeIcon,
    
  }
}

