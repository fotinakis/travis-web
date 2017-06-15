import Ember from 'ember';
import { alias } from 'ember-computed-decorators';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['pagination-navigation'],
  @alias('collection.pagination') pagination: null,

  outerWindow: 1,
  innerWindow: 4,

  currentPage: Ember.computed('pagination.offset', 'pagination.perPage', function() {
    return (this.get('pagination.offset') / this.get('pagination.perPage') + 1);
  }),

  numberOfPages: Ember.computed('pagination.total', 'pagination.perPage', function () {
    return Math.ceil(this.get('pagination.total') / this.get('pagination.perPage'));
  }),

  pages: Ember.computed('numberOfPages', function () {
    let num = this.get('numberOfPages');
    let pageArray = [];

    // display all pages if there is only a few
    if (num < this.get('outerWindow') + (this.get('innerWindow') * 2)) {
      for (let i = 0; i < num; i++) {
        pageArray.push({
          num: i + 1,
          offset: this.get('pagination.perPage') * i
        });
      }

    // else stack together pagination
    } else {

      // first page
      pageArray.push({
        num: 1,
        offset: this.get('pagination.first.offset')
      });

      // outerwindow first page
      for (let i = 1; i <= this.get('outerWindow'); i++) {
        pageArray.push({
          num: 1 + i,
          offset: this.get('pagination.first.offset') + (this.get('pagination.perPage') * i)
        });
      }

      let innerHalf = Math.ceil(this.get('innerWindow') / 2);

      // ... devider unit
      if ((this.get('currentPage') - innerHalf) - pageArray.length > 1) {
        pageArray.push({ offset: 'first'});
      }

      // innerwindow < current page
      for (let i = (this.get('currentPage') - innerHalf); i < this.get('currentPage'); i++) {
        pageArray.push({
          num: i,
          offset: (this.get('pagination.perPage') * (i - 1))
        });
      }

      // current page
      pageArray.push({
        num: this.get('currentPage'),
        offset: this.get('pagination.offset')
      });

      // innerwindow > current page
      for (let i = (this.get('currentPage')) + 1; i <= this.get('currentPage') + innerHalf; i++) {
        pageArray.push({
          num: i,
          offset: (this.get('pagination.perPage') * (i - 1))
        });
      }

      // ... devider unit
      if ((num - this.get('outerWindow')) - (this.get('currentPage') + innerHalf)  > 1) {
        pageArray.push({ offset: 'last'});
      }

      // outerwindow last page
      for (let i = (this.get('numberOfPages') - this.get('outerWindow')); i < this.get('numberOfPages'); i++) {
        pageArray.push({
          num: i,
          offset: (this.get('pagination.perPage') * (i - 1))
        });
      }

      // last page
      pageArray.push({
        num: this.get('numberOfPages'),
        offset: this.get('pagination.last.offset')
      });

    }
    return pageArray;
  })
});
