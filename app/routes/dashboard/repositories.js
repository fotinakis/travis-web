import Ember from 'ember';
import TravisRoute from 'travis/routes/basic';
import PaginatedCollection from 'travis/utils/paginated-collection';

export default TravisRoute.extend({
  queryParams: {
    filter: {
      replace: true
    },
    offset: {
      refreshModel: true
    }
  },

  redirect() {
    if (!this.get('features.dashboard')) {
      return this.transitionTo('index');
    }
  },

  model(params) {
    let collection = PaginatedCollection.create({
      content: this.store.query('repo', {
        active: true,
        withLastBuild: true,
        sort_by: 'last_build.finished_at:desc',
        offset: params.offset
      }),
    });
    return Ember.RSVP.hash({
      repos: collection,
      accounts: this.store.query('account', {
        all: true
      })
    });
  }
});
