import Ember from 'ember';
import TravisRoute from 'travis/routes/basic';

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
      repos: this.store.query('repo', {
        active: true,
        withLastBuild: true,
        sort_by: 'last_build.finished_at:desc',
        offset: params.offset
      }),
      accounts: this.store.query('account', {
        all: true
      })
    });
  }
});
