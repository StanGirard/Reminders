import { success, failure } from "./lib/response-lib";
const AWS = require('aws-sdk');
const SQS = new AWS.SQS();

export  function main(event, context, callback) {
  // Your queue URL -> Change here
  var queueUrl = 'https://sqs.eu-west-1.amazonaws.com/1234567890/queue';
  var params = {
    MessageBody: event.body,
    QueueUrl: queueUrl
  };
  var responseBody = {
    message: ''
  };
   SQS.sendMessage(params, function(err, data) {
    if (err) {
        console.log('error:', "failed to send message" + err);
        callback(null, failure({status: false, error: err}));
    } else {
        console.log('data:', data.MessageId);
        responseBody.message = 'Sent to ' + queueUrl;
        responseBody.messageId = data.MessageId;
        callback(null, success({status: true, message: responseBody}));
    }
    }
  );
};
