import * as R from 'ramda';

export const MSGS = { 
  INPUT_PRIORITY : 'INPUT_PRIORITY',
  SAVE_PRIORITY: 'SAVE_PRIORITY',
  SCORE: 'SCORE',
  SHOW_PRIORITY: 'SHOW_PRIORITY',
  NEW_PRIORITY: 'NEW_PRIORITY',
  EDIT_PRIORITY: 'EDIT_PRIORITY',
  DELETE_PRIORITY: 'DELETE_PRIORITY',
};

export function priorityInputMsg(id, fyPriority) {
  return {
    type: MSGS.INPUT_PRIORITY,
    id,
    fyPriority,
  };
}

export function savePriorityMsg(id){
  return {
    type: MSGS.SAVE_PRIORITY,
    id,
  };
}

export function scoreMsg(id, score){
  return {
    type: MSGS.SCORE,
    id,
    score,
  };
}

export function showPriorityMsg(id) {
  return {
    type: MSGS.SHOW_PRIORITY,
    id,
  };
}

export function editPriorityMsg(id) {
  return {
    type: MSGS.EDIT_PRIORITY, 
    id,
  };
}


export const newPriorityMsg = {
  type: MSGS.NEW_PRIORITY,
};

export const SCORES = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

const updatePriorities = R.curry((updatePriority, card) => {
  if (updatePriority.id === card.id) {
    return { ...card, ...updatePriority };
  }
  return card;
});

//msg are actions. When something is clicked or entered in the view, 
//msg is dispatched 
function update(msg, model) {
  console.log(msg);
  switch (msg.type) {
    case MSGS.INPUT_PRIORITY: {
      const { id, fyPriority } = msg;
      const { cards } = model;
      const updatedPriorities = R.map(updatePriorities({ id, fyPriority }), cards);
      return { ...model, cards: updatedPriorities };
    }

    case MSGS.SAVE_PRIORITY: {
      const { id } = msg;
      const { cards } = model;
      const updatedPriorities = R.map(updatePriorities({ id, edit: false }), cards);
      return { ...model, cards: updatedPriorities };
    }

    case MSGS.EDIT_PRIORITY: {
      const { id } = msg;
      const { cards } = model;
      const updatedPriorities = R.map(updatePriorities({ id, edit: true}), cards);
      return { ...model, cards: updatedPriorities };
    }

    case MSGS.SCORE: {
      const { id, score } = msg;
      const { cards } = model;
      const card = R.find(R.propEq('id', id), cards);
      
      const rank = R.cond([
        [R.propEq('score', SCORES.LOW), R.always(0)],
        [R.propEq('score', SCORES.MEDIUM), R.always(1)],
        [R.propEq('score', SCORES.HIGH), R.always(2)],
      ])({ score, rank: card.rank });
      
      const updatedRank = R.pipe(
        R.map(updatePriorities({ id, rank })),
        R.sortWith([
          R.descend(R.prop('rank')),
          //R.descend(R.prop('id'))
        ])
      )(cards);
      const updatedPriorities = R.map(updatePriorities({ id, edit: false }), cards);
      return { ...model, cards: updatedPriorities };
    }

    case MSGS.SHOW_PRIORITY: {
      const { id } = msg;
      const { cards } = model;
      const updatedCards = R.map(updateCards({ id, showRank: true }), cards);
      return { ...model, cards: updatedCards };
    }

    case MSGS.NEW_PRIORITY: {
      const { nextId: id, cards } = model;
      const newPriority = {
        id,
        fyPriority: '', 
        rank: 0,
        edit: true,
      };

      const updatedPriorities = R.prepend(newPriority, cards);
      return { ...model, cards: updatedPriorities, nextId: id + 1};
    }
    case MSGS.DELETE_PRIORITY: {
      const { id } = msg;
      const { cards } = model;
      const updatedPriorities = R.reject(R.propEq('id', id), cards);
      return { ...model, goals: updatedPriorities };
    }
    
    default:
      return model;
  }
}

export default update;
