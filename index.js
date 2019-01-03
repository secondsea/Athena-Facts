/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const cookbook = require('alexa-cookbook.js');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

const SKILL_NAME = 'Athena  Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say say Athena fact, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The Athena Facts skill can\'t help you with that.  It can help you discover facts about the Goddess Athena. What can I help you with?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================

const data = [
    "Athena is the goddess of wisdom, crafts, warfare, stategy, technology, mathematics, law and justice.",
	"Athena is the Patron Goddess of Athens and the Parthenon is dedicated to her.",
	"Athena helped Perseus defeat the gorgon by lending her shield as a mirror.",
	"Athena invented the bridle and used it to tame pegasus.",
	"Athena was the favorite child of Zuess.",
	"Athena's mother was Metis.  Zuess tricked Metis into transforming into an insect small enough so he could swallow her whole while she was pregnant with Athena.",
	"In the Trojan was Athena was the goddess who gave Ajax madness.",
	"Athena is known for her weaving and tapestries.",
	"Athena invented the flute.  When she played it for the first time Pan mocked her and she never played it again.",
	"Athena was the only Olympian who could use the thunderbolts of Zuess.",
	"The city of Athens was named after Athena.",
	"Athena helped heros like Perseus, Odysseus,Jason and Achilles when he fought Hector of Troy.",
	"Athena turned Arachne into a spider after she because angry about the tapestry she weaved about the gods.",
	"Athena's best friend is Nike the goddess of victory.",
	"One of Athena's titles is gray eyes or shining eyes.",
	"The Owl is Athena's favorite animal and her best known symbol.",
	"One of Athena's symbols is the olive tree because she gave the first olive tree to the people of Athens.",
	"Athena was the goddess who turned Medusa into a gorgon.",
	"Athena was the goddess who advised the Greeks in the Tojan war and the Trojan Horse was her idea.",
	"Athena would rather use diplomacy to resolve a conflict and war as a last resort,",
	"Athena helped Hercules finish his seven labors."
	"Athena is protected by the Aegis."
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const randomFact = cookbook.getRandomItem(data);
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};




const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.
  //              This handler will not be triggered except in that locale, so it can be
  //              safely deployed for any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
