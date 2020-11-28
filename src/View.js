import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom'; //used instead of hyperscript library



import {
  priorityInputMsg,
  savePriorityMsg,
  scoreMsg,
  newPriorityMsg,
  editPriorityMsg,
  deletePriorityMsg,
  SCORES,
} from './Update';

//the following are hyperscript helpers. Using destructuring, 
//it calls the html elements

const {
      pre, 
      div, 
      h1,
      button,
      textarea,
      p,
      i,
    } = hh(h);

    function instructions(dispatch, card) {
      return div({ className: 'mw8 center' }, 
        h1({ className: 'f2 pv2 bb' }, 'Rank Your First Year Priorities'),
        p({ className: 'san serif avenir pv2' }, 'For many students, the first year in college can be overwhelming. Besides your class schedule, there are many opportunities that will compete for your time.'),
        p({ className: 'san serif avenir pv2' }, 'Setting your own priorities—knowing what is most important for you—will help you manage your time and reduce stress and anxiety. Below are a list of goals common to many college students. Identify your priority for each goal -- high, medium, or low. If you have priorities that are not listed below, you can add your own on the next page.'),
        p({ className: 'san serif avenir pv2' }, 'No doubt that your priorities will change over time. That is okay. You can return and update your priorities when needed.'),
      )
    }

    function rankButtons(dispatch, card) {
      return div(
            { className: 'absolute bottom-0 left-0 w-100 ph2' },
            div({ className: 'mv2 flex justify-between' }, [
              button(
                {
                  className: 'f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib mid-gray',
                  onclick: () => dispatch(scoreMsg(card.id, SCORES.LOW)),
                },
                'Low Priority',
              ),
              button(
                {
                  className: 'f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib mid-gray',
                  onclick: () => dispatch(scoreMsg(card.id, SCORES.MEDIUM)),
                },
                'Medium Priority',
              ),
              button(
                {
                  className: 'f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib mid-gray',
                  onclick: () => dispatch(scoreMsg(card.id, SCORES.HIGH)),
                },
                'High Priority',
              ),
            ]),
          )
    }

  function showPriorityLevel(dispatch, card) {
    return div( 
          { className: 'absolute bottom-0 left-0 w-100 ph2' },
            div({ className: 'mv2 flex justify-between' }, [
              p({className: 'f5 ' }, card.rank),
              button(
                {
                  className: 'f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib mid-gray',
                  onclick: () => dispatch(editPriorityMsg(card.id)),
                }, 'Change Priority',),
              ]),
            )
          }

  function fyPriority(dispatch, card) {
    return div({ className: '' },
      div(
        { className: ' pv2 ph1' },
        card.fyPriority,
      )
    );
  }

  function viewUnRankedPriorities(dispatch, card) {
    return div(
      { className: 'w-80 pa2 '},
      div(
        {
          className: 'w-100 h-100 pa2 bg-ligh-yellow shadow shadow-1 mv2 relative pb5',
        },
        [
          fyPriority(dispatch, card),
          rankButtons(dispatch, card),
        ],
      ),
    );
  }

//this shows card after it is ranked
  function showRankedPriorities(dispatch, card) {
    return div(
        { className: 'w-80 pa2 '},
        div(
          {
            className: 'w-100 h-100 pa2 bg-ligh-yellow shadow shadow-1 mv2 relative pb5',
          },
          [
            fyPriority(dispatch, card),
            showPriorityLevel(dispatch, card),
          ],
        ),
      );  
    }


const card = R.curry((dispatch, card) => {
  const { edit } = card;
  return edit ? viewUnRankedPriorities(dispatch, card) : showRankedPriorities(dispatch, card);
});

function view(dispatch, model) {
  const cards = R.map(
    card(dispatch),
    model.cards
  );
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Rank Your First Year Priorities'),
    p({ className: 'san serif avenir pv2' }, 'For many students, the first year in college can be overwhelming. Besides your class schedule, there are many opportunities that will compete for your time.'),
    p({ className: 'san serif avenir pv2' }, 'Setting your own priorities—knowing what is most important for you—will help you manage your time and reduce stress and anxiety. Below are a list of goals common to many college students. Identify your priority for each goal -- high, medium, or low. If you have priorities that are not listed below, you can add your own on the next page.'),
    p({ className: 'san serif avenir pv2' }, 'No doubt that your priorities will change over time. That is okay. You can return and update your priorities when needed.'),

    div({ className: 'flex flex-wrap nl2 nr2 '}, cards),
    div(
      button(
        {
        className: 'pa2 br1 mv2 bg-green bn white',
        onclick: () => dispatch(newPriorityMsg),
        },
        [i({ className: 'fa fa-plus ph1' }), 'Add a Priority'],
      ),
    ),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
