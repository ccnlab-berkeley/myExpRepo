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
  // This trial comes after the end of the last block, and serves as buffer to
  // give the server time to save the final data file. At the end of the predetermined time,
  // e.g. 5 seconds, you can call a callback function to then mail off the data.
  timeline.push({
    type: "html-keyboard-response",
    stimulus: "<div class='center'><p>Saving data... please do not close this window. This will take a few seconds. </p></div>",
    choices: jsPsych.NO_KEYS,
    trial_duration: 5000,
    on_finish: data => {mail_data_csv(file_name)},
  });

  // This trial comes at the very end, where you direct your participant back to
  // Sona, or the next part of the experiment. Make sure your redirect link has
  // "id=${subjID}" appended at the very end.
  timeline.push({
    type: "html-keyboard-response",
    stimulus: `<div class='center'><p>Data saved. Click <a href='https://experiments-ccn.berkeley.edu/\
    gating/exp.html?id=${subjID}'>here</a> to proceed to the next task.</p></div>`,
    choices: jsPsych.ALL_KEYS,
  });

  return timeline;
}

// Create an experiment block. At the end of each block you will usually give
// feedback to your participant, so you'll need to push a trial object containing
// points or further instructions. This is a good place to save your data.
const createBlock = function(b,seqs) {

  // stimmap = dict where keys are stimuli and values are either the correct keys or the correct labels
  let bStart = seqs.allBlocks.indexOf(b);
  let blockEnd = seqs.allBlocks.indexOf(b+1);
  let setSize = seqs.setSizes[bStart];
  let cond = seqs.allConds[bStart];
  let folder = seqs.imgFolders[bStart];
  let numTrials = seqs.allTrials[blockEnd-1];

  for (t = 0; t < numTrials; t++) {
    let labelOrder = seqs.Labels[bStart+t];
    createFixation(labelOrder);
    let stim = seqs.allStims[bStart+t];
    let cor = seqs.corKeyIdx[bStart+t];
    createTrial(b,t,cond,folder,stim,cor,seqs.Labels,bStart);
  }
  // A helper function that saves all of the data if it's the last block, or
  // data for just that block if it's not the last block. 
  const setPoints = function(trial) {
    if (b == NUM_BLOCKS+1) { // if end of last block
      let allData = jsPsych.data.get(); // save all of the data
      save_data_csv(file_name,allData); // call save function
    }
    else { // if not last block, just save data for that block
      let toSave = jsPsych.data.get().filter({block: b});
      let blockFileName = `${file_name}_block_${b}`;
      save_data_csv(blockFileName, toSave);
    }
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
