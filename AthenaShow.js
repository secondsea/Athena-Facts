const Alexa = require('ask-sdk-core');
var randomFact = [];
var factArr = [];
const SKILL_NAME = 'Athena Trivia Facts';

const WELCOME_MESSAGE = "test fact.";
const HELP_MESSAGE = "Hope this crap works.";
const BACKGROUND_IMAGE_URL = "https://s3.us-east-2.amazonaws.com/marypic/Athena/Athenabk.png";
const ImagePath = "https://s3.us-east-2.amazonaws.com/marypic/Athena/"
const FALLBACK_MESSAGE = `The ${SKILL_NAME} skill screwed up?`;

const FALLBACK_REPROMPT = 'What can I help you with?';

//const BACKGROUND_IMAGE_URL = "http://ajotwani.s3.amazonaws.com/alexa/background.png"
const bkimage = new Alexa.ImageHelper().addImageInstance(BACKGROUND_IMAGE_URL).getImage();

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === "LaunchRequest";
    },
    handle(handlerInput) {
        factArr = stories;
        randomFact = getRandomFact();
        const speechOutput = randomFact.Fact;

        //    const speechOutput = WELCOME_MESSAGE;
        const repromptSpeechOutput = HELP_MESSAGE;
        var response = "";
        const image = ImagePath + randomFact.image + "launch";

        const attributes = handlerInput.attributesManager.getSessionAttributes();

        if (supportsDisplay(handlerInput)) {
            const display_type = "BodyTemplate2"
                //   const image_url = BACKGROUND_IMAGE_URL;
            response = getDisplay(handlerInput.responseBuilder, speechOutput, image, display_type)
        } else {
            response = handlerInput.responseBuilder
                .withStandardCard(SKILL_NAME, speechOutput, image, image)

        }

        return response
            .speak(speechOutput)
            .reprompt(repromptSpeechOutput)
            .getResponse();
    }
};

const StoryHandler = {
    //canHandle(handlerInput) {
    //		const request = handlerInput.requestEnvelope.request;
    //		return request.type === "IntentRequest" &&
    //           (request.intent.name === "StartStoryIntent" ||
    //            request.intent.name === "AMAZON.StartOverIntent" ||
    //           request.intent.name === "AMAZON.YesIntent");
    //    	},


    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === "IntentRequest" &&
            (request.intent.name === "StartStoryIntent" ||
                request.intent.name === "AMAZON.StartOverIntent" ||
                request.intent.name === 'AMAZON.FallbackIntent' ||
                request.intent.name === "AMAZON.YesIntent"
                // || request.intent.name === "GetNewFactIntent"
                ||
                request.intent.name === 'AnswerIntent'
            );
    },









    handle(handlerInput) {
        //get next story

        factArr = stories;
        randomFact = getRandomFact();
        const speechOutput = randomFact.Fact + "story";




        //    const story = getNextStory(handlerInput);
        //    const speechOutput = story.question;

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        var response = "";
        const image = ImagePath + randomFact.image;

        if (supportsDisplay(handlerInput)) {
            //  const image_url = attributes.lastQuestion.image;
            const display_type = "BodyTemplate2"
            response = getDisplay(handlerInput.responseBuilder, speechOutput, image, display_type)
        } else {
            response = handlerInput.responseBuilder
                .withStandardCard(SKILL_NAME, speechOutput, image, image)

        }

        return response
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

/*const AnswerHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        return request.type === "IntentRequest" &&
          //( 
              request.intent.name === "AnswerIntent";
          
          //   ||  request.intent.name === "AMAZON.YesIntent" 

          
        //  );
            //&&
          //  attributes.counter < attributes.storiesDeck.length - 1;
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
    //    const answerSlot = handlerInput.requestEnvelope.request.intent.slots.answer.value;
     //   const result = checkAnswer(handlerInput, answerSlot);
     //   const story = getNextStory(handlerInput);
        //		const speechOutput = result.message + "Here's your " + (attributes.counter + 1) + "th question - " + story.question;
   //     const speechOutput = "Here's your " + (attributes.counter + 1) + "th question - " + story.question;
     factArr=stories;
        randomFact = getRandomFact();
        const speechOutput = randomFact.Fact + "answer";
        var response = "";
        
                const image=ImagePath + randomFact.image;


        //		attributes.lastResult = result.message;
        handlerInput.attributesManager.setSessionAttributes(attributes);

        if (supportsDisplay(handlerInput)) {
         //   const image_url = attributes.lastQuestion.image;
            const display_type = "BodyTemplate2";
            response = getDisplay(handlerInput.responseBuilder, speechOutput, image, display_type);
        } else {
            response = handlerInput.responseBuilder
                   .withStandardCard(SKILL_NAME, speechOutput,image,image)

        }

        return response
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

//const GetNewFactHandler = {

//};

*/

const FallbackHandler = {

    // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.

    //              This handler will not be triggered except in that locale, so it can be

    //              safely deployed for any locale.

    canHandle(handlerInput) {

        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'

        &&
        request.intent.name === 'AMAZON.FallbackIntent';

    },

    handle(handlerInput) {

        return handlerInput.responseBuilder

            .speak(FALLBACK_MESSAGE)

        .reprompt(FALLBACK_REPROMPT)

        .getResponse();

    },

};


//const Unhandled = {
//  canHandle(handlerInput)': function () {
//    this.attributes.speechOutput = this.t('HELP_MESSAGE');
//   this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
//  this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
//},




const FinalScoreHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        return request.type === "IntentRequest" &&
            request.intent.name === "AnswerIntent" &&
            attributes.counter == attributes.storiesDeck.length - 1;
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        var response = "";

        if (supportsDisplay(handlerInput)) {
            const image_url = BACKGROUND_IMAGE_URL;
            const display_type = "BodyTemplate7"
            response = getDisplay(handlerInput.responseBuilder, attributes, image_url, display_type)
        } else {
            response = handlerInput.responseBuilder
        }

        return response
            .speak(attributes.lastResult + " Thank you for playing Memory Challenge. Your final score is " + attributes.correctCount + " out of " + (attributes.counter + 1))
            .getResponse();
    }
};

