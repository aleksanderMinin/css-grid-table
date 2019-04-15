import DS from 'ember-data';

export default DS.Model.extend({
  first: DS.attr('string'),
  second: DS.attr('string'),
  third: DS.attr('string'),
});
