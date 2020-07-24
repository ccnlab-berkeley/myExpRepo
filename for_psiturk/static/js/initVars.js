/* Where your experiment parameters will be declared. This JS file will need to be
imported before your other JS files containing your functions, especially if those
functions rely on these variables as globals. */

const IS_DEBUG = false;

// experiment parameters
const KEYS = [67,86,66]; // c, v, b
const LABELS = [1,2,3]; // labels
const SETSIZES =[2,3,4,5];
const CONDS = [0,1];
const NUM_BLOCKS = 8;
const NUM_TRIAL_REPS = 5;
const FOLDERS = [2,3,10,13,14,15,17,22];

// trial timing and timeout parameters
let FB_DUR = 1000; // feedback duration
let TRIAL_DUR = 1000; // trial duration before timeout
let FIX_DUR = 1000;
const imgP = 'static/img/';

const TO_MSG = '<div class="exp"><p class="center fb">You took too long to respond!</p></div>';
const COR_FB = '<div class="exp"><p class="center fb cor">+1</p></div>';
const INCOR_FB = '<div class="exp"><p class="center fb incor">0</p></div>';
const buttonHTML = '<button class="ConsentBtn continue">%choice%</button>';

// string array of all img files, each element is the path of an img to import
const IMGS = [`${imgP}box1.png`,`${imgP}box2.png`,`${imgP}box3.png`];
for (f = 0; f < 8; f++) {
  for (i = 1; i < 6; i++) {
    IMGS.push(`${imgP}images${FOLDERS[f]}/image${i}.png`);
  }
}