// returns true if the skill is running on a device with a display (show|spot)
function supportsDisplay(handlerInput) {
    var hasDisplay =
        handlerInput.requestEnvelope.context &&
        handlerInput.requestEnvelope.context.System &&
        handlerInput.requestEnvelope.context.System.device &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
    return hasDisplay;
}

function getDisplay(response, attributes, image_url, display_type) {
    const image = new Alexa.ImageHelper().addImageInstance(image_url).getImage();
    // const current_score = attributes.correctCount;
    //  let display_score = ""
    //  console.log("the display type is => " + display_type);

    //	if (typeof attributes.correctCount !== 'undefined'){
    //		display_score = "Score: " + current_score;
    //	}
    //	else{
    //		display_score = "Score: 0. Let's get started!";
    //	}

    const myTextContent = new Alexa.RichTextContentHelper()
        //	.withPrimaryText('Question #' + (attributes.counter + 1) + "<br/>")
        .withPrimaryText(attributes + ' <br/>')

    //.withSecondaryText(attributes.lastResult)
    //   .withTertiaryText("<br/> <font size='4'>"+attributes +     " </font>")
    .getTextContent();

    if (display_type == "BodyTemplate7") {
        //use background image
        response.addRenderTemplateDirective({
            type: display_type,
            backButton: 'visible',
            backgroundImage: image,
            title: SKILL_NAME,
            textContent: myTextContent,
        });
    } else {
        response.addRenderTemplateDirective({
            //use 340x340 image on the right with text on the left.
            type: display_type,
            backButton: 'visible',
            image: image,
            backgroundImage: bkimage,
            title: SKILL_NAME,
            textContent: myTextContent,
        });
    }

    return response
}

function supportsDisplay(handlerInput) {
    const hasDisplay =
        handlerInput.requestEnvelope.context &&
        handlerInput.requestEnvelope.context.System &&
        handlerInput.requestEnvelope.context.System.device &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
    return hasDisplay;
}

//*************************************************************888//

function getRandomFact() {
    factArr = stories;
    var factIndex = Math.floor(Math.random() * factArr.length);
    randomFact = factArr[factIndex];
    return randomFact;
}





//function getNextStory(handlerInput) {
//  const attributes = handlerInput.attributesManager.getSessionAttributes();
// var storiesDeck = [];

//  if (!attributes.counter) { //skill launched for first time - no counter set
//     storiesDeck = shuffle(stories);
//    attributes.storiesDeck = storiesDeck;
//   attributes.counter = 0;
//  attributes.correctCount = 0;
// attributes.wrongCount = 0;
// } else {
//    storiesDeck = attributes.storiesDeck;
// }

// const story = storiesDeck[attributes.counter];
// attributes.lastQuestion = story;
// handlerInput.attributesManager.setSessionAttributes(attributes);
// return story;
//}

///function checkAnswer(handlerInput, answerSlot) {
//  const attributes = handlerInput.attributesManager.getSessionAttributes();
// var status = "";
// var message = "";
// status = "dummy";
//  message = "dummy";
//	if (attributes.lastQuestion.answer.includes(answerSlot)){
//		console.log("correct");
//		message = "Yup! " + answerSlot + " is correct. ";
//		attributes.correctCount += 1;
//		status =true;

//	}
//	else{
//		console.log("wrong");
//		message = "Nope! " + answerSlot + " is incorrect. ";
//		attributes.wrongCount += 1;
//		status = false;
//	}
//attributes.counter += 1;
//handlerInput.attributesManager.setSessionAttributes(attributes);
// return { "status": status, "message": message };
//}

//function shuffle(arr) {
//  var ctr = arr.length,
//    temp, index;
// while (ctr > 0) {
//   index = Math.floor(Math.random() * ctr);
//   ctr--;
//  temp = arr[ctr];
//  arr[ctr] = arr[index];
//   arr[index] = temp;
// }
// return arr;
//}

const stories = [{
        "Fact": "Athena was born fully grown and in full armor from the head of Zues.",
        "answer": ["skating", "ice skating", "skiing"],
        "image": "Athena1.png"
    },
    {
        "Fact": "Athena is the Patron Goddess of Athens and the Parthenon is dedicated to her.",
        "answer": ["skating", "ice skating", "skiing"],
        "image": "parthenon.png"
    },
    {
        "Fact": "Athena helped Perseus defeat the gorgon by lending her shield as a mirror.",
        "answer": ["tooth brush", "hair brush", "hair dryer", "face cream"],
        "image": "medusa.png"
    },
    {
        "Fact": "Athena invented the bridle and used it to tame pegasus.",
        "answer": ["skating", "ice skating", "skiing"],
        "image": "pegasus.png"
    },
    {
        "Fact": "Athena was the favorite child of Zuess.",
        "answer": ["tooth brush", "hair brush", "hair dryer", "face cream"],
        "image": "AthenaZues.png"
    }
];

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
        //   GetNewFactHandler,
        LaunchRequestHandler,
        StoryHandler,
        //  AnswerHandler,
        //    FinalScoreHandler
    )
    .lambda();