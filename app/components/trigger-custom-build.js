import Ember from 'ember';
// import { task } from 'ember-concurrency';

const { service } = Ember.inject;

export default Ember.Component.extend({
  ajax: service(),

  triggerBuildMessage: '',
  triggerBuildConfig: '',
  triggerBuildBranch: '',

  sendTriggerRequest() {
    let body = {
      request: {
        message: this.get('triggerBuildMessage'),
        branch: this.get('triggerBuildBranch'),
        config: JSON.stringify(this.get('triggerBuildConfig'))
      }
    };
    body = JSON.stringify(body);

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
