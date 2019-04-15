import Component from '@ember/component';
import { computed, get } from '@ember/object';
import Example from '../models/example';
import $ from 'jquery';

export default Component.extend({

  container: null,

  props: computed('model', function() {
    let attributesMap = get(Example, 'attributes');
    let attributes = [];
    attributesMap.forEach(item => {
      attributes.push(item.name);
    });
    // let relationships = get(Example, 'relationships');
    return attributes;
  }),

  propsIndexLength: computed('props.length', function() {
    return get(this, 'props.length') - 1;
  }),

  didInsertElement() {
    this._super(...arguments);
    let container = this.element.querySelector('.container');
    let colCount = 4;

    let moveEnd = function() {
      document.body.onmousemove = null;
    }

    // document.styleSheets[0].insertRule('#elid:hover { background-color: red; }', 0);
    let firstRow = this.element.querySelectorAll(`.container > div:nth-child(-n + ${colCount * 2 - 1})`);
    // firstRow.forEach(div => div.style.borderBottom = '2px solid black');

    let move = function(e) {
      let element = this;
      e = e || window.event;
      let start = 0;
      let diff = 0;
      if (e.pageX) {
        start = e.pageX;
      } else if (e.clientX) {
        start = e.clientX;
      }

      var defgridColumnStyle = getComputedStyle(container).gridTemplateColumns;
      let defGridWidths = defgridColumnStyle.match(/\s?(\d+\.?\d*px)+/g);

      let setToColumnWidth = (index, diff) => {
        var gridColumnStyle = getComputedStyle(container).gridTemplateColumns;
        let columns = gridColumnStyle.match(/\s?(\d+\.?\d*px)+/g);
        columns[index] = (Number(defGridWidths[index].replace('px', '')) + diff) + 'px';
        return columns.join(' ');
      }

      this.style.position = 'relative';
      document.body.onmousemove = function(e) {
        let el = element;
        e = e || window.event;
        var end = 0;
        if (e.pageX) {
          end = e.pageX;
        } else if (e.clientX) {
          end = e.clientX;
        }

        diff = end - start;
        let wrapperIndex = Math.trunc($(el).index() / 2 % 4) + 1;
        wrapperIndex = wrapperIndex + (wrapperIndex - 1);
        container.style.gridTemplateColumns = setToColumnWidth(wrapperIndex - 1, diff);
      };

      document.body.onmouseup = moveEnd;
    };

    var wraps = this.element.querySelectorAll('div.wrapper');
    wraps.forEach(wrap => {
      wrap.onmousedown = move.bind(wrap);
      wrap.onmouseup = moveEnd;
    });
  },
});
