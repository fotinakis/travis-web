import Ember from 'ember';
// import { task } from 'ember-concurrency';

const { service } = Ember.inject;

export default Ember.Component.extend({
  ajax: service(),

  triggerBuildMessage: '',
  triggerBuildConfig: '',
  triggerBuildBranch: '',

  sendTriggerRequest() {
    let body = {};
    body.request = {};

    if (this.get('triggerBuildMessage') !== '') {
      body.request.message = this.get('triggerBuildMessage');
    }
    if (this.get('triggerBuildConfig') !== '') {
      body.request.config = this.get('triggerBuildConfig');
    }
    if (this.get('triggerBuildBranch') !== '') {
      body.request.branch = this.get('triggerBuildBranch');
    }

    body.request = JSON.stringify(body.request);

    return this.get('ajax').postV3(`/repo/${this.get('repo.id')}/requests`, body)
      .then(() => {
      });
  },

  actions: {
    triggerCustomBuild() {
      this.sendTriggerRequest();
    }
  }
});
