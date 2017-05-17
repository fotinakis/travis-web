import Ember from 'ember';
import { task } from 'ember-concurrency';

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

    console.log(body);
    return this.get('ajax').postV3(`/repo/${this.get('repo.id')}/requests`, {})
      .then(() => {
        console.log('lol');
      });
  },

  actions: {
    triggerCustomBuild() {
      this.sendTriggerRequest();
    }
  }
});
