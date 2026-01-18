export default {
  name: 'pagination',
  props: ['todos', 'currentPage', 'pageSize'],
  methods: {
    updatePage(pageNumber) {
      this.$emit('page:update', pageNumber);
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
    
  }
}
