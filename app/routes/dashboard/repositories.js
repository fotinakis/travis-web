import Ember from 'ember';
import TravisRoute from 'travis/routes/basic';
import PaginatedCollectionPromise from 'travis/utils/paginated-collection-promise';

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
    return Ember.RSVP.hash({
      repos: this.store.paginated('repo', {
        active: true,
        withLastBuild: true,
        sortBy: 'last_build.finished_at:desc',
        offset: params.offset
      }),
      accounts: this.store.query('account', {
        all: true
      })
    });
  }
});
