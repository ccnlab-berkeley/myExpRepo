/* createInstruction builds the sequence of your instructions. each instruction slide
is an object to be pushed to the timeline. You'll mainly have to replace the value for
the stimulus property. The type will be "html-button-response" if you're using a button
or "html-keyboard-response" for keys. Check jsPsych to see more configurations. */

const createInstructions = function() {
timeline.push({
  type: "html-button-response",
  stimulus: "<div class='center'><h1>Sort the cards!</h1><br>\
            <p>In this experiment, you will see a card on the screen. \
            You will see a set of boxes below each card. \
            Your goal is to sort the cards into boxes. \
            To sort a card, press one of the three buttons on the keyboard - C ,V OR B with your dominant hand. \
            Click on NEXT button to go through the rest of instructions.</p></div>",
  choices: ["NEXT"],
  button_html: buttonHTML
});

timeline.push({
  type: "html-button-response",
  stimulus: "<div class='center'>\
            <p>Your goal is to figure out how to sort the cards to win points. \
            How you sort the cards will change for different blocks. \
            We will tell you the sorting rule before the beginning of each block. \
            Please respond to every card as quickly and accurately as possible. \
            If you do not respond, the trial will be counted as a loss. \
            Each time you sort the card correctly, you will gain 1 point. \
            Click on NEXT button to go through the rest of instructions.</p></div>",
  choices: ["NEXT"],
  button_html: buttonHTML
});

timeline.push({
  type: "html-button-response",
  stimulus: "<div class='center'>\
            <p>First you will do a set of practice trials. After the practice section, there will be 8 blocks. \
            You can rest between each block. \
            Press a key to begin practice. </p></div>",
  choices: ["BEGIN"],
  button_html: buttonHTML
});

}
