/* createTrial() pushes your trial object to the timeline every time it'sc called.
Inside createTrial are two helper functions: setTrial(trial), which sets up the stimuli,
key_answer, and other parameters of your trial before the trial is presented, and
setData(data), which lets you adjust other parameters of your data upon the end of the trial.*/

const createTrial = function(b,t,cond,folder,stim,cor,allLabels,bStart) {

  const setTrial = function(trial) {
    let labelOrder = allLabels[bStart+t];
    trial.labels = labelOrder;
    trial.stimulus = createLayout(labelOrder,stim,folder);
    trial.key_answer = KEYS[cor-1];
    return trial;
  }
  const setData = function(data) {
    let answer = data.key_press;
    data.stimulus = stim;
    data.key_answer = cor;
    data.key_press = KEYS.indexOf(answer);
    psiturk.recordTrialData(data); // record (not save) data per trial on .db file
    return data;
  }

  let trial = {
    type: "categorize-html",
    correct_text: COR_FB,
    incorrect_text: INCOR_FB,
    on_start: setTrial,
    choices: KEYS,
    timeout_message: TO_MSG, // check w/ milena
    trial_duration: TRIAL_DUR,
    feedback_duration: FB_DUR,
    on_finish: setData,
    show_stim_with_feedback: false,
    data: {
      set: folder,
      block: b,
      trial: t+1,
    }
  };
  timeline.push(trial);
}
