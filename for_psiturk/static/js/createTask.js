/* This file hosts different functions used to create the structure of your task.
These functions will ultimately call createTrial(), which actually pushes the trial
object to the timeline; additionally, they also set different parameters needed for
your trials. You can also push other trial objects to the timeline for introducing
a new block, or displaying how many points were earned. */

// If you are importing a CSV, make sure this function takes an argument and returns
// the updated timeline object. The argument is needed for promise chaining, and
// the return statement is needed for the next then statement in your promise chain
// when you run jsPsych.init.

const createPhase = function(csv) { // create a phase (e.g. training phase) of your task
  csv = csv.data;
  let seqs = {}; // convert 2D array into object
  seqs.allStims = csv[0];
  seqs.allBlocks = csv[1];
  seqs.allTrials = csv[2];
  seqs.Labels = [];
  for (i = 0; i < seqs.allStims.length; i++) {
    seqs.Labels.push([csv[3][i],csv[4][i],csv[5][i]]);
  }
  seqs.corKeyIdx = csv[6];
  seqs.setSizes = csv[7];
  seqs.imgFolders = csv[8];
  seqs.allConds = csv[9];
  csv = [];

  for (b = 1; b < NUM_BLOCKS+1; b++) {
    createBlock(b,seqs); // create each block based on condition, set size, and stim image set
  }

  // End of the behavioral experiment. Once MTurkers reach this slide the experiment
  // will end in jsPsych -- the data will save, and subjects will be redirected to the questionnaire.
  timeline.push({
    type: "html-keyboard-response",
    stimulus: `<div class='center'><p>Thank you for participating in our study! Please \
    press any key to move onto a final questionnaire. Your compensation will arrive soon.</p></div>`,
    choices: jsPsych.ALL_KEYS,
  });

  return timeline;
}

// Create an experiment block.
const createBlock = function(b,seqs) {

  let bStart = seqs.allBlocks.indexOf(b);
  let blockEnd = seqs.allBlocks.indexOf(b+1);
  let setSize = seqs.setSizes[bStart];
  let cond = seqs.allConds[bStart];
  let folder = seqs.imgFolders[bStart];
  let numTrials = seqs.allTrials[blockEnd-1];

  for (t = 0; t < numTrials; t++) { // you'll need to interleave pushing your actual trials to the timeline and fixations
    let labelOrder = seqs.Labels[bStart+t];
    createFixation(labelOrder);
    let stim = seqs.allStims[bStart+t];
    let cor = seqs.corKeyIdx[bStart+t];
    createTrial(b,t,cond,folder,stim,cor,seqs.Labels,bStart);
  }

  // At the end of each block you will usually give feedback to your participant,
  // so you'll need to push a trial object containing points or further instructions.
  const setPoints = function(trial) {
    let pts = jsPsych.data.get().filter({block: b, correct: true}).count();
    console.log(pts);
    trial.stimulus = `<div class="center"><p>Total number of earned points: ${pts} out of ${numTrials}.</p>\
    <br><p>End of block - Please take a break!</p><br><p>Click on the button below when \
    you're ready to move to the next block.</p></div>`;
  }

  // push block end points and instructions
  timeline.push({
    on_start: setPoints,
    type: "html-button-response",
    choices: ["START"],
    button_html: buttonHTML,
  });
}
