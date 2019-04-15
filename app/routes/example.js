import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    let data = this.get('data');
    this.store.push({
      data: data,
    });
    return this.store.peekAll('example');
  },

  init() {
    this._super(...arguments);

    this.set('data', [
      {
        id: '1',
        type: 'example',
        attributes: {
          first: '11',
          second: '12',
          third: '123',
        },
      },
      {
        id: '2',
        type: 'example',
        attributes: {
          first: '21',
          second: '22',
          third: '23',
        },
      },
      {
        id: '3',
        type: 'example',
        attributes: {
          first: '31',
          second: '32',
          third: '33',
        },
      },
      {
        id: '4',
        type: 'example',
        attributes: {
          first: '41',
          second: '42',
          third: '43',
        },
      },
    ]);
  },

  data: null,
});
