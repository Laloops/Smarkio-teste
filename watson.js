const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: "0Z8DBOcRLa0nHSBhMZWPFFc4sXsTSN_G_UsAnuEk1QYC",
  }),
  serviceUrl: "https://api.us-south.text-to-speech.watson.cloud.ibm.com",
});

async function getAudio(texto) {
  return new Promise((resolve, reject) => {
    const params = {
      text: texto,
      voice: "pt-BR_IsabelaV3Voice",
      accept: "audio/wav",
    };
    textToSpeech
      .synthesize(params)
      .then((response) => {
        const audio = response.result;
        return textToSpeech.repairWavHeaderStream(audio);
      })
      .then((repairedFile) => {
        resolve(repairedFile);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

module.exports = { getAudio };
