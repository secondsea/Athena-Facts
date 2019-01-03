/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
//const cookbook = require('alexa-cookbook.js');
const ImagePath = "https://s3.us-east-2.amazonaws.com/marypic/Athena/";
//const background = "https://s3.us-east-2.amazonaws.com/marypic/Athena/Athenabk.png";

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

const SKILL_NAME = 'Athena  Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say say Athena fact, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The Athena Facts skill can\'t help you with that.  It can help you discover facts about the Goddess Athena. What can I help you with?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye and thanks for playing!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================

const data = [
    { "fact": "Athena was born fully grown and in full armor from the head of Zues.", "image": "Athena1.png" },
    { "fact": "Athena is the goddess of wisdom, crafts, warfare, strategy, technology, mathematics, law and justice.", "image": "allknowing.png" },
    { "fact": "Athena is the Patron Goddess of Athens and the Parthenon is dedicated to her.", "image": "parthenon.png" },
    { "fact": "Athena helped Perseus defeat the gorgon by lending her shield as a mirror.", "image": "medusa.png" },
    { "fact": "Athena invented the bridle and used it to tame pegasus.", "image": "pegasus.png" },
    { "fact": "Athena was the favorite child of Zues.", "image": "AthenaZues.png" },
    { "fact": "Athena's mother was Metis.  Zues tricked Metis into transforming small enough so he could swallow her whole while she was pregnant with Athena.", "image": "metis.png" },
    { "fact": "In the Trojan war, Athena was the goddess who gave Ajax madness.", "image": "ajax.png" },
    { "fact": "Athena is known for her weaving and tapestries.", "image": "weaver.png" },
    { "fact": "Athena invented the flute.  When she played it for the first time Pan mocked her and she never played it again.", "image": "AthenaPan.png" },
    { "fact": "Athena was the only Olympian who could use the thunderbolts of Zues.", "image": "thunder.png" },
    { "fact": "Athena helped heros like Perseus, Odysseus,Jason and Achilles when he fought Hector of Troy.", "image": "herohelp.png" },
    { "fact": "Athena turned Arachne into a spider after she because angry about the tapestry she weaved about the gods.", "image": "arachne.png" },
    { "fact": "Athena's best friend is Nike, the goddess of victory.", "image": "nike.png" },
    { "fact": "One of Athena's titles is gray eyes or shining eyes.", "image": "grayeyes.png" },
    { "fact": "The Owl is Athena's favorite animal and her best known symbol.", "image": "AthenaOwl.png" },
    { "fact": "One of Athena's symbols is the olive tree because she gave the first olive tree to the people of Athens. Because of this they named the city in her honor", "image": "olive.png" },
    { "fact": "Athena was the goddess who turned Medusa into a gorgon.", "image": "medusa2.png" },
    { "fact": "Athena was the goddess who advised the Greeks in the Tojan war and the Trojan Horse was her idea.", "image": "horse.png" },
    { "fact": "Athena would rather use diplomacy to resolve a conflict.  War is always a last resort.", "image": "peaceful.png" },
    { "fact": "Athena helped Hercules finish his seven labors.", "image": "AthenaHerc.png" },
    { "fact": "Athena is protected by the Aegis.", "image": "Aegis.png" },
    { "fact": "The queen of spades was orginally a reprsentation of Athena.  The only queen who holds a weapon.", "image": "spades.png" }
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const GetNewFactHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest' ||
            (request.type === 'IntentRequest' &&
                request.intent.name === 'GetNewFactIntent');
    },
    handle(handlerInput) {
        const factArr = data;

        var factIndex = Math.floor(Math.random() * data.length);
        const randomFact = data[factIndex];
        //    const randomFact = cookbook.getRandomItem(data);
        const speechOutput = GET_FACT_MESSAGE + randomFact.fact;
        const image = ImagePath + randomFact.image;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            //     .withSimpleCard(SKILL_NAME, randomFact)
            .withStandardCard(SKILL_NAME, speechOutput, image, image)
            .getResponse();
    },
};




const HelpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.HelpIntent';
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
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.FallbackIntent';
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
        return request.type === 'IntentRequest' &&
            (request.intent.name === 'AMAZON.CancelIntent' ||
                request.intent.name === 'AMAZON.StopIntent');
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