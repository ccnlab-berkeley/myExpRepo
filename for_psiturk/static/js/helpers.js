/* Where your helper functions (random # generator, etc) live. Not necessary but
I find it helpful for decluttering. */

// create stimuli layout if you need to present multiple HTML elments
const createLayout = function(labelOrder,stim="+",folder="") {
  let stimHTML = '<p class="center fix">+</p>';
  if (stim!="+") stimHTML = `<img class="center stim" src="${imgP}images${folder}/image${stim}.png"/>`;
  let boxHTML = `<div class="box"><img class="box" src="${imgP}box${labelOrder[0]}.png">\
             <img class="box" src="${imgP}box${labelOrder[1]}.png">\
             <img class="box" src="${imgP}box${labelOrder[2]}.png"></div>`;
  return `<div class="exp">${stimHTML}${boxHTML}</div>`;
};

// create a fixation object for your trials
const createFixation = function(labelOrder) {
  let stim = createLayout(labelOrder);
  timeline.push({
    type: "html-keyboard-response",
    stimulus: stim,
    choices: jsPsych.NO_KEYS,
    trial_duration: FB_DUR,
  })
};

// random int generator
const getRandomInt = function(min, max) {
	min = Math.ceil(min);
  	max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// function that calls Papa.parse as a promise to load csv sequence
Papa.parsePromise = function(file) {
	return new Promise(function(complete,error) {
		Papa.parse(file, {
			download: true,
			header: false,
			dynamicTyping: true,
			complete, error
		});
	});
};
